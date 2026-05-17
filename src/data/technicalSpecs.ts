export type TechnicalSpec = {
  title: string
  description: string
  status: string
}

export const technicalSpecs: TechnicalSpec[] = [
  {
    title: 'Structure pressurisee',
    description:
      "Une coque continue protege l'habitacle et maintient la lisibilite generale du volume.",
    status: 'STRUCTURE',
  },
  {
    title: 'Energie embarquee',
    description:
      "Le chassis accueille batteries, reserves et maintenance sans saturer la lecture interieure.",
    status: 'ENERGIE',
  },
  {
    title: 'Habitabilite',
    description:
      "Les surfaces interieures travaillent la posture, l'observation et le relachement autant que le deplacement.",
    status: 'INTERIEUR',
  },
  {
    title: 'Observation',
    description:
      "La zone arriere remet le paysage au coeur de l'usage par des temps d'arret et d'observation.",
    status: 'OBSERVATION',
  },
]
