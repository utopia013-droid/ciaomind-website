/** Deterministic rules. No model, external request, payment or dispatch happens here. */
export const projectStages = ['prospect', 'discovery', 'quote', 'sample', 'contract', 'delivery', 'acceptance', 'collected', 'closed'] as const;
export const recordKinds = ['rights', 'compliance', 'quote', 'sample', 'contract', 'acceptance', 'receipt', 'candidate'] as const;
export type ProjectStage = typeof projectStages[number];
export type RecordKind = typeof recordKinds[number];
export type Role = 'owner' | 'manager' | 'contributor' | 'viewer';
export const canEdit = (role?: string) => ['owner', 'manager', 'contributor'].includes(role ?? '');
export const canApprove = (role?: string) => ['owner', 'manager'].includes(role ?? '');

export function moneyMinor(value: string): number {
  if (!/^(0|[1-9]\d{0,9})(\.\d{1,2})?$/.test(value)) throw new Error('invalid_amount');
  const [whole, fraction = ''] = value.split('.');
  const result = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  if (!Number.isSafeInteger(result)) throw new Error('invalid_amount');
  return result;
}
export function sourceUrl(value: string): string {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || value.length > 2000) throw new Error('invalid_source');
  return url.href;
}
export type CandidateCriteria = { sector: boolean; region: boolean; capability: boolean; officialSource: boolean };
export const candidateScore = (criteria: CandidateCriteria) =>
  (criteria.sector ? 30 : 0) + (criteria.region ? 20 : 0) + (criteria.capability ? 30 : 0) + (criteria.officialSource ? 20 : 0);

export type GateRecord = { kind: string; status: string; amount_minor: number };
export function stageAllowed(current: ProjectStage, next: ProjectStage, records: GateRecord[]): boolean {
  if (projectStages.indexOf(next) !== projectStages.indexOf(current) + 1) return false;
  const approved = records.filter(record => record.status === 'approved');
  const has = (kind: string) => approved.some(record => record.kind === kind);
  if (next === 'quote') return has('rights') && has('compliance');
  if (['sample', 'contract', 'delivery', 'acceptance'].includes(next)) {
    return has(({ sample: 'quote', contract: 'sample', delivery: 'contract', acceptance: 'acceptance' } as Record<string, string>)[next]);
  }
  if (next === 'collected') {
    const total = approved.filter(record => record.kind === 'contract').reduce((sum, record) => sum + record.amount_minor, 0);
    return total > 0 && approved.filter(record => record.kind === 'receipt').reduce((sum, record) => sum + record.amount_minor, 0) >= total;
  }
  return true;
}

export type Tenant = { id: string; name: string };
export type Membership = { tenant_id: string; role: Role };
export type Project = { id: string; tenant_id: string; title: string; client_name: string; owner_id: string; due_on: string | null; stage: ProjectStage; version: number };
export type Task = { id: string; project_id: string; title: string; owner_id: string; due_on: string; dependency_id: string | null; status: 'open' | 'done' };
export type BusinessRecord = GateRecord & { id: string; project_id: string; title: string; evidence_url: string; notes: string; created_by: string; reviewed_by: string | null; created_at: string; criteria: CandidateCriteria | null };
export type Audit = { id: string; project_id: string; actor_id: string; action: string; created_at: string; entity_id: string };
export type Intake = { id: string; tenant_id: string; company_name: string; contact_email: string; kind: string; brief: string; status: string; created_at: string; project_id: string | null };
