/* ============================================================
   CHAPTER 3 — THE MORNING WALK
   300vh. Side-scroll world. Walk cycle. Waveforms. AI companions.
   ============================================================ */

let ch3Walker = null;
let wfPhase = 0;
let wfAmplitude = 0;
let wfRunning = false;

function initCh3() {
  const ch3 = document.getElementById('ch3');
  if (!ch3) return;

  _ch3_buildWorld();
  _ch3_injectClem();
  _ch3_buildCompanions();
  _ch3_buildSchoolBuilding();
  _ch3_waveformTick();
  _ch3_scrollTimeline();
}

/* ── Build side-scroll world layers ─────────────────────── */

function _ch3_buildWorld() {
  // Sky layer
  const skyLayer = document.getElementById('ch3-l-sky');
  if (skyLayer) {
    skyLayer.innerHTML = `
    <svg viewBox="0 0 4320 900" preserveAspectRatio="xMinYMid slice"
         style="position:absolute;top:0;left:0;width:300%;height:100%;">
      <rect width="4320" height="900" fill="#1A3A6A"/>
      <!-- Sunrise arcs repeated across wide sky -->
      <defs><clipPath id="ch3-sky-clip"><rect width="4320" height="714"/></clipPath></defs>
      <g clip-path="url(#ch3-sky-clip)">
        <ellipse cx="720"  cy="920" rx="1180" ry="742" fill="#B83E18"/>
        <ellipse cx="720"  cy="920" rx="960"  ry="608" fill="#D45A28"/>
        <ellipse cx="720"  cy="920" rx="760"  ry="480" fill="#F07838"/>
        <ellipse cx="720"  cy="920" rx="580"  ry="368" fill="#F4924A"/>
        <ellipse cx="720"  cy="920" rx="418"  ry="264" fill="#FFB84A"/>
        <ellipse cx="720"  cy="920" rx="268"  ry="168" fill="#FFD166"/>
      </g>
    </svg>`;
  }

  // Mountains layer
  const mtnLayer = document.getElementById('ch3-l-mtn');
  if (mtnLayer) {
    mtnLayer.innerHTML = `
    <svg viewBox="0 0 4320 900" preserveAspectRatio="xMinYMid slice"
         style="position:absolute;top:0;left:0;width:300%;height:100%;">
      <path d="M0,900 L0,420 Q240,280 480,360 Q720,440 960,320 Q1200,200 1440,300
               Q1680,400 1920,300 Q2160,200 2400,300 Q2640,400 2880,300 Q3120,200 3360,300
               Q3600,400 3840,340 Q4080,280 4320,320 L4320,900Z" fill="#1E4A2E"/>
      <path d="M0,900 L0,540 Q300,440 600,500 Q900,560 1200,480 Q1500,400 1800,470
               Q2100,540 2400,470 Q2700,400 3000,460 Q3300,520 3600,470 Q3900,420 4320,450 L4320,900Z"
            fill="#2E6E3E"/>
    </svg>`;
  }

  // Ground layer (with path)
  const groundLayer = document.getElementById('ch3-l-ground');
  if (groundLayer) {
    groundLayer.innerHTML = `
    <svg viewBox="0 0 4320 900" preserveAspectRatio="xMinYMid slice"
         style="position:absolute;top:0;left:0;width:300%;height:100%;">
      <rect x="0" y="700" width="4320" height="200" fill="#48924E"/>
      <rect x="0" y="750" width="4320" height="150" fill="#3E8844"/>
      <!-- Path -->
      <path d="M0,900 Q400,820 800,790 Q1200,760 1600,775 Q2000,790 2400,780
               Q2800,770 3200,780 Q3600,790 4320,900 L4320,900Z" fill="#C8986A"/>
      <path d="M0,900 Q400,820 800,790 Q1200,760 1600,775 Q2000,790 2400,780
               Q2800,770 3200,780 Q3600,790 4320,900"
            fill="none" stroke="#B88858" stroke-width="2"/>
    </svg>`;
  }

  // Trees layer
  const treesLayer = document.getElementById('ch3-l-trees');
  if (treesLayer) {
    treesLayer.innerHTML = `
    <svg viewBox="0 0 4320 900" preserveAspectRatio="xMinYMid slice"
         style="position:absolute;top:0;left:0;width:300%;height:100%;">
      ${_ch3_generateTrees(4320, 660, 24)}
    </svg>`;
  }

  // Foreground layer
  const fgLayer = document.getElementById('ch3-l-fg');
  if (fgLayer) {
    fgLayer.innerHTML = `
    <svg viewBox="0 0 4320 900" preserveAspectRatio="xMinYMid slice"
         style="position:absolute;top:0;left:0;width:300%;height:100%;">
      <rect x="0" y="820" width="4320" height="80" fill="#2E7834"/>
      ${_ch3_generateTrunks(4320)}
    </svg>`;
  }
}

