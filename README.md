# Interaction Archive

빌드가 필요 없는 정적 HTML/CSS/JavaScript 포트폴리오입니다.

- 저장소: https://github.com/jiyeonwon/Interaction_Archive
- 배포 브랜치: `main` (별도 `gh-pages` 브랜치 불필요)
- GitHub Pages 예정 주소: https://jiyeonwon.github.io/Interaction_Archive/
- 기존 Vercel: https://archive-website-six.vercel.app/

## GitHub Pages 설정

1. 저장소 → **Settings → Pages → Build and deployment → Source → GitHub Actions**를 선택합니다.
2. 저장소 → **Actions → Deploy GitHub Pages → Run workflow → main → Run workflow**로 첫 배포를 실행합니다. 이후 `main` push마다 자동 배포됩니다.
3. Actions에서 `build`, `deploy` 성공을 확인하고 배포 환경의 URL을 엽니다.
4. 조직 정책으로 Actions가 제한되면 **Settings → Actions → General → Actions permissions**에서 워크플로의 GitHub 공식 `actions/*` 사용을 허용해야 합니다. `github-pages` 환경에 승인 규칙이 있으면 **Settings → Environments → github-pages**에서 `main` 배포 허용/승인 조건도 확인합니다.

`.github/workflows/pages.yml`은 배포할 HTML/CSS/JS와 `assets/`만 `_site/`에 복사해 업로드합니다. `.env*`, `.vercel/`, Git 메타데이터와 문서는 게시하지 않습니다. 새 페이지나 리소스 폴더를 추가할 때는 복사 목록에도 반영하세요. Node 설치, npm 빌드, Vercel CLI, 배포용 개인 액세스 토큰이 필요하지 않습니다.

## 경로와 새로고침

CSS/JS/이미지와 iframe은 기존 상대 경로를 그대로 사용합니다. 따라서 저장소 base path `/Interaction_Archive/` 아래에서 동작하며, 루트 절대 경로나 `<base>` 태그를 추가하지 않습니다.

확인할 URL:

- `/Interaction_Archive/`
- `/Interaction_Archive/#counterweight`
- `/Interaction_Archive/#melting-ice`
- `/Interaction_Archive/counterweight.html`
- `/Interaction_Archive/melting-ice.html`

해시 기반 프로젝트 선택과 실제 `.html` 파일 접근을 사용하므로 서버 rewrite나 SPA 404 우회가 필요하지 않습니다. 각 URL 직접 열기와 새로고침, 두 프로젝트 선택, Back/Archive, 얼음 터치/드래그/길게 누르기와 Counterweight 인터랙션을 확인하세요.

Google Fonts, cdnjs의 p5/Matter.js, Counterweight의 고정 커밋 jsDelivr 스크립트는 기존 외부 의존성을 유지합니다. Counterweight는 localhost에서 상위 작업 폴더의 Dynamic Balance 스크립트를 사용하므로, 독립 배포 미리보기에서는 localhost 전용 분기와 실제 Pages 분기를 구분해야 합니다.

## Vercel 전환 마무리

추적 중인 Vercel 전용 설정 파일이나 빌드 명령은 없습니다. 기존 로컬 `.vercel/`와 `.env*`는 무시하며 게시하지 않습니다. 기존 사이트와 연결을 보존하기 위해 로컬 연결 정보도 아직 삭제하지 않습니다.

**GitHub Pages 실제 배포와 기능 확인이 끝난 뒤에만** Vercel 대시보드에서 `archive-website` 프로젝트의 Git 자동 배포 연결을 해제하거나 프로젝트 삭제를 검토하세요. 그 전에는 Vercel 서비스를 유지하세요. 필요 없어지면 로컬 `.vercel/`도 그때 정리할 수 있습니다. GitHub Actions 성공만으로 시각적/인터랙션 검증이 완료된 것은 아닙니다.
