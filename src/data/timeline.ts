export type TimelineItem = {
  label: string
  title: string
  description: string
}

export const timeline: TimelineItem[] = [
  {
    label: 'Phase 01',
    title: 'Observer le ciel',
    description: "L'intérêt pour la Lune naît d'abord de l'observation des astres et des récits qui les accompagnent.",
  },
  {
    label: 'Phase 02',
    title: 'Entrer dans la conquête spatiale',
    description: "Le XXe siècle transforme cette curiosité en programme technique, scientifique et politique.",
  },
  {
    label: 'Phase 03',
    title: 'Apollo et le sol lunaire',
    description: "Avec Apollo, la Lune devient un terrain réel, parcouru et documenté par des équipages humains.",
  },
  {
    label: 'Phase 04',
    title: 'Stations et présence orbitale',
    description: "Les stations prolongent le temps passé hors de la Terre et déplacent la question vers la vie quotidienne en milieu spatial.",
  },
  {
    label: 'Phase 05',
    title: "Artémis et l'hypothèse d'une présence",
    description: "Artémis ne parle plus seulement d'exploit. Il ouvre l'idée de bases, de trajets et d'usages plus réguliers sur la Lune.",
  },
]
