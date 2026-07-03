#!/usr/bin/env node
/** IndexNow pinger — autonomous search-engine distribution.
 *
 * Reads the live sitemap and submits every URL to the IndexNow API, which feeds
 * Bing (and via it DuckDuckGo), Yandex, Seznam, and Naver. Google does not
 * support IndexNow — its indexing comes from the Search Console sitemap.
 *
 * The key file (public/<key>.txt, content == key) is already deployed, so this
 * needs NO secrets: the key is public by design. Run on every deploy + weekly.
 *
 *   node scripts/indexnow-ping.mjs
 */
const HOST = 'undercutpricer.com'
const KEY = 'e871924520ea02388d53ceb6a08ac377'
const SITEMAP = `https://${HOST}/sitemap.xml`

async function main() {
  const xml = await (await fetch(SITEMAP)).text()
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  if (!urls.length) throw new Error(`no <loc> entries found in ${SITEMAP}`)

  // Sanity: key file must be live, else engines reject the batch.
  const keyRes = await fetch(`https://${HOST}/${KEY}.txt`)
  if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
    throw new Error('IndexNow key file is not serving correctly — aborting')
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls.slice(0, 10000),
    }),
  })
  // 200 = OK, 202 = accepted (validation pending) — both are success.
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow rejected the batch: HTTP ${res.status} ${await res.text()}`)
  }
  console.log(`IndexNow: submitted ${urls.length} URLs for ${HOST} (HTTP ${res.status})`)
}

main().catch((e) => { console.error(e.message || e); process.exit(1) })
