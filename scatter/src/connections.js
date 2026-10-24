// Offline, explainable Korean concept rules. No model/API, coordinates or random scores.
export const concepts = {
 receipt:['영수증','구매','소비'],
 trace:['흔적','자국','얼룩'],
 map:['지도','노선도','경로','동선'],
 relationship:['관계','친구','대화'],
 distortion:['왜곡','굴절','물방울','흐림','흐릿'],
 mirror:['거울','표정','얼굴'],
 observation:['관찰','설명문','독자'],
 habit:['습관','반복','시작'],
 material:['재료','접힌','접으'],
 waiting:['기다림','알림','새로고침'],
 question:['질문','대답'],
 light:['빛','조명','햇살','햇빛','광원','light','lighting'],
 shadow:['그림자','어둠','명암','shadow','darkness'],
 motion:['움직','움직임','동작','이동','흐르','흐름','춤','motion','movement'],
 space:['공간','전시','방','장소','건축','무대','space','exhibition'],
 type:['글자','문자','타이포','서체','폰트','문장','언어','typography','letter'],
 memory:['기억','추억','기록','회상','사진','memory','archive'],
 time:['시간','과거','미래','순간','어제','내일','시계','time'],
 sound:['소리','음악','리듬','노래','음향','목소리','sound','music'],
 color:['색','색채','색감','컬러','빨강','파랑','노랑','color'],
 nature:['자연','숲','나무','꽃','식물','정원','nature','forest'],
 water:['물방울','물','바다','파도','강','비','호수','water','ocean'],
 city:['도시','그늘','거리','골목','건물','지하철','교통','city','street'],
 person:['사람','관람객','사용자','관객','우리','함께','커뮤니티','people','user'],
 emotion:['감정','마음','기분','슬픔','행복','불안','설렘','emotion'],
 touch:['터치','촉감','손','만지','반응','인터랙','상호작용','touch'],
 technology:['기술','디지털','데이터','코드','알고리즘','센서','컴퓨터','digital','data'],
 food:['음식','요리','맛','식사','향','커피','food','taste'],
 growth:['성장','변화','자라','생명','탄생','진화','growth'],
 paper:['종이','책','노트','메모','페이지','포스터','paper','book']
};
// A bounded suffix grammar avoids substring matches such as 물리 → 물 or 비밀 → 비.
const suffix=/^(?:[은는이가을를와과의에도로]|으로|에서|에게|까지|부터|처럼|보다|마다|하고|이며|이나|랑|들|들[은는이가을를의과와]|하는|한|적인|적|을|를|으로는|에서는|에는|했다|한다|하기|한|하는|이었|였다|은데|처럼|이라|마다)*$/u;
function matches(text,stem){if(text===stem)return true;if(!text.startsWith(stem))return false;const tail=text.slice(stem.length);if(['움직','흐르','만지','자라','인터랙','타이포'].includes(stem))return true;return suffix.test(tail);}
export function tags(text){const terms=(text.toLowerCase().match(/[\p{L}\p{N}\p{M}]+/gu)||[]);return new Set(Object.entries(concepts).filter(([,stems])=>terms.some(t=>stems.some(s=>matches(t,s)))).map(([key])=>key));}
const relations=[
 ['receipt','memory','소비 기록이 불러오는 기억'],['receipt','time','영수증에 남은 하루의 시간'],['trace','memory','남겨진 흔적과 기억'],['map','relationship','경로를 빌려 표현하는 관계'],['city','relationship','물리적 거리와 관계의 거리'],['distortion','memory','흐릿함으로 다시 읽는 기억'],['distortion','emotion','선명도가 달라지는 감정'],['mirror','observation','거울 속 표정과 관찰'],['mirror','memory','표정을 기억하는 기록'],['habit','growth','반복과 습관 속 작은 변화'],['material','technology','재료의 경험을 옮기는 디지털'],['waiting','time','기다림을 표현하는 시간'],['question','observation','관찰에서 이어지는 질문'],['question','memory','지난 기록으로 다시 읽는 질문'],
 ['light','shadow','빛과 그림자의 대비'],['light','motion','움직임에 따라 달라지는 빛'],['light','space','빛으로 공간을 연출하는 관계'],['light','color','조명과 색의 시각적 관계'],
 ['shadow','memory','그림자와 기억을 통한 흔적 표현'],['shadow','space','명암으로 드러나는 공간'],['motion','type','움직이는 글자로 의미를 표현하는 관계'],['motion','sound','움직임과 리듬의 결합'],['motion','water','물의 흐름과 움직임'],['motion','touch','동작에 반응하는 인터랙션'],
 ['space','person','사람이 경험하는 공간'],['space','sound','소리로 공간을 구성하는 관계'],['space','nature','자연을 공간에 옮기는 관계'],['space','type','글자로 공간의 메시지를 전달하는 관계'],
 ['type','emotion','문자의 형태로 감정을 전달하는 관계'],['type','sound','말소리와 글자의 변환'],['type','paper','종이 위에 기록되는 글자'],['memory','time','시간의 흐름 속에 남는 기억'],['memory','person','사람의 경험이 만드는 기억'],['memory','paper','기억을 기록으로 남기는 관계'],['memory','emotion','기억이 불러오는 감정'],
 ['nature','city','도시와 자연의 대비·공존'],['nature','growth','자연의 성장과 변화'],['nature','water','물과 자연의 생태적 관계'],['time','growth','시간에 따른 변화'],['time','motion','움직임으로 드러나는 시간'],['sound','emotion','소리로 감정을 전달하는 관계'],['sound','color','소리와 색의 감각 전환'],['touch','technology','센서와 기술로 만드는 터치 반응'],['touch','person','사람의 행동과 반응'],['technology','nature','자연과 디지털 기술의 결합'],['technology','paper','아날로그 기록과 디지털의 결합'],['food','memory','맛과 향이 불러오는 기억'],['food','emotion','음식과 감각적 경험'],['color','emotion','색을 통해 표현하는 감정'],['paper','growth','기록이 쌓이며 자라는 생각']
];
const labels={receipt:'영수증',trace:'흔적',map:'지도',relationship:'관계',distortion:'흐림',mirror:'표정',observation:'관찰',habit:'반복',material:'재료',waiting:'기다림',question:'질문',light:'빛',shadow:'그림자',motion:'움직임',space:'공간',type:'글자',memory:'기억',time:'시간',sound:'소리',color:'색',nature:'자연',water:'물',city:'도시',person:'사람',emotion:'감정',touch:'상호작용',technology:'기술',food:'감각',growth:'변화',paper:'기록'};
export function recommendConnections(selected,words,memos){
 if(!selected||!words.some(w=>w.id===selected.id))return [];
 const source=memos.find(m=>m.id===selected.memoId);if(!source)return [];
 const selectedTags=tags(selected.text),sourceTags=tags(source.text);
 const candidates=[];
 for(const word of words){
  if(word.id===selected.id||word.text===selected.text)continue;
  const memo=memos.find(m=>m.id===word.memoId);if(!memo)continue;
  const candidateTags=tags(word.text);let score=0,reason='';
  for(const [a,b,why] of relations){
   if((selectedTags.has(a)&&candidateTags.has(b))||(selectedTags.has(b)&&candidateTags.has(a))){score=80;reason=why;break;}
  }
  if(!score){const shared=[...selectedTags].find(t=>candidateTags.has(t));if(shared){score=60;reason=`${labels[shared]}에 관한 공통 개념`;}}
  // Context can support a known word, but never invent a relationship for unknown tokens.
  if(!score&&selectedTags.size&&candidateTags.size){const shared=[...candidateTags].find(t=>sourceTags.has(t));const reverse=[...selectedTags].some(t=>tags(memo.text).has(t));if(shared&&reverse){score=40;reason=`두 메모에서 함께 나타나는 ${labels[shared]} 문맥`;}}
  if(!score)continue;
  const context=tags(memo.text);score += [...sourceTags].filter(t=>context.has(t)).length*2;
  if(source.id===memo.id)reason+=' · 원문에 함께 등장';
  candidates.push({word,memo,reason,score,crossMemo:source.id!==memo.id});
 }
 // Prefer another source only AFTER establishing a semantic relationship.
 candidates.sort((a,b)=>Number(b.crossMemo)-Number(a.crossMemo)||b.score-a.score||a.word.text.localeCompare(b.word.text,'ko')||a.word.id.localeCompare(b.word.id));
 const seen=new Set();return candidates.filter(c=>{const key=c.word.text+'\0'+c.word.memoId;if(seen.has(key))return false;seen.add(key);return true;}).slice(0,3);
}
