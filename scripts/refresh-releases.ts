import { mkdir, writeFile } from 'node:fs/promises';
import { fetchManifest } from '../src/services/releases';
const manifest = await fetchManifest();
await mkdir(new URL('../src/data/', import.meta.url), { recursive:true });
await writeFile(new URL('../src/data/releases.json', import.meta.url), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Public manifest refreshed: ${manifest.latest?.version ?? 'no release'}`);
