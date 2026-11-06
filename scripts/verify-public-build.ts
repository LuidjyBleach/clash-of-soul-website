import {existsSync,readdirSync,readFileSync} from 'node:fs';
import {resolve} from 'node:path';
if(existsSync('dist/review-assets'))throw new Error('Private review candidates leaked into public output');
for(const filename of readdirSync('dist/assets')){
 if(filename.endsWith('.js')&&readFileSync(resolve('dist/assets',filename),'utf8').includes('review-assets/'))throw new Error('Review asset URLs leaked into production bundle');
}
console.log('Public build verified: no review assets or candidate URLs.');
