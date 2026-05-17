#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const imagesRoot = path.resolve(__dirname, '../public/images')

async function collectImages(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        if (/\\raw$/i.test(entryPath) || /\/raw$/i.test(entryPath)) {
          return []
        }

        return collectImages(entryPath)
      }
      if (/\.(jpe?g|png)$/i.test(entry.name)) {
        return [entryPath]
      }
      return []
    }),
  )

  return files.flat()
}

async function main() {
  let sharp

  try {
    sharp = (await import('sharp')).default
  } catch {
    console.error(
      'Sharp is not installed. Run "npm install -D sharp" before using scripts/optimize-images.js.',
    )
    process.exit(1)
  }

  const images = await collectImages(imagesRoot)
  let converted = 0

  for (const sourcePath of images) {
    const outputPath = sourcePath.replace(/\.(jpe?g|png)$/i, '.webp')
    const isThumbnail = /[\\/]thumbnails[\\/]/i.test(sourcePath)
    const maxWidth = isThumbnail ? 1200 : 2200
    const maxHeight = isThumbnail ? 1200 : 2200

    await sharp(sourcePath)
      .resize({
        width: maxWidth,
        height: maxHeight,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ effort: 5, quality: isThumbnail ? 74 : 78 })
      .toFile(outputPath)
    converted += 1
  }

  console.log(`Converted ${converted} image(s) to WebP.`)
}

await main()
