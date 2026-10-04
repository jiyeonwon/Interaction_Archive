const ice =
  document.querySelector("#ice");

const iceWrap =
  document.querySelector("#iceWrap");

const core =
  document.querySelector("#core");

const coreRing =
  document.querySelector("#coreRing");

const waterMain =
  document.querySelector("#waterMain");

const waterLeft =
  document.querySelector("#waterLeft");

const waterRight =
  document.querySelector("#waterRight");

const waterBack =
  document.querySelector("#waterBack");

const instruction =
  document.querySelector("#instruction");

const temperatureDisplay =
  document.querySelector("#temperature");

const touchRing =
  document.querySelector("#touchRing");

const resetButton =
  document.querySelector("#resetButton");

const levelButtons =
  document.querySelectorAll(".level-button");


let level = 1;

let pointerDown = false;

let startX = 0;
let startY = 0;

let lastX = 0;
let lastY = 0;

let totalRubDistance = 0;

let melt = 0;
let targetMelt = 0;

let temperature = 18;

let heatingCore = false;

let tapStarted = false;

let deleted = false;

let lastFrame =
  performance.now();

let lastDropTime = 0;

let lastRubTrailTime = 0;

let lastRubParticleTime = 0;


/* =========================
   LEVEL
========================= */

levelButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      levelButtons.forEach(
        (btn) =>
          btn.classList.remove("active")
      );

      button.classList.add("active");

      level =
        Number(
          button.dataset.level
        );

      resetIce();
      updateLevelUI();

    }
  );

});


function updateLevelUI() {

  core.style.display =
    "none";

  coreRing.style.display =
    "none";

  temperatureDisplay.style.opacity =
    "0";


  if (level === 1) {

    instruction.textContent =
      "TAP THE ICE!";

  }


  if (level === 2) {

    instruction.textContent =
      "RUB THE SURFACE!";

  }


  if (level === 3) {

    instruction.textContent =
      "PRESS & HOLD THE CORE!";

    core.style.display =
      "block";

    coreRing.style.display =
      "block";

  }

}


/* =========================
   POINTER DOWN
========================= */

ice.addEventListener(
  "pointerdown",
  (event) => {

    if (deleted)
      return;


    event.preventDefault();


    pointerDown = true;


    ice.setPointerCapture(
      event.pointerId
    );


    startX =
      event.clientX;

    startY =
      event.clientY;


    lastX =
      event.clientX;

    lastY =
      event.clientY;


    showTouch(
      event.clientX,
      event.clientY
    );


    /*
      RUB에서는 누른 지점부터
      첫 녹은 흔적 생성
    */

    if (level === 2) {

      createMeltTrail(
        event.clientX,
        event.clientY
      );

    }


    if (level === 3) {

      heatingCore =
        isInsideCore(event);


      temperatureDisplay.style.left =
        `${event.clientX}px`;

      temperatureDisplay.style.top =
        `${event.clientY}px`;

      temperatureDisplay.style.opacity =
        "1";

    }

  }
);


/* =========================
   POINTER MOVE
========================= */

ice.addEventListener(
  "pointermove",
  (event) => {

    if (
      !pointerDown ||
      deleted
    )
      return;


    event.preventDefault();


    showTouch(
      event.clientX,
      event.clientY
    );


    /* =====================
       LEVEL 2
       RUB
    ===================== */

    if (level === 2) {

      const dx =
        event.clientX -
        lastX;

      const dy =
        event.clientY -
        lastY;


      const distance =
        Math.sqrt(
          dx * dx +
          dy * dy
        );


      totalRubDistance +=
        distance;


      /*
        문지른 양에 따라
        전체적으로도 조금씩 녹음
      */

      targetMelt =
        Math.min(
          1,
          totalRubDistance /
          1200
        );


      const now =
        performance.now();


      /*
        손가락이 지나간 모양 그대로
        녹은 흔적 생성
      */

      if (
        distance > 2 &&
        now -
        lastRubTrailTime >
        24
      ) {

        createMeltTrail(
          event.clientX,
          event.clientY
        );

        lastRubTrailTime =
          now;

      }


      /*
        옆으로 튀는 입자
      */

      if (
        distance > 3 &&
        now -
        lastRubParticleTime >
        48
      ) {

        createRubParticles(
          event.clientX,
          event.clientY,
          dx,
          dy
        );

        lastRubParticleTime =
          now;

      }

    }


    /* =====================
       LEVEL 3
    ===================== */

    if (level === 3) {

      temperatureDisplay.style.left =
        `${event.clientX}px`;

      temperatureDisplay.style.top =
        `${event.clientY}px`;


      heatingCore =
        isInsideCore(event);

    }


    lastX =
      event.clientX;

    lastY =
      event.clientY;

  }
);


