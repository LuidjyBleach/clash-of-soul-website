import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import snapshot from '../src/data/releases.json';
const out=new URL(`../${process.env.QA_OUTPUT || 'test-results'}/`,import.meta.url);
await mkdir(out,{recursive:true});
const browser=await chromium.launch({...(process.platform==='win32'?{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}:{}),headless:true});
const base=process.env.QA_URL || 'http://127.0.0.1:4173/clash-of-soul-website/';
const api='https://api.github.com/repos/LuidjyBleach/clash-of-soul-updates/releases';
const raw=(r:typeof snapshot.releases[number])=>({tag_name:r.version,name:r.title,published_at:r.date,html_url:r.url,body:r.notes,assets:r.installer?[{name:r.installer.name,size:r.installer.size,browser_download_url:r.installer.url}]:[]});
const results:unknown[]=[];
try {
  for(const [width,height] of [[1920,1080],[1366,768],[768,1024],[390,844]]) {
    const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
    const page=await context.newPage();
    const errors:string[]=[]; const failed:string[]=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)failed.push(`${r.status()} ${r.url()}`);});
    await page.route(api+'**',route=>route.fulfill({json:route.request().url().endsWith('/latest')?raw(snapshot.latest!):snapshot.releases.map(raw)}));
    assert.equal((await page.goto(base))?.status(),200);
    await page.locator('.release-status').filter({hasText:'Version vérifiée sur GitHub'}).waitFor();
    assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`horizontal overflow at ${width}`);
    const anchorErrors=await page.locator('a[href^="#"]').evaluateAll(els=>els.map(el=>el.getAttribute('href')!).filter(h=>!document.getElementById(h.slice(1))));
    assert.deepEqual(anchorErrors,[]);
    await page.screenshot({path:new URL(`home-${width}.png`,out).pathname.replace(/^\/(?=[A-Za-z]:)/,''),fullPage:false});
    for(const name of ['Shinigami','Quincy','Hollow']) {await page.getByRole('tab',{name:new RegExp(name)}).click();assert.match(await page.locator('#camp-panel').innerText(),new RegExp(name));}
    await page.getByRole('tab',{name:/Shinigami/}).click();
    const review=await page.locator('.review-badge').count()>0;
    assert.equal(await page.locator('.real-card').count(),15);
    for(const group of ['Shinigami','Quincy','Hollow']) {
      await page.locator('.card-filters').getByRole('button',{name:new RegExp(group)}).click();
      assert.equal(await page.locator('.real-card').count(),5);
      assert.equal(await page.locator('.real-card.'+group.toLowerCase()).count(),5);
    }
    await page.locator('.card-filters').getByRole('button',{name:/Tous/}).click();
    if(review || await page.locator('.real-card img').count()===15){
      await page.locator('.card-image-button').first().click();await page.locator('.card-dialog[open]').waitFor();
      assert.equal(await page.locator('#card-dialog-title').innerText(),'Ichigo Kurosaki');
      await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#card-dialog-title').innerText(),'Byakuya Kuchiki');
      await page.keyboard.press('ArrowLeft');await page.keyboard.press('Escape');assert.equal(await page.locator('.card-dialog[open]').count(),0);
    } else assert.equal(await page.locator('.real-card img').count(),0);
    assert.equal(await page.locator('.real-card img').count(),15);
    await page.locator('.real-card img').evaluateAll(async els=>{await Promise.all(els.map(el=>{(el as HTMLImageElement).loading='eager';return (el as HTMLImageElement).decode();}));});
    assert.equal(await page.locator('.real-card img').evaluateAll(els=>els.every(el=>(el as HTMLImageElement).naturalWidth>0)),true);

    // Hide sticky chrome for section-only deliverables; hidden attributes respect the site's CSP.
    await page.locator('.header,.skip,.review-badge').evaluateAll(els=>els.forEach(el=>el.setAttribute('hidden','')));
    await page.evaluate(()=>{if(document.activeElement instanceof HTMLElement)document.activeElement.blur();});
    await page.locator('#cartes').screenshot({path:new URL(`cards-${width}.png`,out).pathname.replace(/^\/(?=[A-Za-z]:)/,'')});
    await page.locator('.gallery').screenshot({path:new URL(`gameplay-${width}.png`,out).pathname.replace(/^\/(?=[A-Za-z]:)/,'')});
    for(const group of ['Shinigami','Quincy','Hollow']) {
      await page.getByRole('tab',{name:new RegExp(group)}).click();
      await page.locator('#camps').screenshot({path:new URL(`camp-${group.toLowerCase()}-${width}.png`,out).pathname.replace(/^\/(?=[A-Za-z]:)/,'')});
    }
    await page.getByRole('tab',{name:/Shinigami/}).click();
    await page.locator('#camps').screenshot({style:'.header,.skip{visibility:hidden!important}',path:new URL(`camps-${width}.png`,out).pathname.replace(/^\/(?=[A-Za-z]:)/,'')});
    for(let i=0;i<6;i++) {await page.locator('#guide-tab-'+i).click();assert.equal(await page.locator('#guide-content h3').innerText(),await page.locator('#guide-tab-'+i).innerText().then(t=>t.replace(/^0\d\s*/,'')));}
    await page.locator('#guide-tab-1').click();
    await page.locator('#guide').screenshot({style:'.header,.skip{visibility:hidden!important}',path:new URL(`guide-${width}.png`,out).pathname.replace(/^\/(?=[A-Za-z]:)/,'')});
    const download=page.getByTestId('installer');assert.equal(await download.getAttribute('href'),snapshot.latest!.installer!.url);
    await page.locator('#telechargement').screenshot({style:'.header,.skip{visibility:hidden!important}',path:new URL(`download-${width}.png`,out).pathname.replace(/^\/(?=[A-Za-z]:)/,'')});
    await page.locator('.header,.skip,.review-badge').evaluateAll(els=>els.forEach(el=>el.removeAttribute('hidden')));
    assert.equal(await page.locator('.news-card').count(),snapshot.releases.length);
    await page.getByText('Besoin d’aide pour l’installation ?', {exact:false}).click();
    assert.equal(await page.locator('#telechargement details').getAttribute('open'),'');
    if(width<=820) {await page.locator('#menu-toggle').click();assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'true');await page.locator('#navigation a[href="#communaute"]').click();assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'false');await page.locator('#menu-toggle').click();await page.keyboard.press('Escape');assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'false');}
    await page.locator('#tab-0').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#tab-1').getAttribute('aria-selected'),'true');
    await page.locator('#guide-tab-1').focus();await page.keyboard.press('ArrowDown');assert.equal(await page.locator('#guide-tab-2').getAttribute('aria-selected'),'true');
    const accessibility=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    results.push({viewport:{width,height},pageErrors:errors,failedResources:failed,accessibility:accessibility.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>n.target)}))});
    assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
    await page.goto(base);await page.screenshot({path:new URL(`full-${width}.png`,out).pathname.replace(/^\/(?=[A-Za-z]:)/,''),fullPage:true});
    await context.close();
  }
  // Real page behavior under API failure, empty releases and malicious release notes.
  for(const mode of ['offline','empty','new-version','unsafe-notes']) {
    const context=await browser.newContext({viewport:{width:1366,height:768}});const page=await context.newPage();
    await page.route(api+'**',route=>{
      if(mode==='offline')return route.abort();
      if(mode==='empty')return route.fulfill({status:route.request().url().endsWith('/latest')?404:200,json:route.request().url().endsWith('/latest')?{}:[]});
      const value={...raw(snapshot.latest!),tag_name:mode==='new-version'?'v8.0.0':snapshot.latest!.version,body:'<img src=x onerror="window.injected=true">'};
      return route.fulfill({json:route.request().url().endsWith('/latest')?value:[value]});
    });
    await page.goto(base);await page.waitForFunction(()=>!document.querySelector('.release-status')?.textContent?.includes('Vérification'));
    if(mode==='offline'){assert.match(await page.locator('.release-status').innerText(),/GitHub indisponible/);assert.equal(await page.getByTestId('installer').getAttribute('href'),snapshot.latest!.installer!.url);}
    if(mode==='empty'){assert.equal(await page.getByTestId('installer').count(),0);assert.match(await page.locator('.news-grid').innerText(),/Aucune release/);}
    if(mode==='new-version')assert.match(await page.locator('.download-card h3').innerText(),/v8.0.0/);
    if(mode==='unsafe-notes'){assert.equal(await page.locator('.release-body img').count(),0);assert.match(await page.locator('.release-body').innerText(),/<img/);}
    assert.equal(await page.locator(`a[href="https://github.com/LuidjyBleach/clash-of-soul-updates/releases/latest"]`).count()>0,true);
    results.push({scenario:mode,passed:true});await context.close();
  }
  await writeFile(new URL('browser-results.json',out),JSON.stringify(results,null,2));
  const violations=(results as {accessibility?:unknown[]}[]).flatMap(r=>r.accessibility||[]);
  assert.equal(violations.length,0,JSON.stringify(violations));
  console.log('Browser QA passed: 4 viewports, 4 failure/update scenarios, no WCAG A/AA axe violations.');
} finally {await writeFile(new URL('browser-results.json',out),JSON.stringify(results,null,2));await browser.close();}
