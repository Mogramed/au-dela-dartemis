export type TimelineItem = {
  label: string
  title: string
  description: string
}

export const timeline: TimelineItem[] = [
  {
    label: 'Phase 01',
    title: 'Retour durable sur la Lune',
    description:
      "Le cadre n'est plus celui d'une visite ponctuelle mais celui d'une installation durable, de travail et de retour a la base.",
  },
  {
    label: 'Phase 02',
    title: 'La base comme quotidien',
    description:
      "L'enjeu glisse d'un exploit ponctuel vers une routine extreme: circulation, maintenance, repos et observation.",
  },
  {
    label: 'Phase 03',
    title: 'Le paysage comme contrainte',
    description:
      "Faible gravite, isolement et horizon mineral redessinent le rapport au corps autant que les outils de mission.",
  },
  {
    label: 'Phase 04',
    title: "L'automatisation ne suffit pas",
    description:
      "Les machines explorent, mesurent et securisent. Elles ne remplacent pas l'experience vecue d'un equipage.",
  },
  {
    label: 'Phase 05',
    title: 'Le vehicule devient lieu',
    description:
      "La mobilite n'est plus seulement un trajet: elle devient un espace de transition entre effort, recuperation et observation.",
  },
]
