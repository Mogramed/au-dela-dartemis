import { create } from 'zustand'
import type { HotspotId } from '@/data/hotspots'

export type ViewerMode = 'exterior' | 'interior' | 'chassis' | 'details' | 'cinematic'
export type ViewerFocusMode = 'normal' | 'accent' | 'isolate'

type ViewerState = {
  focusMode: ViewerFocusMode
  mode: ViewerMode
  performanceMode: boolean
  selectedHotspot: HotspotId
  resetNonce: number
  setFocusMode: (mode: ViewerFocusMode) => void
  setMode: (mode: ViewerMode) => void
  setPerformanceMode: (value: boolean) => void
  togglePerformanceMode: () => void
  setSelectedHotspot: (hotspot: HotspotId) => void
  resetView: () => void
}

export const useViewerStore = create<ViewerState>((set) => ({
  focusMode: 'accent',
  mode: 'exterior',
  performanceMode: false,
  selectedHotspot: 'pressurized-door',
  resetNonce: 0,
  setFocusMode: (focusMode) => set({ focusMode }),
  setMode: (mode) => set({ mode }),
  setPerformanceMode: (value) => set({ performanceMode: value }),
  togglePerformanceMode: () =>
    set((state) => ({ performanceMode: !state.performanceMode })),
  setSelectedHotspot: (selectedHotspot) => set({ selectedHotspot }),
  resetView: () => set((state) => ({ resetNonce: state.resetNonce + 1 })),
}))
