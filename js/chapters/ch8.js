/* ============================================================
   CHAPTER 8 — THE CLIFF (CTA)
   280vh. Emotional peak. Clem silhouette on cliff.
   Title fade: EXACTLY 3.0 seconds. Never change this.
   ============================================================ */

function initCh8() {
  const ch8 = document.getElementById('ch8');
  if (!ch8) return;

  _ch8_buildPhaseWalk();
  _ch8_buildSunsetSky();
  _ch8_buildCliff();
  _ch8_injectClemSilhouette();
  _ch8_scrollTimeline();
}

/* ── Phase 1 background: night stars (mirrors Ch7 end state) ─ */

function _ch8_buildPhaseWalk() {
  const phaseWalk = document.getElementById('ch8-phase-walk');
  if (!phaseWalk) return;

  // Night stars so phase 1 continues Ch7's visual atmosphere
  const stars = Array.from({length:40}, (_, i) => {
    const x = Math.random() * 1440;
    const y = Math.random() * 600;
    const r = 0.8 + Math.random() * 2;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF" opacity="${0.4 + Math.random()*0.5}"/>`;
  }).join('');

  phaseWalk.innerHTML = `
  <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
       style="position:absolute;inset:0;width:100%;height:100%;">
    <rect width="1440" height="900" fill="#0D0B1E"/>
    <rect width="1440" height="420" fill="#070614"/>
    <g>${stars}</g>
    <!-- Path approaching cliff -->
    <path d="M0,900 Q300,840 600,810 Q900,785 1200,800 Q1380,810 1440,815 L1440,900Z"
          fill="#C8D8F8" opacity="0.10"/>
    <!-- Ground -->
    <rect x="0" y="800" width="1440" height="100" fill="#0A0814"/>
    <!-- Mountain silhouettes -->
    <path d="M0,900 L0,500 Q200,360 400,440 Q600,520 800,380 Q1000,240 1200,360
             Q1350,440 1440,400 L1440,900Z" fill="#070614"/>
  </svg>`;
}

/* ── Sunset sky — most dramatic sky on the page ──────────── */

function _ch8_buildSunsetSky() {
  const sky = document.getElementById('ch8-sky');
  if (!sky) return;

  sky.innerHTML = `
  <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
       style="position:absolute;inset:0;width:100%;height:100%;">

    <!-- Deep indigo-violet top -->
    <rect width="1440" height="900" fill="#1A0A2E"/>

    <!-- Blazing orange-gold arc system — horizon-facing, max intensity -->
    <defs><clipPath id="ch8-clip"><rect width="1440" height="540"/></clipPath></defs>
    <g clip-path="url(#ch8-clip)">
      <ellipse cx="720" cy="540" rx="1400" ry="480" fill="#4A1870"/>
      <ellipse cx="720" cy="540" rx="1180" ry="380" fill="#B83E18"/>
      <ellipse cx="720" cy="540" rx="940"  ry="290" fill="#D45A28"/>
      <ellipse cx="720" cy="540" rx="720"  ry="210" fill="#F07838"/>
      <ellipse cx="720" cy="540" rx="520"  ry="148" fill="#F4924A"/>
      <ellipse cx="720" cy="540" rx="340"  ry="94"  fill="#FFB84A"/>
      <ellipse cx="720" cy="540" rx="180"  ry="48"  fill="#FFD166"/>
    </g>

    <!-- Horizon line -->
    <line x1="0" y1="540" x2="1440" y2="540" stroke="#FFD166" stroke-width="1" opacity="0.4"/>

    <!-- Ocean — flat dark water -->
    <rect x="0" y="540" width="1440" height="360" fill="#0A1628"/>

    <!-- Sun on horizon — largest on the page -->
    <g transform="translate(720, 540)">
      <circle cx="0" cy="0" r="98"  fill="#FFE580" opacity="0.3" class="sun-halo"/>
      <circle cx="0" cy="0" r="80"  fill="#FFF5A0"/>
      <circle cx="0" cy="0" r="60"  fill="#FFFCE0"/>
      ${Array.from({length:12}, (_, i) => {
        const angle = i * 30;
        return `<rect x="-2" y="-118" width="4" height="22" rx="2" fill="#FFE566" opacity="0.7"
          transform="rotate(${angle})"/>`;
      }).join('')}
    </g>

    <!-- Ocean shimmer column -->
    <path d="M700,540 L710,540 L810,900 L630,900Z"
          fill="#C89030" opacity="0.4" class="ocean-shimmer"/>

    <!-- Residual stars (upper sky) -->
    <circle cx="200"  cy="80"  r="1.5" fill="#FFFFFF" opacity="0.7"/>
    <circle cx="450"  cy="50"  r="1"   fill="#FFFFFF" opacity="0.6"/>
    <circle cx="700"  cy="35"  r="1.5" fill="#FFFFFF" opacity="0.8"/>
    <circle cx="950"  cy="65"  r="1"   fill="#FFFFFF" opacity="0.5"/>
    <circle cx="1200" cy="45"  r="1.5" fill="#FFFFFF" opacity="0.7"/>

  </svg>`;
}

