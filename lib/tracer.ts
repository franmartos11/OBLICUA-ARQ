// Motor de "trazado" de los planos: anima cada elemento SVG en orden, capa por capa,
// con una pluma que sigue el trazo. Portado 1:1 del diseño original.

type Kind = 's' | 'cv' | 'ch' | 't' | 'f' | 'x' | 'm' | 'o' | string;

type Item = {
  el: Element;
  k: Kind;
  bb: DOMRect | null;
  len: number;
  work: number;
  chars: number;
  m: DOMMatrix | null;
  start: number;
  dur: number;
  anim: Animation;
};

export type TracerEvent = 'start' | 'pause' | 'replay' | 'jump' | 'scrub' | 'skip' | 'complete';

export type TracerOptions = {
  svg: SVGSVGElement;
  pen?: SVGGElement | null;
  reduce?: boolean;
  cnt?: HTMLElement | null;
  scrubEl?: HTMLInputElement | null;
  scroller?: HTMLElement | null;
  lis?: HTMLElement[];
  budget: number[];
  gap?: number;
  preset?: number;
  minStartAt?: number;
  id?: string;
  key?: string;
  getEls: (layer: number) => Element[];
  onChange?: (playing: boolean, ended: boolean, t: number) => void;
};

type Layer = { start: number; end: number };

const isGraphics = (el: Element): el is SVGGraphicsElement => typeof (el as SVGGraphicsElement).getBBox === 'function';

export class Tracer {
  svg: SVGSVGElement;
  pen: SVGGElement | null;
  reduce: boolean;
  cnt: HTMLElement | null;
  scrubEl: HTMLInputElement | null;
  scroller: HTMLElement | null;
  lis: HTMLElement[];
  budget: number[];
  gap: number;
  preset: number;
  minStartAt: number;
  id: string;
  key: string;
  getEls: (layer: number) => Element[];
  onChange?: (playing: boolean, ended: boolean, t: number) => void;

  items: Item[] = [];
  lay: Layer[] = [];
  t = 0;
  total = 0;
  raf = 0;
  last = 0;
  playing = false;
  started = false;
  autoPaused = false;
  userPanned = false;
  dragging = false;
  emitted = false;
  timer: ReturnType<typeof setTimeout> | undefined;
  io: IntersectionObserver | undefined;

  constructor(o: TracerOptions) {
    this.svg = o.svg;
    this.pen = o.pen ?? null;
    this.reduce = !!o.reduce;
    this.cnt = o.cnt ?? null;
    this.scrubEl = o.scrubEl ?? null;
    this.scroller = o.scroller ?? null;
    this.lis = o.lis ?? [];
    this.budget = o.budget;
    this.gap = o.gap ?? 260;
    this.preset = o.preset ?? 0;
    this.minStartAt = o.minStartAt ?? 0;
    this.id = o.id ?? 'anim';
    this.key = o.key ?? '';
    this.getEls = o.getEls;
    this.onChange = o.onChange;
    if (this.scroller) {
      this.scroller.addEventListener('pointerdown', this.onPan);
      this.scroller.addEventListener('wheel', this.onPan, { passive: true });
    }
  }

  tick = (now: number) => {
    if (!this.playing) return;
    const dt = this.last ? Math.min(64, now - this.last) : 0;
    this.last = now;
    this.seek(this.t + dt);
    if (this.t >= this.total) {
      this.playing = false;
      if (this.pen) this.pen.setAttribute('opacity', '0');
      this.markSeen();
      this.emit('complete');
      this.notify();
      return;
    }
    this.raf = requestAnimationFrame(this.tick);
  };

  onPan = () => {
    this.userPanned = true;
  };

  notify() {
    if (this.onChange) this.onChange(this.playing, this.t >= this.total, this.t);
  }

  emit(type: TracerEvent) {
    try {
      window.dispatchEvent(
        new CustomEvent('oblicua:anim', {
          detail: { id: this.id, type, progress: Math.round((this.t / this.total) * 100), at: Math.round(performance.now()) },
        }),
      );
    } catch {}
  }

  markSeen() {
    try {
      if (this.key) sessionStorage.setItem(this.key, '1');
    } catch {}
  }

  seen() {
    try {
      return !!(this.key && sessionStorage.getItem(this.key));
    } catch {
      return false;
    }
  }

  presetT() {
    return this.preset && this.lay[this.preset - 1] ? this.lay[this.preset - 1].end : 0;
  }

  finish(type: TracerEvent) {
    this.playing = false;
    cancelAnimationFrame(this.raf);
    this.seek(this.total);
    if (this.pen) this.pen.setAttribute('opacity', '0');
    this.markSeen();
    this.emit(type);
    this.notify();
  }

