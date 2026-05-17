import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import MissionNav from '@/components/layout/MissionNav'
import ProgressBar from '@/components/layout/ProgressBar'
import ContextMoon from '@/components/sections/ContextMoon'
import DesignProcess from '@/components/sections/DesignProcess'
import ArchiveFilms from '@/components/sections/ArchiveFilms'
import FinalStatement from '@/components/sections/FinalStatement'
import HeroMission from '@/components/sections/HeroMission'
import MotionShowcase from '@/components/sections/MotionShowcase'
import HumanVsMachine from '@/components/sections/HumanVsMachine'
import InteriorExperience from '@/components/sections/InteriorExperience'
import Manifesto from '@/components/sections/Manifesto'
import MemoireReader from '@/components/sections/MemoireReader'
import MissionScenario from '@/components/sections/MissionScenario'
import RoverReveal from '@/components/sections/RoverReveal'
import SketchGallery from '@/components/sections/SketchGallery'
import TechnicalBreakdown from '@/components/sections/TechnicalBreakdown'
import BootSequence from '@/components/ui/BootSequence'
import NoiseOverlay from '@/components/ui/NoiseOverlay'
import { sections } from '@/data/sections'
import { siteContent } from '@/data/siteContent'
import { useLenisScroll } from '@/hooks/useLenisScroll'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { preloadAssets } from '@/utils/preloadAssets'
import { shouldPreloadHeavyAssets, shouldReduceEffects } from '@/utils/performance'

const sectionIds = sections.map((section) => section.id)
const ThreeDViewer = lazy(() => import('@/components/sections/ThreeDViewer'))

function SectionLoader() {
  return (
    <section className="shell-section section-anchor" id="viewer">
      <div className="section-inner">
        <div className="hud-panel p-6 font-mono text-[11px] uppercase tracking-[0.16em] text-dust">
          Loading viewer module...
        </div>
      </div>
    </section>
  )
}

function LazyViewerSection() {
  const [shouldLoadViewer, setShouldLoadViewer] = useState(false)
  const placeholderRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (shouldLoadViewer || !placeholderRef.current) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadViewer(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '450px 0px',
        threshold: 0.01,
      },
    )

    observer.observe(placeholderRef.current)

    return () => observer.disconnect()
  }, [shouldLoadViewer])

  if (shouldLoadViewer) {
    return (
      <Suspense fallback={<SectionLoader />}>
        <ThreeDViewer />
      </Suspense>
    )
  }

  return (
    <section className="shell-section section-anchor" id="viewer" ref={placeholderRef}>
      <div className="section-inner">
        <div className="hud-panel p-6 font-mono text-[11px] uppercase tracking-[0.16em] text-dust">
          Viewer module primed...
        </div>
      </div>
    </section>
  )
}

function App() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const liteExperience = shouldReduceEffects()
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? 'hero')
  const [bootVisible, setBootVisible] = useState(!liteExperience)

  useLenisScroll()

  useEffect(() => {
    const assets = shouldPreloadHeavyAssets()
      ? [
          siteContent.hero.image,
          siteContent.hero.secondaryImage,
          siteContent.viewer.posterImage,
          siteContent.memoire.previewImage,
        ]
      : [siteContent.hero.image]

    preloadAssets(assets)
  }, [liteExperience])

  useEffect(() => {
    if (liteExperience) {
      setBootVisible(false)
      return undefined
    }

    const timeout = window.setTimeout(
      () => setBootVisible(false),
      prefersReducedMotion ? 900 : 3200,
    )

    return () => window.clearTimeout(timeout)
  }, [liteExperience, prefersReducedMotion])

  useEffect(() => {
    const observedSections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement)

    if (observedSections.length === 0) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        threshold: [0.15, 0.35, 0.55],
        rootMargin: '-15% 0px -45% 0px',
      },
    )

    observedSections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const navigation = useMemo(() => sections, [])

  return (
    <div className="relative min-h-screen overflow-x-clip bg-space text-lunar">
      <NoiseOverlay />
      <ProgressBar />
      <BootSequence visible={bootVisible} />
      <Header currentSection={activeSection} />
      <MissionNav currentSection={activeSection} sections={navigation} />

      <main className="relative z-10 pb-24 sm:pb-28 xl:pb-0">
        <HeroMission />
        <MotionShowcase />
        <Manifesto />
        <ContextMoon />
        <HumanVsMachine />
        <RoverReveal />
        <LazyViewerSection />
        <DesignProcess />
        <SketchGallery />
        <InteriorExperience />
        <TechnicalBreakdown />
        <MissionScenario />
        <ArchiveFilms />
        <MemoireReader />
        <FinalStatement />
      </main>

      <Footer />
    </div>
  )
}

export default App
