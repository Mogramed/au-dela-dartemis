export type TechnicalSpec = {
  title: string
  description: string
  status: string
}

export const technicalSpecs: TechnicalSpec[] = [
  {
    title: 'Volume pressurisé',
    description:
      "Une coque continue protège l'habitacle et garde une lecture simple du volume principal.",
    status: 'PROTECTION',
  },
  {
    title: 'Énergie et maintenance',
    description:
      "Le châssis accueille batteries, réserves et accès techniques sans saturer l'intérieur.",
    status: 'ÉNERGIE',
  },
  {
    title: 'Circulation intérieure',
    description:
      "Les surfaces intérieures sont pensées pour le passage, la posture et le changement d'appui.",
    status: 'CIRCULATION',
  },
  {
    title: 'Vue et observation',
    description:
      "La zone arrière remet le paysage dans l'usage sans détacher le véhicule de sa fonction de trajet.",
    status: 'VISIBILITÉ',
  },
]
