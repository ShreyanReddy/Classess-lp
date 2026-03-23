/* ============================================================
   CHAPTER 5 — THE AFTERNOON WALK
   280vh. Golden light. Floating data cards drift left.
   ============================================================ */

let ch5Walker = null;

function initCh5() {
  const ch5 = document.getElementById('ch5');
  if (!ch5) return;

  _ch5_buildWorld();
  _ch5_injectClem();
  _ch5_buildCards();
  _ch5_scrollTimeline();
}

/* ── Build afternoon world (golden hues) ─────────────────── */

function _ch5_buildWorld() {
  const skyEl = document.getElementById('ch5-l-sky');
  if (skyEl) skyEl.innerHTML = `
    <svg viewBox="0 0 4320 900" preserveAspectRatio="xMinYMid slice"
         style="position:absolute;top:0;left:0;width:300%;height:100%;">
      <rect width="4320" height="900" fill="#8A3A08"/>
      <defs><clipPath id="ch5-sky-clip"><rect width="4320" height="680"/></clipPath></defs>
      <g clip-path="url(#ch5-sky-clip)">
        <ellipse cx="720" cy="900" rx="1200" ry="760" fill="#B83E18"/>
        <ellipse cx="720" cy="900" rx="960"  ry="590" fill="#D45A28"/>
        <ellipse cx="720" cy="900" rx="720"  ry="430" fill="#F07838"/>
        <ellipse cx="720" cy="900" rx="500"  ry="300" fill="#FFB84A"/>
      </g>
    </svg>`;

  const groundEl = document.getElementById('ch5-l-ground');
  if (groundEl) groundEl.innerHTML = `
    <svg viewBox="0 0 4320 900" preserveAspectRatio="xMinYMid slice"
         style="position:absolute;top:0;left:0;width:300%;height:100%;">
      <rect x="0" y="700" width="4320" height="200" fill="#3E8844"/>
      <path d="M0,900 Q600,830 1200,800 Q1800,770 2400,785 Q3000,800 3600,790 Q4000,785 4320,800 L4320,900Z"
            fill="#C8986A"/>
    </svg>`;

  const treesEl = document.getElementById('ch5-l-trees');
  if (treesEl) treesEl.innerHTML = `
    <svg viewBox="0 0 4320 900" preserveAspectRatio="xMinYMid slice"
         style="position:absolute;top:0;left:0;width:300%;height:100%;">
      ${Array.from({length:20}, (_,i) => {
        const x = (i/20)*4320 + 80;
        const shade = ['#1A5E2A','#247034','#2E7A3E'][i%3];
        return `<g transform="translate(${x},660)">
          <rect x="-5" y="0" width="10" height="55" rx="3" fill="#5A3018"/>
          <circle cx="0" cy="-22" r="34" fill="${shade}"/>
          <circle cx="-14" cy="-10" r="24" fill="${shade==='#1A5E2A'?'#247034':'#1A5E2A'}"/>
          <circle cx="14" cy="-10" r="26" fill="${shade}"/>
        </g>`;
      }).join('')}
    </svg>`;

  const fgEl = document.getElementById('ch5-l-fg');
  if (fgEl) fgEl.innerHTML = `
    <svg viewBox="0 0 4320 900" preserveAspectRatio="xMinYMid slice"
         style="position:absolute;top:0;left:0;width:300%;height:100%;">
      <rect x="0" y="820" width="4320" height="80" fill="#2E7834"/>
    </svg>`;
}

/* ── Inject Clem (afternoon posture — hand in pocket) ────── */

function _ch5_injectClem() {
  const container = document.getElementById('clem-walk-5');
  if (!container) return;
  fetch('svg/characters/clem.svg')
    .then(r => r.text())
    .then(t => {
      container.innerHTML = t;
      ch5Walker = new ClemWalker(container);
      const l = getLenis();
      if (l) l.on('scroll', e => { if (ch5Walker) ch5Walker.update(e.velocity); });
    })
    .catch(() => {});
}

