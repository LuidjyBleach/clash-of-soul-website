import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import manifest from '../SCREENSHOT_MANIFEST_V21.json';
import {gallery} from '../src/config';
test('five sanitized screenshots cover four gameplay categories and two duels',()=>{assert.equal(gallery.length,4);assert.equal(gallery[1].shots.length,2);assert.equal(manifest.screenshots.length,5);assert.equal(new Set(gallery.flatMap(c=>c.shots.map(s=>s.id))).size,5);});
test('public screenshots match reviewed redacted WebP exports and preserve aspect ratios',()=>{for(const item of manifest.screenshots){assert.ok(item.redactedRectangles.length>0);for(const v of item.variants){assert.equal(createHash('sha256').update(readFileSync('public/'+v.path)).digest('hex'),v.sha256);assert.ok(Math.abs(v.dimensions[0]/v.dimensions[1]-item.sourceDimensions[0]/item.sourceDimensions[1])<0.004);}}});
test('double-screen capture containing personal context is excluded from the site',()=>{assert.equal(manifest.excluded.length,1);assert.equal(manifest.screenshots.some(s=>s.sourceFile===manifest.excluded[0].sourceFile),false);});
