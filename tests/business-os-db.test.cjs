// Uses an isolated in-memory PostgreSQL; never connects to a hosted database.
// PGLITE_MODULE can identify an already installed @electric-sql/pglite (tested 0.3.16).
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { PGlite } = require(process.env.PGLITE_MODULE || '@electric-sql/pglite');
test('Business OS SQL permissions, audit, money, stages and public intake', async t => {
  const db = new PGlite();
  const owner = '00000000-0000-4000-8000-000000000001';
  const manager = '00000000-0000-4000-8000-000000000002';
  const contributor = '00000000-0000-4000-8000-000000000003';
  const viewer = '00000000-0000-4000-8000-000000000004';
  const outsider = '00000000-0000-4000-8000-000000000005';
  const team = '10000000-0000-4000-8000-000000000001';
  const otherTeam = '10000000-0000-4000-8000-000000000002';
  const project = '20000000-0000-4000-8000-000000000001';
  const task1 = '30000000-0000-4000-8000-000000000001';
  const task2 = '30000000-0000-4000-8000-000000000002';
  const act = async (user, role = 'authenticated') => {
    await db.exec('reset role');
    await db.query("select set_config('request.jwt.claim.sub',$1,false)", [user || '']);
    await db.exec(`set role ${role}`);
  };
  const rejected = async (sql, values = []) => assert.rejects(db.query(sql, values));
  try {
    await db.exec(`create role anon nologin; create role authenticated nologin;
      create schema auth; create table auth.users(id uuid primary key);
      create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
      grant usage on schema auth to anon,authenticated; grant execute on function auth.uid() to anon,authenticated;`);
    const migration = fs.readdirSync(path.join(__dirname, '../supabase/migrations')).find(name => name.endsWith('_business_os.sql'));
    await db.exec(fs.readFileSync(path.join(__dirname, '../supabase/migrations', migration), 'utf8'));
    await db.query('insert into auth.users values($1),($2),($3),($4),($5)', [owner, manager, contributor, viewer, outsider]);
    await db.query('insert into public.bos_tenants(id,name) values($1,$2),($3,$4)', [team, 'Synthetic team A', otherTeam, 'Synthetic team B']);
    await db.query("insert into public.bos_tenant_members values($1,$2,'owner'),($1,$3,'manager'),($1,$4,'contributor'),($1,$5,'viewer'),($6,$7,'owner')", [team, owner, manager, contributor, viewer, otherTeam, outsider]);
    await act(owner);
    await db.query('insert into public.bos_projects(id,tenant_id,title,client_name,owner_id) values($1,$2,$3,$4,$5)', [project, team, 'Synthetic pilot', 'Synthetic customer', owner]);
    await act(null, 'postgres');
    await db.query("insert into public.bos_project_members values($1,$2,$3,'contributor'),($1,$2,$4,'viewer')", [project, team, contributor, viewer]);
    await t.test('outsider cannot read or insert another tenant project', async () => {
      await act(outsider);
      assert.equal((await db.query('select * from public.bos_projects where id=$1', [project])).rows.length, 0);
      await rejected('insert into public.bos_projects(tenant_id,title,client_name,owner_id) values($1,$2,$3,$4)', [team, 'Attack', 'Other team', outsider]);
    });
    await t.test('viewer cannot insert; cross-tenant child rows are rejected', async () => {
      await act(viewer);
      await rejected("update public.bos_tenant_members set role='owner' where user_id=$1", [viewer]);
      await rejected("insert into public.bos_project_members values($1,$2,$3,'manager')", [project, team, viewer]);
      await rejected("insert into public.bos_tasks(tenant_id,project_id,title,owner_id,due_on) values($1,$2,'Forbidden',$3,'2026-12-01')", [team, project, viewer]);
      await act(owner);
      await rejected("insert into public.bos_tasks(tenant_id,project_id,title,owner_id,due_on) values($1,$2,'Wrong tenant',$3,'2026-12-01')", [otherTeam, project, owner]);
      await rejected("insert into public.bos_tasks(tenant_id,project_id,title,owner_id,due_on) values($1,$2,'Outside assignee',$3,'2026-12-01')", [team, project, outsider]);
    });
    await t.test('task dependencies block completion and cannot be rewritten into cycles', async () => {
      await act(contributor);
      await db.query("insert into public.bos_tasks(id,tenant_id,project_id,title,owner_id,due_on) values($1,$2,$3,'Source review',$4,'2026-12-01')", [task1, team, project, contributor]);
      await db.query("insert into public.bos_tasks(id,tenant_id,project_id,title,owner_id,due_on,dependency_id) values($1,$2,$3,'Delivery',$4,'2026-12-02',$5)", [task2, team, project, contributor, task1]);
      await rejected("update public.bos_tasks set status='done' where id=$1", [task2]);
      await rejected('update public.bos_tasks set dependency_id=$1 where id=$2', [task2, task1]);
      await db.query("update public.bos_tasks set status='done' where id=$1", [task1]);
      await db.query("update public.bos_tasks set status='done' where id=$1", [task2]);
    });
    const record = async (kind, amount = 0) => (await db.query("insert into public.bos_records(tenant_id,project_id,kind,title,notes,evidence_url,amount_minor) values($1,$2,$3,$3,'Synthetic evidence for tests','https://example.org/evidence',$4) returning id", [team, project, kind, amount])).rows[0].id;
    const approve = async id => db.query("update public.bos_records set status='approved' where id=$1", [id]);
    let rights;
    await t.test('review requires a second manager; audit cannot be forged or rewritten', async () => {
      await act(owner); rights = await record('rights');
      await rejected("update public.bos_records set status='approved' where id=$1", [rights]);
      await act(contributor);
      assert.equal((await db.query("update public.bos_records set status='approved' where id=$1 returning id", [rights])).rows.length, 0);
      await rejected("insert into public.bos_audit(tenant_id,project_id,actor_id,entity_id,action) values($1,$2,$3,$2,'forged')", [team, project, contributor]);
      await rejected("update public.bos_audit set action='forged'");
      await act(manager); await approve(rights);
      await rejected("update public.bos_records set notes='Rewritten approved scope' where id=$1", [rights]);
      assert.equal((await db.query('select reviewed_by from public.bos_records where id=$1', [rights])).rows[0].reviewed_by, manager);
      assert.ok((await db.query('select count(*)::int as n from public.bos_audit where project_id=$1', [project])).rows[0].n >= 5);
    });
    await t.test('candidate review requires a checked official source and URLs cannot execute scripts', async () => {
      await act(owner);
      await rejected("insert into public.bos_records(tenant_id,project_id,kind,title,notes,evidence_url) values($1,$2,'rights','Bad URL','Synthetic evidence','javascript:alert(1)')", [team, project]);
      const candidate = (await db.query(`insert into public.bos_records(tenant_id,project_id,kind,title,notes,evidence_url,criteria)
        values($1,$2,'candidate','Synthetic candidate','Synthetic evidence','https://example.org/source','{"sector":true,"region":false,"capability":true,"officialSource":false}') returning id`, [team, project])).rows[0].id;
      await act(manager);
      await rejected("update public.bos_records set status='approved' where id=$1", [candidate]);
      await db.query("update public.bos_records set status='rejected' where id=$1", [candidate]);
    });
    await t.test('sequential stage gates and receipt balances are enforced in SQL', async () => {
      await act(owner);
      await rejected("update public.bos_projects set stage='contract' where id=$1", [project]);
      await db.query("update public.bos_projects set stage='discovery' where id=$1", [project]);
      await rejected("update public.bos_projects set stage='quote' where id=$1", [project]);
      const compliance = await record('compliance'); await act(manager); await approve(compliance);
      await db.query("update public.bos_projects set stage='quote' where id=$1", [project]);
      await act(owner); const quote = await record('quote', 10000); await act(manager); await approve(quote);
      await db.query("update public.bos_projects set stage='sample' where id=$1", [project]);
      await act(owner); const sample = await record('sample'); await act(manager); await approve(sample);
      await db.query("update public.bos_projects set stage='contract' where id=$1", [project]);
      await act(owner);
      await rejected("insert into public.bos_records(tenant_id,project_id,kind,title,notes,evidence_url,amount_minor) values($1,$2,'receipt','Fake receipt','Synthetic evidence','https://example.org/receipt',10000)", [team, project]);
      await rejected("insert into public.bos_records(tenant_id,project_id,kind,title,notes,evidence_url,amount_minor) values($1,$2,'contract','Bad amount','Synthetic evidence','https://example.org/contract',-1)", [team, project]);
      const contract = await record('contract', 10000); await act(manager); await approve(contract);
      await db.query("update public.bos_projects set stage='delivery' where id=$1", [project]);
      await act(owner); const acceptance = await record('acceptance'); await act(manager); await approve(acceptance);
      await db.query("update public.bos_projects set stage='acceptance' where id=$1", [project]);
      await rejected("update public.bos_projects set stage='collected' where id=$1", [project]);
      await act(owner); const receipt1 = await record('receipt', 9999); await act(manager); await approve(receipt1);
      await rejected("update public.bos_projects set stage='collected' where id=$1", [project]);
      await act(owner); const receipt2 = await record('receipt', 1); await act(manager); await approve(receipt2);
      await db.query("update public.bos_projects set stage='collected' where id=$1", [project]);
      await rejected("insert into public.bos_tasks(tenant_id,project_id,title,owner_id,due_on) values($1,$2,'Late task',$3,'2026-12-01')", [team, project, manager]);
      await db.query("update public.bos_projects set stage='closed' where id=$1", [project]);
      await rejected("update public.bos_projects set title='Rewrite closed project' where id=$1", [project]);
    });
    let intake;
    await t.test('public intake is off by default; consent and persistent quotas are enforced', async () => {
      await act(null, 'anon');
      assert.equal((await db.query('select public.bos_intake_available() as ready')).rows[0].ready, false);
      const params = ['Synthetic applicant', 'contact@example.org', 'partner', 'Synthetic partnership request with enough detail', 'en', true];
      await rejected('select public.bos_submit_intake($1,$2,$3,$4,$5,$6)', params);
      await rejected('select * from public.bos_intakes');
      await act(null, 'postgres');
      await db.query('insert into ciaomind_bos_private.intake_config(tenant_id,enabled) values($1,true)', [team]);
      await act(null, 'anon');
      await rejected('select public.bos_submit_intake($1,$2,$3,$4,$5,$6)', [...params.slice(0,5), false]);
      intake = (await db.query('select public.bos_submit_intake($1,$2,$3,$4,$5,$6) as id', params)).rows[0].id;
      await db.query('select public.bos_submit_intake($1,$2,$3,$4,$5,$6)', params);
      await db.query('select public.bos_submit_intake($1,$2,$3,$4,$5,$6)', params);
      await rejected('select public.bos_submit_intake($1,$2,$3,$4,$5,$6)', params);
    });
    await t.test('only receiving team managers review; acceptance atomically creates a prospect without membership', async () => {
      await act(outsider);
      assert.equal((await db.query('select * from public.bos_intakes')).rows.length, 0);
      await rejected("select public.bos_review_intake($1,'accepted')", [intake]);
      await act(contributor);
      assert.equal((await db.query('select * from public.bos_intakes')).rows.length, 0);
      await rejected("select public.bos_review_intake($1,'accepted')", [intake]);
      await act(manager);
      const newProject = (await db.query("select public.bos_review_intake($1,'accepted') as id", [intake])).rows[0].id;
      assert.equal((await db.query('select stage from public.bos_projects where id=$1', [newProject])).rows[0].stage, 'prospect');
      assert.equal((await db.query('select * from public.bos_project_members where project_id=$1', [newProject])).rows.length, 0);
      assert.equal((await db.query('select * from public.bos_intake_audit where intake_id=$1', [intake])).rows.length, 1);
      await rejected("select public.bos_review_intake($1,'accepted')", [intake]);
      await rejected("update public.bos_intakes set brief='Tampered information after review' where id=$1", [intake]);
    });
  } finally { await db.close(); }
});
