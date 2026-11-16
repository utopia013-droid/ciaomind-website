const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

type SearchParams = URLSearchParams | Record<string, unknown>;

export function readCampaign(searchParams: SearchParams): Record<string, string> {
  const campaign: Record<string, string> = {};
  for (const key of campaignKeys) {
    const raw = searchParams instanceof URLSearchParams ? searchParams.getAll(key) : searchParams[key];
    const value = Array.isArray(raw) && raw.length === 1 ? raw[0] : raw;
    if (typeof value === 'string' && /^[A-Za-z0-9_.-]{1,80}$/.test(value)) campaign[key] = value;
  }
  return campaign;
}
