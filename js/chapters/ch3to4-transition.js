/* ============================================================
   CHAPTER 3→4 TRANSITION  (80vh)
   School building grows. Classroom furniture materialises.
   Clem walks into it, sits down. Class has already begun.
   ============================================================ */

// Note: this is called from initCh3to4() in scroll-engine.js
function initCh3to4() {
  const section = document.getElementById('ch3to4');
  if (!section) return;

  _ch3to4_buildScene();
  _ch3to4_scrollTimeline();
}

function _ch3to4_buildScene() {
  const scene = document.getElementById('ch3to4-scene');
  if (!scene) return;

  scene.style.background = '#2A5A9A'; // Noon sky

  // Scene contains: world background + materialising desks
  scene.innerHTML = `
  <svg id="ch3to4-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
       style="position:absolute;inset:0;width:100%;height:100%;">

    <!-- Sky transition (morning → noon) -->
    <rect width="1440" height="900" fill="#2A5A9A"/>
    <path d="M0,900 L0,420 Q300,260 600,340 Q900,420 1200,300 Q1350,240 1440,280 L1440,900Z"
          fill="#1E4A2E"/>
    <rect x="0" y="700" width="1440" height="200" fill="#48924E"/>
    <rect x="0" y="750" width="1440" height="150" fill="#3E8844"/>

    <!-- Desks materialising from particles -->
    <!-- These start invisible and condense into view -->
    <g id="ch3to4-desk-1" opacity="0" transform="translate(300, 520)">
      <rect x="-60" y="0" width="120" height="10" rx="3" fill="#8A6030"/>
      <rect x="-50" y="10" width="12" height="48" rx="3" fill="#7A5028"/>
      <rect x="38" y="10"  width="12" height="48" rx="3" fill="#7A5028"/>
    </g>
    <g id="ch3to4-desk-2" opacity="0" transform="translate(540, 520)">
      <rect x="-60" y="0" width="120" height="10" rx="3" fill="#8A6030"/>
      <rect x="-50" y="10" width="12" height="48" rx="3" fill="#7A5028"/>
      <rect x="38" y="10"  width="12" height="48" rx="3" fill="#7A5028"/>
    </g>
    <g id="ch3to4-desk-3" opacity="0" transform="translate(780, 520)">
      <rect x="-60" y="0" width="120" height="10" rx="3" fill="#8A6030"/>
      <rect x="-50" y="10" width="12" height="48" rx="3" fill="#7A5028"/>
      <rect x="38" y="10"  width="12" height="48" rx="3" fill="#7A5028"/>
    </g>
    <!-- Easel (materialises from fence post) -->
    <g id="ch3to4-easel" opacity="0" transform="translate(1100, 320)">
      <line x1="60" y1="0" x2="0"   y2="200" stroke="#5A3018" stroke-width="10" stroke-linecap="round"/>
      <line x1="60" y1="0" x2="120" y2="200" stroke="#5A3018" stroke-width="10" stroke-linecap="round"/>
      <line x1="60" y1="0" x2="60"  y2="180" stroke="#5A3018" stroke-width="10" stroke-linecap="round"/>
      <rect x="10" y="20" width="100" height="130" rx="4" fill="#F0E8D8"/>
    </g>

    <!-- Student seated already -->
    <g id="ch3to4-student" opacity="0" transform="translate(540, 490)">
      <ellipse cx="0" cy="-38" rx="16" ry="18" fill="#9B7FD4"/>
      <line x1="0" y1="-20" x2="0" y2="-12" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="0" y1="-12" x2="0" y2="16"  stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
      <line x1="0" y1="-4"  x2="-18" y2="8" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
      <line x1="0" y1="-4"  x2="18"  y2="8" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
      <line x1="0" y1="16"  x2="-22" y2="20" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
      <line x1="0" y1="16"  x2="22"  y2="20" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
    </g>

  </svg>

  <!-- Clem walking into classroom -->
  <div id="ch3to4-clem" style="position:absolute;bottom:28%;left:15%;z-index:90;opacity:0;"></div>
  `;

  // Inject Clem
  fetch('svg/characters/clem.svg')
    .then(r => r.text())
    .then(t => {
      const cel = document.getElementById('ch3to4-clem');
      if (cel) cel.innerHTML = t;
    })
    .catch(() => {});
}

function _ch3to4_scrollTimeline() {
  const section  = document.getElementById('ch3to4');
  const desk1    = document.getElementById('ch3to4-desk-1');
  const desk2    = document.getElementById('ch3to4-desk-2');
  const desk3    = document.getElementById('ch3to4-desk-3');
  const easel    = document.getElementById('ch3to4-easel');
  const student  = document.getElementById('ch3to4-student');
  const clemEl   = document.getElementById('ch3to4-clem');
  const particles= getParticles();

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 1 }
  });

  // Clem walks in from left
  tl.fromTo(clemEl, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.12 }, 0)
    .to(clemEl, { x: window.innerWidth * 0.18, duration: 0.40 }, 0.05)

    // Furniture condenses in with stagger
    .fromTo(desk1,   { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out',
        onStart: () => { if (particles && desk1) particles.scatter(desk1, 'ch3_ch4', ['#FFB84A','#F4924A']); }
      }, 0.20)
    .fromTo(desk2,   { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' }, 0.35)
    .fromTo(desk3,   { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' }, 0.50)
    .fromTo(easel,   { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' }, 0.58)
    .fromTo(student, { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.12, ease: 'back.out(1.2)' }, 0.45)

    // Clem reaches desk — walk slows
    .to(clemEl, { x: window.innerWidth * 0.20, duration: 0.20, ease: 'power2.out' }, 0.55)

    // Clem sits (opacity fade to handoff to ch4)
    .to(clemEl, { opacity: 0, duration: 0.10 }, 0.88);
}
