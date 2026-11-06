import { links, releaseApi } from '../config';
export type Installer = { name: string; size: number; url: string };
export type Release = { version: string; date: string; title: string; notes: string; url: string; installer: Installer | null };
export type Manifest = { fetchedAt: string; latest: Release | null; releases: Release[] };
export type ReleaseState = Manifest & { source: 'live' | 'cache' | 'snapshot'; stale: boolean };
const prefix = links.repository + '/releases/';
export const CACHE_KEY = 'cos-public-releases-v1';
export const CACHE_TTL = 60 * 60 * 1000;
const object = (v: unknown): Record<string, unknown> => v && typeof v === 'object' ? v as Record<string, unknown> : {};
export function approvedReleaseUrl(value: unknown, download = false): value is string {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    if (url.origin !== 'https://github.com' || url.username || url.password || url.search || url.hash) return false;
    if (/%2f|%5c|%2e|\\/i.test(value)) return false;
    decodeURIComponent(url.pathname); // Reject malformed URL escapes before decoding asset names.
    return download ? value.startsWith(prefix + 'download/') && /^download\/[^/]+\/[^/]+\.exe$/i.test(value.slice(prefix.length)) : value === links.releases || value.startsWith(prefix + 'tag/') || value === links.latest;
  } catch { return false; }
}
export function parseRelease(input: unknown): Release | null {
  const value = object(input);
  if (value.draft === true || value.prerelease === true || typeof value.tag_name !== 'string' || !approvedReleaseUrl(value.html_url)) return null;
  const assets = Array.isArray(value.assets) ? value.assets.map(object) : [];
  const eligible = assets.filter(a => typeof a.name === 'string' && /(?:setup|installer).*\.exe$/i.test(a.name) && !/arm64|ia32|x86(?!_64)/i.test(a.name) && approvedReleaseUrl(a.browser_download_url, true) && decodeURIComponent(new URL(a.browser_download_url as string).pathname.split('/').pop()!) === a.name);
  // Ambiguous release: let the visitor choose on GitHub instead of guessing.
  const asset = eligible.length === 1 ? eligible[0] : null;
  return { version: value.tag_name.slice(0, 80), date: typeof value.published_at === 'string' && Number.isFinite(Date.parse(value.published_at)) ? value.published_at : '', title: typeof value.name === 'string' ? value.name.slice(0, 200) : value.tag_name, notes: typeof value.body === 'string' ? value.body.slice(0, 12000) : '', url: value.html_url, installer: asset ? { name: String(asset.name), size: typeof asset.size === 'number' && asset.size > 0 ? asset.size : 0, url: String(asset.browser_download_url) } : null };
}
export function validateManifest(input: unknown): Manifest | null {
  const m = object(input);
  if (typeof m.fetchedAt !== 'string' || !Number.isFinite(Date.parse(m.fetchedAt)) || !Array.isArray(m.releases)) return null;
  const valid = (input: unknown): Release | null => {
    const r = object(input); const i = object(r.installer);
    if (typeof r.version !== 'string' || !approvedReleaseUrl(r.url) || typeof r.notes !== 'string' || typeof r.date !== 'string') return null;
    return { version: r.version.slice(0,80), date: Number.isFinite(Date.parse(r.date)) ? r.date : '', title: typeof r.title === 'string' ? r.title.slice(0,200) : r.version, notes: r.notes.slice(0,12000), url: r.url, installer: approvedReleaseUrl(i.url,true) && typeof i.name === 'string' ? {name:i.name, url:i.url, size: typeof i.size === 'number' && i.size > 0 ? i.size : 0} : null };
  };
  const releases = m.releases.map(valid).filter((r): r is Release => !!r).slice(0, 12);
  const latest = m.latest === null ? null : valid(m.latest);
  return { fetchedAt:m.fetchedAt, latest, releases };
}
export async function fetchManifest(fetcher: typeof fetch = fetch): Promise<Manifest> {
  const request = async (url: string) => {
    const response = await fetcher(url, { headers: { Accept:'application/vnd.github+json' }, signal: AbortSignal.timeout(7000) });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`GitHub ${response.status}`);
    return response.json() as Promise<unknown>;
  };
  const [latest, history] = await Promise.all([request(releaseApi + '/latest'), request(releaseApi + '?per_page=12')]);
  if (history !== null && !Array.isArray(history)) throw new Error('Invalid release history');
  const releases = (Array.isArray(history) ? history : []).map(parseRelease).filter((r): r is Release => !!r);
  const parsedLatest = latest === null ? null : parseRelease(latest);
  if (latest !== null && !parsedLatest) throw new Error('Invalid latest release');
  return { fetchedAt:new Date().toISOString(), latest:parsedLatest, releases };
}
export async function loadReleases(snapshot: Manifest, storage?: Pick<Storage,'getItem'|'setItem'>, fetcher: typeof fetch = fetch, now = Date.now()): Promise<ReleaseState> {
  let cached: Manifest | null = null;
  try { cached = validateManifest(JSON.parse(storage?.getItem(CACHE_KEY) || 'null')); } catch { /* Private browsing or bad cache. */ }
  const age = cached ? now - Date.parse(cached.fetchedAt) : Infinity;
  if (cached && age >= 0 && age < CACHE_TTL) return { ...cached, source:'cache', stale:false };
  try {
    const live = await fetchManifest(fetcher);
    try { storage?.setItem(CACHE_KEY, JSON.stringify(live)); } catch { /* Storage is optional. */ }
    return { ...live, source:'live', stale:false };
  } catch {
    return { ...(cached && Date.parse(cached.fetchedAt) > Date.parse(snapshot.fetchedAt) ? cached : snapshot), source:cached && Date.parse(cached.fetchedAt) > Date.parse(snapshot.fetchedAt) ? 'cache':'snapshot', stale:true };
  }
}