/* =========================
   POINTER UP
========================= */

ice.addEventListener(
  "pointerup",
  (event) => {

    if (!pointerDown)
      return;


    event.preventDefault();


    if (level === 1) {

      const dx =
        event.clientX -
        startX;

      const dy =
        event.clientY -
        startY;


      const movement =
        Math.sqrt(
          dx * dx +
          dy * dy
        );


      if (
        movement < 14 &&
        !tapStarted
      ) {

        tapStarted =
          true;


        targetMelt =
          1;


        instruction.textContent =
          "MELTING!";


        createTapBurst(
          event.clientX,
          event.clientY
        );

      }

    }


    pointerDown =
      false;

    heatingCore =
      false;


    touchRing.style.opacity =
      "0";


    if (level === 3) {

      temperatureDisplay.style.opacity =
        "0";

    }

  }
);


/* =========================
   CANCEL
========================= */

ice.addEventListener(
  "pointercancel",
  () => {

    pointerDown =
      false;

    heatingCore =
      false;

    touchRing.style.opacity =
      "0";

    temperatureDisplay.style.opacity =
      "0";

  }
);


/* =========================
   RUB TRAIL
========================= */

function createMeltTrail(
  clientX,
  clientY
) {

  /*
    브라우저 좌표를
    얼음 내부 좌표로 변환
  */

  const rect =
    ice.getBoundingClientRect();


  const localX =
    clientX -
    rect.left;


  const localY =
    clientY -
    rect.top;


  /*
    손가락이 얼음 밖에 있으면
    생성하지 않음
  */

  if (
    localX < 0 ||
    localY < 0 ||
    localX > rect.width ||
    localY > rect.height
  ) {

    return;

  }


  const hole =
    document.createElement(
      "div"
    );


  hole.className =
    "melt-hole";


  /*
    문지를 때마다 크기를 약간 달리해서
    기계적인 원 반복을 줄임
  */

  const size =
    28 +
    Math.random() *
    24;


  hole.style.width =
    `${size}px`;

  hole.style.height =
    `${size * (
      0.7 +
      Math.random() * 0.45
    )}px`;


  hole.style.left =
    `${localX}px`;

  hole.style.top =
    `${localY}px`;


  hole.style.transform =
    `
      translate(-50%, -50%)
      rotate(
        ${
          -25 +
          Math.random() * 50
        }deg
      )
    `;


  /*
    흔적이 남아서
    실제 문지른 궤적이 보임
  */

  ice.appendChild(
    hole
  );


  /*
    너무 많은 DOM 생성 방지
  */

  const holes =
    ice.querySelectorAll(
      ".melt-hole"
    );


  if (
    holes.length >
    80
  ) {

    holes[0].remove();

  }

}


/* =========================
   CORE CHECK
========================= */

function isInsideCore(event) {

  const rect =
    ice.getBoundingClientRect();


  const centerX =
    rect.left +
    rect.width / 2;


  const centerY =
    rect.top +
    rect.height / 2;


  const dx =
    event.clientX -
    centerX;


  const dy =
    event.clientY -
    centerY;


  const distance =
    Math.sqrt(
      dx * dx +
      dy * dy
    );


  return distance < 50;

}


/* =========================
   TOUCH
========================= */

function showTouch(x, y) {

  touchRing.style.left =
    `${x}px`;

  touchRing.style.top =
    `${y}px`;

  touchRing.style.opacity =
    "1";

}


/* =========================
   TAP BURST
========================= */

function createTapBurst(x, y) {

  for (
    let i = 0;
    i < 14;
    i++
  ) {

    const angle =
      Math.random() *
      Math.PI *
      2;


    const speed =
      30 +
      Math.random() *
      70;


    const dx =
      Math.cos(angle) *
      speed;


    const dy =
      Math.sin(angle) *
      speed;


    createParticle(
      x,
      y,
      dx,
      dy,
      500 +
      Math.random() *
      250
    );

  }

}


/* =========================
   RUB PARTICLES
========================= */

