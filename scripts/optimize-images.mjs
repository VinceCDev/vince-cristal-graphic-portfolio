// Writes web-sized WebP copies of the originals into public/work. Originals are never modified.
import sharp from 'sharp'
import { readdirSync, mkdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

// Extended-length prefix lets Windows open the very long filename
const longPath = (p) => (process.platform === 'win32' ? '\\\\?\\' + resolve(p) : p)

const src = 'images/graphic_design'
const out = 'public/work'
mkdirSync(out, { recursive: true })

// Map original filename prefix -> clean slug. Edit here if you add artwork.
const map = [
  ['2.png', 'rizal-infographic'],
  ['agrifeed-pro', 'agrifeed-pro'],
  ['court_kings_logo', 'court-kings-logo'],
  ['DISTORTED PERSONALITY', 'wretched-personality-poster'],
  ['GLOBAL CITIZEN', 'global-citizen'],
  ['Global City', 'global-city'],
  ['Protect and conserve', 'climate-communication'],
  ['THE FIRST WEEK OF ECQ', 'first-week-of-ecq'],
]

await sharp('images/grad_pic/grad_pic.jpg')
  .resize({ width: 1000 })
  .webp({ quality: 85 })
  .toFile('public/brand/grad_pic.webp')

for (const file of readdirSync(src)) {
  const hit = map.find(([p]) => file.startsWith(p))
  if (!hit) { console.warn('skipped (no mapping):', file); continue }
  const img = sharp(longPath(join(src, file)))
  const { width } = await img.metadata()
  for (const [suffix, w] of [['sm', 900], ['lg', 2200]]) {
    const info = await img
      .clone()
      .resize({ width: Math.min(w, width), withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(join(out, `${hit[1]}-${suffix}.webp`))
    console.log(hit[1], suffix, `${info.width}x${info.height}`, Math.round(info.size / 1024) + 'KB')
  }
}

// Logo → favicon / touch icon / header mark
for (const [name, size] of [['favicon', 64], ['apple-touch-icon', 180], ['brand/logo-96', 96]]) {
  await sharp('images/logo/logo_vince.png').resize(size, size).png({ compressionLevel: 9 }).toFile(`public/${name}.png`)
}
