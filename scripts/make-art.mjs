// Generates the original sticker-style SVG illustrations: SAMPLE product placeholders,
// the hero brownie stack, the temporary logo icon and the doodle background.
// Run: node scripts/make-art.mjs   (writes into public/)
import { writeFileSync, mkdirSync } from 'node:fs'

const C = {
  ink: '#3B2218', fudge: '#5C3A2A', cream: '#FFF8F1', blush: '#F8DDE2', rose: '#E58FA0', roseDeep: '#C9667B',
  caramel: '#C88A4E', caramelLight: '#E7B57E', white: '#FFFFFF', milk: '#8A5A3C', dark: '#3B2218', mid: '#6E4431',
  butter: '#F6D7A7', mint: '#BFD8B8', seed: '#D9C89A', ragi: '#6A3A34', ragiTop: '#7E4A42',
}

let seed = 11
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
const j = (a) => (rnd() - 0.5) * 2 * a
const n = (v) => Math.round(v * 10) / 10
const P = (p) => `${n(p[0])},${n(p[1])}`

function closed(pts) {
  let d = `M${P(pts[0])}`
  const L = pts.length
  for (let i = 0; i < L; i++) {
    const p0 = pts[(i - 1 + L) % L], p1 = pts[i], p2 = pts[(i + 1) % L], p3 = pts[(i + 2) % L]
    d += `C${P([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${P([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${P(p2)}`
  }
  return d + 'Z'
}
function open(pts) {
  let d = `M${P(pts[0])}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)]
    d += `C${P([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${P([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${P(p2)}`
  }
  return d
}
const ell = (cx, cy, rx, ry, jit = 0.03, k = 14) =>
  Array.from({ length: k }, (_, i) => {
    const a = (i / k) * Math.PI * 2, f = 1 + j(jit)
    return [cx + Math.cos(a) * rx * f, cy + Math.sin(a) * ry * f]
  })
// rounded rectangle as points (soft, chunky corners)
function rr(x, y, w, h, r = 14, jit = 0.8) {
  const pts = []
  const corner = (cx, cy, a0) => {
    for (let i = 0; i <= 3; i++) {
      const a = a0 + (i / 3) * (Math.PI / 2)
      pts.push([cx + Math.cos(a) * r + j(jit), cy + Math.sin(a) * r + j(jit)])
    }
  }
  corner(x + w - r, y + r, -Math.PI / 2)
  corner(x + w - r, y + h - r, 0)
  corner(x + r, y + h - r, Math.PI / 2)
  corner(x + r, y + r, Math.PI)
  return pts
}
const path = (d, fill, o = {}) =>
  `<path d="${d}" fill="${fill}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw ?? 4}" stroke-linecap="round" stroke-linejoin="round"` : ''}${o.op != null ? ` opacity="${o.op}"` : ''}/>`
const shape = (pts, fill, sw = 4) => path(closed(pts), fill, { stroke: C.ink, sw })
const line = (pts, stroke, sw = 3, op) => path(open(pts), 'none', { stroke, sw, op })
const g = (inner, t = '', extra = '') => `<g${t ? ` transform="${t}"` : ''}${extra}>${inner}</g>`
const sticker = (inner) => `<g filter="url(#sticker)">${inner}</g>`
const defs = (r = 7) => `<defs><filter id="sticker" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
<feMorphology in="SourceAlpha" operator="dilate" radius="${r}" result="d"/>
<feFlood flood-color="#FFFFFF"/><feComposite in2="d" operator="in" result="w"/>
<feOffset in="d" dx="0" dy="6" result="so"/><feFlood flood-color="#3B2218" flood-opacity="0.16"/><feComposite in2="so" operator="in" result="s"/>
<feMerge><feMergeNode in="s"/><feMergeNode in="w"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`

/* ---------- motifs ---------- */
function heart(cx, cy, s, fill = C.rose, sw = 3) {
  const pts = Array.from({ length: 18 }, (_, i) => {
    const t = (i / 18) * Math.PI * 2
    const x = 16 * Math.sin(t) ** 3, y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    return [cx + (x / 17) * s, cy + (y / 17) * s]
  })
  return path(closed(pts), fill, { stroke: C.ink, sw })
}
function sprinkles(cx, cy, rx, ry, count, colors = [C.rose, C.caramelLight, C.white, C.mint], len = 8, sw = 5) {
  let s = ''
  for (let i = 0; i < count; i++) {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()), ang = rnd() * Math.PI
    const x = cx + Math.cos(a) * rx * d, y = cy + Math.sin(a) * ry * d
    s += `<line x1="${n(x - Math.cos(ang) * len / 2)}" y1="${n(y - Math.sin(ang) * len / 2)}" x2="${n(x + Math.cos(ang) * len / 2)}" y2="${n(y + Math.sin(ang) * len / 2)}" stroke="${colors[i % colors.length]}" stroke-width="${sw}" stroke-linecap="round"/>`
  }
  return s
}
function dots(cx, cy, rx, ry, count, fill, r = 3, stroke) {
  let s = ''
  for (let i = 0; i < count; i++) {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd())
    s += path(closed(ell(cx + Math.cos(a) * rx * d, cy + Math.sin(a) * ry * d, r, r * 0.8, 0.1, 6)), fill, stroke ? { stroke, sw: 1.5 } : {})
  }
  return s
}

const FLAVOURS = {
  classic: { side: C.fudge, top: C.mid },
  wheat: { side: C.milk, top: '#A06E4C', top2: 'wheat' },
  kambu: { side: '#6F4A36', top: '#86604A', top2: 'millet' },
  healthmix: { side: '#664331', top: '#7A5440', top2: 'seeds' },
  ragi: { side: C.ragi, top: C.ragiTop, top2: 'ragi' },
  nuts: { side: C.fudge, top: C.mid, top2: 'nuts' },
  oreo: { side: C.dark, top: '#4A2D22', top2: 'oreo' },
  nutella: { side: C.fudge, top: C.mid, top2: 'nutella' },
  double: { side: C.dark, top: '#4A2D22', top2: 'chips' },
  triple: { side: C.dark, top: '#4A2D22', top2: 'triple' },
}

// Chunky brownie block: front face + crinkly top + toppings
function brownie(x, y, w, h, flavour = 'classic', depth = 0.32) {
  const f = FLAVOURS[flavour]
  const topH = h * depth
  let s = shape(rr(x, y + topH * 0.5, w, h - topH * 0.5, 12), f.side)
  // crumb texture
  s += dots(x + w / 2, y + topH + (h - topH) / 2, w * 0.38, (h - topH) * 0.3, 9, '#00000022', 2.4)
  // crinkly top
  const pts = []
  const k = 9
  for (let i = 0; i <= k; i++) pts.push([x + (w * i) / k, y + (i % 2 ? 4 : -2) + j(1.5)])
  for (let i = k; i >= 0; i--) pts.push([x + (w * i) / k, y + topH + (i % 2 ? 3 : -2)])
  s += path(closed(pts), f.top, { stroke: C.ink, sw: 4 })
  s += line([[x + w * 0.14, y + topH * 0.45], [x + w * 0.32, y + topH * 0.6], [x + w * 0.46, y + topH * 0.35]], '#FFFFFF', 2.5, 0.35)
  const tcx = x + w / 2, tcy = y + topH / 2
  switch (f.top2) {
    case 'wheat':
      for (let i = 0; i < 5; i++) s += path(closed(ell(tcx - w * 0.3 + i * w * 0.15, tcy + j(4), 5, 3, 0.05, 8)), C.butter, { stroke: C.ink, sw: 1.5 })
      break
    case 'millet':
      s += dots(tcx, tcy, w * 0.38, topH * 0.3, 18, C.seed, 2.6, C.ink)
      break
    case 'seeds':
      s += dots(tcx, tcy, w * 0.36, topH * 0.28, 6, C.mint, 4, C.ink) + dots(tcx, tcy, w * 0.36, topH * 0.28, 6, C.butter, 3.5, C.ink)
      break
    case 'ragi':
      s += dots(tcx, tcy, w * 0.38, topH * 0.3, 16, '#B98577', 2.2)
      break
    case 'nuts':
      for (let i = 0; i < 3; i++) s += path(closed(ell(tcx - w * 0.25 + i * w * 0.25, tcy + j(3), w * 0.08, topH * 0.22, 0.12, 9)), C.caramelLight, { stroke: C.ink, sw: 2.5 })
      break
    case 'oreo':
      for (const dx of [-0.22, 0.2]) {
        s += path(closed(ell(tcx + w * dx, tcy, w * 0.13, topH * 0.3, 0.02, 12)), '#1E120D', { stroke: C.ink, sw: 2.5 })
        s += path(closed(ell(tcx + w * dx, tcy, w * 0.08, topH * 0.16, 0.02, 10)), '#2C1B14')
      }
      s += dots(tcx, tcy, w * 0.4, topH * 0.3, 8, C.white, 2.2)
      break
    case 'nutella':
      s += line([[x + w * 0.12, tcy + 2], [x + w * 0.3, tcy - topH * 0.25], [x + w * 0.5, tcy + topH * 0.15], [x + w * 0.7, tcy - topH * 0.25], [x + w * 0.88, tcy + 2]], '#A86A3A', 7)
      s += path(closed(ell(tcx, tcy - 2, 6, 5, 0.05, 8)), C.caramelLight, { stroke: C.ink, sw: 2 })
      break
    case 'chips':
      s += dots(tcx, tcy, w * 0.38, topH * 0.28, 9, '#1E120D', 4)
      break
    case 'triple':
      s += line([[x + w * 0.1, tcy - 3], [x + w * 0.3, tcy + 5], [x + w * 0.5, tcy - 5], [x + w * 0.7, tcy + 5], [x + w * 0.9, tcy - 3]], C.white, 4)
      s += line([[x + w * 0.12, tcy + 6], [x + w * 0.35, tcy - 4], [x + w * 0.6, tcy + 6], [x + w * 0.88, tcy - 2]], C.caramelLight, 4)
      s += dots(tcx, tcy, w * 0.35, topH * 0.25, 5, '#1E120D', 3.5)
      break
    default:
      s += line([[x + w * 0.55, tcy + 2], [x + w * 0.7, tcy - 3], [x + w * 0.85, tcy + 1]], C.fudge, 2.5)
  }
  return s
}
function cookie(cx, cy, r) {
  let s = shape(ell(cx, cy, r, r * 0.95, 0.05, 14), C.caramelLight, 4)
  s += dots(cx, cy, r * 0.6, r * 0.6, 7, C.fudge, r * 0.13)
  return s
}
function cupcake(cx, by, w, frost = C.rose) {
  const h = w * 0.62
  const cup = [[cx - w / 2, by - h], [cx + w / 2, by - h], [cx + w * 0.38, by], [cx - w * 0.38, by]]
  let s = shape(cup, C.caramel)
  for (let i = 1; i < 5; i++) s += line([[cx - w / 2 + (w * i) / 5, by - h + 4], [cx - w * 0.38 + (w * 0.76 * i) / 5, by - 4]], C.ink, 2, 0.5)
  s += shape([...ell(cx, by - h - w * 0.2, w * 0.56, w * 0.3, 0.06, 12)], frost)
  s += shape(ell(cx, by - h - w * 0.45, w * 0.32, w * 0.22, 0.06, 10), frost)
  s += sprinkles(cx, by - h - w * 0.3, w * 0.35, w * 0.2, 6, [C.white, C.caramelLight, C.mint], 6, 3.5)
  s += path(closed(ell(cx + 2, by - h - w * 0.72, w * 0.09, w * 0.09, 0.05, 8)), '#C9334F', { stroke: C.ink, sw: 2.5 })
  return s
}
function cocoaBean(cx, cy, s, rot = 0) {
  const o = shape(ell(0, 0, s * 0.5, s, 0.03, 12), C.milk, 3) + line([[0, -s * 0.85], [s * 0.12, 0], [0, s * 0.85]], C.caramelLight, 2.5)
  return g(o, `translate(${cx} ${cy}) rotate(${rot})`)
}
function box(x, y, w, h, cols, rows, flavours, color = C.rose) {
  let s = shape(rr(x, y, w, h, 22), color, 4.5)
  s += path(closed(rr(x + 14, y + 14, w - 28, h - 28, 14)), C.cream, { stroke: C.ink, sw: 3 })
  const pad = 22, cw = (w - pad * 2) / cols, ch = (h - pad * 2) / rows
  let i = 0
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const bx = x + pad + c * cw + 5, by = y + pad + r * ch + 5
      s += brownie(bx, by, cw - 10, ch - 10, flavours[i++ % flavours.length], 0.45)
    }
  return s
}

/* ---------- scene wrapper ---------- */
function scene(inner, bg = C.blush) {
  seed += 17
  let s = path(closed(ell(200, 208, 158, 150, 0.06, 16)), bg)
  s += sprinkles(200, 200, 185, 180, 14)
  s += heart(338, 72, 11, C.rose, 2.5) + heart(60, 330, 9, C.caramelLight, 2.5)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">${defs()}<rect width="400" height="400" fill="${C.cream}"/>${s}${sticker(inner)}</svg>`
}
const single = (flavour, bg, extra = '') => () => scene(brownie(100, 110, 200, 185, flavour, 0.42) + extra, bg)

const products = {
  classic: single('classic', C.blush),
  wheat: single('wheat', '#F6E3C8'),
  kambu: single('kambu', '#EDE6CF'),
  healthmix: single('healthmix', '#E4EEDC'),
  ragi: single('ragi', '#F3D9D3'),
  nuts: single('nuts', '#F6E3C8', ''),
  oreo: single('oreo', '#E9E4EC'),
  nutella: single('nutella', C.blush),
  double: single('double', '#F3D9D3'),
  triple: single('triple', C.blush),
  'box-4': () => scene(box(90, 95, 220, 220, 2, 2, ['classic', 'oreo', 'nutella', 'ragi']), '#F6E3C8'),
  'box-6': () => scene(box(65, 115, 270, 185, 3, 2, ['triple', 'kambu', 'classic', 'nuts', 'oreo', 'wheat']), C.blush),
  slab: () => {
    let s = shape(rr(70, 150, 260, 120, 16), C.fudge)
    s += path(closed(rr(70, 140, 260, 40, 14)), C.mid, { stroke: C.ink, sw: 4 })
    for (let i = 1; i < 4; i++) s += line([[70 + i * 65, 145], [70 + i * 65, 266]], C.ink, 3, 0.7)
    s += sprinkles(200, 158, 120, 10, 10, [C.rose, C.white, C.caramelLight], 7, 4)
    return scene(s, '#F6E3C8')
  },
  bites: () => {
    let s = shape([[90, 220], [310, 220], [280, 320], [120, 320]], C.rose, 4.5)
    s += line([[100, 250], [300, 250]], C.ink, 2.5, 0.4)
    const spots = [[120, 175], [175, 165], [230, 168], [280, 178], [150, 128], [205, 120], [255, 132]]
    for (const [x, y] of spots) s += brownie(x - 26, y - 6, 52, 50, ['classic', 'double', 'nuts'][(x + y) % 3], 0.4)
    return scene(s, '#F3D9D3')
  },
  jar: () => {
    let s = shape(rr(120, 100, 160, 230, 30), '#FFFFFFCC', 4.5)
    s += path(closed(rr(130, 250, 140, 70, 18)), C.fudge)
    s += path(closed(rr(130, 205, 140, 45, 6)), C.butter)
    s += path(closed(rr(130, 165, 140, 42, 6)), C.mid)
    s += path(closed(rr(130, 135, 140, 32, 10)), C.blush)
    s += sprinkles(200, 148, 55, 8, 7, [C.rose, C.caramel, C.white], 6, 3.5)
    s += shape(rr(110, 70, 180, 40, 12), C.caramel, 4.5)
    s += shape(rr(120, 100, 160, 230, 30), 'none', 4.5)
    s += line([[142, 130], [142, 300]], C.white, 5, 0.6)
    return scene(s, C.blush)
  },
  tub: () => {
    let s = shape([[95, 170], [305, 170], [285, 320], [115, 320]], C.cream, 4.5)
    s += path(closed([[105, 230], [295, 230], [285, 318], [115, 318]]), C.blush)
    s += shape(ell(200, 170, 108, 34, 0.02, 16), C.fudge, 4.5)
    for (const [x, y] of [[160, 158], [205, 150], [245, 162], [185, 178]]) s += brownie(x - 18, y - 14, 38, 30, 'double', 0.45)
    s += path(closed(ell(230, 175, 22, 12, 0.05, 10)), C.butter, { stroke: C.ink, sw: 3 })
    return scene(s, '#F6E3C8')
  },
  'lava-box': () => {
    let s = shape(rr(80, 130, 240, 170, 20), C.rose, 4.5)
    s += path(closed(rr(94, 144, 212, 142, 12)), C.cream, { stroke: C.ink, sw: 3 })
    for (const [x, y] of [[148, 180], [252, 180], [148, 248], [252, 248]]) {
      s += shape(ell(x, y, 42, 28, 0.03, 12), C.dark, 3.5)
      s += path(closed(ell(x + 6, y + 2, 20, 13, 0.08, 10)), '#7A3E1E', { stroke: C.ink, sw: 2.5 })
    }
    return scene(s, C.blush)
  },
  'lava-cups': () => {
    let s = ''
    for (const [cx, w] of [[140, 120], [265, 110]]) {
      s += shape([[cx - w / 2, 200], [cx + w / 2, 200], [cx + w * 0.4, 300], [cx - w * 0.4, 300]], C.butter)
      s += shape(ell(cx, 196, w * 0.52, w * 0.2, 0.03, 14), C.dark, 4)
      s += shape([[cx - 16, 190], [cx + 18, 190], [cx + 24, 240], [cx + 8, 252], [cx - 2, 232], [cx - 20, 210]], '#7A3E1E', 3)
    }
    s += heart(205, 120, 18)
    return scene(s, '#F3D9D3')
  },
  cake: () => {
    let s = shape(rr(95, 170, 210, 140, 20), C.fudge, 4.5)
    s += shape(ell(200, 172, 105, 30, 0.02, 16), C.mid, 4.5)
    const drip = [[95, 172]]
    for (let i = 0; i <= 10; i++) drip.push([95 + i * 21, 172 + (i % 2 ? 34 + j(6) : 12)])
    drip.push([305, 172])
    s += path(closed([...drip, ...ell(200, 172, 105, 30, 0.02, 16).filter((p) => p[1] < 172)]), C.rose, { stroke: C.ink, sw: 3.5 })
    s += heart(170, 150, 14) + heart(232, 150, 12, C.white)
    s += sprinkles(200, 165, 80, 14, 10, [C.white, C.caramelLight, C.mint], 6, 3.5)
    return scene(s, '#F6E3C8')
  },
  cupcakes: () => scene(cupcake(145, 315, 120) + cupcake(265, 300, 105, C.butter), C.blush),
  'cookie-tin': () => {
    let s = shape(ell(200, 250, 135, 70, 0.02, 18), C.rose, 4.5)
    s += shape(ell(200, 225, 135, 70, 0.02, 18), C.blush, 4.5)
    s += cookie(150, 215, 42) + cookie(245, 210, 40) + cookie(200, 245, 38)
    s += shape(ell(305, 150, 70, 30, 0.02, 14), C.roseDeep, 4)
    return scene(s, '#F6E3C8')
  },
}

/* ---------- hero: big brownie stack ---------- */
function hero() {
  seed = 321
  let s = path(closed(ell(300, 330, 270, 260, 0.06, 18)), C.blush)
  s += sprinkles(300, 320, 280, 280, 26, [C.rose, C.caramel, C.white, C.mint], 12, 7)
  let st = ''
  const layers = [['triple', 150, 420, 300, 150], ['classic', 165, 300, 270, 140], ['nutella', 180, 190, 240, 130]]
  for (const [f, x, y, w, h] of layers) st += brownie(x, y, w, h, f, 0.3)
  // chocolate drip over the top brownie
  const drip = []
  for (let i = 0; i <= 8; i++) drip.push([180 + i * 30, 200 + (i % 2 ? 26 + j(8) : 6)])
  drip.push([420, 186], [420, 190], [180, 190])
  st += path(closed(drip), C.dark, { stroke: C.ink, sw: 4 })
  st += heart(300, 150, 42)
  st += cookie(110, 470, 52) + cupcake(500, 560, 100) + cocoaBean(500, 170, 28, 30)
  s += sticker(st)
  s += heart(90, 200, 16, C.caramelLight) + heart(530, 330, 13)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 640">${defs(9)}${s}</svg>`
}

/* ---------- temporary logo icon: brownie with a heart ---------- */
function icon(bg = true) {
  seed = 5
  const inner = brownie(18, 30, 92, 76, 'classic', 0.34) + heart(64, 38, 22, C.rose, 3.5)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">${bg ? `<rect width="128" height="128" rx="30" fill="${C.blush}"/>` : ''}${inner}</svg>`
}

/* ---------- doodle background tile ---------- */
function doodles() {
  seed = 777
  const items = []
  const T = (inner, x, y, r = 0, sc = 1) => items.push(g(inner, `translate(${x} ${y}) rotate(${r}) scale(${sc})`))
  T(brownie(-30, -26, 60, 52, 'classic'), 70, 70, -10, 0.9)
  T(cookie(0, 0, 24), 250, 60)
  T(heart(0, 0, 14), 360, 130, 12)
  T(cupcake(0, 30, 54), 160, 180, 6, 0.9)
  T(sprinkles(0, 0, 30, 20, 6), 330, 250)
  T(g(shape(rr(-50, -18, 100, 40, 10), C.fudge) + shape(rr(-50, -24, 100, 16, 8), C.mid)), 90, 300, 8, 0.8)
  T(cocoaBean(0, 0, 18), 280, 360, 40)
  T(heart(0, 0, 10, C.caramelLight), 30, 200, -15)
  T(sprinkles(0, 0, 26, 18, 5), 190, 400)
  T(brownie(-24, -20, 48, 42, 'oreo'), 390, 30, 14, 0.8)
  T(cookie(0, 0, 18), 400, 390)
  T(heart(0, 0, 9), 230, 260, 10)
  T(sprinkles(0, 0, 20, 14, 4), 40, 410)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 440" width="440" height="440">${defs(4)}<g opacity="0.42" filter="url(#sticker)">${items.join('')}</g></svg>`
}

mkdirSync('public/products', { recursive: true })
for (const [k, fn] of Object.entries(products)) writeFileSync(`public/products/${k}.svg`, fn())
writeFileSync('public/hero-brownies.svg', hero())
writeFileSync('public/logo-icon.svg', icon(false))
writeFileSync('public/favicon.svg', icon(true))
writeFileSync('public/doodles.svg', doodles())
console.log('Wrote', Object.keys(products).length, 'product images + hero + icon + doodles')
