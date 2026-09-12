/**
 * Correzioni di contenuto su Sanity: typo negli hobby e em dash nel testo About.
 * Uso: cd ~/Dropbox/antonio-portfolio/studio-config && npx sanity exec fix-contenuti.js --with-user-token
 * Idempotente: se una correzione e' gia' applicata non riscrive nulla.
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2023-12-01' })

const TYPOS = [
  ['Butterly', 'Butterfly'],
  ['artoworks', 'artworks'],
  ['piecesof', 'pieces of'],
  ['DYI', 'DIY'],
]

const ABOUT_FROM = 'business — cost, risk, and delivery time — and filter out the noise'
const ABOUT_TO = 'business: cost, risk, and delivery time, and filter out the noise'

function applyTypos(text) {
  let out = text
  for (const [from, to] of TYPOS) out = out.split(from).join(to)
  return out
}

async function fixHobbies() {
  const docs = await client.fetch('*[_type=="hobby"]{_id,title,description}')
  let n = 0
  for (const doc of docs) {
    const title = applyTypos(doc.title || '')
    const description = applyTypos(doc.description || '')
    if (title !== doc.title || description !== doc.description) {
      await client.patch(doc._id).set({ title, description }).commit()
      console.log(`hobby corretto: ${title}`)
      n++
    }
  }
  console.log(`hobby: ${n} documenti aggiornati su ${docs.length}`)
}

async function fixAbout() {
  const doc = await client.fetch('*[_type=="about"][0]{_id,content}')
  if (!doc) {
    console.log('about: nessun documento trovato')
    return
  }
  let changed = false
  const content = doc.content.map((block) => {
    if (!Array.isArray(block.children)) return block
    const children = block.children.map((child) => {
      if (typeof child.text !== 'string') return child
      let text = child.text.split(ABOUT_FROM).join(ABOUT_TO)
      text = text.replace(/\s*—\s*/g, ', ') // eventuali em dash residui
      if (text !== child.text) changed = true
      return { ...child, text }
    })
    return { ...block, children }
  })
  if (changed) {
    await client.patch(doc._id).set({ content }).commit()
    console.log('about: em dash rimossi')
  } else {
    console.log('about: nessun em dash da correggere')
  }
}

async function main() {
  await fixHobbies()
  await fixAbout()
  console.log('Fatto. Ricarica https://antoniocarcagni.com per verificare.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
