import {readFileSync} from 'node:fs';
import {performance} from 'node:perf_hooks';
import {parse} from './parse.js';
import {marked} from '../markdown-render-speed-02-kit/baselines/vendor/marked/marked.esm.js';
import {readme} from '../markdown-render-speed-02-kit/program/generator/readme.ts';
import {streamFor} from '../markdown-render-speed-02-kit/program/generator/rng.ts';
const practice=JSON.parse(readFileSync('../markdown-render-speed-02-kit/practice/input/cases.json','utf8')).map(c=>c.markdown);
const sentinel=String.fromCharCode(122,113);
const inserts=practice.slice(0,680).filter(md=>{const b=md.trimEnd();return b.trim() && marked.parse(b+String.fromCharCode(10,10)+sentinel+String.fromCharCode(10)).endsWith( String.fromCharCode(60)+String.fromCharCode(112)+String.fromCharCode(62)+sentinel+String.fromCharCode(60,47,112,62,10));});
const fresh=[];
for(let seed=1;seed<=2;seed++)for(let i=0;i<40;i++){const rng=streamFor(seed.toString(16).padStart(64,'0'),'doc',i);fresh.push(readme(rng,rng.between(20000,100000),inserts));}
for(const [name,cases] of [['practice',practice],['fresh',fresh]]){
for(const md of cases)if(parse(md)!==marked.parse(md))throw Error('mismatch '+name);
const times={baseline:[],entry:[]};
for(let round=0;round<5;round++)for(const key of (round%2?['entry','baseline']:['baseline','entry'])){
const fn=key==='entry'?parse:marked.parse;const cpu=process.cpuUsage();const start=performance.now();let chars=0;for(const md of cases)chars+=fn(md).length;
const usage=process.cpuUsage(cpu);if(round)times[key].push({wall:performance.now()-start,cpu:(usage.user+usage.system)/1000,chars});}
console.log(JSON.stringify({name,count:cases.length,times}));}
const rng=streamFor('ff'.repeat(32),'fuzz',0);const atoms=['*','_','~','[',']','(',')','<','>','!',String.fromCharCode(92),String.fromCharCode(96),'a',' ','  ','&amp;','😀','é',String.fromCharCode(10),String.fromCharCode(9)];
for(let i=0;i<12000;i++){let md='';for(let j=0,n=rng.between(0,100);j<n;j++)md+=rng.pick(atoms);if(parse(md)!==marked.parse(md))throw Error('fuzz mismatch '+JSON.stringify(md));}
console.log('fuzz 12000/12000');

