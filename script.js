const archiveScreen = document.querySelector(".archive-screen");
const archiveHome = document.querySelector(".archive-home");
const projectButton = document.querySelector(".project-link");
const projectFrame = document.querySelector(".project-frame");
const backButton = document.querySelector(".detail-back");

const isLocalPreview = ["localhost", "127.0.0.1"].includes(window.location.hostname);
function prepareProjectFrame() {
  const frameWindow = projectFrame.contentWindow;
  const frameDocument = projectFrame.contentDocument;

  if (!frameWindow || !frameDocument) return;

  if (!frameDocument.querySelector(".archive-project-header-mask")) {
    const headerMask = frameDocument.createElement("div");
    headerMask.className = "archive-project-header-mask";
    headerMask.setAttribute("aria-hidden", "true");
    frameDocument.body.append(headerMask);
  }

  [0, 50, 150, 300, 600].forEach((delay) => {
    window.setTimeout(() => {
      if (typeof frameWindow.text === "function") {
        frameWindow.text = () => {};
      }
    }, delay);
  });

  if (frameDocument.querySelector("#archive-embed-reset")) return;

  const frameStyle = frameDocument.createElement("style");
  frameStyle.id = "archive-embed-reset";
  frameStyle.textContent = `
    html, body, main, canvas {
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
    }

    html, body, main {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      background: rgb(242, 242, 242) !important;
    }

    canvas {
      display: block !important;
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      background: rgb(242, 242, 242) !important;
    }

    .archive-project-header-mask {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      width: 48%;
      height: 14%;
      border: 0;
      outline: 0;
      background: rgb(242, 242, 242);
      pointer-events: none;
    }
  `;
  frameDocument.head.append(frameStyle);
}

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
projectFrame.addEventListener("load", prepareProjectFrame);
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
