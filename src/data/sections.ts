export type MissionSection = {
  id: string
  label: string
  code: string
}

export const sections: MissionSection[] = [
  { id: 'hero', label: 'Mission', code: '01' },
  { id: 'motion', label: 'Lecture', code: '01A' },
  { id: 'manifesto', label: 'Memoire', code: '02' },
  { id: 'context', label: 'Contexte', code: '03' },
  { id: 'human', label: 'Humain', code: '04' },
  { id: 'reveal', label: 'Concept', code: '05' },
  { id: 'viewer', label: 'Viewer', code: '06' },
  { id: 'process', label: 'Process', code: '07' },
  { id: 'gallery', label: 'Croquis', code: '08' },
  { id: 'interior', label: 'Interieur', code: '09' },
  { id: 'technical', label: 'Technique', code: '10' },
  { id: 'scenario', label: 'Scenario', code: '11' },
  { id: 'films', label: 'Films', code: '11A' },
  { id: 'memoire', label: 'Archives', code: '12' },
  { id: 'final', label: 'Conclusion', code: '13' },
]
