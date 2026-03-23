/* ============================================================
   CHAPTER 7 — REFLECTION (NIGHT WALK)
   320vh. Night landscape. Fireflies. Memory silhouettes.
   Clem slows to stop. Constellation forms.
   ============================================================ */

let ch7Walker = null;

function initCh7() {
  const ch7 = document.getElementById('ch7');
  if (!ch7) return;

  _ch7_buildNightWorld();
  _ch7_injectClem();
  _ch7_buildMemories();
  _ch7_buildTomorrowCards();
  _ch7_buildConstellation();
  _ch7_scrollTimeline();
}

/* ── Night world SVG ────────────────────────────────────── */

function _ch7_buildNightWorld() {
  const world = document.getElementById('ch7-world');
  if (!world) return;

  // Generate star positions
  const stars = Array.from({length:60}, (_, i) => {
    const x = Math.random() * 4320;
    const y = Math.random() * 500;
    const r = 0.8 + Math.random() * 2.2;
    return `<circle cx="${x}" cy="${y}" r="${r}" class="star${i%4===0?' star-warm':''}"/>`;
  }).join('');

  // Fireflies — mid ground
  const fireflies = Array.from({length:15}, () => {
    const x = 400 + Math.random() * 3500;
    const y = 500 + Math.random() * 180;
    return `<circle cx="${x}" cy="${y}" r="2" class="firefly firefly-dot"
              style="animation-delay:-${Math.random()*4}s"/>`;
  }).join('');

  world.innerHTML = `
  <svg viewBox="0 0 4320 900" preserveAspectRatio="xMinYMid slice"
       style="position:absolute;top:0;left:0;width:300%;height:100%;">

    <!-- Night sky -->
    <rect width="4320" height="900" fill="#0D0B1E"/>
    <rect width="4320" height="450" fill="#070614"/>

    <!-- Stars -->
    <g class="ch1-stars">${stars}</g>

    <!-- Fireflies -->
    <g id="ch7-fireflies">${fireflies}</g>

    <!-- Mountain silhouettes — pure black -->
    <path d="M0,900 L0,380 Q300,240 600,320 Q900,400 1200,280 Q1500,160 1800,260
             Q2100,360 2400,240 Q2700,120 3000,230 Q3300,340 3600,220 Q3900,100 4320,250 L4320,900Z"
          fill="#070614"/>

    <!-- Ground -->
    <rect x="0" y="720" width="4320" height="180" fill="#0A0814"/>

    <!-- Moonlit path -->
    <path d="M0,900 Q600,840 1200,820 Q1800,800 2400,812 Q3000,824 3600,818 Q4000,815 4320,820 L4320,900Z"
          fill="#C8D8F8" opacity="0.12"/>

  </svg>`;
}

/* ── Inject walking Clem (night) ─────────────────────────── */

function _ch7_injectClem() {
  const container = document.getElementById('clem-walk-7');
  if (!container) return;
  fetch('svg/characters/clem.svg')
    .then(r => r.text())
    .then(t => {
      container.innerHTML = t;
      ch7Walker = new ClemWalker(container);
      const l = getLenis();
      if (l) l.on('scroll', e => {
        if (ch7Walker) {
          // Walk slows in second half of chapter
          const p = _ch7_getProgress();
          const slowFactor = p > 0.55 ? Math.max(0, 1 - (p - 0.55) / 0.25) : 1;
          ch7Walker.update(e.velocity * slowFactor);
        }
      });
    })
    .catch(() => {});
}

function _ch7_getProgress() {
  const ch7 = document.getElementById('ch7');
  if (!ch7) return 0;
  const rect = ch7.getBoundingClientRect();
  const total = ch7.offsetHeight - window.innerHeight;
  return Math.max(0, Math.min(1, -rect.top / total));
}

/* ── Memory silhouettes ──────────────────────────────────── */

const CH7_MEMORIES = [
  { label: 'bedroom-morning', html: _ch7_memoryBedroom() },
  { label: 'waveforms',       html: _ch7_memoryWaveforms() },
  { label: 'classroom',       html: _ch7_memoryClassroom() },
  { label: 'gap-card',        html: _ch7_memoryGapCard() },
  { label: 'ring-complete',   html: _ch7_memoryRing() },
];

function _ch7_buildMemories() {
  const container = document.getElementById('ch7-memories');
  if (!container) return;
  CH7_MEMORIES.forEach((m, i) => {
    const el = document.createElement('div');
    el.className = 'memory-silhouette';
    el.id = `memory-${m.label}`;
    el.style.cssText = `left:${15 + i*12}%;top:20%;`;
    el.innerHTML = m.html;
    container.appendChild(el);
  });
}

