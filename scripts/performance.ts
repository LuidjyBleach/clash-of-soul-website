import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { mkdir,writeFile } from 'node:fs/promises';
const out=new URL('../test-results/',import.meta.url);await mkdir(out,{recursive:true});
const chrome=await launch({...(process.platform==='win32'?{chromePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}:{}),chromeFlags:['--headless','--no-sandbox','--disable-dev-shm-usage']});
try {
 for(const formFactor of ['desktop','mobile'] as const){
  const result=await lighthouse('http://127.0.0.1:4173/clash-of-soul-website/',{port:chrome.port,output:['html','json'],onlyCategories:['performance','accessibility','best-practices','seo'],...(formFactor==='desktop'?{formFactor:'desktop',screenEmulation:{mobile:false,width:1350,height:940,deviceScaleFactor:1,disabled:false},throttling:{rttMs:40,throughputKbps:10240,cpuSlowdownMultiplier:1}}:{} )});
  if(!result)throw new Error('No lighthouse result');
  await writeFile(new URL(`lighthouse-${formFactor}.html`,out),result.report[0]);
  await writeFile(new URL(`lighthouse-${formFactor}.json`,out),result.report[1]);
  console.log(JSON.stringify({formFactor,categories:Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,v.score])),metrics:{FCP:result.lhr.audits['first-contentful-paint'].displayValue,LCP:result.lhr.audits['largest-contentful-paint'].displayValue,CLS:result.lhr.audits['cumulative-layout-shift'].displayValue,TBT:result.lhr.audits['total-blocking-time'].displayValue}}));
 }
}finally{await chrome.kill();}
