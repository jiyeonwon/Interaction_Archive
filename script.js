const archiveScreen = document.querySelector(".archive-screen");
const projectButton = document.querySelector(".project-link");
const projectFrame = document.querySelector(".project-frame");

const isLocalPreview = ["localhost", "127.0.0.1"].includes(window.location.hostname);

function openCounterweight({ updateHash = true } = {}) {
  if (!projectFrame.src) {
    projectFrame.src = isLocalPreview
      ? projectFrame.dataset.localSrc
      : projectFrame.dataset.src;
  }

  projectFrame.hidden = false;
  projectButton.classList.add("is-active");
  projectButton.setAttribute("aria-expanded", "true");
  archiveScreen.classList.add("has-active-project");
  document.body.classList.add("project-open");

  if (updateHash && window.location.hash !== "#counterweight") {
    history.replaceState(null, "", "#counterweight");
  }
}

projectButton.addEventListener("click", () => openCounterweight());

if (window.location.hash === "#counterweight") {
  openCounterweight({ updateHash: false });
}