function _ch7_memoryBedroom() {
  return `<svg viewBox="0 0 120 80" width="120" height="80" opacity="0.28">
    <rect x="10" y="10" width="100" height="60" rx="4" fill="#D8AA7A"/>
    <rect x="20" y="15" width="35" height="50" fill="#1A3A6A"/>
    <rect x="20" y="15" width="35" height="25" fill="#FFB84A" opacity="0.4"/>
  </svg>`;
}

function _ch7_memoryWaveforms() {
  return `<svg viewBox="0 0 160 50" width="160" height="50" opacity="0.28">
    <path d="M0,25 Q20,5 40,25 Q60,45 80,25 Q100,5 120,25 Q140,45 160,25"
          fill="none" stroke="#F4834A" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`;
}

function _ch7_memoryClassroom() {
  return `<svg viewBox="0 0 180 100" width="180" height="100" opacity="0.28">
    <g>
      <ellipse cx="30"  cy="30" rx="14" ry="16" fill="#F4834A"/>
      <ellipse cx="80"  cy="30" rx="14" ry="16" fill="#9B7FD4"/>
      <ellipse cx="130" cy="30" rx="14" ry="16" fill="#FFD166"/>
      <line x1="30"  y1="46" x2="30"  y2="70" stroke="#1A1A1A" stroke-width="2"/>
      <line x1="80"  y1="46" x2="80"  y2="70" stroke="#1A1A1A" stroke-width="2"/>
      <line x1="130" y1="46" x2="130" y2="70" stroke="#1A1A1A" stroke-width="2"/>
    </g>
  </svg>`;
}

function _ch7_memoryGapCard() {
  return `<svg viewBox="0 0 140 60" width="140" height="60" opacity="0.28">
    <rect x="0" y="0" width="140" height="60" rx="10" fill="none"
          stroke="rgba(138,184,232,0.6)" stroke-width="1.5"/>
    <rect x="12" y="14" width="70" height="6" rx="2" fill="#8AB8E8" opacity="0.6"/>
    <rect x="12" y="26" width="100" height="5" rx="2" fill="#8AB8E8" opacity="0.4"/>
    <rect x="12" y="36" width="80"  height="5" rx="2" fill="#8AB8E8" opacity="0.3"/>
  </svg>`;
}

function _ch7_memoryRing() {
  return `<svg viewBox="-32 -32 64 64" width="64" height="64" opacity="0.28">
    <circle r="24" fill="none" stroke="rgba(244,131,74,0.3)" stroke-width="4"/>
    <circle r="24" fill="none" stroke="#F4834A" stroke-width="4"
            stroke-dasharray="150.8" stroke-dashoffset="0"
            transform="rotate(-90)" stroke-linecap="round"/>
  </svg>`;
}

/* ── Tomorrow cards ──────────────────────────────────────── */

function _ch7_buildTomorrowCards() {
  const container = document.getElementById('ch7-tomorrow');
  if (!container) return;

  const cards = [
    'Biology quiz — you\'re ready. History essay — one more pass.',
    'Mr K mentioned Thursday\'s lab. Classess has prep materials waiting.',
    'Day 12 of learning with intention.',
  ];

  cards.forEach((text, i) => {
    const el = document.createElement('div');
    el.className = 'tomorrow-card';
    el.id = `tomorrow-${i}`;
    el.style.cssText = `left:${15 + i*26}%;top:${30 + i*8}%;`;
    el.innerHTML = `<p class="tomorrow-card-text">${text}</p>`;
    container.appendChild(el);
  });
}

/* ── Constellation ───────────────────────────────────────── */

