import { create } from 'zustand'

type PresentationState = {
  activeSlide: number
  direction: -1 | 1
  slideCount: number
  setSlideCount: (value: number) => void
  setActiveSlide: (value: number) => void
  jumpToSlide: (value: number) => void
  nextSlide: () => void
  previousSlide: () => void
}

export const usePresentationStore = create<PresentationState>((set) => ({
  activeSlide: 0,
  direction: 1,
  slideCount: 0,
  setSlideCount: (slideCount) =>
    set((state) => ({
      activeSlide: Math.min(state.activeSlide, Math.max(slideCount - 1, 0)),
      slideCount,
    })),
  setActiveSlide: (activeSlide) =>
    set((state) => ({
      activeSlide: Math.max(0, Math.min(activeSlide, Math.max(state.slideCount - 1, 0))),
    })),
  jumpToSlide: (activeSlide) =>
    set((state) => ({
      activeSlide: Math.max(0, Math.min(activeSlide, Math.max(state.slideCount - 1, 0))),
      direction: activeSlide >= state.activeSlide ? 1 : -1,
    })),
  nextSlide: () =>
    set((state) => ({
      direction: 1,
      activeSlide:
        state.slideCount === 0
          ? state.activeSlide
          : Math.min(state.activeSlide + 1, state.slideCount - 1),
    })),
  previousSlide: () =>
    set((state) => ({
      direction: -1,
      activeSlide: Math.max(state.activeSlide - 1, 0),
    })),
}))
