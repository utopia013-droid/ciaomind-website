export const networkAreas = ['project', 'culture', 'design', 'making', 'market', 'regional', 'finance', 'technology'] as const;
export type NetworkArea = typeof networkAreas[number];
export type NodeArea = Exclude<NetworkArea, 'project'>;

export function networkArea(value: unknown): NetworkArea | undefined {
  return networkAreas.find(area => area === value);
}

export function networkId(value: unknown): string | undefined {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
    ? value.toLowerCase()
    : undefined;
}

export const networkBriefLimit = 1600;
export type NetworkFormResult =
  | { status: 'idle' | 'invalid' | 'capacity' | 'unavailable' | 'conflict' }
  | { status: 'received'; id: string };
