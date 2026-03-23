/* ============================================================
   CHAPTER 6 — HOMEWORK & AI TUTOR
   300vh. Evening bedroom. Lamp glow. Ring → 100%.
   ============================================================ */

function initCh6() {
  const ch6 = document.getElementById('ch6');
  if (!ch6) return;

  _ch6_buildRoom();
  _ch6_injectClem();
  _ch6_buildRing();
  _ch6_scrollTimeline();
}

/* ── Build evening bedroom ───────────────────────────────── */

function _ch6_buildRoom() {
  const room = document.getElementById('ch6-room');
  if (!room) return;

  room.innerHTML = `
  <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
       style="position:absolute;inset:0;width:100%;height:100%;">

    <!-- Wall — same warm wood as Ch2 but evening light -->
    <rect width="1440" height="900" fill="#A8884A"/>
    <line x1="0" y1="150" x2="1440" y2="150" stroke="#988040" stroke-width="2"/>
    <line x1="0" y1="300" x2="1440" y2="300" stroke="#988040" stroke-width="2"/>
    <line x1="0" y1="450" x2="1440" y2="450" stroke="#988040" stroke-width="2"/>
    <line x1="0" y1="600" x2="1440" y2="600" stroke="#988040" stroke-width="2"/>
    <line x1="0" y1="750" x2="1440" y2="750" stroke="#988040" stroke-width="2"/>

    <!-- Floor -->
    <rect x="0" y="680" width="1440" height="220" fill="#7A5028"/>

    <!-- Window — evening sky (indigo/rose sunset) -->
    <g transform="translate(80, 80)">
      <rect x="0" y="0" width="300" height="420" rx="4" fill="#5A3818"/>
      <rect x="16" y="16" width="268" height="388" rx="2" fill="#2A1845"/>
      <!-- Evening sky in window -->
      <rect x="20" y="20" width="124" height="186" fill="#2A1845"/>
      <rect x="148" y="20" width="120" height="186" fill="#2A1845"/>
      <rect x="20" y="210" width="248" height="180" fill="#1A0F3C"/>
      <!-- Sunset glow in lower portion -->
      <ellipse cx="134" cy="380" rx="200" ry="100" fill="#8A3A08" opacity="0.7"/>
      <ellipse cx="134" cy="390" rx="140" ry="70"  fill="#D45A28" opacity="0.6"/>
      <!-- Stars in evening window -->
      <circle cx="50"  cy="40"  r="1.5" fill="#FFFFFF" opacity="0.8"/>
      <circle cx="100" cy="60"  r="1"   fill="#FFFFFF" opacity="0.7"/>
      <circle cx="180" cy="35"  r="1.5" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="240" cy="75"  r="1"   fill="#FFFFFF" opacity="0.6"/>
      <circle cx="140" cy="50"  r="1"   fill="#FFF8E0" opacity="0.7"/>
      <!-- Cross bars -->
      <line x1="16"  y1="210" x2="284" y2="210" stroke="#5A3818" stroke-width="12"/>
      <line x1="150" y1="16"  x2="150" y2="404" stroke="#5A3818" stroke-width="12"/>
    </g>

    <!-- Lamp on desk -->
    <g transform="translate(560, 480)">
      <!-- Base -->
      <ellipse cx="20" cy="116" rx="24" ry="8" fill="#6A4018"/>
      <!-- Pole -->
      <line x1="20" y1="108" x2="20" y2="40" stroke="#8A6030" stroke-width="6" stroke-linecap="round"/>
      <!-- Shade -->
      <path d="M-10,40 L0,0 L40,0 L50,40Z" fill="#C8884A"/>
      <!-- Lamp glow — warm circle expanding on desk -->
      <ellipse class="lamp-glow" cx="20" cy="160" rx="160" ry="50"
               fill="#FFE080" opacity="0.6" filter="url(#lamp-blur)"/>
    </g>
    <defs>
      <filter id="lamp-blur"><feGaussianBlur stdDeviation="18"/></filter>
    </defs>

    <!-- Desk (same as Ch2 for visual rhyme) -->
    <rect x="440" y="580" width="600" height="16" rx="4" fill="#8A6030"/>
    <rect x="450" y="596" width="14" height="90" rx="3" fill="#7A5028"/>
    <rect x="1016" y="596" width="14" height="90" rx="3" fill="#7A5028"/>
    <rect x="700" y="596" width="10" height="90" rx="3" fill="#7A5028"/>

    <!-- Tablet/device on desk -->
    <rect id="ch6-device" x="650" y="500" width="160" height="110" rx="10" fill="#1A1A2A"/>
    <!-- Device screen glow states — controlled by JS -->
    <rect id="ch6-screen" x="662" y="510" width="136" height="90" rx="6" fill="#1A2A4A"
          class="device-screen device-screen--idle"/>
    <!-- Screen content (dynamic) -->
    <g id="ch6-screen-content">
      <rect x="670" y="518" width="100" height="8" rx="3" fill="#F4834A" opacity="0.85"/>
      <rect x="670" y="532" width="80"  height="5" rx="2" fill="#FFFFFF" opacity="0.5"/>
      <rect x="670" y="542" width="90"  height="5" rx="2" fill="#FFFFFF" opacity="0.35"/>
      <rect x="670" y="552" width="70"  height="5" rx="2" fill="#FFD166" opacity="0.6"/>
    </g>

    <!-- Bookshelf (same position as Ch2 for visual continuity) -->
    <g transform="translate(1150, 80)">
      <rect x="0" y="0" width="200" height="18" rx="3" fill="#7A5028"/>
      <rect x="0" y="80" width="200" height="18" rx="3" fill="#7A5028"/>
      <rect x="0" y="0" width="14" height="98"  rx="3" fill="#7A5028"/>
      <rect x="186" y="0" width="14" height="98" rx="3" fill="#7A5028"/>
      <rect x="18"  y="22" width="22" height="54" rx="2" fill="#D45A28"/>
      <rect x="44"  y="28" width="18" height="48" rx="2" fill="#2A7A6A"/>
      <rect x="66"  y="24" width="24" height="52" rx="2" fill="#FFD166"/>
      <rect x="94"  y="26" width="20" height="50" rx="2" fill="#9B7FD4"/>
    </g>

  </svg>`;
}

