#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rendersRoot = path.resolve(__dirname, '../public/images/renders')
const thumbnailsRoot = path.resolve(__dirname, '../public/images/thumbnails/generated')

async function collectImages(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        return collectImages(entryPath)
      }
      if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
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
      'Sharp is not installed. Run "npm install -D sharp" before using scripts/generate-thumbnails.js.',
    )
    process.exit(1)
  }

  await fs.mkdir(thumbnailsRoot, { recursive: true })

  const images = await collectImages(rendersRoot)
  let created = 0

  for (const sourcePath of images) {
    const parsed = path.parse(sourcePath)
    const outputPath = path.join(thumbnailsRoot, `${parsed.name}-thumb.webp`)
    await sharp(sourcePath)
      .resize({ width: 640, height: 640, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(outputPath)
    created += 1
  }

  console.log(`Generated ${created} thumbnail(s).`)
}

await main()
