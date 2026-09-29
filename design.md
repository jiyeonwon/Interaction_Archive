# Interaction Archive Design System

이 문서는 Figma `인터렉전용아카이브링크 / 메인 화면` 프레임(`111:31`)을 기준으로 한다. 앞으로 `Interaction_Archive`에 화면이나 프로젝트를 추가할 때 아래 값을 공통 규칙으로 사용한다.

## Reference frame

- 기준 프레임: `1920 × 1080px`
- 배경: `#FFFFFF`
- 기본 글자색: `#000000`
- 데스크톱 값은 1920px 화면에서 Figma 원본값과 정확히 일치한다.
- 1920px보다 좁은 데스크톱에서는 `viewport width / 1920` 비율로 균일하게 축소한다.
- 1920px보다 넓은 화면에서는 원본보다 확대하지 않는다.

## Typography scale

| 용도 | 서체 | 크기(1920 기준) | 굵기 | 행간 |
| --- | --- | ---: | ---: | ---: |
| 화면 제목 `Archive` | Anta | `73px` | `400` | `1.7` (`124px` text box) |
| 프로젝트명 | Inter | `24px` | `600` | `46px` |
| 하단 라벨 | Inter | `24px` | `400` | `normal` (`29px` text box) |

- 데스크톱 반응형 제목: `clamp(38px, 3.802083vw, 73px)`
- 데스크톱 반응형 프로젝트명/라벨: `clamp(12px, 1.25vw, 24px)`
- 텍스트는 검정(`#000000`)이며 임의의 자간, 그림자, 외곽선을 추가하지 않는다.

## Content grid and margins

- 좌측 컬럼 기준 폭: `380px` (`19.791667vw`), 최대 `380px`
- 우측 콘텐츠 영역: 남은 폭 전체
- 공통 left padding: `38px` (`1.979167vw`), 최대 `38px`
- `Archive`, 프로젝트 번호, 하단 라벨은 모두 공통 left padding을 시작선으로 사용한다.
- 제목 기준 위치: `x 38px / y 23px`
- 프로젝트 텍스트 기준 위치: `x 38px / y 233px`; 번호와 작업명은 하나의 flex 행으로 정렬한다.
- 하단 라벨 기준 위치: `x 38px / y 1002px`; 뷰포트 하단 기준 `49px`
- 요소별 위치도 1920px보다 좁은 데스크톱에서 동일한 폭 비율로 축소한다.

## Vertical spacing

- 제목 top: `23px`
- 프로젝트 목록 top: `233px`
- 하단 라벨 bottom: `49px`
- 기준 프레임에서 제목 text box는 `124px`, 프로젝트 text box는 `46px`, 하단 라벨 text box는 `29px`이다.

## Divider

- Figma 노드: `Line 1` (`111:45`)
- 위치: `x 380px`
- 원본 에셋 크기: `1111 × 1px`, 화면에서 `-90deg` 회전
- stroke: `1px`
- 색상: `#000000`
- 브라우저에서는 선을 확대하거나 border로 대체하지 않고 `assets/archive-divider.svg` 원본을 사용한다.
- 반응형에서도 선 두께는 항상 `1 CSS px`을 유지해 흐려지거나 두꺼워지지 않게 한다.

## Alignment rules

- left column grid는 `--archive-left-padding` 하나로 관리하며 개별 요소에 다른 left margin이나 padding을 만들지 않는다.
- `Archive`, 프로젝트 번호, 하단 라벨은 같은 좌측 시작선을 사용한다.
- 프로젝트명은 순서 번호와 제목을 하나의 목록 행으로 유지하며 `24px / 600 / 46px` 위계를 재사용한다.
- 새 프로젝트는 기존 목록 아래에 같은 left anchor, font, line-height를 사용해 추가한다.
- 하단 라벨은 좌측 컬럼 하단에 고정하고 컬럼 너비가 변해도 오른쪽으로 이동시키지 않는다.
- 모든 텍스트는 좌측 정렬하며 중앙 정렬이나 임의 offset을 추가하지 않는다.

## Project list states

- 프로젝트 항목의 인터랙션 영역은 텍스트에 한정하지 않고 좌측 컬럼 전체 가로 폭을 사용한다.
- 프로젝트 text box의 원본 행간은 `46px`이며, 인터랙션 row는 위아래 여유를 소폭 더해 데스크톱 기준 `52px` 높이를 사용한다. 텍스트는 flex 중앙 정렬을 유지한다.
- 모바일 프로젝트 row 높이는 `34px`을 사용한다.
- Default, Hover, Focus 상태는 모두 같은 row 높이와 padding을 사용하며 상태 전환 때문에 컬럼 폭 또는 divider 위치가 변하지 않아야 한다.
- Default: 배경 `#FFFFFF`, 텍스트 `#000000`.
- Hover: 배경 `#000000`, 텍스트 `#FFFFFF`.
- Keyboard focus: `:focus-visible`에서 Hover와 동일한 검은 배경과 흰 텍스트를 사용한다.
- Active: 선택된 프로젝트는 Hover/Focus와 동일한 검은 배경과 흰 텍스트를 유지한다.
- 배경색과 글자색은 `0.18s ease`로 전환한다.
- 클릭 가능한 항목은 `button` 또는 `a` 자체가 전체 폭을 차지해야 하며, 자식 텍스트에만 hover를 적용하지 않는다.
- 프로젝트가 추가되면 모든 행에 동일한 상태 규칙을 재사용한다.

