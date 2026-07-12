/**
 * Decorative botanicals for the daily menu — a detailed olive sprig echoing the
 * Aristo restaurant logo. Returned as SVG markup strings so the same art is used on
 * the web page (via dangerouslySetInnerHTML) and in the print/PDF document (inlined).
 * The SVGs carry no width/height, so the caller sizes them with CSS.
 */

/** Multiply an #rrggbb / #rgb colour toward black by `f` (0–1) → `rgb(r,g,b)`. */
function shade(hex, f) {
  const h = String(hex).replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  const r = Math.round(((n >> 16) & 255) * f)
  const g = Math.round(((n >> 8) & 255) * f)
  const b = Math.round((n & 255) * f)
  return `rgb(${r},${g},${b})`
}

/** Point + tangent angle (deg) at parameter `t` on a quadratic Bézier P0→P1→P2. */
function quadAt(t, P0, P1, P2) {
  const mt = 1 - t
  return {
    x: mt * mt * P0[0] + 2 * mt * t * P1[0] + t * t * P2[0],
    y: mt * mt * P0[1] + 2 * mt * t * P1[1] + t * t * P2[1],
    a:
      (Math.atan2(
        2 * mt * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]),
        2 * mt * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]),
      ) *
        180) /
      Math.PI,
  }
}

/** One veined, lanceolate leaf anchored at (x,y), pointing along `ang`. */
function oliveLeaf(x, y, ang, L, W, leafCol, veinCol) {
  const c = (L * 0.48).toFixed(1)
  return (
    `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)})">` +
    `<path d="M0 0 Q ${c} ${(-W).toFixed(1)} ${L.toFixed(1)} 0 Q ${c} ${W.toFixed(1)} 0 0 Z" fill="${leafCol}"/>` +
    `<path d="M${(L * 0.1).toFixed(1)} 0 L ${(L * 0.88).toFixed(1)} 0" stroke="${veinCol}" stroke-width="0.7" fill="none" opacity="0.75"/>` +
    `</g>`
  )
}

/**
 * A full olive sprig — curved stem with graduated opposite leaf pairs, a terminal
 * leaf and a few olives. Used large in the menu's botanical corners.
 */
export function oliveBranchSvg({ color = '#7f8d6f', opacity = 0.5 } = {}) {
  const stemCol = shade(color, 0.68)
  const veinCol = shade(color, 0.72)
  const oliveCol = shade(color, 0.82)
  const P0 = [8, 74]
  const P1 = [116, 14]
  const P2 = [236, 40]

  const parts = []
  const nodes = [0.14, 0.3, 0.46, 0.62, 0.76, 0.88]
  nodes.forEach((t) => {
    const p = quadAt(t, P0, P1, P2)
    const s = 1 - t * 0.5
    const L = 30 * s
    const W = 9.5 * s
    const sweep = 44 + t * 10
    parts.push(oliveLeaf(p.x, p.y, p.a - sweep, L, W, color, veinCol))
    parts.push(oliveLeaf(p.x, p.y, p.a + sweep, L, W, color, veinCol))
  })
  // Terminal leaf at the tip.
  const tip = quadAt(1, P0, P1, P2)
  parts.push(oliveLeaf(tip.x, tip.y, tip.a + 4, 19, 6, color, veinCol))

  // A few olives hanging off short stalks.
  ;[0.22, 0.4, 0.58].forEach((t, i) => {
    const p = quadAt(t, P0, P1, P2)
    const dir = i % 2 === 0 ? 1 : -1
    const rad = ((p.a + 90 * dir) * Math.PI) / 180
    const ox = p.x + Math.cos(rad) * 8
    const oy = p.y + Math.sin(rad) * 8
    parts.push(
      `<path d="M${p.x.toFixed(1)} ${p.y.toFixed(1)} L ${ox.toFixed(1)} ${oy.toFixed(1)}" stroke="${stemCol}" stroke-width="0.8"/>` +
        `<g transform="translate(${ox.toFixed(1)} ${oy.toFixed(1)}) rotate(${(p.a + 90 * dir).toFixed(1)})">` +
        `<ellipse rx="4.6" ry="6.4" fill="${oliveCol}"/>` +
        `<ellipse cx="-1.3" cy="-2" rx="1.1" ry="1.9" fill="${color}" opacity="0.55"/></g>`,
    )
  })

  return `<svg viewBox="0 0 244 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;overflow:visible" opacity="${opacity}">
    <path d="M8 74 Q 116 14 236 40" stroke="${stemCol}" stroke-width="1.9" fill="none" stroke-linecap="round"/>
    ${parts.join('')}
  </svg>`
}

/**
 * A small, symmetric two-leaf-and-berry motif — sits at the centre of course
 * dividers and under the logo as a delicate flourish.
 */
export function oliveSprigSvg({ color = '#7f8d6f', opacity = 0.9 } = {}) {
  const stemCol = shade(color, 0.68)
  const veinCol = shade(color, 0.72)
  const oliveCol = shade(color, 0.82)
  const cx = 30
  const cy = 15
  const leaves =
    oliveLeaf(cx - 3, cy, 182, 15, 5, color, veinCol) +
    oliveLeaf(cx + 3, cy, -2, 15, 5, color, veinCol) +
    oliveLeaf(cx - 2, cy - 1, 205, 10, 3.4, color, veinCol) +
    oliveLeaf(cx + 2, cy - 1, -25, 10, 3.4, color, veinCol)
  return `<svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;overflow:visible" opacity="${opacity}">
    <line x1="${cx - 14}" y1="${cy}" x2="${cx + 14}" y2="${cy}" stroke="${stemCol}" stroke-width="0.9"/>
    ${leaves}
    <ellipse cx="${cx}" cy="${cy}" rx="2.9" ry="4" fill="${oliveCol}"/>
    <ellipse cx="${cx - 0.8}" cy="${cy - 1.2}" rx="0.8" ry="1.2" fill="${color}" opacity="0.6"/>
  </svg>`
}
