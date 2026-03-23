/* ============================================================
   CLASSESS AI — PARALLAX CONTROLLER
   Cursor + gyroscope input → smooth layer displacement
   ============================================================ */

class ParallaxController {
  constructor() {
    this.targetX = 0;
    this.targetY = 0;
    this.normX   = 0;
    this.normY   = 0;
    this.layers  = [];
    this.lerp    = 0.055;
    this.active  = true;

    this._bindMouseEvents();
    this._bindGyroscope();
    this._tick();
  }

  _bindMouseEvents() {
    window.addEventListener('mousemove', e => {
      this.targetX = (e.clientX / window.innerWidth  - 0.5) * 2;
      this.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  _bindGyroscope() {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+ — permission required, triggered on first touch
      document.addEventListener('touchstart', () => {
        DeviceOrientationEvent.requestPermission().then(state => {
          if (state === 'granted') this._listenGyro();
        }).catch(() => {});
      }, { once: true });
    } else {
      // Non-iOS devices
      this._listenGyro();
    }
  }

  _listenGyro() {
    window.addEventListener('deviceorientation', e => {
      if (e.gamma != null && e.beta != null) {
        this.targetX = Math.max(-1, Math.min(1,  e.gamma / 18));
        this.targetY = Math.max(-1, Math.min(1, (e.beta - 30) / 22));
      }
    });
  }

  _tick() {
    if (this.active) {
      this.normX += (this.targetX - this.normX) * this.lerp;
      this.normY += (this.targetY - this.normY) * this.lerp;

      this.layers.forEach(L => {
        L.xTo(-this.normX * L.xFactor);
        L.yTo(-this.normY * L.yFactor);
      });
    }
    requestAnimationFrame(() => this._tick());
  }

  addLayer(el, xFactor, yFactor) {
    if (!el) return;
    this.layers.push({
      el,
      xFactor,
      yFactor,
      xTo: gsap.quickTo(el, 'x', { duration: 1.05, ease: 'power2.out' }),
      yTo: gsap.quickTo(el, 'y', { duration: 1.05, ease: 'power2.out' }),
    });
  }

  // Register a set of layers for a chapter (pass array of {el, xFactor, yFactor})
  registerChapter(layerDefs) {
    layerDefs.forEach(def => this.addLayer(def.el, def.xFactor, def.yFactor));
  }

  pause()  { this.active = false; }
  resume() { this.active = true;  }
}

// Singleton
let parallaxController;
function getParallax() {
  if (!parallaxController) parallaxController = new ParallaxController();
  return parallaxController;
}
