import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  /** Drift velocity for the home position — causes large wandering arcs */
  dvx: number;
  dvy: number;
  r: number;
  a: number;
  isLarge: boolean;
}

const N_SMALL = 100;
const N_LARGE = 18;
const N = N_SMALL + N_LARGE;

const MOUSE_R = 180;
const CONNECT_R = 80;
const SPRING = 0.006;
const FRICTION = 0.90;
const ATTRACT = 0.055;

// Max drift speed per kind
const DRIFT_MAX_SMALL = 1.8;
const DRIFT_MAX_LARGE = 4.2;

// How often (frames) to fire a comet impulse
const COMET_INTERVAL = 210;

function makeParticle(W: number, H: number, large: boolean): Particle {
  const hx = Math.random() * W;
  const hy = Math.random() * H;
  return {
    x: hx, y: hy,
    homeX: hx, homeY: hy,
    vx: 0, vy: 0,
    dvx: (Math.random() - 0.5) * (large ? 3.5 : 1.2),
    dvy: (Math.random() - 0.5) * (large ? 3.5 : 1.2),
    r: large ? Math.random() * 3.5 + 3.5 : Math.random() * 1.4 + 0.5,
    a: large ? Math.random() * 0.18 + 0.06 : Math.random() * 0.38 + 0.08,
    isLarge: large,
  };
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const particles: Particle[] = [
      ...Array.from({ length: N_SMALL }, () => makeParticle(W, H, false)),
      ...Array.from({ length: N_LARGE }, () => makeParticle(W, H, true)),
    ];

    let mx = -9999;
    let my = -9999;
    let raf: number;
    let frame = 0;

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      mx = (cx >= 0 && cx <= W && cy >= 0 && cy <= H) ? cx : -9999;
      my = (cx >= 0 && cx <= W && cy >= 0 && cy <= H) ? cy : -9999;
    };

    const onMouseLeave = () => { mx = -9999; my = -9999; };

    const tick = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      // Comet impulse: every N frames, one particle gets a hard velocity kick
      if (frame % COMET_INTERVAL === 0) {
        const p = particles[Math.floor(Math.random() * N)];
        const angle = Math.random() * Math.PI * 2;
        const speed = 5 + Math.random() * 6;
        p.vx += Math.cos(angle) * speed;
        p.vy += Math.sin(angle) * speed;
      }

      for (const p of particles) {
        const dMax = p.isLarge ? DRIFT_MAX_LARGE : DRIFT_MAX_SMALL;

        // Drift velocity evolves smoothly — creates large wandering arcs
        p.dvx += (Math.random() - 0.5) * (p.isLarge ? 0.12 : 0.06);
        p.dvy += (Math.random() - 0.5) * (p.isLarge ? 0.12 : 0.06);
        p.dvx = Math.max(-dMax, Math.min(dMax, p.dvx * 0.97));
        p.dvy = Math.max(-dMax, Math.min(dMax, p.dvy * 0.97));

        // Move home position by drift velocity
        p.homeX += p.dvx;
        p.homeY += p.dvy;

        // Bounce home position off canvas edges
        if (p.homeX < 0) { p.homeX = 0; p.dvx = Math.abs(p.dvx); }
        if (p.homeX > W) { p.homeX = W; p.dvx = -Math.abs(p.dvx); }
        if (p.homeY < 0) { p.homeY = 0; p.dvy = Math.abs(p.dvy); }
        if (p.homeY > H) { p.homeY = H; p.dvy = -Math.abs(p.dvy); }

        // Mouse attraction
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_R && dist > 1) {
          const t = (MOUSE_R - dist) / MOUSE_R;
          const f = t * t * ATTRACT * (p.isLarge ? 1.4 : 1.0);
          p.vx += (dx / dist) * f * dist * 0.014;
          p.vy += (dy / dist) * f * dist * 0.014;
        }

        // Spring toward wandering home
        p.vx += (p.homeX - p.x) * SPRING;
        p.vy += (p.homeY - p.y) * SPRING;

        // Friction (larger = slightly less friction → more momentum)
        const fric = p.isLarge ? FRICTION - 0.01 : FRICTION;
        p.vx *= fric;
        p.vy *= fric;

        p.x += p.vx;
        p.y += p.vy;

        // Draw: large particles get a soft radial glow
        if (p.isLarge) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          grad.addColorStop(0, `rgba(90,176,232,${p.a})`);
          grad.addColorStop(0.4, `rgba(90,176,232,${p.a * 0.35})`);
          grad.addColorStop(1, `rgba(90,176,232,0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          // Hard core
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(90,176,232,${p.a * 1.8})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(90,176,232,${p.a})`;
          ctx.fill();
        }
      }

      // Connection lines between nearby particles
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          const r = (particles[i].isLarge || particles[j].isLarge) ? CONNECT_R * 1.4 : CONNECT_R;
          if (dist < r) {
            const opacity = (1 - dist / r) * (particles[i].isLarge || particles[j].isLarge ? 0.18 : 0.1);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(90,176,232,${opacity})`;
            ctx.lineWidth = particles[i].isLarge || particles[j].isLarge ? 0.8 : 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    tick();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
