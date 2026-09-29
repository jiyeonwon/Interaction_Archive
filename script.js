const archiveScreen = document.querySelector(".archive-screen");
const archiveHome = document.querySelector(".archive-home");
const projectButton = document.querySelector(".project-link");
const projectFrame = document.querySelector(".project-frame");
const backButton = document.querySelector(".detail-back");

const isLocalPreview = ["localhost", "127.0.0.1"].includes(window.location.hostname);

function openCounterweight({ updateHash = true } = {}) {
  if (!projectFrame.hasAttribute("src")) {
    projectFrame.src = isLocalPreview
      ? projectFrame.dataset.localSrc
      : projectFrame.dataset.src;
  }

  projectFrame.hidden = false;
  backButton.hidden = false;
  projectButton.classList.add("is-active");
  projectButton.setAttribute("aria-expanded", "true");
  archiveScreen.classList.add("has-active-project");
  document.body.classList.add("project-open");

  if (updateHash && window.location.hash !== "#counterweight") {
    history.replaceState(null, "", "#counterweight");
  }
}

function closeProject({ focusTarget, updateHash = true } = {}) {
  projectFrame.hidden = true;
  projectFrame.removeAttribute("src");
  backButton.hidden = true;
  projectButton.classList.remove("is-active");
  projectButton.setAttribute("aria-expanded", "false");
  archiveScreen.classList.remove("has-active-project");
  document.body.classList.remove("project-open");

  if (updateHash && window.location.hash) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }

  window.scrollTo({ top: 0, behavior: "auto" });
  focusTarget?.focus();
}

projectButton.addEventListener("click", () => openCounterweight());
backButton.addEventListener("click", () => closeProject({ focusTarget: projectButton }));
archiveHome.addEventListener("click", () => closeProject({ focusTarget: archiveHome }));

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#counterweight") {
    openCounterweight({ updateHash: false });
  } else {
    closeProject({ updateHash: false });
  }
});

if (window.location.hash === "#counterweight") {
  openCounterweight({ updateHash: false });
}
