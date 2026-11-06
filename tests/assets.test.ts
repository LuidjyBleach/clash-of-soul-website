import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mayPublish} from '../src/services/asset-rights';
import data from '../src/data/showcase.json';
import manifest from '../ASSET_MANIFEST_V2.json';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
test('publication requires explicit approval AND confirmed rights',()=>{assert.equal(mayPublish({authorization:'pending_explicit_approval',rightsConfirmed:false}),false);assert.equal(mayPublish({authorization:'approved',rightsConfirmed:false}),false);assert.equal(mayPublish({authorization:'pending_explicit_approval',rightsConfirmed:true}),false);assert.equal(mayPublish({authorization:'approved',rightsConfirmed:true}),true);});
test('fifteen real card references are evenly split between the three camps',()=>{assert.equal(data.cards.length,15);for(const camp of ['Shinigami','Quincy','Hollow'])assert.equal(data.cards.filter(c=>c.camp===camp).length,5);assert.equal(new Set(data.cards.map(c=>c.cardId)).size,15);});
test('all published V2 assets have explicit approval and confirmed rights',()=>{for(const asset of [...data.cards,...data.illustrations])assert.equal(mayPublish(asset),true);});
test('all 34 public WebP files exactly match the approved optimized V2 files',()=>{
 let count=0;
 for(const c of manifest.cards)for(const v of Object.values(c.variants)){assert.equal(createHash('sha256').update(readFileSync('public/images/cards/'+v.file)).digest('hex'),v.sha256);count++;}
 for(const i of manifest.illustrations){assert.equal(createHash('sha256').update(readFileSync('public/images/characters/'+i.preview)).digest('hex'),i.sha256);count++;}
 assert.equal(count,34);
});
