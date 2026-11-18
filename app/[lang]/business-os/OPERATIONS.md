# Business OS deployment and acceptance

This is an additive feature. It does not import orders, send mail, charge a card, create bank transfers, or call a paid/model API. `/[lang]/business-os/` is authenticated; `/[lang]/business-os/request/` is a public expression-of-interest form. Chinese, Italian and English are implemented; other site languages fall back to English in this feature.

## Required configuration

Reuse the existing cookie-based Supabase account integration and the exact pinned `@supabase/ssr` and `@supabase/supabase-js` dependencies. Server pages and actions use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Do not add a service-role key. Each sensitive action calls `auth.getUser()` and requires a verified email, then verifies tenant/project membership; database RLS and triggers enforce access even for direct Data API calls.

Apply `supabase/migrations/20261118195916_business_os.sql` through the chosen migration process after checking the target project. This migration was executed against isolated PGlite PostgreSQL 0.3.16 during development; it has not been run against a hosted database by the implementing agent. The public intake remains unavailable until explicitly configured.

## Administrator provisioning

Provision only identified, verified users. There is intentionally no self-service team/member escalation. In an administrator SQL session:

1. Create a row in `public.bos_tenants`, recording the returned UUID.
2. Look up the intended user's UUID in `auth.users`, verifying `email_confirmed_at is not null` and the intended business identity.
3. Insert `(tenant_id, user_id, role)` in `public.bos_tenant_members`. Roles are `owner`, `manager`, `contributor`, `viewer`. Tenant owners/managers can see and manage all projects in that tenant. After applying the `business_os_member_names` migration, an administrator SQL session may set the optional `display_name` (maximum 160 characters) on an existing membership. Use an identifiable name; blank names are not offered as other assignees. Names do not grant access, change roles or identify a new account. Authenticated site users, including owners, still have no INSERT/UPDATE permission on the membership table.
4. For contributors/viewers, also insert `(project_id, tenant_id, user_id, role)` in `public.bos_project_members`; project roles are `manager`, `contributor`, `viewer`. A tenant membership by itself does not expose projects to contributors/viewers. Project assignees must be project members or tenant management.
5. Provision at least two identified people for the review workflow. Submitted records cannot be approved or rejected by their creator. Record updates are limited to final review; submit a new record when scope or evidence changes.
6. After testing the public form, insert the sole configuration row in `ciaomind_bos_private.intake_config` with the receiving `tenant_id` and `enabled = true`. Disable reception by setting `enabled = false`. This configuration table is inaccessible to site users. Do not expose the private schema through the Data API.

The workspace reads its name directory only through the existing membership RLS, without querying other people's `auth.users` records. The signed-in user is shown with their verified email. Other people are shown by administrator-provisioned display name or the fallback “Authorised member”; unnamed people are not selectable. New project owners are tenant management, while task assignees are project members or tenant management. Each team's new-project form has its own authorised choices; identifiers remain internal form values and collapsed audit references. Contributors normally see only their own directory row under the existing RLS.

Anonymous users have no table access. Public invoker RPC wrappers call narrowly scoped private insert/readiness functions. Submission requires explicit consent and validates field lengths/type, with atomic persistent quotas of three submissions per contact email per day and 200 per receiving team per day. Email is not verified; submitted claims remain unverified. These quotas are a capacity control, not identity verification or a complete anti-abuse service.

Managers review pending requests. Acceptance atomically creates a prospect project and records the decision in an immutable intake audit log. Acceptance does not create an account, grant membership or certify a partner. No acknowledgement email is automatically sent. Requests contain only organisation, email, type, brief, language and consent metadata. Administrators handle data access/deletion and retention under the site's actual privacy process; these operations are not granted to anonymous users or ordinary members.

## State and evidence rules

Stages advance one step at a time: prospect → discovery → quote → sample → contract → delivery → acceptance → collected → closed. Quote requires approved rights and compliance records; sample requires an approved quote; contract requires an approved sample; delivery requires an approved contract; acceptance requires an approved acceptance document. Collection requires positive approved contract totals covered by approved receipts. Closure requires all tasks completed. Records and tasks are locked after collection/closure, and closed projects cannot be edited.

All financial amounts use integer euro cents. Quotes, contracts and receipts must be positive, and all records require an HTTPS evidence link plus explanatory notes. A receipt cannot be submitted before a contract has been approved. The link is a source reference, not proof that money moved; a second human must inspect it before approval. Ensure reviewers can open the private source document without embedding access tokens in its URL. No bank integration exists.

Apply `supabase/migrations/20261118200347_business_os_status_notes.sql` after the base migration to enable `note` records (状态备注 / Nota di stato / Status note). These preserve sourced project status without asserting commercial completion. Notes always have zero amount, start as `submitted`, and retain the same second-person review and audit rules. They never count as rights/compliance approval, contracts or receipts and cannot satisfy stage gates.

Apply `supabase/migrations/20261118200752_business_os_member_names.sql` for administrator-provisioned display names and the evidence URL correction. Evidence remains HTTPS-only, bounded in length and free of literal whitespace. Email addresses in a URL path or query are allowed; credentials in its authority are rejected. No existing account profile is modified by the migration.

Research candidates use explicit user-entered booleans: sector 30, region 20, capability 30, official source 20. The score is arithmetic, not model inference. There is no crawling, factual validation or source availability check. A manager must open the source and review the claim; candidate approval requires the official-source flag. A high score does not constitute approval.

Audit events are inserted by private triggers. Clients have SELECT privileges only, with tenant/project RLS. Private security-definer functions are limited to explicit caller-bound membership lookups, anonymous intake and audit insertion; ordinary project/task/record mutations and review RPCs run with the caller's RLS privileges.

## Verification

Run `npm run typecheck` and `npm run build` in the integrated checkout. For Node 24, use the included `npm run test:business-os` script. `@electric-sql/pglite@0.3.16` is pinned in `devDependencies`; SQL tests fail explicitly if it is missing. `PGLITE_MODULE` can override the module location for an existing installation. Tests never connect to a hosted database and use synthetic identities/documents.

Development verification covers actual SQL migration execution, tenant isolation, blocked escalation, viewer restrictions, assignee/dependency checks, two-person review, immutable audits/evidence, non-financial status notes, invalid URLs, candidate requirements, stage/receipt gates, default-closed public intake, consent, persistent rate limits and atomic manager acceptance. PGlite is single-connection, so concurrent transaction behaviour still needs verification against the target PostgreSQL instance.

After migration: run Supabase security/database advisors; verify anonymous table reads/writes fail, public form readiness is disabled until configured, owner/project-member views differ correctly, a second manager can approve evidence, and a submitted request can be reviewed exactly once. Confirm the deployed session callback URL, site privacy notice, production environment variables and actual receiving team before enabling public reception. The UI lists up to 100 projects, 200 tasks, 500 evidence records and 100 recent project audit events; displayed amounts refer to listed records, while database gates always use the full dataset.