function _ch3_generateTrees(totalWidth, baseY, count) {
  let result = '';
  for (let i = 0; i < count; i++) {
    const x = (i / count) * totalWidth + Math.random() * 120;
    const s = 0.7 + Math.random() * 0.6;
    const shade = ['#1A5E2A','#247034','#2E7A3E'][i % 3];
    result += `<g transform="translate(${x},${baseY}) scale(${s})">
      <rect x="-5" y="0" width="10" height="55" rx="3" fill="#5A3018"/>
      <circle cx="0" cy="-22" r="36" fill="${shade}"/>
      <circle cx="-16" cy="-10" r="26" fill="${shade === '#1A5E2A' ? '#247034' : '#1A5E2A'}"/>
      <circle cx="16" cy="-10" r="28" fill="${shade}"/>
    </g>`;
  }
  return result;
}

function _ch3_generateTrunks(totalWidth) {
  let result = '';
  for (let i = 0; i < 8; i++) {
    const x = (i / 8) * totalWidth + 80;
    result += `<rect x="${x}" y="700" width="16" height="130" rx="4" fill="#5A3018"/>`;
  }
  return result;
}

/* ── Inject walking Clem ─────────────────────────────────── */

function _ch3_injectClem() {
  const container = document.getElementById('clem-walk');
  if (!container) return;
  container.style.cssText = 'position:absolute;bottom:28%;left:50%;transform:translateX(-50%);z-index:90;';
  fetch('svg/characters/clem.svg')
    .then(r => r.text())
    .then(t => {
      container.innerHTML = t;
      ch3Walker = new ClemWalker(container);
      // Connect Lenis velocity to walk cycle
      const l = getLenis();
      if (l) {
        l.on('scroll', e => {
          if (ch3Walker) ch3Walker.update(e.velocity);
        });
      }
    })
    .catch(() => {});
}

/* ── AI Companion characters ────────────────────────────── */

function _ch3_buildCompanions() {
  const left  = document.getElementById('ai-companion-left');
  const right = document.getElementById('ai-companion-right');
  if (!left || !right) return;

  // Left companion — cool blue head
  left.innerHTML = `
  <div style="position:relative;width:48px;height:52px;">
    <div class="ai-companion-glow" style="background:#8AB8E8;"></div>
    <svg viewBox="-24 -26 48 52" width="48" height="52">
      <ellipse cx="0" cy="0" rx="18" ry="20" fill="#8AB8E8"/>
    </svg>
  </div>`;

  // Right companion — soft green head
  right.innerHTML = `
  <div style="position:relative;width:48px;height:52px;">
    <div class="ai-companion-glow" style="background:#B8D8A8;"></div>
    <svg viewBox="-24 -26 48 52" width="48" height="52">
      <ellipse cx="0" cy="0" rx="18" ry="20" fill="#B8D8A8"/>
    </svg>
  </div>`;

  left.style.cssText  = 'position:absolute;bottom:46%;left:calc(50% - 210px);z-index:100;opacity:0;';
  right.style.cssText = 'position:absolute;bottom:46%;left:calc(50% + 162px);z-index:100;opacity:0;';
}

/* ── School building ─────────────────────────────────────── */

function _ch3_buildSchoolBuilding() {
  const el = document.getElementById('school-building');
  if (!el) return;
  el.innerHTML = `
  <svg viewBox="0 0 280 220" width="280" height="220">
    <rect x="20" y="80"  width="240" height="140" fill="#D8AA7A"/>
    <polygon points="0,80 140,10 280,80" fill="#784018"/>
    <rect x="110" y="140" width="60" height="80" fill="#6A3818"/>
    <!-- Windows row -->
    <rect x="36"  y="100" width="40" height="32" rx="2" fill="#FFE566"/>
    <rect x="90"  y="100" width="40" height="32" rx="2" fill="#FFE566"/>
    <rect x="150" y="100" width="40" height="32" rx="2" fill="#FFE566"/>
    <rect x="204" y="100" width="40" height="32" rx="2" fill="#FFE566"/>
    <!-- Sign -->
    <rect x="80" y="50" width="120" height="26" rx="4" fill="#FFFFFF" opacity="0.9"/>
    <text x="140" y="68" text-anchor="middle"
          font-family="Nunito,sans-serif" font-size="13" font-weight="700" fill="#2A5A9A">SCHOOL</text>
  </svg>`;
}

/* ── Waveform animation tick ─────────────────────────────── */

