import { create } from 'zustand'

type PresentationState = {
  activeSlide: number
  slideCount: number
  setSlideCount: (value: number) => void
  setActiveSlide: (value: number) => void
  nextSlide: () => void
  previousSlide: () => void
}

export const usePresentationStore = create<PresentationState>((set) => ({
  activeSlide: 0,
  slideCount: 0,
  setSlideCount: (slideCount) => set({ slideCount }),
  setActiveSlide: (activeSlide) => set({ activeSlide }),
  nextSlide: () =>
    set((state) => ({
      activeSlide:
        state.slideCount === 0
          ? state.activeSlide
          : Math.min(state.activeSlide + 1, state.slideCount - 1),
    })),
  previousSlide: () =>
    set((state) => ({
      activeSlide: Math.max(state.activeSlide - 1, 0),
    })),
}))
