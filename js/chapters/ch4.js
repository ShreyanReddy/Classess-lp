/* ============================================================
   CHAPTER 4 — OUTDOOR CLASSROOM
   400vh. Comprehension rings for 6 characters.
   Student C dip moment. Scene sequences.
   ============================================================ */

function initCh4() {
  const ch4 = document.getElementById('ch4');
  if (!ch4) return;

  _ch4_buildClassroom();
  _ch4_buildRings();
  _ch4_scrollTimeline();
}

/* ── Characters config ───────────────────────────────────── */

const CH4_CHARS = [
  { id: 'ring-clem',      color: '#F4834A', x: 220, y: 500, colorClass: 'ring-clem'      },
  { id: 'ring-b',         color: '#9B7FD4', x: 440, y: 500, colorClass: 'ring-student-b' },
  { id: 'ring-c',         color: '#FFD166', x: 660, y: 500, colorClass: 'ring-student-c' },
  { id: 'ring-d',         color: '#E07A8A', x: 880, y: 500, colorClass: 'ring-student-d' },
  { id: 'ring-e',         color: '#5ABFAF', x: 320, y: 380, colorClass: 'ring-student-e' },
  { id: 'ring-teacher',   color: '#2A7A6A', x: 1100, y: 340, colorClass: 'ring-teacher'  },
];

/* ── Build classroom SVG ─────────────────────────────────── */

function _ch4_buildClassroom() {
  const scene = document.getElementById('ch4-scene');
  if (!scene) return;

  scene.innerHTML = `
  <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
       style="position:absolute;inset:0;width:100%;height:100%;">

    <!-- Sky background (through open pavilion sides) -->
    <rect width="1440" height="900" fill="#2A5A9A"/>
    <defs><clipPath id="ch4-sky-clip"><rect width="1440" height="580"/></clipPath></defs>
    <g clip-path="url(#ch4-sky-clip)">
      <ellipse cx="720" cy="800" rx="1000" ry="600" fill="#D45A28"/>
      <ellipse cx="720" cy="800" rx="780"  ry="480" fill="#F07838"/>
      <ellipse cx="720" cy="800" rx="560"  ry="340" fill="#FFB84A"/>
    </g>

    <!-- Mountains visible through sides -->
    <path d="M0,900 L0,400 Q200,280 400,360 Q600,440 800,320 Q1000,200 1200,300 Q1350,380 1440,340 L1440,900Z" fill="#1E4A2E"/>

    <!-- Pavilion floor -->
    <rect x="0" y="640" width="1440" height="260" fill="#8A6030"/>
    ${Array.from({length:12}, (_,i) => `<line x1="${i*120+60}" y1="640" x2="${i*120+60}" y2="900" stroke="#7A5028" stroke-width="1.5"/>`).join('')}

    <!-- Pavilion roof beams -->
    <rect x="0" y="0" width="1440" height="80" fill="#6A4018"/>
    ${Array.from({length:8}, (_,i) => `
      <rect x="${i*180+60}" y="0" width="30" height="${280+i%3*40}" rx="4" fill="#5A3018"/>
    `).join('')}

    <!-- Dappled light patches -->
    <ellipse class="dapple" cx="300"  cy="680" rx="80"  ry="24" opacity="0.10"/>
    <ellipse class="dapple" cx="720"  cy="700" rx="100" ry="28" opacity="0.08" style="animation-delay:-20s"/>
    <ellipse class="dapple" cx="1140" cy="675" rx="70"  ry="22" opacity="0.12" style="animation-delay:-40s"/>

    <!-- ── Desks ─────────────────────────────────────────── -->
    <!-- Back row — smaller (perspective) -->
    ${_ch4_desk(200, 390, 0.78)}
    ${_ch4_desk(400, 390, 0.78)}
    ${_ch4_desk(600, 390, 0.78)}
    ${_ch4_desk(800, 390, 0.78)}
    ${_ch4_desk(1000, 390, 0.78)}

    <!-- Front row — Clem is far left -->
    ${_ch4_desk(160, 520, 1.0)}
    ${_ch4_desk(390, 520, 1.0)}
    ${_ch4_desk(620, 520, 1.0)}
    ${_ch4_desk(850, 520, 1.0)}

    <!-- ── Characters at desks ──────────────────────────── -->
    <!-- Back row students -->
    ${_ch4_char(220, 370, '#9B7FD4')}
    ${_ch4_char(440, 370, '#FFD166', 'ring-c')}
    ${_ch4_char(660, 370, '#E07A8A')}
    ${_ch4_char(880, 370, '#5ABFAF')}

    <!-- Front row — Clem far left -->
    ${_ch4_char(185, 495, '#F4834A')}

    <!-- ── Teacher + Easel ──────────────────────────────── -->
    <!-- Easel -->
    <g transform="translate(1080, 280)">
      <line x1="60" y1="0" x2="0" y2="200" stroke="#5A3018" stroke-width="10" stroke-linecap="round"/>
      <line x1="60" y1="0" x2="120" y2="200" stroke="#5A3018" stroke-width="10" stroke-linecap="round"/>
      <line x1="60" y1="0" x2="60" y2="180" stroke="#5A3018" stroke-width="10" stroke-linecap="round"/>
      <rect x="10" y="20" width="100" height="130" rx="4" fill="#F0E8D8"/>
      <!-- Board content -->
      <rect x="18" y="30" width="84" height="10" rx="2" fill="#D45A28" opacity="0.8"/>
      <rect x="18" y="46" width="60" height="6" rx="2" fill="#1A1A1A" opacity="0.5"/>
      <rect x="18" y="58" width="72" height="6" rx="2" fill="#1A1A1A" opacity="0.5"/>
      <rect x="18" y="70" width="50" height="6" rx="2" fill="#1A1A1A" opacity="0.3"/>
    </g>

    <!-- Teacher character -->
    ${_ch4_teacher(1140, 280)}

  </svg>`;

  // Fade in on scroll trigger
  ScrollTrigger.create({
    trigger: document.getElementById('ch4'),
    start: 'top 80%',
    onEnter: () => gsap.to(scene, { opacity: 1, duration: 0.8, ease: 'power2.out' }),
    onLeaveBack: () => gsap.to(scene, { opacity: 0, duration: 0.4 }),
  });
}

