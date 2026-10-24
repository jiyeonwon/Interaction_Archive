// A one-time demonstration library, never substituted for later user edits/deletions.
export const SEED_VERSION = 2;
const entries = [
 ['2026-10-22T18:42:00+09:00','창밖의 물방울','버스 창문에 맺힌 물방울 때문에 간판 글자가 두 겹으로 보였다. 왜곡 때문에 오히려 오래 바라보게 됐다. 화면이 항상 또렷해야만 하는 건 아닐지도.'],
 ['2026-10-20T23:16:00+09:00','접힌 영수증','영수증 한 장이 책에서 떨어졌다. 메뉴 이름을 읽자 누구와 마주 앉았는지 기억이 났다. 금액보다 그날의 대화가 먼저 떠오른다는 게 신기하다.'],
 ['2026-10-17T09:08:00+09:00','노선도에서 길 찾기','지하철 안에서는 실제 방향보다 노선도의 색을 믿게 된다. 지도 위에서 생략된 것들은 무엇일까?'],
 ['2026-10-13T01:24:00+09:00','흐릿한 사진 한 장','사진 속 얼굴은 흐릿한데 그때의 온도는 이상하게 선명하다. 시간이 지나면서 잃는 정보와 새로 생기는 정보가 따로 있는 것 같다.'],
 ['2026-10-09T14:37:00+09:00','엘리베이터의 거울','거울 앞에서 혼자일 때와 누가 옆에 있을 때 표정이 달라지는 건, 얼굴보다 남에게 보이는 모습을 확인하고 있어서일까?'],
 ['2026-10-05T16:52:00+09:00','작품보다 긴 설명문','전시에서 작품을 지나치고 설명문 앞에 오래 서 있는 사람을 봤다. 관찰하는 방식에도 각자의 입구가 있다. 나에게 맞는 입구를 골라 주는 전시는 어떨까.'],
 ['2026-10-01T22:03:00+09:00','작업을 시작하기 전에','시작 버튼 하나를 누르는 데 한 시간이 걸렸다. 파일 이름만 고치는 행동을 반복했다. 완성보다 첫 행동을 작게 만드는 게 필요하다.'],
 ['2026-09-27T08:45:00+09:00','늘 같은 자리에 앉는다','습관처럼 도서관 왼쪽 자리에 앉았다. 오늘은 자리가 없어 반대쪽으로 갔는데, 창문 하나의 변화로 아침 전체가 달라 보였다.'],
 ['2026-09-22T20:11:00+09:00','가까운데 먼 사람','같은 동네에 살아도 만나지 않는 친구가 있다. 관계에서 말하는 거리와 지도에서 재는 거리는 전혀 다른 단위인 것 같다.'],
 ['2026-09-18T13:32:00+09:00','책에 남은 자국','빌린 책 모서리에 손가락 흔적 같은 얼룩이 있었다. 누가 어느 문장에서 오래 멈췄을까. 사라지지 않은 흔적으로 앞선 독자를 상상했다.'],
 ['2026-09-14T19:26:00+09:00','횡단보도의 리듬','횡단보도 신호음과 발걸음 소리가 잠깐 같은 리듬이 됐다.'],
 ['2026-09-10T17:06:00+09:00','느리게 움직이는 빛','작업실 벽의 빛이 한 시간 사이에 옆으로 이동했다. 그림자 끝에 표시를 해 두면 시계 없이도 오후를 읽을 수 있겠다.'],
 ['2026-09-06T10:54:00+09:00','화분을 돌려놓은 날','식물 잎이 창문 쪽으로 기울어 있었다. 매일 볼 때는 몰랐던 성장을 사진을 겹치니 알게 됐다. 변화가 느린 것들을 보여 주는 방식에 관심이 간다.'],
 ['2026-09-02T15:19:00+09:00','그늘을 따라 걷기','도시를 걷다가 최단 거리 대신 그늘이 긴 쪽을 골랐다. 지도에는 보이지 않는 편안함의 경로가 있다. 여름의 보행 지도에 나무를 먼저 그려 보고 싶다.'],
 ['2026-08-29T21:43:00+09:00','같은 모양, 다른 촉감','촉감이 달라지면 같은 물건도 다른 감정으로 읽힌다. 거친 재료와 매끈한 재료를 눈을 감고 번갈아 만져 봤다. 손끝으로 고르는 화면이 가능할까?'],
 ['2026-08-25T12:07:00+09:00','종이의 접힌 순서','종이 지도를 접으면서 자주 가는 동네만 바깥으로 나오게 했다. 디지털 지도에도 내가 자주 보는 부분이 접힌 자국처럼 남으면 좋겠다.'],
 ['2026-08-20T18:58:00+09:00','알림이 없는 기다림','기다림 중에 가장 자주 하는 일은 새로고침이다. 알림이 아직 오지 않았다는 사실을 확인하려고 계속 화면을 열었다. 남은 시간을 숫자 말고 다른 방식으로 보여 줄 수 있을까.'],
 ['2026-08-14T00:39:00+09:00','말로 적기 어려운 기분','감정이 복잡할 때는 사진의 채도를 낮추고 싶어진다. 흐림은 지우는 것과 다르다. 감정을 정확한 이름 대신 이미지의 선명도로 남겨 봐도 좋겠다.'],
 ['2026-08-08T16:23:00+09:00','잠깐 머무를 자리','공간 한가운데 의자를 두니 사람들이 가장자리를 따라 걸었다. 가구 하나가 행동을 바꾼다. 동선을 설명하는 글보다 움직일 수 있는 의자가 더 직접적인 안내일 수도.'],
 ['2026-08-01T23:51:00+09:00','대답하지 않은 질문들','기록을 다시 읽으니 대답보다 질문이 많이 남아 있다. 당장 해결하지 못한 질문도 버리지 말자. 다른 날의 메모가 답의 시작이 될 수 있으니까.']
];
const hints=[['물방울','왜곡'],['영수증','기억'],['지하철','지도'],['사진','시간'],['거울','표정'],['설명문','관찰'],['시작','반복'],['습관','변화'],['관계','거리'],['책','흔적'],['소리','리듬'],['빛','그림자'],['식물','성장'],['도시','그늘'],['촉감','재료'],['종이','디지털'],['기다림','알림'],['감정','흐림'],['공간','행동'],['기록','질문']];
const keptIndexes=[0,1,2,3,4,8,11,17,18,19];
export const DEFAULT_ACTIVE_IDS=['scatter-library-01','scatter-library-04','scatter-library-12','scatter-library-18'];
export function createSeedMemos(){return keptIndexes.map(i=>{const [createdAt,title,text]=entries[i];return {id:`scatter-library-${String(i+1).padStart(2,'0')}`,title,text,createdAt,keywordHints:hints[i],origin:'starter-library'};});}
export function initializeLibrary(state){
 if(state.libraryVersion>=SEED_VERSION)return state;
 const seeds=createSeedMemos(),seedIds=new Set(seeds.map(m=>m.id));
 const oldSeed=id=>/^scatter-library-\d{2}$/.test(id);
 // Version 1 contained twenty sample records. Remove only those generated records;
 // user records and archived source snapshots remain untouched.
 let memos=state.memos.filter(m=>!oldSeed(m.id)||seedIds.has(m.id));
 if(state.libraryVersion===0){const existing=new Set(memos.map(m=>m.id));memos=[...memos,...seeds.filter(m=>!existing.has(m.id))];}
 const available=new Set(memos.map(m=>m.id));
 const hadExpandedSampleSelection=state.active.filter(oldSeed).length>4;
 const selected=state.libraryVersion===0||hadExpandedSampleSelection?DEFAULT_ACTIVE_IDS:state.active.filter(id=>available.has(id));
 const active=[...new Set([...selected,...DEFAULT_ACTIVE_IDS.filter(id=>available.has(id))])].slice(0,4);
 const sentence=state.sentence.filter(w=>active.includes(w.memoId));
 return {...state,memos,active,sentence,ideaDraft:null,libraryVersion:SEED_VERSION};
}
