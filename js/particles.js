/* ============================================================
   CLASSESS AI — PARTICLE ENGINE
   Canvas-based particle transitions between chapters
   ============================================================ */

const PARTICLE_DIRECTIONS = {
  ch0_ch1:  { x:  0,    y: -0.8 },
  ch1_ch2:  { x:  0,    y: -0.6 },
  ch2_ch3:  { x:  0.4,  y: -0.4 },
  ch3_ch4:  { x:  0.3,  y: -0.3 },
  ch4_ch5:  { x:  0.5,  y: -0.2 },
  ch5_ch6:  { x:  0.3,  y: -0.5 },
  ch6_ch7:  { x:  0,    y: -0.7 },
  ch7_ch8:  { x:  0,    y: -0.4 },
  ch8_ch9:  { x:  0,    y: -0.9 },
};

const PARTICLE_QUALITY = {
  high:   { maxParticles: 600, spawnRate: 1.0 },
  medium: { maxParticles: 280, spawnRate: 0.5 },
  low:    { maxParticles: 80,  spawnRate: 0.2 },
};

function rand(min, max) { return Math.random() * (max - min) + min; }

class Particle {
  constructor(x, y, color, direction, tier) {
    this.x     = x;
    this.y     = y;
    this.color = color;
    this.size  = this._weightedSize(tier);
    this.opacity = 1;
    this.vx    = rand(-0.8, 0.8) + direction.x;
    this.vy    = rand(-1.2, -0.3) + direction.y;
    this.life  = 1;
    this.decay = rand(0.006, 0.018);
    this.isGlow = this.size >= 8 && tier !== 'low';
  }

  _weightedSize(tier) {
    if (tier === 'low') return rand(2, 4);
    const r = Math.random();
    if (r < 0.5) return 2;
    if (r < 0.75) return 3;
    if (r < 0.88) return 4;
    if (r < 0.95) return 5;
    return rand(8, 10);
  }

  update() {
    this.x  += this.vx;
    this.y  += this.vy;
    this.vy += 0.015;
    this.life -= this.decay;
    this.opacity = this.life;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.opacity);
    if (this.isGlow) {
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
      g.addColorStop(0, this.color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.restore();
  }
}

class ParticleEngine {
  constructor(canvas, tier) {
    this.canvas    = canvas;
    this.ctx       = canvas.getContext('2d');
    this.tier      = tier || 'medium';
    this.particles = [];
    this.running   = false;
    this._resize();
    window.addEventListener('resize', () => this._resize());
    this._loop();
  }

  _resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _loop() {
    if (!this.running && this.particles.length === 0) {
      requestAnimationFrame(() => this._loop());
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update & draw, prune dead particles
    this.particles = this.particles.filter(p => {
      p.update();
      p.draw(this.ctx);
      return p.life > 0;
    });

    // Enforce max
    const max = PARTICLE_QUALITY[this.tier].maxParticles;
    if (this.particles.length > max) {
      this.particles.splice(0, this.particles.length - max);
    }

    requestAnimationFrame(() => this._loop());
  }

  // Burst: spawn particles from a source element or point
  burst(options) {
    const {
      x, y,
      color    = '#F4834A',
      count    = 60,
      dirKey   = null,
    } = options;

    const dir = dirKey ? PARTICLE_DIRECTIONS[dirKey] : { x: 0, y: -0.5 };
    const rate = PARTICLE_QUALITY[this.tier].spawnRate;
    const actualCount = Math.floor(count * rate);

    this.running = true;
    for (let i = 0; i < actualCount; i++) {
      const px = x + rand(-20, 20);
      const py = y + rand(-10, 10);
      this.particles.push(new Particle(px, py, color, dir, this.tier));
    }
  }

  // Scatter: spawn particles across an element's bounding rect
  scatter(el, dirKey, colors) {
    const rect = el.getBoundingClientRect();
    const dir  = PARTICLE_DIRECTIONS[dirKey] || { x: 0, y: -0.5 };
    const rate = PARTICLE_QUALITY[this.tier].spawnRate;
    const count = Math.floor(40 * rate);
    const colorList = colors || ['#F4834A', '#FFD166', '#FFB84A'];

    this.running = true;
    for (let i = 0; i < count; i++) {
      const px = rect.left + rand(0, rect.width);
      const py = rect.top  + rand(0, rect.height);
      const color = colorList[Math.floor(Math.random() * colorList.length)];
      this.particles.push(new Particle(px, py, color, dir, this.tier));
    }
  }

  stop() { this.running = false; }
}

let particleEngine;
function getParticles() { return particleEngine; }
function initParticles(tier) {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  particleEngine = new ParticleEngine(canvas, tier);
  return particleEngine;
}
