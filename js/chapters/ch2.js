/* ============================================================
   CHAPTER 2 — CLEM'S ROOM (MORNING)
   250vh. Bedroom zoom-in. Phone glow. 5-scene sequence.
   ============================================================ */

function initCh2() {
  const ch2 = document.getElementById('ch2');
  if (!ch2) return;

  _ch2_buildRoom();
  _ch2_injectClem();
  _ch2_buildScrollTimeline();
}

/* ── Build bedroom room SVG inline ─────────────────────────── */

function _ch2_buildRoom() {
  const roomEl = document.getElementById('ch2-room');
  if (!roomEl) return;

  roomEl.innerHTML = `
  <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
       style="position:absolute;inset:0;width:100%;height:100%;">

    <!-- Wall — warm wood planks -->
    <rect width="1440" height="900" fill="#C8A878"/>
    <!-- Plank lines -->
    <line x1="0" y1="150" x2="1440" y2="150" stroke="#B89868" stroke-width="2"/>
    <line x1="0" y1="300" x2="1440" y2="300" stroke="#B89868" stroke-width="2"/>
    <line x1="0" y1="450" x2="1440" y2="450" stroke="#B89868" stroke-width="2"/>
    <line x1="0" y1="600" x2="1440" y2="600" stroke="#B89868" stroke-width="2"/>
    <line x1="0" y1="750" x2="1440" y2="750" stroke="#B89868" stroke-width="2"/>

    <!-- Floor -->
    <rect x="0" y="680" width="1440" height="220" fill="#8A6030"/>
    <line x1="0" y1="710" x2="1440" y2="710" stroke="#7A5028" stroke-width="1.5"/>
    <line x1="0" y1="740" x2="1440" y2="740" stroke="#7A5028" stroke-width="1.5"/>
    <line x1="0" y1="770" x2="1440" y2="770" stroke="#7A5028" stroke-width="1.5"/>
    <line x1="0" y1="800" x2="1440" y2="800" stroke="#7A5028" stroke-width="1.5"/>

    <!-- Window frame (left side) — Ch1 world visible through it -->
    <g transform="translate(80, 80)">
      <rect x="0" y="0" width="300" height="420" rx="4" fill="#6A4820"/>
      <rect x="16" y="16" width="268" height="388" rx="2" fill="#1A3A6A"/>
      <!-- Cross bars -->
      <line x1="16" y1="210" x2="284" y2="210" stroke="#6A4820" stroke-width="12"/>
      <line x1="150" y1="16" x2="150" y2="404" stroke="#6A4820" stroke-width="12"/>
      <!-- Window sky (mini sunrise) -->
      <rect x="20" y="20" width="124" height="186" fill="#1A3A6A"/>
      <ellipse cx="82" cy="280" rx="200" ry="130" fill="#D45A28" clip-path="url(#win-clip)"/>
      <ellipse cx="82" cy="280" rx="160" ry="100" fill="#F07838" clip-path="url(#win-clip)"/>
      <ellipse cx="82" cy="280" rx="110" ry="70"  fill="#FFB84A" clip-path="url(#win-clip)"/>
      <circle  cx="82" cy="200" r="28" fill="#FFF5A0" clip-path="url(#win-clip)"/>
    </g>
    <defs>
      <clipPath id="win-clip">
        <rect x="96" y="96" width="268" height="388"/>
      </clipPath>
    </defs>

    <!-- Wall map -->
    <g transform="translate(450, 80)" opacity="0.7">
      <rect x="0" y="0" width="180" height="130" rx="4" fill="#E8D8B0"/>
      <!-- Simple continent outlines -->
      <path d="M20,40 Q60,20 100,35 Q130,50 160,30" fill="none" stroke="#6A8040" stroke-width="3" stroke-linecap="round"/>
      <path d="M30,70 Q70,55 110,68 Q140,80 165,65" fill="none" stroke="#6A8040" stroke-width="3" stroke-linecap="round"/>
      <path d="M25,95 Q55,85 80,95 Q100,105 120,92" fill="none" stroke="#6A8040" stroke-width="3" stroke-linecap="round"/>
    </g>

    <!-- Bookshelf -->
    <g transform="translate(1150, 80)">
      <rect x="0" y="0"   width="200" height="18" rx="3" fill="#7A5028"/>
      <rect x="0" y="80"  width="200" height="18" rx="3" fill="#7A5028"/>
      <rect x="0" y="160" width="200" height="18" rx="3" fill="#7A5028"/>
      <rect x="0" y="0"   width="14" height="178" rx="3" fill="#7A5028"/>
      <rect x="186" y="0" width="14" height="178" rx="3" fill="#7A5028"/>
      <!-- Books row 1 -->
      <rect x="18"  y="22" width="22" height="54" rx="2" fill="#D45A28"/>
      <rect x="44"  y="28" width="18" height="48" rx="2" fill="#2A7A6A"/>
      <rect x="66"  y="24" width="24" height="52" rx="2" fill="#FFD166"/>
      <rect x="94"  y="26" width="20" height="50" rx="2" fill="#D45A28"/>
      <rect x="118" y="22" width="22" height="54" rx="2" fill="#9B7FD4"/>
      <rect x="144" y="28" width="18" height="48" rx="2" fill="#2A7A6A"/>
      <!-- Books row 2 -->
      <rect x="18"  y="100" width="20" height="56" rx="2" fill="#2A7A6A"/>
      <rect x="42"  y="104" width="24" height="52" rx="2" fill="#FFD166"/>
      <rect x="70"  y="100" width="18" height="56" rx="2" fill="#D45A28"/>
      <rect x="92"  y="102" width="22" height="54" rx="2" fill="#9B7FD4"/>
      <rect x="118" y="100" width="24" height="56" rx="2" fill="#2A7A6A"/>
    </g>

    <!-- Desk -->
    <rect x="500" y="580" width="520" height="16" rx="4" fill="#8A6030"/>
    <rect x="510" y="596" width="14" height="90" rx="3" fill="#7A5028"/>
    <rect x="996" y="596" width="14" height="90" rx="3" fill="#7A5028"/>
    <rect x="700" y="596" width="10" height="90" rx="3" fill="#7A5028"/>

    <!-- Mug on desk -->
    <rect x="920" y="548" width="28" height="32" rx="4" fill="#9B7FD4"/>
    <path d="M948,558 Q960,558 960,568 Q960,578 948,578" fill="none" stroke="#9B7FD4" stroke-width="4"/>

    <!-- Backpack strap (bottom right) -->
    <path d="M1300,720 Q1320,700 1340,680 Q1360,660 1380,650"
          fill="none" stroke="#5A3018" stroke-width="16" stroke-linecap="round"/>

    <!-- Phone on desk -->
    <rect id="ch2-phone" x="720" y="524" width="52" height="82" rx="8" fill="#2A2A3A"/>
    <!-- Phone screen glow -->
    <ellipse class="phone-glow" cx="746" cy="590" rx="60" ry="40"
             fill="#FFE080" opacity="0.35" filter="url(#phone-blur)"/>
    <defs>
      <filter id="phone-blur">
        <feGaussianBlur stdDeviation="10"/>
      </filter>
    </defs>
    <!-- Screen content -->
    <rect x="726" y="532" width="36" height="66" rx="4" fill="#1A2A4A"/>
    <rect x="730" y="538" width="28" height="6" rx="2" fill="#F4834A" opacity="0.9"/>
    <rect x="730" y="548" width="20" height="4" rx="2" fill="#FFFFFF" opacity="0.6"/>
    <rect x="730" y="556" width="24" height="4" rx="2" fill="#FFFFFF" opacity="0.4"/>
    <rect x="730" y="564" width="18" height="4" rx="2" fill="#FFD166" opacity="0.7"/>

    <!-- Bed (right side) -->
    <rect x="1050" y="460" width="380" height="240" rx="8" fill="#F0E8D8"/>
    <rect x="1050" y="460" width="380" height="40"  rx="8" fill="#D8C8B0"/>
    <rect x="1050" y="460" width="40"  height="240" rx="4" fill="#5A3018"/>
    <rect x="1390" y="460" width="40"  height="240" rx="4" fill="#5A3018"/>
    <!-- Pillow -->
    <rect x="1080" y="470" width="140" height="80" rx="8" fill="#FFFFFF" opacity="0.9"/>

  </svg>`;
}

