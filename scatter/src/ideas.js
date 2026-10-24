import {tags} from './connections.js';
import {tokenize} from './storage.js';
const rule=(id,title,groups,variants)=>({id,title,groups,variants});
export const IDEA_RULES=[
 rule('receipt-time','하루를 보관하는 영수증',[['receipt'],['memory','time','trace']],['구매 내역 옆에 그날 만난 사람과 짧은 감정을 덧붙이는 영수증 아카이브를 만든다. 날짜를 넘기면 소비 금액 대신 하루의 기억이 먼저 펼쳐지도록 한다.','오래된 영수증을 한 장씩 열면 당시의 장소와 대화를 떠올리는 질문이 나타나는 회상 일기를 만든다. 사용자가 적은 답을 시간 순서가 아닌 감정의 흐름으로 다시 연결한다.']),
 rule('relationship-map','관계의 노선도',[['map','city'],['relationship']],['사람 사이의 관계를 역과 노선으로 표현하는 인터랙티브 지도를 만든다. 연락이 잦아지면 역 사이의 간격이 좁아지고, 잠시 멀어진 관계는 사라지는 대신 우회 노선으로 남는다.','같은 장소에 있어도 멀게 느껴지는 관계를 두 개의 지도로 겹쳐 보여 준다. 실제 이동 거리와 대화의 빈도를 번갈아 보며 두 지도가 달라지는 순간에 메모를 남길 수 있다.']),
 rule('distorted-memory','흐림으로 남기는 감정',[['distortion','water'],['memory','emotion']],['감정에 따라 사진의 선명도가 달라지는 기억 일기를 만든다. 물방울처럼 화면을 문지르면 가려진 이미지와 당시의 문장이 조금씩 드러나며, 흐릿한 부분도 지우지 않고 보관한다.','같은 사진을 오늘의 기분에 맞춰 다시 바라보는 인터랙티브 앨범을 만든다. 사용자가 선택한 흐림의 정도를 날짜별로 겹쳐 기억이 변하는 과정을 보여 준다.']),
 rule('mirror-record','나를 관찰하는 거울',[['mirror'],['observation','memory','question']],['거울을 확인하는 짧은 순간의 표정을 사용자가 직접 고르고 기록하는 디지털 거울을 만든다. 시간이 쌓이면 표정과 메모를 함께 펼쳐 반복되는 감정 패턴을 발견하게 한다.','거울을 볼 때 떠오른 질문을 하루 한 문장씩 남기는 관찰 노트를 만든다. 정답이나 외모 평가 대신 지난 표정 기록과 오늘의 짧은 대답을 나란히 보여 준다.']),
 rule('habit-change','첫 행동의 작은 변화',[['habit'],['growth']],['시작하기 전 반복하는 행동을 아주 작은 단계로 기록하는 작업 도구를 만든다. 완료 횟수보다 어제와 달라진 첫 행동을 강조해 습관의 변화를 알아차리게 한다.','늘 같은 선택을 하는 순간에 작은 대안을 하나 제시하는 습관 실험장을 만든다. 자리를 바꾸거나 파일을 여는 정도의 시도 후 기분을 적으면 변화가 쌓이는 지도로 남는다.']),
 rule('sound-light','소리를 보는 오후',[['sound'],['light','color']],['주변 소리의 리듬을 빛의 밝기와 움직임으로 바꾸는 작은 공간 실험을 만든다. 사용자는 눈으로 본 리듬에 그날의 장소와 느낌을 덧붙여 감각 지도를 쌓는다.','같은 장소의 소리를 시간대별로 기록하고 빛의 패턴으로 재생하는 웹을 만든다. 조용한 순간과 시끄러운 순간을 시각적으로 비교하면서 공간에 대한 다른 기억을 찾는다.']),
 rule('light-space','그림자로 읽는 공간',[['light','shadow'],['space']],['공간에 머무는 사람의 움직임에 따라 빛과 그림자가 바뀌는 전시를 만든다. 설명문 대신 바닥에 나타나는 명암이 다음에 머물 자리를 제안하도록 한다.','하루 동안 공간을 지나가는 빛의 위치를 기록해 시계처럼 읽는 인터랙티브 벽을 만든다. 관람객은 자신이 머문 위치에 짧은 생각을 남겨 다음 시간대의 방문자와 연결한다.']),
 rule('urban-garden','도시의 편안한 경로',[['nature'],['city','map']],['최단 거리 대신 나무와 그늘을 기준으로 걷는 도시 지도를 만든다. 사용자가 편안하게 머문 지점을 기록하면 계절에 따라 달라지는 개인의 산책 경로가 된다.','작은 식물의 성장 기록을 도시의 이동 경로와 겹쳐 보는 산책 일기를 만든다. 매번 지나치던 나무의 변화에 짧은 사진과 메모를 붙여 느린 시간을 발견하게 한다.']),
 rule('tactile-digital','손끝으로 접는 화면',[['touch','material'],['technology','paper']],['종이를 접거나 서로 다른 재료를 만지는 경험을 화면 탐색 방식으로 옮긴다. 사용자가 자주 연 부분에는 접힌 자국이 남고, 손의 움직임이 디지털 기록의 순서를 정하도록 한다.','재료의 촉감을 사용자가 고른 단어와 연결해 저장하는 감각 자료집을 만든다. 디지털 화면에서도 거칠기와 매끄러움의 차이를 이동 속도와 펼쳐지는 방식으로 구분한다.']),
 rule('waiting-time','기다림의 모양',[['waiting'],['time']],['남은 시간을 숫자 대신 천천히 변하는 풍경으로 보여 주는 기다림 화면을 만든다. 알림을 반복 확인할 때마다 재촉하는 표시 대신 지금 할 수 있는 작은 행동을 하나 제안한다.','알림을 기다리며 화면을 확인한 순간들을 하루의 리듬으로 기록한다. 기다림이 길었던 구간에 짧은 메모를 남기고, 다음 날에는 스스로 쉬어 갈 시간을 정할 수 있게 한다.']),
 rule('trace-memory','앞선 사람의 흔적',[['trace','paper'],['memory']],['책과 사물에 남은 흔적에 짧은 기억을 붙이는 디지털 자료실을 만든다. 새로 정리한 정보보다 누군가 오래 머문 부분을 먼저 보여 주어 다른 사람의 경험을 따라 읽게 한다.','자주 만진 책 모서리나 오래된 종이의 자국을 확대해 보는 기억 지도를 만든다. 사용자가 발견한 흔적 옆에 그때 떠오른 사람과 순간을 직접 기록할 수 있다.']),
 rule('question-observation','질문으로 들어가는 전시',[['question'],['observation','space']],['전시의 설명문을 정답 대신 관찰 질문으로 바꿔 보는 인터랙티브 안내를 만든다. 관람객이 고른 질문에 따라 다음 작품의 관찰 지점이 달라지고, 대답은 다른 날의 기록과 이어진다.','관찰하며 남긴 미완성 질문을 모으고 다른 날짜의 메모에서 답의 실마리를 찾는 노트를 만든다. 해결되지 않은 질문도 숨기지 않고 관련된 기록 옆에 놓아 새로운 입구로 활용한다.'])
];
const sig=words=>words.map(w=>w.id).join('|');
function eligible(rule,words){const topicSets=words.map(w=>tags(w.text));const allowed=new Set(rule.groups.flat());return rule.groups.every(group=>topicSets.some(ts=>group.some(t=>ts.has(t))))&&topicSets.every(ts=>[...ts].some(t=>allowed.has(t)));}
export function generateIdea(words,memos,history=[]){
 const actual=words.filter(w=>memos.some(m=>m.id===w.memoId&&tokenize(m).some(t=>t.id===w.id&&t.text===w.text)));
 if(actual.length!==words.length||words.length<2||words.length>6||new Set(words.map(w=>w.memoId)).size<2)return null;
 const applicable=IDEA_RULES.filter(r=>eligible(r,words));if(!applicable.length)return null;
 const key=sig(words),previous=history.filter(h=>h.signature===key);
 const chosen=applicable[previous.length%applicable.length];const used=previous.filter(h=>h.recipeId===chosen.id).length;
 const q=words.map(w=>`‘${w.text}’`).join(' · ');
 return {title:chosen.title,text:`${q}에서 출발한 아이디어다. ${chosen.variants[used%chosen.variants.length]}`,recipeId:chosen.id,signature:key,words:words.map(w=>({...w})),sourceIds:[...new Set(words.map(w=>w.memoId))]};
}
export function findIdeaBundles(words,memos){
 const bundles=[];
 for(const [ruleIndex,r] of IDEA_RULES.entries()){
  let pair=null;
  for(const a of words){for(const b of words){if(a.id===b.id||a.memoId===b.memoId)continue;const group=[a,b];if(eligible(r,group)){pair=group;break;}}if(pair)break;}
  if(pair){
   const desired=2+(ruleIndex%3),allowed=new Set(r.groups.flat()),used=new Set(pair.map(w=>w.id));
   const extras=words.filter(w=>!used.has(w.id)&&[...tags(w.text)].some(t=>allowed.has(t))).sort((a,b)=>Number(pair.some(w=>w.memoId===a.memoId))-Number(pair.some(w=>w.memoId===b.memoId))||a.index-b.index);
   const group=[...pair];for(const word of extras){if(group.length>=desired)break;const next=[...group,word];if(eligible(r,next))group.push(word);}
   const idea=generateIdea(group,memos);if(idea)bundles.push({ruleId:r.id,words:group,idea});
  }
 }
 return bundles;
}
