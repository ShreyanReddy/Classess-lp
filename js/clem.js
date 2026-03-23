/* ============================================================
   CLASSESS AI — CLEM WALKER
   Scroll-velocity-driven walk cycle for side-scroll chapters
   ============================================================ */

class ClemWalker {
  constructor(container) {
    this.container = container;
    this.legA = container.querySelector('.clem-leg-a');
    this.legB = container.querySelector('.clem-leg-b');
    this.armA = container.querySelector('.clem-arm-a');
    this.armB = container.querySelector('.clem-arm-b');
    this.body = container.querySelector('.clem-body-group');
    this.cycle     = 0;
    this.intensity = 0;
    this.targetIntensity = 0;
    this._tick();
  }

  update(scrollVelocity) {
    this.targetIntensity = Math.min(Math.abs(scrollVelocity) / 3, 1);
    this.intensity += (this.targetIntensity - this.intensity) * 0.08;
  }

  _tick() {
    if (this.intensity > 0.02) {
      this.cycle += 0.06 * this.intensity;
    }

    const swing = Math.sin(this.cycle) * 35 * this.intensity;
    const bob   = Math.abs(Math.sin(this.cycle)) * 3 * this.intensity;

    if (this.legA) {
      this.legA.style.transform = `rotate(${swing}deg)`;
      this.legA.style.transformOrigin = '0 0';
      this.legA.style.transformBox = 'fill-box';
    }
    if (this.legB) {
      this.legB.style.transform = `rotate(${-swing}deg)`;
      this.legB.style.transformOrigin = '0 0';
      this.legB.style.transformBox = 'fill-box';
    }
    // Counter-swing arms
    if (this.armA) {
      this.armA.style.transform = `rotate(${-swing * 0.5}deg)`;
      this.armA.style.transformBox = 'fill-box';
    }
    if (this.armB) {
      this.armB.style.transform = `rotate(${swing * 0.5}deg)`;
      this.armB.style.transformBox = 'fill-box';
    }
    if (this.body) {
      this.body.style.transform = `translateY(${-bob}px)`;
    }

    requestAnimationFrame(() => this._tick());
  }
}

// Ring fill helper — updates stroke-dashoffset for comprehension rings
function setRingFill(ringEl, fillLevel) {
  // fillLevel: 0.0 → 1.0
  const circumference = 150.8; // 2π × 24
  const offset = circumference * (1 - Math.max(0.15, Math.min(1, fillLevel)));
  ringEl.style.strokeDashoffset = offset;
}
