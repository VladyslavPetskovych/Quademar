/**
 * Decorative botanicals for the daily menu — a stylised olive sprig, echoing the
 * printed menu's watercolour corners. Returned as an SVG markup string so the same
 * art is used on the web page (via dangerouslySetInnerHTML) and in the print/PDF
 * document (inlined). The SVG has no width/height, so the caller sizes it with CSS.
 */
export function oliveBranchSvg({ color = '#7f8d6f', opacity = 0.5 } = {}) {
  const N = 9
  const leaves = []
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1)
    const x = 22 + t * 200
    const baseY = 66 - Math.sin(t * Math.PI) * 30 // gentle arch
    const up = i % 2 === 0
    const cy = baseY + (up ? -12 : 12)
    const rot = (up ? -40 : 40) + t * 12
    leaves.push(
      `<ellipse cx="${x.toFixed(1)}" cy="${cy.toFixed(1)}" rx="13" ry="5" transform="rotate(${rot.toFixed(1)} ${x.toFixed(1)} ${cy.toFixed(1)})"/>`,
    )
    if (i % 3 === 1) leaves.push(`<circle cx="${x.toFixed(1)}" cy="${baseY.toFixed(1)}" r="3.1"/>`)
  }
  // A small leaf at the tip.
  leaves.push('<ellipse cx="226" cy="42" rx="10" ry="4" transform="rotate(18 226 42)"/>')

  return `<svg viewBox="0 0 244 100" xmlns="http://www.w3.org/2000/svg" fill="none" style="width:100%;height:auto;display:block;overflow:visible" opacity="${opacity}">
    <path d="M16 68 Q 120 12 226 42" stroke="${color}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <g fill="${color}">${leaves.join('')}</g>
  </svg>`
}