/* ── Cliff shape ─────────────────────────────────────────── */

function _ch8_buildCliff() {
  const phaseCliff = document.getElementById('ch8-phase-cliff');
  if (!phaseCliff) return;

  const div = document.createElement('div');
  div.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:2;';
  div.innerHTML = `
  <svg viewBox="0 0 1440 900" style="position:absolute;inset:0;width:100%;height:100%;">
    <path d="M-20,900 L-20,800 Q80,750 160,720 Q220,705 280,700 Q340,698 400,710 L440,900Z"
          fill="#0A0608"/>
    <path d="M1460,900 L1460,800 Q1360,750 1280,720 Q1220,705 1160,700 Q1100,698 1040,710 L1000,900Z"
          fill="#0A0608"/>
    <path d="M400,900 L400,710 Q480,700 560,696 Q640,693 720,694 Q800,695 880,698 Q960,702 1000,710 L1000,900Z"
          fill="#0A0608"/>
  </svg>`;
  phaseCliff.appendChild(div);
}

/* ── Inject Clem silhouette (position:fixed, stays forever) ─ */

function _ch8_injectClemSilhouette() {
  const container = document.getElementById('clem-cliff');
  if (!container) return;
  fetch('svg/characters/clem-silhouette.svg')
    .then(r => r.text())
    .then(t => {
      container.innerHTML = t;
      const svg = container.querySelector('svg');
      if (svg) {
        svg.setAttribute('width',  '80');
        svg.setAttribute('height', '149');
      }
    })
    .catch(() => {});
}

/* ── Scroll timeline — 4 phases, SINGLE onUpdate ────────── */

function _ch8_scrollTimeline() {
  const ch8        = document.getElementById('ch8');
  const phaseWalk  = document.getElementById('ch8-phase-walk');
  const phaseCliff = document.getElementById('ch8-phase-cliff');
  const title      = document.getElementById('ch8-title');
  const cta        = document.getElementById('ch8-cta');
  const clemCliff  = document.getElementById('clem-cliff');
  const gnav       = document.getElementById('gnav');

  // Initial states
  if (phaseWalk)  gsap.set(phaseWalk,  { opacity: 1 });
  if (phaseCliff) gsap.set(phaseCliff, { opacity: 0 });
  if (clemCliff)  gsap.set(clemCliff,  { opacity: 0 });
  if (title)      gsap.set(title,      { opacity: 0 });
  if (cta)        gsap.set(cta,        { opacity: 0, y: 20 });

  let titleFired = false;
  let silhouetteDone = false;

  // Single ScrollTrigger with one onUpdate — merges all 4 phases
  ScrollTrigger.create({
    trigger: ch8,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: self => {
      const p = self.progress;

      // ── Phase 1 (0–25%): night walk ───────────────────────
      if (p < 0.25) {
        gsap.set(phaseWalk,  { opacity: 1 });
        gsap.set(phaseCliff, { opacity: 0 });
        if (clemCliff) gsap.set(clemCliff, { opacity: 0 });
        if (gnav) gnav.classList.remove('ch8-active');

      // ── Phase 2 (25–50%): crossfade walk → cliff ──────────
      } else if (p < 0.50) {
        const t = (p - 0.25) / 0.25;  // 0→1
        gsap.set(phaseWalk,  { opacity: 1 - t });
        gsap.set(phaseCliff, { opacity: t });
        if (clemCliff) gsap.set(clemCliff, { opacity: t });
        if (gnav) gnav.classList.toggle('ch8-active', t > 0.5);

        // Transition Clem to silhouette once at midpoint
        if (t > 0.5 && !silhouetteDone && clemCliff) {
          silhouetteDone = true;
          document.querySelectorAll('#clem-cliff .clem-all').forEach(el => {
            el.style.fill   = '#0D0B1E';
            el.style.stroke = '#0D0B1E';
          });
          clemCliff.classList.add('silhouette');
        }

      // ── Phase 3–4 (50–100%): cliff fully established ──────
      } else {
        gsap.set(phaseWalk,  { opacity: 0 });
        gsap.set(phaseCliff, { opacity: 1 });
        if (clemCliff) gsap.set(clemCliff, { opacity: 1 });
        if (gnav) gnav.classList.add('ch8-active');

        // Phase 4 (72%+): fire title once — EXACTLY 3.0 seconds
        if (p > 0.72 && !titleFired) {
          titleFired = true;

          gsap.to(title, {
            opacity: 1,
            duration: 3.0,         // NON-NEGOTIABLE
            ease: 'power1.inOut',
          });

          // CTA: tagline 1.5s after title completes (4.5s from now)
          setTimeout(() => {
            gsap.to(cta, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' });
            cta.classList.add('active');

            gsap.fromTo('.ch8-tagline',
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }
            );

            // Button 0.6s after tagline
            setTimeout(() => {
              gsap.fromTo('.ch8-cta-btn',
                { opacity: 0, y: 20, scale: 0.88 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }
              );
            }, 600);
          }, 4500);
        }
      }
    }
  });
}
