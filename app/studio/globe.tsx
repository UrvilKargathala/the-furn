"use client";
import { useEffect, useRef } from "react";
import { LAND_BITS, LAND_STEP } from "../content/world-dots";
import { INDIA_OUTLINE } from "../content/india-outline";

// Particle globe for the Studio "cities served" section, light theme. Plain canvas 2D (no WebGL, no map service).
// - Land is a stipple of ~135,000 ink particles (finest over India), written straight into a pixel buffer, randomly placed inside each land cell, shaded so one side falls
//   into shadow and the edge darkens; the far side shows faintly through the oceans.
// - On first view the particles fall in from a scattered cloud; a thin cloud of loose particles keeps drifting around.
// - Scrolling drives the shot: the globe spins round to India and zooms in close, then the routes grow out of the hub.
// - Picking or hovering a city turns the globe towards it; otherwise it drifts gently.
// - Cities are white pill labels with a brass dot; India's border is outlined in brass at the close-up.

type LatLng = [number, number];
type Vec = readonly [number, number, number];
const R = Math.PI / 180;
const INK = "27,25,21";
const BRASS = "199,132,63";

// Decode the baked land bitmask into one random point per land cell (the whole world at 0.3°)
// Each point also says whether its cell touches the sea, so coastlines can be drawn darker and denser.
type LandPt = [number, number, boolean];
function decode(bits: string, lat0: number, lat1: number, lng0: number, lng1: number, step: number) {
  const bytes = Uint8Array.from(atob(bits), (c) => c.charCodeAt(0));
  const rows = Math.round((lat1 - lat0) / step);
  const start: number[] = [], count: number[] = [];
  let k = 0;
  for (let i = 0; i < rows; i++) {
    const lat = lat1 - (i + 0.5) * step;
    start.push(k); count.push(Math.max(1, Math.round(((lng1 - lng0) / step) * Math.cos(lat * R)))); k += count[i];
  }
  const land = (i: number, f: number) => {
    if (i < 0 || i >= rows) return true;
    const n = count[i], j = Math.min(n - 1, Math.max(0, Math.floor(f * n))), b = start[i] + j;
    return !!(bytes[b >> 3] & (1 << (b & 7)));
  };
  const pts: LandPt[] = [];
  for (let i = 0; i < rows; i++) {
    const lat = lat1 - (i + 0.5) * step, n = count[i];
    for (let j = 0; j < n; j++) {
      const b = start[i] + j;
      if (!(bytes[b >> 3] & (1 << (b & 7)))) continue;
      const f = (j + 0.5) / n, df = 1 / n;
      const coast = !land(i, f - df) || !land(i, f + df) || !land(i - 1, f) || !land(i + 1, f);
      const p: LandPt = [lat + (Math.random() - 0.5) * step, lng0 + ((j + Math.random()) * (lng1 - lng0)) / n, coast];
      pts.push(p);
    }
  }
  return pts;
}
function landPoints(): LandPt[] {
  return decode(LAND_BITS, -90, 90, -180, 180, LAND_STEP);
}

// Which side of its dot each city label sits on (1 right, -1 left), so the cluster splits into two columns
const SIDE: Record<string, number> = { Ahmedabad: -1, Mumbai: -1, "Navi Mumbai": -1, Surat: 1, Pune: 1, Hyderabad: 1 };

const toVec = ([lat, lng]: LatLng | LandPt): Vec => [Math.cos(lat * R) * Math.sin(lng * R), Math.sin(lat * R), Math.cos(lat * R) * Math.cos(lng * R)];
// Middle of India, where most of the falling drops land
const INDIA_DIR = toVec([22, 79]);


// Light comes from the upper left and slightly in front, so the lower right falls into shadow
const LIGHT: Vec = (() => { const v = [-0.55, 0.5, 0.67]; const m = Math.hypot(...v); return [v[0] / m, v[1] / m, v[2] / m] as const; })();