/* ── Build data card elements ────────────────────────────── */

const CH5_CARDS_DATA = [
  { type: 'strength', title: 'Algebra',        body: 'Strong performance. 87% mastery.',   delay: 0.22 },
  { type: 'gap',      title: 'History',         body: 'Cause & effect — needs review.',     delay: 0.34 },
  { type: 'quiz',     title: 'Quick check',     body: 'Lab procedure quiz on Thursday.',    delay: 0.46 },
  { type: 'teacher',  title: 'Mr K noted',      body: 'Great participation in lab today.',  delay: 0.55 },
];

function _ch5_buildCards() {
  const track = document.getElementById('ch5-cards');
  if (!track) return;

  CH5_CARDS_DATA.forEach((card, i) => {
    const el = document.createElement('div');
    el.className = `data-card data-card--${card.type}`;
    el.style.cssText = `top:${42 + i*6}%;right:-230px;`;
    el.innerHTML = `
      <div class="data-card-title">${card.title}</div>
      <div class="data-card-body">${card.body}</div>`;
    el.dataset.index = i;
    track.appendChild(el);
  });
}

/* ── Scroll timeline ─────────────────────────────────────── */

function _ch5_scrollTimeline() {
  const ch5      = document.getElementById('ch5');
  const ts1      = document.getElementById('ch5-s1-ts');
  const fc1      = document.getElementById('fc-ch5-1');
  const fc2      = document.getElementById('fc-ch5-2');
  const focusCard = document.getElementById('ch5-focus-card');
  const copy5    = document.getElementById('ch5-s5-copy');
  const cards    = document.querySelectorAll('#ch5-cards .data-card');

  const layers = [
    { el: document.getElementById('ch5-l-sky'),    speed: 0.05 },
    { el: document.getElementById('ch5-l-mtn'),    speed: 0.12 },
    { el: document.getElementById('ch5-l-hills'),  speed: 0.22 },
    { el: document.getElementById('ch5-l-ground'), speed: 0.38 },
    { el: document.getElementById('ch5-l-trees'),  speed: 0.55 },
    { el: document.getElementById('ch5-l-fg'),     speed: 0.72 },
  ];

  const scrollDist = ch5.offsetHeight - window.innerHeight;

  ScrollTrigger.create({
    trigger: ch5,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: self => {
      const p  = self.progress;
      const px = p * scrollDist;
      layers.forEach(L => { if (L.el) gsap.set(L.el, { x: -px * L.speed }); });

      // Drive cards from right to left
      if (p > 0.18) {
        const travel = (p - 0.18) * scrollDist * 0.9;
        cards.forEach((card, i) => {
          const offset = i * 180;
          const x = -travel + offset + window.innerWidth;
          const opacity = (x > -240 && x < window.innerWidth + 60) ? 1 : 0;
          gsap.set(card, { x, opacity });

          // Gap card focus: slow down when it reaches Clem (center)
          if (card.classList.contains('data-card--gap')) {
            const isCentered = x > window.innerWidth * 0.35 && x < window.innerWidth * 0.65;
            card.classList.toggle('focused', isCentered);
            if (focusCard) {
              const focusOpacity = isCentered ? 1 : 0;
              gsap.to(focusCard, { opacity: focusOpacity, duration: 0.3 });
              if (isCentered) {
                gsap.set(focusCard, { left: `${x + 20}px`, top: `52%` });
              }
            }
          }
        });
      }
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: ch5, start: 'top top', end: 'bottom bottom', scrub: 1 }
  });

  tl.fromTo(ts1, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.02)
    .to(ts1, { opacity: 0, duration: 0.04 }, 0.14)
    .fromTo(fc1, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.20)
    .to(fc1, { opacity: 0, duration: 0.05 }, 0.40)
    .fromTo(fc2, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.50)
    .to(fc2, { opacity: 0, duration: 0.05 }, 0.70)
    .fromTo(copy5, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.76)
    .to(copy5, { opacity: 0, duration: 0.05 }, 0.92);
}