## Project content area

- 콘텐츠 영역은 divider 바로 오른쪽에서 시작하며 좌측 컬럼이나 divider를 침범하지 않는다.
- 클릭 전에는 콘텐츠 영역을 흰색 빈 화면으로 유지하고 iframe은 `hidden` 상태로 둔다.
- 프로젝트를 클릭하면 현재 페이지와 좌측 컬럼을 유지한 채 오른쪽 콘텐츠 영역 안에서 iframe을 표시한다.
- Counterweight는 원본 `Dynamic Balance`의 `900 × 700` 비율을 유지한다.
- iframe은 최대 `900px` 폭으로 중앙 배치하고, 낮은 데스크톱 화면에서는 가용 높이에 맞춰 같은 비율로 축소한다.
- 로컬에서는 `../소과제 Dynamic Balance/index.html`을 직접 사용한다.
- 배포에서는 `counterweight.html` 실행 껍데기에서 기존 `Archive_Website` 저장소의 커밋 고정 `sketch.js`를 CDN으로 직접 불러온다. 인터랙션 로직 파일은 `Interaction_Archive` 안에 복제하지 않는다.
- 프로젝트가 선택되면 버튼에 `is-active`와 `aria-expanded="true"`를 적용한다.

## Project detail navigation

- `Archive` 제목은 공통 home navigation이다. 클릭하면 새로고침 없이 선택된 프로젝트와 active 상태를 닫고, 콘텐츠 영역이 비어 있는 첫 화면으로 돌아간다.
- home navigation은 제목의 기존 위치, 크기, 공통 left grid를 그대로 유지한다. 별도 버튼 배경이나 padding은 사용하지 않고 `cursor: pointer`만 적용한다.
- home hover는 `0.18s ease`로 opacity를 `0.68`까지 낮추고, keyboard focus는 `1px` 검은 outline과 `4px` offset으로 표시한다.
- 상세 화면에는 오른쪽 콘텐츠 영역 상단에 `← Back`을 공통 navigation으로 표시한다.
- 데스크톱 상세 stage는 `Back rail / Project content / Balance rail`의 3열 grid를 사용한다. 좌우 rail은 동일한 `clamp(88px, 6.25vw, 120px)` 폭으로 유지해 프로젝트 콘텐츠의 기존 중앙축을 보존한다.
- `← Back`은 첫 번째 rail, 프로젝트 iframe은 두 번째 column에 놓는다. 프로젝트 제목과 설명의 내부 x축 정렬은 iframe 안의 기존 기준을 유지하며 navigation 때문에 별도 offset을 추가하지 않는다.
- Back rail과 project content column은 서로 겹치지 않는 독립 영역이다. 같은 너비의 오른쪽 balance rail을 함께 두어 화면이 넓을 때 iframe의 기존 중앙 정렬이 밀리지 않게 한다.
- 데스크톱 back 글자 크기는 최대 `16px`, 굵기는 `400`, 행간은 `1.4`이다. stage의 기본 `16px` padding 안에서 상단 및 좌측 간격을 반응형 margin으로 보정한다.
- `700px` 이하에서는 navigation과 콘텐츠를 `Back row / Project content row`의 2행 grid로 전환하고 두 행 사이에 `16px` gap을 둔다. 모바일 back 글자 크기는 `14px`이다.
- back hover는 `0.18s ease`로 opacity를 `0.62`까지 낮추고, keyboard focus는 `1px` 검은 outline과 `3px` offset으로 표시한다.
- `← Back`을 클릭하면 iframe을 닫고 실행 소스를 해제한 뒤 프로젝트 선택 전 화면으로 돌아간다. 브라우저의 기본 뒤로가기에 의존하지 않는다.
- 프로젝트 상세 navigation은 iframe보다 높은 레이어에 놓되 콘텐츠의 중앙 정렬, 크기, 비율을 변경하거나 divider를 침범하지 않는다.

## Responsive rules

- `701px` 이상: Figma 1920px 기준값을 viewport 폭에 비례해 축소하고 원본 크기를 최대값으로 제한한다.
- `700px` 이하: 좌측 컬럼이 화면 전체 폭을 사용하며 우측의 빈 stage는 숨긴다.
- 모바일 제목: `clamp(36px, 12vw, 48px)`
- 모바일 프로젝트명: `16px / 600 / 1.7`
- 모바일 하단 라벨: `14px / 400`, 좌우 여백 `24px`, 하단 여백 `max(32px, safe-area-inset-bottom)`
- 모바일에서는 가독성을 위해 데스크톱의 단순 축소값보다 작은 글자를 사용하지 않는다.
- 새 화면도 이 breakpoint와 공통 좌우 여백을 재사용하며 프로젝트별 임의 확대값을 만들지 않는다.
