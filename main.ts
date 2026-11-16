import {readFileSync,writeFileSync} from "node:fs";
import {parse} from "./parse.js";
const input=process.env.MAKEFUN_INPUT_DIR??"/input";
const output=process.env.MAKEFUN_OUTPUT_DIR??"/output";
const cases=JSON.parse(readFileSync(input+"/cases.json","utf8"));
// Render independently; identifiers never influence parsing.
const html=new Array(cases.length);
for(let i=0;i<cases.length;i++)html[i]=parse(cases[i].markdown);
writeFileSync(output+"/html.json",JSON.stringify(html));
