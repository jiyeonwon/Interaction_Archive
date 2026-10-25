import {initializeLibrary} from './seed.js';
import {tags} from './connections.js';
export const KEY = 'scatter.v1';
export const uid = () => crypto.randomUUID();
export const initial = () => ({version:1,memos:[],active:[],sentence:[],archives:[],draft:'',libraryVersion:0,ideaHistory:[],ideaDraft:null});
export function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s?.version===1&&['memos','active','sentence','archives'].every(k=>Array.isArray(s[k])))return initializeLibrary({...initial(),...s});}catch{}return initializeLibrary(initial());}
export function persist(state){try{localStorage.setItem(KEY,JSON.stringify(state));return true;}catch{return false;}}
export function tokenize(memo){return (memo.text.match(/[\p{L}\p{N}\p{M}]+(?:['’\-][\p{L}\p{N}\p{M}]+)*/gu)||[]).map((text,index)=>({id:`${memo.id}:${index}`,memoId:memo.id,text,index}));}
export const date = value => new Intl.DateTimeFormat('ko-KR',{year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));

export function extractKeywords(memo,limit=2){
 const tokens=tokenize(memo);
 const hinted=memo.keywordHints?.length?memo.keywordHints.map(h=>tokens.find(w=>w.text.startsWith(h))).filter(Boolean):[];
 const unique=new Map();
 for(const word of tokenize(memo)){
  const topics=tags(word.text);if(!topics.size)continue;
  const key=[...topics].sort().join(':');
  // Keep real token text, position, and ID; no invented display terms.
  if(!unique.has(key))unique.set(key,{...word,topics:[...topics]});
 }
 const useful=[...unique.values()],fallback=tokens.filter(w=>w.text.length>1);
 return [...new Map([...hinted,...useful,...fallback].map(w=>[w.id,w])).values()].slice(0,limit);
}
export function deleteMemo(state,id){return {...state,memos:state.memos.filter(m=>m.id!==id),active:state.active.filter(x=>x!==id),sentence:state.sentence.filter(w=>w.memoId!==id),ideaDraft:null};}
export const signature=words=>words.map(w=>w.id).join('|');
export function createArchive(state,idea=null){
 const used=new Set(state.sentence.map(w=>w.memoId));
 return {id:uid(),createdAt:new Date().toISOString(),text:idea?.title||state.sentence.map(w=>w.text).join(' '),ideaText:idea?.text||null,recipeId:idea?.recipeId||null,words:state.sentence.map(w=>({...w})),sources:state.memos.filter(m=>used.has(m.id)).map(m=>({...m}))};
}