function createRubParticles(
  x,
  y,
  moveX,
  moveY
) {

  for (
    let i = 0;
    i < 3;
    i++
  ) {

    const side =
      Math.random() <
      0.5
        ? -1
        : 1;


    const length =
      Math.sqrt(
        moveX * moveX +
        moveY * moveY
      ) || 1;


    const nx =
      moveX /
      length;


    const ny =
      moveY /
      length;


    /*
      이동방향과 수직으로 튀게 함
    */

    const sideX =
      -ny *
      side;


    const sideY =
      nx *
      side;


    const push =
      24 +
      Math.random() *
      42;


    const dx =
      sideX *
      push +
      nx *
      Math.random() *
      15;


    const dy =
      sideY *
      push +
      ny *
      Math.random() *
      15;


    createParticle(
      x,
      y,
      dx,
      dy,
      400 +
      Math.random() *
      220
    );

  }

}


/* =========================
   PARTICLE
========================= */

function createParticle(
  x,
  y,
  dx,
  dy,
  duration
) {

  const particle =
    document.createElement(
      "div"
    );


  particle.className =
    "ice-particle";


  const size =
    5 +
    Math.random() *
    7;


  particle.style.width =
    `${size}px`;

  particle.style.height =
    `${size}px`;


  particle.style.left =
    `${x}px`;

  particle.style.top =
    `${y}px`;


  document.body.appendChild(
    particle
  );


  const rotate =
    Math.random() *
    160 -
    80;


  const animation =
    particle.animate(

      [

        {
          transform:
            `
              translate(
                -50%,
                -50%
              )

              scale(1)
            `,

          opacity:
            0.95
        },


        {
          transform:
            `
              translate(
                calc(-50% + ${dx}px),
                calc(-50% + ${dy}px)
              )

              scale(0.35)
              rotate(${rotate}deg)
            `,

          opacity:
            0
        }

      ],

      {

        duration,

        easing:
          "cubic-bezier(.2,.7,.3,1)",

        fill:
          "forwards"

      }

    );


  animation.onfinish =
    () => {

      particle.remove();

    };

}


/* =========================
   MAIN LOOP
========================= */

function animate(time) {

  const delta =
    Math.min(
      (
        time -
        lastFrame
      ) /
      1000,

      0.05
    );


  lastFrame =
    time;


  /* =====================
     LEVEL 1
  ===================== */

  if (
    level === 1 &&
    tapStarted &&
    !deleted
  ) {

    melt +=
      delta *
      0.50;


    melt =
      Math.min(
        melt,
        1
      );


    updateIce();


    if (
      melt >= 1
    ) {

      finishMelt();

    }

  }


  /* =====================
     LEVEL 2

     문지른 궤적이 먼저 보이고
     전체 얼음도 아주 천천히 무너짐
  ===================== */

  if (
    level === 2 &&
    !deleted
  ) {

    melt +=
      (
        targetMelt -
        melt
      ) *
      Math.min(
        1,
        delta * 5
      );


    updateIce();


    if (
      melt >=
      0.99
    ) {

      melt = 1;

      finishMelt();

    }

  }


  /* =====================
     LEVEL 3
  ===================== */

  if (
    level === 3 &&
    !deleted
  ) {

    if (
      pointerDown &&
      heatingCore
    ) {

      temperature +=
        delta *
        20;

    }

    else {

      temperature -=
        delta *
        9;

    }


    temperature =
      Math.max(
        18,
        Math.min(
          temperature,
          78
        )
      );


    temperatureDisplay.textContent =
      `${Math.round(
        temperature
      )}°C`;


    if (
      temperature >
      35
    ) {

      const heat =
        (
          temperature -
          35
        ) /
        43;


      targetMelt +=
        heat *
        delta *
        0.38;


      targetMelt =
        Math.min(
          targetMelt,
          1
        );

    }


    melt +=
      (
        targetMelt -
        melt
      ) *
      Math.min(
        1,
        delta * 6
      );


    updateIce();


    if (
      melt >=
      0.99
    ) {

      melt = 1;

      finishMelt();

    }

  }


  requestAnimationFrame(
    animate
  );

}


requestAnimationFrame(
  animate
);


/* =========================
   UPDATE ICE
========================= */

