import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
// Candidates are emitted only by the explicit local review build, never by `npm run build`.
export default defineConfig(({mode}) => ({ plugins: [react(), {
  name:'local-review-candidates',
  generateBundle() {
    if(mode!=='review')return;
    const folder=resolve(process.cwd(),'../visual-candidates-v2');
    const manifest=JSON.parse(readFileSync(resolve(folder,'manifest.json'),'utf8'));
    const files:string[]=[...manifest.cards.flatMap((c:{variants:Record<string,{file:string}>})=>Object.values(c.variants).map(v=>v.file)),...manifest.illustrations.map((i:{preview:string})=>i.preview)];
    for(const file of files){if(!/^[a-z0-9-]+\.webp$/.test(file))throw new Error('Invalid candidate filename');const source=resolve(folder,file);if(!existsSync(source))throw new Error('Missing local candidate: '+file);this.emitFile({type:'asset',fileName:'review-assets/'+file,source:readFileSync(source)});}
  },
}], base: '/clash-of-soul-website/', build: { sourcemap: false, outDir:mode==='review'?'dist-review':'dist' } }));
