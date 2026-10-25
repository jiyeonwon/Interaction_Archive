const archiveScreen = document.querySelector(".archive-screen");
const archiveHome = document.querySelector(".archive-home");
const projectButtons = [...document.querySelectorAll(".project-link")];
const projectFrame = document.querySelector(".project-frame");
const projectView = document.querySelector(".archive-stage");

const projects = {
  counterweight: {
    title: "Counterweight",
    src: "./counterweight.html"
  },
  "melting-ice": {
    title: "Meting Ice",
    src: "./melting-ice.html",
    category: "INTERACTIVE DESIGN",
    type: "PERSONAL PROJECT",
    year: "2026",
    summary: "서로 다른 터치 동작을 통해 얼음이 녹고 사라지는 과정을 탐구한 인터랙티브 웹.",
    description: "이 웹에서는 탭, 문지르기, 길게 누르기처럼 서로 다른 터치 방식으로 얼음을 녹일 수 있다. 한 번 탭하면 얼음이 녹기 시작하고, 표면을 반복해서 문지르면 손가락이 지나간 궤적을 따라 얼음이 녹으며 작은 입자들이 주변으로 흩어진다. 얼음의 중심을 길게 누르면 온도가 상승하고, 일정 온도에 도달한 뒤부터 천천히 녹아 사라진다."
  },
  scatter: {
    title: "SCATTER!",
    src: "./scatter/index.html?v=7#home"
  }
};

let activeProjectId = null;

function openProject(projectId, { updateHash = true } = {}) {
  const project = projects[projectId];
  const projectButton = projectButtons.find(
    (button) => button.dataset.project === projectId
  );

  if (!project || !projectButton) return;

  if (activeProjectId !== projectId) {
    projectFrame.removeAttribute("src");
    projectFrame.src = project.src;
  }

  projectFrame.hidden = false;
  projectFrame.title = `${project.title} interactive project`;
  projectView.setAttribute("aria-label", `${project.title} project`);
  projectButtons.forEach((button) => {
    const isActive = button === projectButton;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-expanded", String(isActive));
  });
  archiveScreen.classList.add("has-active-project");
  archiveScreen.classList.toggle("has-scatter-project", projectId === "scatter");
  document.body.classList.add("project-open");
  activeProjectId = projectId;

  if (updateHash && window.location.hash !== `#${projectId}`) {
    history.pushState(null, "", `#${projectId}`);
  }
}

function closeProject({ focusTarget, updateHash = true } = {}) {
  projectFrame.hidden = true;
  projectFrame.removeAttribute("src");
  projectFrame.title = "Interactive project";
  projectView.setAttribute("aria-label", "Interactive project");
  projectButtons.forEach((button) => {
    button.classList.remove("is-active");
    button.setAttribute("aria-expanded", "false");
  });
  archiveScreen.classList.remove("has-active-project");
  archiveScreen.classList.remove("has-scatter-project");
  document.body.classList.remove("project-open");
  activeProjectId = null;

  if (updateHash && window.location.hash) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }

  window.scrollTo({ top: 0, behavior: "auto" });
  focusTarget?.focus();
}

projectButtons.forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.project));
});

archiveHome.addEventListener("click", () => closeProject({ focusTarget: archiveHome }));

window.addEventListener("hashchange", () => {
  const projectId = window.location.hash.slice(1);

  if (projects[projectId]) {
    openProject(projectId, { updateHash: false });
  } else {
    closeProject({ updateHash: false });
  }
});

const initialProjectId = window.location.hash.slice(1);

if (projects[initialProjectId]) {
  openProject(initialProjectId, { updateHash: false });
}