  build() {
    const svg = this.svg;
    if (!svg || !svg.animate || !svg.getScreenCTM) return;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const inv = ctm.inverse();
    let t = 0;
    for (let l = 1; l < this.budget.length; l++) {
      const info = this.getEls(l).map((el) => {
        const k = el.getAttribute('data-k') ?? '';
        const g = isGraphics(el) ? el : null;
        const bb = g ? g.getBBox() : null;
        const chars = (el.textContent || '').length;
        let len = 0;
        let work = 30;
        const geo = el as SVGGeometryElement;
        if (k === 's' && typeof geo.getTotalLength === 'function') {
          len = geo.getTotalLength();
          work = len;
        } else if (k === 'cv' && bb) work = bb.height;
        else if (k === 'ch' && bb) work = bb.width;
        else if (k === 't') work = chars * 14;
        else if (k === 'f' && bb) work = Math.max(bb.width, bb.height) * 0.5;
        else if (k === 'm') work = 160;
        const pen = !!g && !el.hasAttribute('data-nopen') && g.ownerSVGElement === svg;
        const sc = g ? g.getScreenCTM() : null;
        return { el, k, bb, len, work, chars, m: pen && sc ? inv.multiply(sc) : null };
      });
      const sum = info.reduce((a, b) => a + b.work, 0) || 1;
      const start = t;
      info.forEach((it) => {
        const dur = Math.max(12, (it.work / sum) * this.budget[l]);
        const bb = it.bb;
        const hz: Keyframe[] = [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }];
        const vt: Keyframe[] = [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)' }];
        let kf: Keyframe[] = [{ opacity: 0 }, { opacity: 1 }];
        let easing = 'linear';
        if (it.k === 's') kf = [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }];
        else if (it.k === 'cv') kf = vt;
        else if (it.k === 'ch') kf = hz;
        else if (it.k === 't') {
          kf = hz;
          easing = 'steps(' + Math.max(1, it.chars) + ', end)';
        } else if (it.k === 'f') kf = bb && bb.width >= bb.height ? hz : vt;
        else if (it.k === 'x') kf = [{ opacity: 1 }, { opacity: 0 }];
        else if (it.k === 'm') {
          kf = [{ transform: 'translateY(' + (it.el.getAttribute('data-dy') || 0) + 'px)' }, { transform: 'translateY(0px)' }];
          easing = 'cubic-bezier(.65,0,.35,1)';
        }
        const anim = it.el.animate(kf, { duration: dur, delay: t, fill: 'both', easing });
        anim.pause();
        this.items.push({ ...it, start: t, dur, anim });
        t += dur;
      });
      this.lay.push({ start, end: t });
      t += this.gap;
    }
    this.total = Math.max(1, t - this.gap);
  }

  seek(time: number) {
    this.t = Math.max(0, Math.min(this.total, time));
    const T = this.t;
    for (const it of this.items) it.anim.currentTime = T;
    const pct = T / this.total;
    if (this.cnt) this.cnt.style.setProperty('--p', String(Math.round(pct * 100)));
    if (this.scrubEl) {
      if (!this.dragging) this.scrubEl.value = String(Math.round(pct * 1000));
      this.scrubEl.style.setProperty('--pr', (pct * 100).toFixed(2) + '%');
    }
    this.lis.forEach((li, i) => {
      const L = this.lay[i];
      if (!L) return;
      const s = T >= L.end ? 'done' : T >= L.start ? 'active' : 'pending';
      if (li.getAttribute('data-state') !== s) li.setAttribute('data-state', s);
      const ln = li.querySelector<SVGLineElement>('line.dr');
      if (ln) ln.style.strokeDashoffset = String(1 - Math.max(0, Math.min(1, (T - L.start) / (L.end - L.start))));
    });
    this.updatePen(T);
  }

  updatePen(T: number) {
    if (!this.pen) return;
    let it: Item | null = null;
    for (const x of this.items) {
      if (x.m && T >= x.start && T < x.start + x.dur) {
        it = x;
        break;
      }
    }
    if (!it || !it.bb || !it.m || !(this.playing || this.dragging)) {
      this.pen.setAttribute('opacity', '0');
      return;
    }
    const p = (T - it.start) / it.dur;
    const bb = it.bb;
    let x = bb.x + bb.width / 2;
    let y = bb.y + bb.height / 2;
    if (it.k === 's') {
      const pt = (it.el as SVGGeometryElement).getPointAtLength(p * it.len);
      x = pt.x;
      y = pt.y;
    } else if (it.k === 'cv') {
      y = bb.y + p * bb.height;
    } else if (it.k === 'ch' || it.k === 't') {
      x = bb.x + p * bb.width;
      y = bb.y + bb.height;
    } else if (it.k === 'f') {
      if (bb.width >= bb.height) x = bb.x + p * bb.width;
      else y = bb.y + p * bb.height;
    }
    const q = new DOMPoint(x, y).matrixTransform(it.m);
    this.pen.setAttribute('transform', 'translate(' + q.x.toFixed(1) + ' ' + q.y.toFixed(1) + ')');
    this.pen.setAttribute('opacity', '1');
    this.follow(q);
  }

  follow(q: DOMPoint) {
    const sc = this.scroller;
    if (!sc || this.userPanned || !this.playing || sc.scrollWidth <= sc.clientWidth + 2) return;
    const ctm = this.svg.getScreenCTM();
    if (!ctm) return;
    const pt = new DOMPoint(q.x, q.y).matrixTransform(ctm);
    const r = sc.getBoundingClientRect();
    const target = sc.scrollLeft + (pt.x - r.left) - sc.clientWidth / 2;
    sc.scrollLeft += (target - sc.scrollLeft) * 0.12;
  }

  play() {
    if (!this.items.length) return;
    if (this.t >= this.total) this.seek(0);
    if (!this.emitted || this.t === 0) {
      this.emitted = true;
      this.emit('start');
    }
    this.playing = true;
    this.started = true;
    this.last = 0;
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.tick);
    this.notify();
  }

  pause() {
    this.playing = false;
    cancelAnimationFrame(this.raf);
    if (this.pen && !this.dragging) this.pen.setAttribute('opacity', '0');
    this.notify();
  }

  toggle() {
    this.autoPaused = false;
    if (this.playing) {
      this.pause();
      this.emit('pause');
    } else this.play();
  }

  replay() {
    this.autoPaused = false;
    this.userPanned = false;
    this.seek(0);
    this.emit('replay');
    this.play();
  }

  goLayer(i: number) {
    this.autoPaused = false;
    this.userPanned = false;
    this.seek(this.lay[i] ? this.lay[i].start : 0);
    this.emit('jump');
    this.play();
  }

  scrubStart() {
    this.dragging = true;
    if (this.playing) this.pause();
  }

  scrubEnd() {
    this.dragging = false;
    if (this.pen) this.pen.setAttribute('opacity', '0');
    this.emit('scrub');
  }

  scrubTo(v: number) {
    if (this.playing) this.pause();
    this.started = true;
    this.autoPaused = false;
    this.seek(v * this.total);
    this.notify();
  }

  observe(target: Element | null, threshold: number) {
    if (!this.items.length) return;
    if (this.reduce || this.seen()) {
      this.started = true;
      this.seek(this.total);
      this.notify();
      return;
    }
    this.seek(this.presetT());
    const begin = () => {
      const wait = this.minStartAt - performance.now();
      if (wait > 0) {
        this.started = true;
        this.timer = setTimeout(() => {
          if (!this.playing && this.t < this.total) this.play();
        }, wait);
      } else this.play();
    };
    if (!target || typeof IntersectionObserver === 'undefined') {
      begin();
      return;
    }
    this.io = new IntersectionObserver(
      (entries) => {
        const vis = entries.some((en) => en.isIntersecting);
        if (vis && !this.started) begin();
        else if (!vis && this.started && this.t < this.total && !this.dragging) {
          clearTimeout(this.timer);
          this.finish('skip');
        }
      },
      { threshold },
    );
    this.io.observe(target);
  }

  // Variante disparada por scroll: dibuja cada vez que el objetivo queda a la vista
  // (minVisible de su alto, o de la pantalla si es más alto que ella) y se rebobina
  // al salir por completo, para volver a dibujarse en la próxima pasada.
  // No usa sessionStorage ni salta al final al salir de pantalla.
  observeOnScroll(target: Element | null, minVisible = 0.6) {
    if (!this.items.length) return;
    if (this.reduce) {
      this.started = true;
      this.seek(this.total);
      this.notify();
      return;
    }
    this.seek(this.presetT());
    this.notify();
    const begin = () => {
      this.started = true;
      this.userPanned = false;
      const wait = this.minStartAt - performance.now();
      if (wait > 0) {
        this.timer = setTimeout(() => {
          if (!this.playing && this.t < this.total) this.play();
        }, wait);
      } else this.play();
    };
    if (!target || typeof IntersectionObserver === 'undefined') {
      begin();
      return;
    }
    const steps = Array.from({ length: 21 }, (_, i) => i / 20);
    this.io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          const vh = en.rootBounds ? en.rootBounds.height : window.innerHeight;
          const enough =
            en.isIntersecting &&
            (en.intersectionRatio >= minVisible || en.intersectionRect.height >= vh * minVisible);
          if (enough && !this.started) begin();
          else if (!en.isIntersecting && this.started && !this.dragging) {
            clearTimeout(this.timer);
            this.pause();
            this.started = false;
            this.emitted = false;
            this.seek(this.presetT());
            this.notify();
          }
        }
      },
      { threshold: steps },
    );
    this.io.observe(target);
  }

  destroy() {
    clearTimeout(this.timer);
    this.playing = false;
    cancelAnimationFrame(this.raf);
    if (this.io) this.io.disconnect();
    if (this.scroller) {
      this.scroller.removeEventListener('pointerdown', this.onPan);
      this.scroller.removeEventListener('wheel', this.onPan);
    }
    this.items.forEach((it) => it.anim.cancel());
  }
}

export type TracerStatus = 'idle' | 'play' | 'pause' | 'end';

export function status(playing: boolean, ended: boolean, t: number): TracerStatus {
  return playing ? 'play' : ended ? 'end' : t > 0 ? 'pause' : 'idle';
}

export function playLabel(s: TracerStatus) {
  return s === 'play' ? 'PAUSAR' : s === 'pause' ? 'REANUDAR' : 'REPRODUCIR';
}