function updateIce() {

  melt =
    Math.max(
      0,
      Math.min(
        melt,
        1
      )
    );


  /*
    RUB는 문지른 흔적 자체가
    중심이므로 전체 변형을
    조금 약하게 적용
  */

  const strength =
    level === 2
      ? 0.72
      : 1;


  const scaleY =
    1 -
    melt *
    0.68 *
    strength;


  const scaleX =
    1 +
    melt *
    0.22 *
    strength;


  const moveY =
    melt *
    64 *
    strength;


  ice.style.transform =
    `
      translateY(
        ${moveY}px
      )

      scaleX(
        ${scaleX}
      )

      scaleY(
        ${scaleY}
      )
    `;


  ice.style.filter =
    `
      blur(
        ${melt * 5 * strength}px
      )

      saturate(
        ${1 - melt * 0.22}
      )
    `;


  ice.style.opacity =
    1 -
    Math.pow(
      melt,
      2.3
    ) *
    0.98;


  /* =====================
     WATER
  ===================== */

  waterMain.style.opacity =
    Math.min(
      1,
      melt *
      1.85
    );


  waterMain.style.transform =
    `
      translateX(-50%)

      scaleX(
        ${0.08 + melt * 3.4}
      )

      scaleY(
        ${0.35 + melt * 0.65}
      )
    `;


  waterLeft.style.opacity =
    Math.max(
      0,
      (
        melt -
        0.13
      ) *
      1.7
    );


  waterRight.style.opacity =
    Math.max(
      0,
      (
        melt -
        0.20
      ) *
      1.7
    );


  waterBack.style.opacity =
    Math.max(
      0,
      (
        melt -
        0.32
      ) *
      1.8
    );


  createDropletMaybe();

}


/* =========================
   DROPLET
========================= */

function createDropletMaybe() {

  if (
    melt <
    0.15
  )
    return;


  const now =
    performance.now();


  if (
    now -
    lastDropTime <
    180
  )
    return;


  if (
    Math.random() >
    melt
  )
    return;


  lastDropTime =
    now;


  createDroplet();

}


function createDroplet() {

  const drop =
    document.createElement(
      "div"
    );


  drop.className =
    "droplet";


  const iceRect =
    ice.getBoundingClientRect();


  const wrapRect =
    iceWrap.getBoundingClientRect();


  const x =
    iceRect.left -
    wrapRect.left +
    iceRect.width *
    (
      0.25 +
      Math.random() *
      0.5
    );


  const y =
    iceRect.bottom -
    wrapRect.top -
    7;


  drop.style.left =
    `${x}px`;


  drop.style.top =
    `${y}px`;


  iceWrap.appendChild(
    drop
  );


  const fall =
    45 +
    Math.random() *
    45;


  const duration =
    430 +
    Math.random() *
    280;


  const animation =
    drop.animate(

      [

        {
          transform:
            "translateY(0)",

          opacity:
            0.92
        },


        {
          transform:
            `translateY(${fall}px)`,

          opacity:
            0
        }

      ],

      {

        duration,

        easing:
          "ease-in",

        fill:
          "forwards"

      }

    );


  animation.onfinish =
    () => {

      drop.remove();

    };

}


/* =========================
   FINISH
========================= */

function finishMelt() {

  if (deleted)
    return;


  deleted =
    true;


  melt = 1;
  targetMelt = 1;


  updateIce();


  instruction.textContent =
    "MELTED!";


  temperatureDisplay.style.opacity =
    "0";


  touchRing.style.opacity =
    "0";


  ice.style.pointerEvents =
    "none";

}


/* =========================
   RESET
========================= */

function resetIce() {

  pointerDown = false;

  heatingCore = false;

  totalRubDistance = 0;

  melt = 0;

  targetMelt = 0;

  temperature = 18;

  tapStarted = false;

  deleted = false;


  ice.style.pointerEvents =
    "auto";


  ice.style.transform =
    "";


  ice.style.opacity =
    "1";


  ice.style.filter =
    "";


  waterMain.style.opacity =
    "0";


  waterMain.style.transform =
    `
      translateX(-50%)
      scaleX(0.08)
      scaleY(0.35)
    `;


  waterLeft.style.opacity =
    "0";


  waterRight.style.opacity =
    "0";


  waterBack.style.opacity =
    "0";


  temperatureDisplay.textContent =
    "18°C";


  temperatureDisplay.style.opacity =
    "0";


  touchRing.style.opacity =
    "0";


  /*
    문질러 녹인 흔적도 전부 제거
  */

  ice
    .querySelectorAll(
      ".melt-hole"
    )
    .forEach(
      (hole) =>
        hole.remove()
    );


  document
    .querySelectorAll(
      ".droplet, .ice-particle"
    )
    .forEach(
      (item) =>
        item.remove()
    );

}


/* =========================
   RESET
========================= */

resetButton.addEventListener(
  "click",
  () => {

    resetIce();
    updateLevelUI();

  }
);


/* =========================
   START
========================= */

resetIce();
updateLevelUI();