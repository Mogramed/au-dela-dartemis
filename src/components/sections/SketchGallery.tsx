import { useMemo, useState } from 'react'
import ImageModal from '@/components/ui/ImageModal'
import ScanLine from '@/components/ui/ScanLine'
import SectionTitle from '@/components/ui/SectionTitle'
import {
  galleryCategories,
  galleryCategoryLabels,
  galleryItems,
  type GalleryCategory,
  type GalleryItem,
} from '@/data/gallery'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function SketchGallery() {
  const revealRef = useAnimeReveal<HTMLElement>()
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All')
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') {
      return galleryItems
    }

    return galleryItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  return (
    <section className="shell-section section-anchor" id="gallery" ref={revealRef}>
      <div className="section-inner space-y-8">
        <SectionTitle
          description="Les croquis montrent les essais du projet : silhouette, accès, posture, habitacle et rapport au paysage lunaire."
          eyebrow="MODULE 08 / Galerie"
          title="Croquis, rendus et détails du projet"
        />

        <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
          {galleryCategories.map((category) => (
            <button
              className={`shrink-0 rounded-sm border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                activeCategory === category
                  ? 'border-lime-300/25 bg-lime-300/8 text-lunar'
                  : 'border-white/10 bg-white/[0.03] text-dust hover:text-lunar'
              }`}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {galleryCategoryLabels[category]}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <button
              className="image-frame group min-h-[240px] text-left sm:min-h-[280px]"
              key={`${item.category}-${item.title}`}
              onClick={() => setSelectedItem(item)}
              type="button"
            >
              <ScanLine />
              <img
                alt={item.title}
                className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${
                  item.fit === 'contain' ? 'bg-black/50 object-contain p-4' : 'object-cover'
                }`}
                loading="lazy"
                src={item.src}
                style={{ objectPosition: item.objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space via-space/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 space-y-2 p-4">
                <p className="mono-copy">{galleryCategoryLabels[item.category]}</p>
                <h3 className="text-lg uppercase leading-tight">{item.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  )
}

export default SketchGallery
