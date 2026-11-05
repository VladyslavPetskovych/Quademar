/**
 * Tells IndexNow-enabled search engines (Bing — which ChatGPT search relies on — Yandex, Seznam,
 * Naver…) that the site's pages have changed, so they recrawl in minutes rather than weeks.
 *
 *   node site/scripts/indexnow.mjs
 *
 * Run by the deploy workflow after the new build is live. Reads the URL list from the LIVE
 * sitemap, so it always submits exactly what is deployed. No dependencies (Node 18+ `fetch`).
 * The key is public by design: IndexNow verifies ownership by fetching `/{KEY}.txt`, which
 * lives in `site/public/`.
 */
const ORIGIN = 'https://guardamarhotelspa.com'
const KEY = 'e4e34a4ce9503b3b0693477cfa43c652'

const sitemap = await fetch(`${ORIGIN}/sitemap.xml`).then((res) => {
  if (!res.ok) throw new Error(`sitemap.xml: HTTP ${res.status}`)
  return res.text()
})
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
if (!urlList.length) throw new Error('sitemap.xml has no <loc> entries')

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(ORIGIN).host,
    key: KEY,
    keyLocation: `${ORIGIN}/${KEY}.txt`,
    urlList,
  }),
})

// 200 = accepted, 202 = accepted while the key is being verified (normal on the first submit).
if (res.status !== 200 && res.status !== 202) {
  throw new Error(`IndexNow: HTTP ${res.status} ${await res.text()}`)
}
console.log(`IndexNow: submitted ${urlList.length} URLs (HTTP ${res.status})`)