function _ch4_desk(x, y, scale) {
  return `<g transform="translate(${x},${y}) scale(${scale})">
    <rect x="-60" y="0" width="120" height="10" rx="3" fill="#8A6030"/>
    <rect x="-50" y="10" width="12" height="48" rx="3" fill="#7A5028"/>
    <rect x="38"  y="10" width="12" height="48" rx="3" fill="#7A5028"/>
  </g>`;
}

function _ch4_char(x, y, headColor, specialId) {
  return `<g transform="translate(${x},${y})" ${specialId ? `id="${specialId}-char"` : ''}>
    <ellipse cx="0" cy="-38" rx="16" ry="18" fill="${headColor}"/>
    <line x1="0" y1="-20" x2="0" y2="-12" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="0" y1="-12" x2="0" y2="16"  stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
    <line x1="0" y1="-4"  x2="-18" y2="8" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
    <line x1="0" y1="-4"  x2="18"  y2="8" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
    <line x1="0" y1="16"  x2="-22" y2="20" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
    <line x1="0" y1="16"  x2="22"  y2="20" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
  </g>`;
}

function _ch4_teacher(x, y) {
  return `<g transform="translate(${x},${y})">
    <circle cx="0" cy="-44" r="38" fill="#2A7A6A" opacity="0.25" class="teacher-glow"/>
    <ellipse cx="0" cy="-44" rx="18" ry="20" fill="#2A7A6A"/>
    <line x1="0" y1="-24" x2="0" y2="-16" stroke="#1A1A1A" stroke-width="4" stroke-linecap="round"/>
    <line x1="0" y1="-16" x2="0" y2="30"  stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
    <line x1="0" y1="-4"  x2="-16" y2="20" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
    <line class="teacher-arm-pointing" x1="0" y1="-4" x2="-50" y2="-36"
          stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
    <line x1="0" y1="30"  x2="-11" y2="68" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
    <line x1="0" y1="30"  x2="11"  y2="68" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
  </g>`;
}

