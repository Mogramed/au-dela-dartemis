export type MissionSection = {
  id: string
  label: string
  code: string
}

export const sections: MissionSection[] = [
  { id: 'hero', label: 'Mission', code: '01' },
  { id: 'motion', label: 'Lecture', code: '01A' },
  { id: 'manifesto', label: 'Mémoire', code: '02' },
  { id: 'context', label: 'Contexte', code: '03' },
  { id: 'human', label: 'Corps', code: '04' },
  { id: 'reveal', label: 'Design', code: '05' },
  { id: 'viewer', label: '3D', code: '06' },
  { id: 'process', label: 'Processus', code: '07' },
  { id: 'gallery', label: 'Croquis', code: '08' },
  { id: 'interior', label: 'Intérieur', code: '09' },
  { id: 'accessories', label: 'Accessoires', code: '09A' },
  { id: 'technical', label: 'Technique', code: '10' },
  { id: 'scenario', label: 'Scénario', code: '11' },
  { id: 'films', label: 'Vidéos', code: '11A' },
  { id: 'memoire', label: 'Archives', code: '12' },
  { id: 'final', label: 'Conclusion', code: '13' },
]