export function Globe({ cities, coords, hub, active, onSelect, label }: {
  cities: string[]; coords: Record<string, LatLng>; hub: string; active: string; onSelect: (c: string) => void; label: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const state = useRef({ active, onSelect });
  useEffect(() => { state.current = { active, onSelect }; }, [active, onSelect]);

  useEffect(() => {
    const el = canvas.current!;
    const ctx = el.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const randDir = (): Vec => { const u = rnd(-1, 1), th = rnd(0, Math.PI * 2), s = Math.sqrt(1 - u * u); return [s * Math.cos(th), u, s * Math.sin(th)]; };

    // Land particles in flat typed arrays (~135k of them): target on the sphere (vx/vy/vz), a start point out in a
    // scattered cloud they fall in from (fx/fy/fz), a stagger delay and a size
    const pts = landPoints(), N = pts.length; // each: [lat, lng, touches the sea]
    const vx = new Float32Array(N), vy = new Float32Array(N), vz = new Float32Array(N);
    const fx = new Float32Array(N), fy = new Float32Array(N), fz = new Float32Array(N);
    const delay = new Float32Array(N), psize = new Float32Array(N), coast = new Uint8Array(N);
    pts.forEach((p, i) => {
      const v = toVec([p[0], p[1]]), f = randDir(), d = rnd(1.6, 2.8);
      coast[i] = p[2] ? 1 : 0;
      vx[i] = v[0]; vy[i] = v[1]; vz[i] = v[2];
      fx[i] = f[0] * d; fy[i] = f[1] * d; fz[i] = f[2] * d;
      delay[i] = Math.random() * 0.9; psize[i] = rnd(0.75, 1.5);
    });
    // Land is written straight into a pixel buffer (much faster than one fillRect per particle)
    let img: ImageData | null = null, px32: Uint32Array | null = null;
    const pack = (rgb: string, a: number) => { const [r, g, b] = rgb.split(",").map(Number); return ((Math.round(a * 255) << 24) | (b << 16) | (g << 8) | r) >>> 0; };
    const inkShade = Array.from({ length: 256 }, (_, a) => pack(INK, a / 255));
    const brassShade = Array.from({ length: 256 }, (_, a) => pack(BRASS, a / 255));
    // Loose dust drifting in a shell around the globe
    const dust = Array.from({ length: 2200 }, () => ({ dir: randDir(), r: 1.03 + Math.pow(Math.random(), 1.6) * 1.4, speed: rnd(-0.05, 0.05), phase: rnd(0, 6.28), size: rnd(0.7, 1.9) }));
    // "Comets": particles that keep falling in from the cloud and landing on the earth, then start again far out
    // Most of them land around India, so they stay in frame at the close-up; the rest fall anywhere
    const nearIndia = (): Vec => {
      if (Math.random() < 0.25) return randDir();
      const d = randDir(), k = rnd(0.15, 0.75);
      const v: Vec = [INDIA_DIR[0] + d[0] * k, INDIA_DIR[1] + d[1] * k, INDIA_DIR[2] + d[2] * k], m = Math.hypot(...v);
      return [v[0] / m, v[1] / m, v[2] / m];
    };
    const comets = Array.from({ length: 560 }, () => ({ dir: nearIndia(), from: rnd(1.5, 2.6), life: rnd(2.6, 4.6), t0: -rnd(0, 5), swirl: rnd(-0.6, 0.6), size: rnd(1.1, 2.3), brass: Math.random() < 0.18 }));
    // India's border as points on the sphere, ready to rotate each frame
    const outline = INDIA_OUTLINE.map((r) => { const ring: Vec[] = []; for (let i = 0; i < r.length; i += 2) ring.push(toVec([r[i + 1], r[i]])); return ring; });

    // Rotation: yaw (around the vertical axis) and pitch (tilt). Start facing India.
    const view = { yaw: -76 * R, pitch: 16 * R, targetYaw: -76 * R, targetPitch: 16 * R };
    let drag: { x: number; y: number; yaw: number; pitch: number } | null = null;
    let lastInteract = -1e9, born = -1, raf = 0, size = 0, dpr = 1, visible = false, prev = 0;
    let shown: { c: string; x: number; y: number; box?: [number, number, number, number] }[] = [];
    let hover = "", scrollP = 0, spinOffset = 0, pitchOff = 0;
    let mouse: { x: number; y: number } | null = null;
    const hitTest = (mx: number, my: number) =>
      shown.find((s) => Math.hypot(s.x - mx, s.y - my) < 14 || (s.box && mx >= s.box[0] && mx <= s.box[0] + s.box[2] && my >= s.box[1] && my <= s.box[1] + s.box[3]))?.c ?? "";

    const resize = () => {
      dpr = Math.min(1.5, devicePixelRatio || 1); // 1.5x keeps the stipple sharp while the pixel buffer stays light
      size = el.clientWidth;
      el.width = el.height = Math.round(size * dpr);
      img = el.width ? ctx.createImageData(el.width, el.height) : null;
      px32 = img ? new Uint32Array(img.data.buffer) : null;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && born < 0) born = performance.now();
      if (visible && !raf) { prev = performance.now(); raf = requestAnimationFrame(frame); }
    }, { threshold: 0.15 });
    io.observe(el);

    // Rotate a point by the current view; returns rotated x, y, z (z > 0 faces the viewer)
    // Rotation sines/cosines are computed once per frame (updateRot), not per particle
    let mcy = 1, msy = 0, mcp = 1, msp = 0;
    const updateRot = () => { const yaw = view.yaw + spinOffset, pitch = view.pitch - pitchOff; mcy = Math.cos(yaw); msy = Math.sin(yaw); mcp = Math.cos(pitch); msp = Math.sin(pitch); };
    const rot = (x: number, y: number, z: number): Vec => {
      const x1 = x * mcy + z * msy, z1 = -x * msy + z * mcy;
      return [x1, y * mcp - z1 * msp, y * msp + z1 * mcp];
    };

    let flewTo = "";
    const flyTo = (c: string) => {
      const [lat, lng] = coords[c];
      // Shortest way round to the city's longitude
      let yaw = -lng * R;
      while (yaw - view.yaw > Math.PI) yaw -= Math.PI * 2;
      while (yaw - view.yaw < -Math.PI) yaw += Math.PI * 2;
      view.targetYaw = yaw;
      view.targetPitch = Math.max(-0.5, Math.min(0.5, lat * R * 0.8));
      lastInteract = performance.now();
    };

    function frame(now: number) {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, (now - prev) / 1000); prev = now;
      const t = (now - born) / 1000;
      if (state.current.active !== flewTo) { flewTo = state.current.active; if (t > 0.1) flyTo(flewTo); }
      if (hover && !drag) lastInteract = now;
      // Scroll drives the shot: as the section scrolls up, the whole globe spins round to India and zooms in close
      const box = el.getBoundingClientRect(), vh = innerHeight || 800;
      const target = reduce ? 1 : Math.max(0, Math.min(1, (vh - box.top) / (vh * 0.95)));
      scrollP += (target - scrollP) * Math.min(1, dt * 6);
      const zp = Math.max(0, Math.min(1, (scrollP - 0.12) / 0.6)), ze = zp * zp * (3 - 2 * zp);
      spinOffset = (1 - ze) * 2.2; // up to ~125° of extra turn before India settles in front
      // Once settled, a gentle drift; after a city is picked or the globe is dragged it holds still for a moment
      const idle = !drag && !reduce && now - lastInteract > 5000;
      const sway = idle ? Math.sin(now / 3200) * 0.045 : 0;
      if (!drag) {
        view.yaw += (view.targetYaw + sway - view.yaw) * 0.06;
        view.pitch += (view.targetPitch - view.pitch) * 0.06;
      }

      // Final framing is a "horizon" shot: the globe grows and drops so India sits large in the middle while the
      // glowing edge of the Earth curves across the top of the frame (closer in than before, so India reads bigger)
      pitchOff = 44 * R * ze;
      updateRot();
      const scale = size * (0.44 + 1.16 * ze), cx = size / 2, cy = size * (0.5 + 1.13 * ze);
      const dot = Math.pow(scale / (size * 0.44), 0.42); // particles grow a little as we zoom so the land stays solid
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      const fall = reduce ? 1 : Math.min(1, t / 2.4);

      // Land into the pixel buffer: far side first (faint, shows through the oceans), then the near side's shaded
      // stipple; a pixel keeps whichever particle is darker. Particles fall in from the cloud on first view.
      if (img && px32) {
        px32.fill(0);
        const W = el.width, Hh = el.height, D = dpr, C = cx * D, Cy = cy * D, S = scale * D;
        const mxD = mouse ? mouse.x * D : -1e9, myD = mouse ? mouse.y * D : -1e9, hoverR = 80 * D;
        // Three rings, each expanding from the cursor over 1.8s, offset in time
        const sonarMaxR = 150 * D, sonarBand = 11 * D, sonarMax2 = mouse ? (sonarMaxR + sonarBand) ** 2 : -1;
        const sonar = reduce ? [] : [0, 0.33, 0.66].map((o) => (((now / 1800 + o) % 1) * sonarMaxR));
        const lx = LIGHT[0], ly = LIGHT[1], lz = LIGHT[2];
        const plot = (sx: number, sy: number, sz: number, a: number, brass: boolean) => {
          const x0 = sx | 0, y0 = sy | 0, n = sz < 1.5 ? 1 : sz < 2.6 ? 2 : 3;
          if (x0 < 0 || y0 < 0 || x0 + n > W || y0 + n > Hh) return;
          const ai = a > 1 ? 255 : (a * 255) | 0, col = brass ? brassShade[ai] : inkShade[ai];
          for (let yy = 0; yy < n; yy++) {
            const row = (y0 + yy) * W + x0;
            for (let xx = 0; xx < n; xx++) if ((px32![row + xx] >>> 24) < ai) px32![row + xx] = col;
          }
        };
        const zoomDot = dot * D;
        for (let i = 0; i < N; i++) {
          const k = reduce ? 1 : Math.min(1, Math.max(0, fall * 1.9 - delay[i]));
          if (k <= 0) continue;
          let x = vx[i], y = vy[i], z = vz[i];
          if (k < 1) { const e = 1 - (1 - k) ** 3; x = fx[i] + (x - fx[i]) * e; y = fy[i] + (y - fy[i]) * e; z = fz[i] + (z - fz[i]) * e; }
          // rotate (yaw, then pitch)
          const x1 = x * mcy + z * msy, z1 = -x * msy + z * mcy;
          const ry = y * mcp - z1 * msp, rz = y * msp + z1 * mcp;
          const sx = C + x1 * S, sy = Cy - ry * S;
          if (sx < 0 || sy < 0 || sx >= W || sy >= Hh) continue;
          if (rz < 0) {
            if (k < 1) { if (x1 * x1 + ry * ry < 1) continue; plot(sx, sy, psize[i] * zoomDot, 0.5 * k, false); continue; }
            plot(sx, sy, psize[i] * zoomDot * 0.7, 0.035, false); // far side
            continue;
          }
          let alpha: number;
          if (k < 1) alpha = 0.5 * k;
          else {
            // Shading: dark where the sphere turns away from the light, darker again at the very edge (normal = position)
            const lit = Math.max(0, x1 * lx + ry * ly + rz * lz), e3 = 1 - rz;
            // Coast cells read darker and denser; the lit interior stays light and airy
            alpha = Math.min(1, (coast[i] ? 0.62 : 0.26) + (1 - lit) * 0.42 + e3 * e3 * e3 * 0.3);
          }
          const dx = sx - mxD, dy = sy - myD, d2 = dx * dx + dy * dy;
          // Sonar: rings ripple outward across the surface from the cursor, tinting the particles they pass
          let near = 0;
          if (d2 < sonarMax2) {
            const dd = Math.sqrt(d2);
            for (const ring of sonar) { const band = Math.abs(dd - ring) ; if (band < sonarBand) near = Math.max(near, (1 - band / sonarBand) * (1 - ring / sonarMaxR)); }
            if (dd < hoverR * 0.35) near = Math.max(near, 0.5 * (1 - dd / (hoverR * 0.35)));
          }
          plot(sx, sy, psize[i] * zoomDot * (1 + near * 1.1), near > 0.05 ? Math.min(1, 0.55 + near * 0.6) : alpha, near > 0.05);
        }
        ctx.putImageData(img, 0, 0);
      }

      // Rounded glow hugging the globe: a soft warm halo just outside the edge, a faint wide bloom beyond it,
      // and a thin bright rim line, so the sphere reads as lit like the reference
      {
        const g = Math.min(1, fall * 1.4);
        const halo = ctx.createRadialGradient(cx, cy, scale, cx, cy, scale * 1.12);
        halo.addColorStop(0, `rgba(236,196,148,${0.42 * g})`);
        halo.addColorStop(0.35, `rgba(236,196,148,${0.16 * g})`);
        halo.addColorStop(1, "rgba(236,196,148,0)");
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(cx, cy, scale * 1.12, 0, Math.PI * 2); ctx.arc(cx, cy, scale, 0, Math.PI * 2, true); ctx.fill();
        const bloom = ctx.createRadialGradient(cx, cy, scale, cx, cy, scale * 1.45);
        bloom.addColorStop(0, `rgba(236,196,148,${0.12 * g})`);
        bloom.addColorStop(1, "rgba(236,196,148,0)");
        ctx.fillStyle = bloom;
        ctx.beginPath(); ctx.arc(cx, cy, scale * 1.5, 0, Math.PI * 2); ctx.arc(cx, cy, scale, 0, Math.PI * 2, true); ctx.fill();
        // Rim: brightest towards the light (upper left), fading round to the shadow side
        const rim = ctx.createLinearGradient(cx - scale, cy - scale, cx + scale, cy + scale);
        rim.addColorStop(0, `rgba(255,236,208,${0.9 * g})`);
        rim.addColorStop(0.5, `rgba(${BRASS},${0.45 * g})`);
        rim.addColorStop(1, `rgba(${BRASS},${0.12 * g})`);
        ctx.strokeStyle = rim;
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(cx, cy, scale * 1.003, 0, Math.PI * 2); ctx.stroke();
      }

      // Dust cloud drifting around the globe
      for (const d of dust) {
        const a = d.phase + (reduce ? 0 : now / 1000) * d.speed;
        const ca = Math.cos(a), sa = Math.sin(a);
        const [dx, dy, dz] = [d.dir[0] * ca + d.dir[2] * sa, d.dir[1], -d.dir[0] * sa + d.dir[2] * ca];
        const [x, y, z] = rot(dx * d.r, dy * d.r, dz * d.r);
        if (z < 0 && Math.hypot(x, y) < 1) continue; // hidden behind the globe
        const fade = Math.max(0, 1 - (d.r - 1) / 1.5) * Math.min(1, fall * 1.5);
        ctx.fillStyle = `rgba(${INK},${0.5 * fade})`;
        ctx.fillRect(cx + x * scale - d.size / 2, cy - y * scale - d.size / 2, d.size, d.size);
      }
      // Comets falling onto the earth: ease in from far out, swirl slightly, fade as they touch down, then respawn
      if (!reduce && fall >= 1) {
        const ts = now / 1000;
        for (const c of comets) {
          let u = (ts - c.t0) / c.life;
          if (u >= 1) { c.t0 = ts; c.dir = nearIndia(); c.from = rnd(1.5, 2.6); c.life = rnd(2.6, 4.6); u = 0; }
          const alpha = Math.min(1, u * 4) * (1 - Math.max(0, (u - 0.85) / 0.15)) * 0.9;
          const col = c.brass ? BRASS : INK;
          // The drop plus a short fading trail behind it
          for (let tr = 0; tr < 3; tr++) {
            const uu = Math.max(0, u - tr * 0.025);
            const e = uu * uu * (3 - 2 * uu), r = c.from + (1 - c.from) * e, a = c.swirl * (1 - e);
            const ca = Math.cos(a), sa = Math.sin(a);
            const [x, y, z] = rot((c.dir[0] * ca + c.dir[2] * sa) * r, c.dir[1] * r, (-c.dir[0] * sa + c.dir[2] * ca) * r);
            if (z < 0 && x * x + y * y < 1) break;
            const sz = c.size * (1 - tr * 0.28);
            ctx.fillStyle = `rgba(${col},${alpha * (1 - tr * 0.35)})`;
            ctx.beginPath(); ctx.arc(cx + x * scale, cy - y * scale, sz / 2 + 0.3, 0, Math.PI * 2); ctx.fill();
          }
        }
      }
      if (fall < 1) { raf = requestAnimationFrame(frame); return; }

      // India's border, drawn once India has turned to the front: a brass outline with a soft glow so the eye
      // goes straight to the country (official India view)
      const edge = reduce ? 1 : Math.max(0, Math.min(1, (ze - 0.55) / 0.35)) * Math.min(1, Math.max(0, (t - 2.4) / 0.8));
      if (edge > 0) {
        ctx.save();
        ctx.lineJoin = "round"; ctx.lineCap = "round";
        for (const pass of [0, 1]) {
          ctx.strokeStyle = pass ? `rgba(${BRASS},${0.95 * edge})` : `rgba(${BRASS},${0.22 * edge})`;
          ctx.lineWidth = pass ? 1.6 : 7;
          if (pass) { ctx.shadowColor = `rgba(${BRASS},${0.5 * edge})`; ctx.shadowBlur = 10; }
          for (const ring of outline) {
            ctx.beginPath();
            let pen = false;
            for (const v of ring) {
              const [x, y, z] = rot(...v);
              if (z < 0) { pen = false; continue; }
              const sx = cx + x * scale, sy = cy - y * scale;
              if (pen) ctx.lineTo(sx, sy); else { ctx.moveTo(sx, sy); pen = true; }
            }
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // City beacons
      shown = [];
      for (const c of cities) {
        const [x, y, z] = rot(...toVec(coords[c]));
        if (z < 0.05) continue;
        const sx = cx + x * scale, sy = cy - y * scale;
        const on = state.current.active === c || hover === c;
        shown.push({ c, x: sx, y: sy });
        const pulse = reduce ? 0 : ((now / (on ? 1300 : 2300) + cities.indexOf(c) * 0.37) % 1);
        ctx.strokeStyle = `rgba(${BRASS},${0.7 * (1 - pulse)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(sx, sy, 3 + pulse * (on ? 18 : 11), 0, Math.PI * 2); ctx.stroke();
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, on ? 14 : 9);
        glow.addColorStop(0, `rgba(${BRASS},0.55)`);
        glow.addColorStop(1, `rgba(${BRASS},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(sx, sy, on ? 14 : 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgb(${BRASS})`;
        ctx.beginPath(); ctx.arc(sx, sy, on ? 3.6 : 2.6, 0, Math.PI * 2); ctx.fill();
      }

      // Labels: white pills with a brass dot, uppercase name; they lift and glow on hover / when picked
      const fs = Math.max(10, Math.min(13, size * 0.021));
      ctx.font = `500 ${fs}px var(--font-sans, system-ui), system-ui, sans-serif`;
      const spaced = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
      if ("letterSpacing" in ctx) spaced.letterSpacing = "1.2px";
      ctx.textBaseline = "middle";
      // Two stacked columns (left / right of the dots): each pill sits level with its city if it can,
      // otherwise just below the pill above it, so every name gets its own row and none overlap
      const h = fs * 2.2, gap = 5;
      for (const side of [-1, 1]) {
        let floor = -Infinity;
        for (const s of shown.filter((x) => (SIDE[x.c] ?? 1) === side).sort((p, q) => p.y - q.y)) {
          const w = ctx.measureText(s.c.toUpperCase()).width + fs * 3.2;
          const cyy = Math.max(s.y, floor + h + gap);
          floor = cyy;
          // Keep pills inside the frame (away from the faded edge) on narrow screens
          const bx = Math.min(size * 0.92 - w, Math.max(size * 0.06, side > 0 ? s.x + 16 : s.x - 16 - w));
          s.box = [bx, cyy - h / 2, w, h];
        }
      }
      const visibleLabels = shown.filter((s) => s.box).sort((p, q) => Number(p.c === hover || p.c === state.current.active) - Number(q.c === hover || q.c === state.current.active)).reverse();
      // Labels fade in once India has turned to the front, so they never crowd the globe's edge mid-scroll
      const labelAlpha = reduce ? 1 : Math.max(0, Math.min(1, (ze - 0.86) / 0.12));
      if (labelAlpha <= 0) for (const s of shown) s.box = undefined;
      ctx.globalAlpha = labelAlpha;
      for (const s of labelAlpha > 0 ? visibleLabels.reverse() : []) {
        const sel = s.c === state.current.active, hot = s.c === hover;
        const [bx, by, w, h] = s.box!;
        // Thin leader line from the city dot to its pill
        ctx.strokeStyle = `rgba(${INK},${sel || hot ? 0.45 : 0.25})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(bx < s.x ? bx + w : bx, by + h / 2); ctx.stroke();
        const lift = hot ? -2 : 0;
        ctx.save();
        ctx.shadowColor = sel || hot ? `rgba(${BRASS},0.45)` : "rgba(27,25,21,0.14)";
        ctx.shadowBlur = sel || hot ? 22 : 12;
        ctx.shadowOffsetY = sel || hot ? 6 : 3;
        ctx.fillStyle = "rgba(255,255,255,0.94)";
        ctx.beginPath(); ctx.roundRect(bx, by + lift, w, h, h / 2); ctx.fill();
        ctx.restore();
        if (sel || hot) {
          ctx.strokeStyle = `rgba(${BRASS},0.85)`;
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.roundRect(bx + 0.6, by + lift + 0.6, w - 1.2, h - 1.2, h / 2); ctx.stroke();
        }
        // Brass dot with a soft halo
        const dx = bx + fs * 1.1, dyy = by + lift + h / 2;
        const halo = ctx.createRadialGradient(dx, dyy, 0, dx, dyy, fs * 0.75);
        halo.addColorStop(0, `rgba(${BRASS},0.45)`);
        halo.addColorStop(1, `rgba(${BRASS},0)`);
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(dx, dyy, fs * 0.75, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgb(${BRASS})`;
        ctx.beginPath(); ctx.arc(dx, dyy, fs * 0.28, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = sel || hot ? `rgb(${INK})` : `rgba(${INK},0.8)`;
        ctx.textAlign = "left";
        ctx.fillText(s.c.toUpperCase(), bx + fs * 2, dyy + 0.5);
      }
      ctx.globalAlpha = 1;
      if ("letterSpacing" in ctx) spaced.letterSpacing = "0px";
      ctx.textBaseline = "alphabetic";
      raf = requestAnimationFrame(frame);
    }

    // Drag to spin; click a beacon or label to select it
    let down: { x: number; y: number } | null = null;
    const local = (e: PointerEvent) => { const r = el.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top] as const; };
    const onDown = (e: PointerEvent) => {
      down = { x: e.clientX, y: e.clientY };
      drag = { x: e.clientX, y: e.clientY, yaw: view.yaw, pitch: view.pitch };
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      const [mx, my] = local(e);
      mouse = e.pointerType === "mouse" ? { x: mx, y: my } : null;
      if (!drag) {
        hover = e.pointerType === "mouse" ? hitTest(mx, my) : "";
        el.style.cursor = hover ? "pointer" : "grab";
        return;
      }
      view.yaw = drag.yaw + (e.clientX - drag.x) * 0.006;
      view.pitch = Math.max(-1, Math.min(1, drag.pitch + (e.clientY - drag.y) * 0.004));
      view.targetYaw = view.yaw; view.targetPitch = view.pitch;
      lastInteract = performance.now();
    };
    const onUp = (e: PointerEvent) => {
      drag = null;
      if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) < 5) {
        const hit = hitTest(...local(e));
        if (hit) { state.current.onSelect(hit); if (hit === flewTo) flyTo(hit); }
      }
      down = null;
    };
    const onLeave = () => { mouse = null; hover = ""; };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      el.removeEventListener("pointerdown", onDown); el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp); el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [cities, coords, hub]);

  return <canvas ref={canvas} role="img" aria-label={label} className="aspect-square w-full touch-pan-y cursor-grab [mask-image:linear-gradient(to_bottom,black_72%,transparent),linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-composite:intersect]" />;
}