function _ch7_buildConstellation() {
  const container = document.getElementById('constellation');
  if (!container) return;

  // 25 stars arranged loosely around a classroom shape
  // Central "star" is Clem's orange color
  const cx = 720, cy = 260;

  const starPositions = [
    {x:cx,   y:cy,   r:4.5, cls:'constellation-center'},
    // surrounding ring
    {x:cx-80, y:cy-40, r:2.5},{x:cx-50, y:cy-70, r:2},{x:cx+10, y:cy-85, r:2.5},
    {x:cx+60, y:cy-65, r:2}, {x:cx+90, y:cy-30, r:2.5},{x:cx+75, y:cy+30, r:2},
    {x:cx+40, y:cy+70, r:2.5},{x:cx-20, y:cy+80, r:2},{x:cx-70, y:cy+55, r:2.5},
    {x:cx-95, y:cy+20, r:2},
    // scattered students
    {x:cx-140,y:cy-20, r:2.5},{x:cx-120,y:cy+60, r:2},{x:cx-160,y:cy+40, r:1.5},
    {x:cx+130,y:cy-10, r:2.5},{x:cx+110,y:cy+65, r:2},{x:cx+155,y:cy+35, r:1.5},
    {x:cx-30, y:cy-130,r:2},{x:cx+50, y:cy-120,r:1.5},{x:cx-80, y:cy-100,r:2},
    {x:cx+100,y:cy-95, r:1.5},{x:cx-40, y:cy+130,r:2},{x:cx+30, y:cy+125,r:1.5},
    {x:cx-110,y:cy-60, r:2},{x:cx+115,y:cy-70, r:2},
  ];

  container.innerHTML = `
  <svg viewBox="0 0 1440 900" style="position:absolute;inset:0;width:100%;height:100%;">
    <!-- Constellation lines -->
    <g stroke="rgba(255,255,255,0.15)" stroke-width="1" fill="none">
      <line x1="${cx}" y1="${cy}" x2="${cx-80}" y2="${cy-40}"/>
      <line x1="${cx}" y1="${cy}" x2="${cx+90}" y2="${cy-30}"/>
      <line x1="${cx}" y1="${cy}" x2="${cx+40}" y2="${cy+70}"/>
      <line x1="${cx}" y1="${cy}" x2="${cx-70}" y2="${cy+55}"/>
      <line x1="${cx-80}" y1="${cy-40}" x2="${cx-140}" y2="${cy-20}"/>
      <line x1="${cx+90}" y1="${cy-30}" x2="${cx+130}" y2="${cy-10}"/>
    </g>
    <!-- Stars -->
    ${starPositions.map(s => `<circle cx="${s.x}" cy="${s.y}" r="${s.r}"
      class="${s.cls || 'constellation-star'}" fill="${s.cls ? '#F4834A' : '#FFFFFF'}"/>`).join('')}
  </svg>`;
}

/* ── Scroll timeline ─────────────────────────────────────── */

function _ch7_scrollTimeline() {
  const ch7      = document.getElementById('ch7');
  const world    = document.getElementById('ch7-world');
  const ts1      = document.getElementById('ch7-s1-ts');
  const hlWord   = document.getElementById('ch7-s3-hl');
  const memories = document.querySelectorAll('.memory-silhouette');
  const tCards   = document.querySelectorAll('.tomorrow-card');
  const constEl  = document.getElementById('constellation');
  const clemWalk = document.getElementById('clem-walk-7');

  const scrollDist = ch7.offsetHeight - window.innerHeight;

  const worldLayers = {
    sky: world?.querySelector('rect:first-child'),
    bg:  world,
  };

  ScrollTrigger.create({
    trigger: ch7,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: self => {
      const p  = self.progress;
      const px = p * scrollDist;

      // Shift night world
      if (world) gsap.set(world, { x: -px * 0.65 });

      // Scene 7.2: Memories drift through (20–55%)
      memories.forEach((m, i) => {
        const start = 0.18 + i * 0.07;
        const end   = start + 0.20;
        if (p > start && p < end) {
          const mp = (p - start) / 0.20;
          gsap.set(m, { opacity: 0.30 * Math.sin(mp * Math.PI), x: -mp * 200 + 50 });
        } else {
          gsap.set(m, { opacity: 0 });
        }
      });

      // Scene 7.3: Tomorrow cards (56–76%)
      tCards.forEach((card, i) => {
        const start = 0.54 + i * 0.06;
        if (p > start && p < start + 0.18) {
          const cp = (p - start) / 0.18;
          gsap.set(card, { opacity: Math.sin(cp * Math.PI) * 0.9, x: -cp * 150 + 60 });
        } else {
          gsap.set(card, { opacity: 0 });
        }
      });

      // Scene 7.4: Clem slows to stop (65–85%)
      if (p > 0.65) {
        const slowP = Math.min(1, (p - 0.65) / 0.20);
        if (clemWalk) {
          // Head tilt up as he stops
          const head = clemWalk.querySelector('.clem-head');
          if (head) gsap.set(head, { rotation: slowP * -10, transformOrigin: 'center bottom', transformBox: 'fill-box' });
        }
      }

      // Scene 7.5: Constellation (80–100%) — minimum 8s scroll
      if (p > 0.78 && constEl) {
        const cp = (p - 0.78) / 0.22;
        gsap.set(constEl, { opacity: Math.min(1, cp) });
      }
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: ch7, start: 'top top', end: 'bottom bottom', scrub: 1 }
  });

  tl.fromTo(ts1,   { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.02)
    .to(ts1,   { opacity: 0, duration: 0.04 }, 0.16)
    .fromTo(hlWord, { opacity: 0 }, { opacity: 1, duration: 0.10 }, 0.54)
    .to(hlWord, { opacity: 0, duration: 0.06 }, 0.70);
}