/* ── Inject seated Clem ──────────────────────────────────── */

function _ch2_injectClem() {
  const container = document.getElementById('clem-ch2');
  if (!container) return;
  container.style.cssText = 'position:absolute;bottom:14%;left:46%;z-index:90;';
  fetch('svg/characters/clem-seated.svg')
    .then(r => r.text())
    .then(t => { container.innerHTML = t; })
    .catch(() => {});
}

/* ── Scroll timeline — 5 scenes across 250vh ────────────── */

function _ch2_buildScrollTimeline() {
  const ch2 = document.getElementById('ch2');
  if (!ch2) return;

  const room    = document.getElementById('ch2-room');
  const overlay = document.getElementById('ch2-zoom-overlay');
  const ts1     = document.getElementById('ch2-s1-ts');
  const hl2     = document.getElementById('ch2-s2-hl');
  const copy3   = document.getElementById('ch2-s3-copy');
  const ready   = document.getElementById('ch2-s5-ready');
  const fc1     = document.getElementById('fc-ch2-1');
  const fc2     = document.getElementById('fc-ch2-2');
  const fc3     = document.getElementById('fc-ch2-3');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ch2,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    }
  });

  // Scene 2.1 — Transition in: flash + room reveals (0–15%)
  tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0)
    .to(overlay, { opacity: 0, duration: 0.08 }, 0.04)
    .fromTo(room, { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.05)
    .fromTo(ts1, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.1 }, 0.08);

  // Scene 2.2 — Headline (15–40%)
  tl.fromTo(hl2, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.15)
    .fromTo(fc1, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.22)
    .to([hl2, fc1], { opacity: 0, duration: 0.06 }, 0.38);

  // Scene 2.3 — Gap detection (40–60%)
  tl.fromTo(copy3, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.08 }, 0.40)
    .fromTo(fc2, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.45)
    .to([copy3, fc2], { opacity: 0, duration: 0.06 }, 0.58);

  // Scene 2.4 — Feature card: Daily Arc (60–78%)
  tl.fromTo(fc3, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.62)
    .to(fc3, { opacity: 0, duration: 0.06 }, 0.76);

  // Scene 2.5 — Ready (78–95%)
  tl.fromTo(ready, { opacity: 0, scale: 0.92 },
    { opacity: 1, scale: 1, duration: 0.1, ease: 'power2.out' }, 0.80);

  // Fade ts1 out late
  tl.to(ts1, { opacity: 0, duration: 0.06 }, 0.90);
}
