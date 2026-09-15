import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {config} from '../content/site.mjs';
const root=resolve(import.meta.dirname,'..'), dist=join(root,'dist');
async function walk(dir){const entries=await readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(x=>x.isDirectory()?walk(join(dir,x.name)):join(dir,x.name)))).flat();}
const files=await walk(dist), html=files.filter(x=>x.endsWith('.html'));
assert.equal(html.length,23,'Expected 22 localized pages plus 404');
let localLinks=0;
for(const path of html){
 const text=await readFile(path,'utf8');
 assert.equal([...text.matchAll(/<h1\b/g)].length,1,`${path}: one main heading`);
 assert.match(text,/<html lang="(?:zh-CN|id)">/);
 assert.match(text,/<meta name="viewport"/);
 assert.ok(text.includes(config.legalName));
 assert.ok(text.includes('mailto:'+config.chinaEmail));
 assert.ok(text.includes('mailto:'+config.indonesiaEmail));
 assert.ok(text.includes('href="'+config.workbench+'"'));
 assert.ok(!text.includes('undefined')&&!text.includes('[object Object]'));
 for(const [,tag]of text.matchAll(/<(img)\b[^>]*>/g))assert.ok(tag);
 for(const tag of text.matchAll(/<img\b[^>]*>/g))assert.match(tag[0],/alt="[^"]*"/);
 for(const [,href]of text.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(href.startsWith('#')){assert.ok(text.includes('id="'+href.slice(1)+'"'));continue;}
  if(!href.startsWith('/'))continue;
  const clean=href.split(/[?#]/)[0];
  const target=join(dist,clean,clean.endsWith('/')?'index.html':'');
  assert.ok((await stat(target)).isFile(),`${path}: missing ${href}`);localLinks++;
 }
 const data=text.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
 assert.ok(data);assert.equal(JSON.parse(data[1]).legalName,config.legalName);
}
for(const path of ['content/site.mjs','scripts/build.mjs','dist/assets/site.js']){const r=spawnSync(process.execPath,['--check',join(root,path)],{encoding:'utf8'});assert.equal(r.status,0,r.stderr);}
const css=await readFile(join(dist,'assets/site.css'),'utf8');
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(css.includes('@media(max-width:760px)'));
assert.ok(css.includes('prefers-reduced-motion'));
const map=await readFile(join(dist,'sitemap.xml'),'utf8');
assert.equal([...map.matchAll(/<loc>/g)].length,22);
const hosting=JSON.parse(await readFile(join(root,'.openai/hosting.json'),'utf8'));
assert.equal(hosting.static.directory,'dist');assert.ok(hosting.project_id);
console.log(`Checked ${html.length} HTML files, ${localLinks} local references, both contact emails, workbench links, metadata, sitemap and JavaScript syntax.`);
