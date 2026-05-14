import { create } from 'zustand'
import type { HotspotId } from '@/data/hotspots'

export type ViewerMode = 'exterior' | 'interior' | 'chassis' | 'details' | 'cinematic'

type ViewerState = {
  mode: ViewerMode
  performanceMode: boolean
  selectedHotspot: HotspotId
  resetNonce: number
  setMode: (mode: ViewerMode) => void
  setPerformanceMode: (value: boolean) => void
  togglePerformanceMode: () => void
  setSelectedHotspot: (hotspot: HotspotId) => void
  resetView: () => void
}

export const useViewerStore = create<ViewerState>((set) => ({
  mode: 'exterior',
  performanceMode: false,
  selectedHotspot: 'pressurized-door',
  resetNonce: 0,
  setMode: (mode) => set({ mode }),
  setPerformanceMode: (value) => set({ performanceMode: value }),
  togglePerformanceMode: () =>
    set((state) => ({ performanceMode: !state.performanceMode })),
  setSelectedHotspot: (selectedHotspot) => set({ selectedHotspot }),
  resetView: () => set((state) => ({ resetNonce: state.resetNonce + 1 })),
}))