/* ── Inject seated Clem (evening) ────────────────────────── */

function _ch6_injectClem() {
  const container = document.getElementById('clem-ch6');
  if (!container) return;
  container.style.cssText = 'position:absolute;bottom:14%;left:42%;z-index:90;';
  fetch('svg/characters/clem-seated.svg')
    .then(r => r.text())
    .then(t => { container.innerHTML = t; })
    .catch(() => {});
}

/* ── Build comprehension ring (returns from Ch4, now over Clem) */

function _ch6_buildRing() {
  const wrap = document.getElementById('ch6-ring');
  if (!wrap) return;

  wrap.style.cssText = 'position:absolute;left:42%;bottom:36%;transform:translate(-50%,0);z-index:100;';
  wrap.innerHTML = `
    <svg class="comp-ring" viewBox="-30 -30 60 60" width="52" height="52">
      <circle r="24" class="ring-bg"/>
      <circle r="24" class="ring-active ring-clem" id="ring-ch6-active"
              stroke-dashoffset="${150.8 * 0.35}"/>
    </svg>`;
}

/* ── AI response float system ────────────────────────────── */

function _ch6_spawnAIResponse(text) {
  const container = document.getElementById('ch6-ai-responses');
  if (!container) return;

  const line = document.createElement('div');
  line.className = 'ai-response-line';
  line.textContent = text;
  // Position near device
  line.style.cssText = `left:${40 + Math.random()*8}%;bottom:30%;`;
  container.appendChild(line);

  gsap.fromTo(line,
    { opacity: 1, y: 0 },
    { opacity: 0, y: -40, duration: 3, ease: 'power1.out',
      onComplete: () => line.remove() }
  );
}

/* ── Scroll timeline ─────────────────────────────────────── */

function _ch6_scrollTimeline() {
  const ch6    = document.getElementById('ch6');
  const room   = document.getElementById('ch6-room');
  const ts1    = document.getElementById('ch6-s1-ts');
  const hl2    = document.getElementById('ch6-s2-hl');
  const fc1    = document.getElementById('fc-ch6-1');
  const fc2    = document.getElementById('fc-ch6-2');
  const fc3    = document.getElementById('fc-ch6-3');
  const copy5  = document.getElementById('ch6-s5-copy');
  const ring   = document.getElementById('ring-ch6-active');
  const ringWrap = document.getElementById('ch6-ring');
  let responseFired = false;

  // Transition in
  ScrollTrigger.create({
    trigger: ch6, start: 'top 80%',
    onEnter: () => gsap.to(room, { opacity: 1, duration: 0.8 }),
    onLeaveBack: () => gsap.to(room, { opacity: 0, duration: 0.4 }),
  });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: ch6, start: 'top top', end: 'bottom bottom', scrub: 1 }
  });

  tl.fromTo(ts1, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.04)
    .to(ts1, { opacity: 0, duration: 0.04 }, 0.14)

    .fromTo(hl2, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.08 }, 0.16)
    .fromTo(fc1, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.22)
    .to([hl2, fc1], { opacity: 0, duration: 0.05 }, 0.34)

    // Ring appears at 65%
    .fromTo(ringWrap, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.30)
    .fromTo(fc2, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.38)
    .to(fc2, { opacity: 0, duration: 0.05 }, 0.52)

    .fromTo(fc3, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.54)
    .to(fc3, { opacity: 0, duration: 0.05 }, 0.70)

    // Ring fills to 100% (slow, satisfying)
    .add(() => {
      if (ring) {
        gsap.to(ring, { strokeDashoffset: 0, duration: 2, ease: 'power1.inOut' });
        setTimeout(() => ring.classList.add('complete'), 2100);
      }
      if (!responseFired) {
        responseFired = true;
        _ch6_spawnAIResponse('"Let\'s start with History. You were close today."');
        setTimeout(() => _ch6_spawnAIResponse('"Cause and effect — let\'s work through it."'), 1800);
      }
    }, 0.35)

    // Completion copy — "He understood it." — longest hold on the page
    .fromTo(copy5, { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.08, ease: 'power2.out' }, 0.76)
    .to(copy5, { opacity: 0, duration: 0.05 }, 0.95);
}
