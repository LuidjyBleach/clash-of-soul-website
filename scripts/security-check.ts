import { execFileSync } from 'node:child_process';
import { readFile,stat,writeFile,mkdir } from 'node:fs/promises';
const files=execFileSync('git',['ls-files','--cached','--others','--exclude-standard'],{encoding:'utf8'}).trim().split(/\r?\n/).filter(Boolean);
const patterns=[/gh[pousr]_[A-Za-z0-9]{30,}/g,/github_pat_[A-Za-z0-9_]{50,}/g,/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g,/\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/g,/\bAKIA[A-Z0-9]{16}\b/g,/sb_secret_[A-Za-z0-9_-]{20,}/g];
const findings:{file:string;reason:string}[]=[];
for(const file of files){
 if(/(^|\/)(\.env(?:\.|$)|accounts?\/|saves?\/)|\.(py|sqlite|db|pem|pfx|exe|sig)$/i.test(file))findings.push({file,reason:'Forbidden file type or private data path'});
 if((await stat(file)).size>2_000_000)findings.push({file,reason:'Unexpected large source file'});
 const content=await readFile(file,'utf8');
 if(patterns.some(p=>{p.lastIndex=0;return p.test(content);}))findings.push({file,reason:'Possible secret format (value intentionally omitted)'});
}
const result={checkedAt:new Date().toISOString(),fileCount:files.length,findings,limits:'Known secret formats and forbidden file patterns only. Not a complete proof of absence of secrets.'};
await mkdir('test-results',{recursive:true});await writeFile('test-results/security-results.json',JSON.stringify(result,null,2));
console.log(JSON.stringify(result));if(findings.length)process.exitCode=1;