/* ── Build comprehension rings ───────────────────────────── */

function _ch4_buildRings() {
  const ringsContainer = document.getElementById('ch4-rings');
  if (!ringsContainer) return;

  // Ring positions match character positions in the classroom SVG
  const ringPositions = [
    { id: 'ring-clem',    cls: 'ring-clem',      x: '12.5vw', y: '51%', fill: 0.40 },
    { id: 'ring-b',       cls: 'ring-student-b', x: '30vw',   y: '38%', fill: 0.40 },
    { id: 'ring-c',       cls: 'ring-student-c', x: '46vw',   y: '38%', fill: 0.40 },
    { id: 'ring-d',       cls: 'ring-student-d', x: '62vw',   y: '38%', fill: 0.40 },
    { id: 'ring-e',       cls: 'ring-student-e', x: '78vw',   y: '38%', fill: 0.40 },
    { id: 'ring-teacher', cls: 'ring-teacher',   x: '79vw',   y: '26%', fill: 0.85 },
  ];

  ringsContainer.innerHTML = ringPositions.map(r => `
    <div class="comp-ring-wrap" id="${r.id}-wrap"
         style="position:absolute;left:${r.x};top:${r.y};transform:translate(-50%,-50%)">
      <svg class="comp-ring" viewBox="-30 -30 60 60" width="52" height="52">
        <circle r="24" class="ring-bg"/>
        <circle r="24" class="ring-active ${r.cls}" id="${r.id}-active"
                stroke-dashoffset="${150.8 * (1 - r.fill)}"/>
      </svg>
    </div>
  `).join('');
}

/* ── Scroll timeline ─────────────────────────────────────── */

function _ch4_scrollTimeline() {
  const ch4   = document.getElementById('ch4');
  const ts1   = document.getElementById('ch4-s1-ts');
  const hl2   = document.getElementById('ch4-s2-hl');
  const copy6 = document.getElementById('ch4-s6-copy');
  const fc1   = document.getElementById('fc-ch4-1');
  const fc2   = document.getElementById('fc-ch4-2');

  const tl = gsap.timeline({
    scrollTrigger: { trigger: ch4, start: 'top top', end: 'bottom bottom', scrub: 1 }
  });

  // Show rings at Scene 4.2
  tl.fromTo('#ch4-rings', { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.12)
    .fromTo(ts1, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.04)
    .to(ts1, { opacity: 0, duration: 0.04 }, 0.18)

    .fromTo(hl2, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.08 }, 0.16)
    .fromTo(fc1, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.22)
    .to([hl2, fc1], { opacity: 0, duration: 0.05 }, 0.34)
    .fromTo(fc2, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.42)
    .to(fc2, { opacity: 0, duration: 0.05 }, 0.56)

    // Ring fills increase (4.3)
    .add(() => _ch4_setAllRings(0.72), 0.35)
    // Student C dip (4.4)
    .add(() => setRingFill(document.getElementById('ring-c-active'), 0.28), 0.52)
    // Student C recovers (4.4)
    .add(() => setRingFill(document.getElementById('ring-c-active'), 0.65), 0.62)
    // All rise to 85%+ (4.6)
    .add(() => _ch4_setAllRings(0.88), 0.74)

    .fromTo(copy6, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.80)
    .to(copy6, { opacity: 0, duration: 0.05 }, 0.94);
}

function _ch4_setAllRings(level) {
  const ids = ['ring-clem-active','ring-b-active','ring-c-active',
               'ring-d-active','ring-e-active','ring-teacher-active'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) setRingFill(el, level);
  });
}