function _ch3_waveformTick() {
  function generatePath(width, height, amplitude, frequency, phase) {
    const pts = 40;
    let d = `M 0 ${height / 2}`;
    for (let i = 1; i <= pts; i++) {
      const x = (i / pts) * width;
      const y = height / 2 + Math.sin((i / pts) * frequency * Math.PI * 2 + phase) * amplitude;
      d += ` L ${x} ${y}`;
    }
    return d;
  }

  function tick() {
    if (wfRunning) {
      wfPhase += 0.04;
      const leftPath  = document.getElementById('wf-left-path');
      const rightPath = document.getElementById('wf-right-path');
      if (leftPath)  leftPath.setAttribute('d', generatePath(260, 80, wfAmplitude, 2.0, wfPhase));
      if (rightPath) rightPath.setAttribute('d', generatePath(260, 80, wfAmplitude, 3.5, wfPhase + 1.2));
    }
    requestAnimationFrame(tick);
  }
  tick();
}

/* ── Scroll timeline ─────────────────────────────────────── */

function _ch3_scrollTimeline() {
  const ch3     = document.getElementById('ch3');
  const wfWrap  = document.getElementById('ch3-waveforms');
  const compL   = document.getElementById('ai-companion-left');
  const compR   = document.getElementById('ai-companion-right');
  const ts1     = document.getElementById('ch3-s1-ts');
  const hl2     = document.getElementById('ch3-s2-hl');
  const copy3   = document.getElementById('ch3-s3-copy');
  const copy4   = document.getElementById('ch3-s4-copy');
  const ts5     = document.getElementById('ch3-s5-ts');
  const school  = document.getElementById('school-building');
  const fc1     = document.getElementById('fc-ch3-1');
  const fc2     = document.getElementById('fc-ch3-2');

  // Horizontal world scroll
  const layers = [
    { el: document.getElementById('ch3-l-sky'),    speed: 0.05 },
    { el: document.getElementById('ch3-l-mtn'),    speed: 0.12 },
    { el: document.getElementById('ch3-l-hills'),  speed: 0.22 },
    { el: document.getElementById('ch3-l-ground'), speed: 0.38 },
    { el: document.getElementById('ch3-l-trees'),  speed: 0.55 },
    { el: document.getElementById('ch3-l-fg'),     speed: 0.72 },
  ];

  const scrollDist = ch3.offsetHeight - window.innerHeight;

  ScrollTrigger.create({
    trigger: ch3,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: self => {
      const p = self.progress;
      const px = p * scrollDist;

      // Shift world layers left
      layers.forEach(L => {
        if (L.el) gsap.set(L.el, { x: -px * L.speed });
      });

      // Scene 3.1 → 3.2 — waveforms grow in
      if (p > 0.15 && p < 0.75) {
        const a = Math.min(1, (p - 0.15) / 0.1);
        wfAmplitude = a * 40;
        wfRunning   = true;
        gsap.set(wfWrap, { opacity: a });
        if (compL && compR) {
          gsap.set([compL, compR], { opacity: a });
        }
      } else if (p <= 0.15) {
        wfAmplitude = 0;
        wfRunning   = false;
        gsap.set(wfWrap, { opacity: 0 });
      } else {
        // Scene 3.5 — fade out
        const fade = Math.max(0, 1 - (p - 0.75) / 0.1);
        wfAmplitude = fade * 40;
        gsap.set(wfWrap, { opacity: fade });
        if (compL && compR) gsap.set([compL, compR], { opacity: fade });
      }

      // School building approaches from right
      if (p > 0.78) {
        const show = (p - 0.78) / 0.15;
        if (school) {
          gsap.set(school, {
            opacity: show,
            x: (1 - show) * 80,
            right: `${10 - show * 8}%`,
          });
        }
      }
    }
  });

  // Scene copy fade-ins
  const tl = gsap.timeline({
    scrollTrigger: { trigger: ch3, start: 'top top', end: 'bottom bottom', scrub: 1 }
  });

  tl.fromTo(ts1, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.02)
    .to(ts1, { opacity: 0, duration: 0.04 }, 0.14)

    .fromTo(hl2, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.08 }, 0.18)
    .fromTo(fc1, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.22)
    .to([hl2, fc1], { opacity: 0, duration: 0.05 }, 0.34)

    .fromTo(copy3, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.08 }, 0.36)
    .fromTo(fc2, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.40)
    .to([copy3, fc2], { opacity: 0, duration: 0.05 }, 0.54)

    .fromTo(copy4, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.58)
    .to(copy4, { opacity: 0, duration: 0.06 }, 0.70)

    .fromTo(ts5, { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.82);
}
