export type TechnicalSpec = {
  title: string
  description: string
  status: string
}

export const technicalSpecs: TechnicalSpec[] = [
  {
    title: 'Structure pressurisee',
    description:
      "Une coque continue protege les usages de detente et de deplacement court sans casser la lisibilite du volume.",
    status: 'ACTIVE',
  },
  {
    title: 'Energie embarquee',
    description:
      "Le chassis accueille batteries, reserve d'energie et maintenance en separant l'infrastructure technique de l'experience de cabine.",
    status: 'STABLE',
  },
  {
    title: 'Habitabilite',
    description:
      "Les surfaces interieures travaillent autant la posture, l'observation et le relachement que la simple efficacite de transport.",
    status: 'PRESSURIZED',
  },
  {
    title: 'Observation',
    description:
      "La zone arriere transforme la pause en scenario de contemplation, pour reintroduire du paysage dans la mission.",
    status: 'OPEN FIELD',
  },
]
