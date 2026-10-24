/**
 * The hero card: a real 3D gift card lit by the same sheen the app draws with Metal
 * (a soft highlight blob plus a thin diagonal streak that follow the light), here written in TSL
 * and rendered with three.js's WebGPU renderer (WebGL2 when WebGPU is unavailable).
 */
import * as THREE from "three/webgpu";
import {
  Fn, uv, vec2, vec3, vec4, float, exp, dot, clamp, uniform, mix, texture, select,
  normalLocal, positionLocal, smoothstep, max, abs, sub,
} from "three/tsl";

export type CardScene = {
  setLight(x: number, y: number): void; // 0..1 across the card
  setTilt(roll: number, pitch: number): void; // -1..1
  setFlip(p: number): void; // 0..1 → 0..180°
  resize(): void;
  destroy(): void;
};

const CARD_W = 3.0;
const CARD_H = 1.9;
const CARD_D = 0.04;
const RADIUS = 0.18;

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** Draws the card back: a Code 128-looking barcode and the demo number, on linen. */
function barcodeTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 1536; c.height = 972;
  const g = c.getContext("2d")!;
  g.fillStyle = "#f6f4ec"; g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = "#1f2a24";
  g.font = "600 44px ui-sans-serif, system-ui, sans-serif";
  g.fillText("Starbucks", 96, 120);
  g.font = "500 30px ui-sans-serif, system-ui, sans-serif"; g.fillStyle = "#5f7369";
  g.textAlign = "right"; g.fillText("Code 128", c.width - 96, 118); g.textAlign = "left";
  // Deterministic bar pattern (seeded), 1..4 module widths like Code 128.
  let seed = 4471;
  const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  let x = 110; const top = 260, h = 420; g.fillStyle = "#111";
  while (x < c.width - 110 - 8) {
    const bar = 6 + Math.floor(rnd() * 4) * 6; const gap = 6 + Math.floor(rnd() * 3) * 6;
    g.fillRect(x, top, bar, h); x += bar + gap;
  }
  g.fillStyle = "#1f2a24"; g.font = "500 54px ui-monospace, SFMono-Regular, Menlo, monospace";
  g.textAlign = "center"; g.fillText("6011  2345  6789  4471", c.width / 2, 800);
  g.font = "500 30px ui-monospace, Menlo, monospace"; g.fillStyle = "#5f7369"; g.fillText("PIN 8241", c.width / 2, 860);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export async function createCardScene(canvas: HTMLCanvasElement): Promise<CardScene> {
  const renderer = new THREE.WebGPURenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  await renderer.init();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.NeutralToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
  camera.position.set(0, 0, 8.2);

  // Lights: a key from the upper left, a cool fill, a rim from behind for the edges.
  scene.add(new THREE.AmbientLight(0xf1efe6, 0.35));
  const key = new THREE.DirectionalLight(0xfff4d6, 2.2); key.position.set(-3, 4, 6); scene.add(key);
  const fill = new THREE.DirectionalLight(0x9db5a9, 0.6); fill.position.set(4, -2, 4); scene.add(fill);
  const rim = new THREE.DirectionalLight(0xd8c08a, 1.4); rim.position.set(0, 2, -6); scene.add(rim);

  // Uniforms driven from the page.
  const light = uniform(vec2(0.28, 0.2));
  const strength = uniform(float(0.34));

  const geo = new THREE.ExtrudeGeometry(roundedRect(CARD_W, CARD_H, RADIUS), { depth: CARD_D, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3, curveSegments: 24 });
  geo.center();

  // Card-space uv from local position (ExtrudeGeometry's own uvs are in world units).
  const cuv = positionLocal.xy.div(vec2(CARD_W, CARD_H)).add(0.5);
  const isFront = normalLocal.z.greaterThan(0.5);
  const isBack = normalLocal.z.lessThan(-0.5);

  // Front: brass gradient with a faint diagonal weave, the app icon's card.
  const front = Fn(() => {
    const t = clamp(cuv.x.mul(0.65).add(cuv.y.mul(0.35)), 0, 1);
    const brassLight = vec3(0.93, 0.84, 0.62);
    const brassDeep = vec3(0.66, 0.53, 0.28);
    const base = mix(brassLight, brassDeep, smoothstep(0.0, 1.0, t));
    // Stripe band like the icon (a darker strip a third of the way down).
    const band = smoothstep(0.52, 0.55, cuv.y).mul(smoothstep(0.66, 0.63, cuv.y));
    return mix(base, base.mul(0.72), band.mul(0.85));
  })();

  const back = texture(barcodeTexture(), vec2(sub(1.0, cuv.x), cuv.y)).rgb;
  const sideColor = vec3(0.62, 0.5, 0.27);

  // The app's sheen: exp(-|d|² · 7) blob plus a diagonal streak exp(-band² · 70) · 0.5, scaled by strength.
  const sheen = Fn(() => {
    const aspect = float(CARD_W / CARD_H);
    const d = cuv.sub(light);
    const dd = vec2(d.x.mul(aspect), d.y);
    const blob = exp(dot(dd, dd).mul(-7.0));
    const band = cuv.x.mul(0.78).add(cuv.y.mul(0.62)).sub(light.x.mul(0.78).add(light.y.mul(0.62)));
    const streak = exp(band.mul(band).mul(-70.0)).mul(0.5);
    return clamp(blob.mul(0.5).add(streak).mul(strength), 0.0, 1.0);
  })();

  const mat = new THREE.MeshPhysicalNodeMaterial({ metalness: 0.55, roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.25 });
  mat.colorNode = select(isFront, front, select(isBack, back, sideColor));
  mat.emissiveNode = select(isFront, vec3(1.0, 0.96, 0.86).mul(sheen), select(isBack, vec3(sheen.mul(0.35)), vec3(0.0)));
  mat.roughnessNode = select(isBack, float(0.6), float(0.32));
  mat.metalnessNode = select(isBack, float(0.0), float(0.55));

  const card = new THREE.Mesh(geo, mat);
  const rig = new THREE.Group();
  rig.add(card);
  scene.add(rig);

  let flip = 0, roll = 0, pitch = 0;
  let sRoll = 0, sPitch = 0;
  let raf = 0;
  let disposed = false;

  const resize = () => {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Wide: the card is ~38% of the width; narrow: ~80%. It sits above centre so the copy has the lower third.
    const aspect = w / h;
    const wide = aspect > 1;
    const visibleWidthPerUnitZ = 2 * Math.tan((camera.fov * Math.PI) / 360); // per unit of distance, at aspect 1
    camera.position.z = wide ? 8.2 : Math.min(18, Math.max(8.2, CARD_W / (visibleWidthPerUnitZ * aspect * 0.74)));
    const visibleHeight = visibleWidthPerUnitZ * camera.position.z;
    rig.position.y = (0.5 - (wide ? 0.4 : 0.37)) * visibleHeight;
    camera.updateProjectionMatrix();
  };
  resize();

  const render = () => {
    if (disposed) return;
    sRoll += (roll - sRoll) * 0.14;
    sPitch += (pitch - sPitch) * 0.14;
    rig.rotation.y = flip * Math.PI + sRoll * (6 * Math.PI / 180);
    rig.rotation.x = -sPitch * (4 * Math.PI / 180) - 0.08;
    rig.rotation.z = -0.21 + flip * 0.21; // the icon's 12° tilt settles flat as it turns
    renderer.render(scene, camera);
    raf = requestAnimationFrame(render);
  };
  raf = requestAnimationFrame(render);

  return {
    setLight(x, y) { light.value.set(x, y); },
    setTilt(r, p) { roll = r; pitch = p; },
    setFlip(p) { flip = p; },
    resize,
    destroy() {
      disposed = true;
      cancelAnimationFrame(raf);
      geo.dispose(); mat.dispose();
      renderer.dispose();
    },
  };
}
