export type HotspotId =
  | 'pressurized-door'
  | 'cockpit'
  | 'rear-lounge'
  | 'dashboard'
  | 'wheels'
  | 'chassis'
  | 'oxygen-tanks'
  | 'batteries'
  | 'thermal-system'

export type Hotspot = {
  accentColor?: string
  cinematicFov?: number
  cinematicOffset?: [number, number, number]
  cinematicTarget?: [number, number, number]
  id: HotspotId
  focusRadius?: number
  title: string
  label: string
  description: string
  details: string[]
  position: [number, number, number]
  modelPosition?: [number, number, number]
  detailOffset?: [number, number, number]
  detailTarget?: [number, number, number]
}

export const hotspots: Hotspot[] = [
  {
    id: 'pressurized-door',
    accentColor: '#c6ff3e',
    focusRadius: 0.92,
    title: 'Porte pressurisee',
    label: 'Entree',
    description:
      "Le seuil organise le passage entre le dehors, le vehicule et le temps de retour au calme.",
    cinematicFov: 27.5,
    cinematicOffset: [1.7, 0.52, 1.18],
    cinematicTarget: [-0.48, 0.14, 0.92],
    details: ['Acces', 'Sas', 'Transition'],
    position: [-1.9, 0.2, 0.95],
    modelPosition: [-0.45, 0.14, 1.08],
    detailTarget: [-0.52, 0.1, 0.94],
    detailOffset: [1.28, 0.36, 0.82],
  },
  {
    id: 'cockpit',
    accentColor: '#9bc1ff',
    focusRadius: 1.12,
    title: 'Cabine',
    label: 'Cabine',
    description:
      "L'habitacle regroupe conduite, lecture du terrain et ouverture visuelle sans surcharge.",
    cinematicFov: 26.5,
    cinematicOffset: [1.5, 0.6, 1.02],
    cinematicTarget: [-1.0, 0.38, 0.08],
    details: ['Deux places', 'Lecture frontale', 'Volume protecteur'],
    position: [-0.2, 0.95, 0],
    modelPosition: [-1.12, 0.46, 0.04],
    detailTarget: [-1.02, 0.38, 0.08],
    detailOffset: [1.18, 0.42, 0.88],
  },
  {
    id: 'rear-lounge',
    accentColor: '#d7c8ff',
    focusRadius: 1.18,
    title: 'Zone arriere contemplative',
    label: 'Lounge',
    description:
      "La partie arriere ouvre un temps d'arret, d'observation et de relachement apres le travail.",
    cinematicFov: 27,
    cinematicOffset: [1.72, 0.54, 1.12],
    cinematicTarget: [1.14, 0.28, 0.04],
    details: ['Observation', 'Recuperation', 'Rapport au paysage'],
    position: [1.6, 0.55, 0],
    modelPosition: [1.28, 0.34, 0],
    detailTarget: [1.18, 0.28, 0.04],
    detailOffset: [1.42, 0.52, 0.96],
  },
  {
    id: 'dashboard',
    accentColor: '#78d0ff',
    focusRadius: 0.86,
    title: 'Tableau de bord',
    label: 'Dash',
    description:
      "Les informations sont regroupees pour garder le champ visuel ouvert et limiter la surcharge.",
    cinematicFov: 25.5,
    cinematicOffset: [1.2, 0.38, 0.82],
    cinematicTarget: [-1.18, 0.18, 0.42],
    details: ['Interfaces concentrees', 'Lecture rapide', 'Champ visuel degage'],
    position: [-0.85, 0.65, 0.7],
    modelPosition: [-1.38, 0.2, 0.54],
    detailTarget: [-1.2, 0.18, 0.42],
    detailOffset: [1.04, 0.34, 0.66],
  },
  {
    id: 'wheels',
    accentColor: '#ffb36b',
    focusRadius: 1.02,
    title: 'Roues',
    label: 'Roues',
    description:
      "Les roues montrent le rapport au sol, aux appuis et a la robustesse generale du vehicule.",
    cinematicFov: 26.8,
    cinematicOffset: [1.28, 0.34, 0.94],
    cinematicTarget: [0.02, -0.68, 0.94],
    details: ['Grand diametre', 'Appui stable', 'Contact au sol'],
    position: [0.6, -0.35, 1.55],
    modelPosition: [0.08, -0.68, 1.04],
    detailTarget: [0.02, -0.72, 0.94],
    detailOffset: [1.02, 0.26, 0.56],
  },
  {
    id: 'chassis',
    accentColor: '#9aa8bb',
    focusRadius: 1.36,
    title: 'Chassis',
    label: 'Chassis',
    description:
      "Le chassis porte la structure technique du projet sans prendre le dessus sur sa lecture generale.",
    cinematicFov: 28.2,
    cinematicOffset: [1.48, 0.28, 1.16],
    cinematicTarget: [0.02, -0.78, 0.02],
    details: ['Structure', 'Assemblage', 'Maintenance'],
    position: [0.3, -0.55, 0],
    modelPosition: [0.02, -0.86, 0],
    detailTarget: [0.02, -0.78, 0.02],
    detailOffset: [1.28, 0.22, 0.9],
  },
  {
    id: 'oxygen-tanks',
    accentColor: '#74c7ff',
    focusRadius: 0.92,
    title: "Reservoirs d'oxygene",
    label: 'O2',
    description:
      "Les reservoirs sont integres a l'ensemble du projet et a sa logique de service.",
    cinematicFov: 27,
    cinematicOffset: [1.56, 0.48, 0.98],
    cinematicTarget: [1.32, -0.14, -0.62],
    details: ['Stockage', 'Protection', 'Fonction'],
    position: [1.95, -0.05, -0.65],
    modelPosition: [1.56, -0.16, -0.72],
    detailTarget: [1.34, -0.14, -0.62],
    detailOffset: [1.12, 0.42, 0.76],
  },
  {
    id: 'batteries',
    accentColor: '#ffd06d',
    focusRadius: 0.94,
    title: 'Batteries',
    label: 'Batteries',
    description:
      "Les batteries s'integrent a l'organisation du vehicule et a son autonomie de service.",
    cinematicFov: 27.2,
    cinematicOffset: [1.36, 0.4, 1.06],
    cinematicTarget: [0.56, -0.46, -0.76],
    details: ['Masse', 'Acces technique', 'Autonomie'],
    position: [0.45, -0.15, -0.95],
    modelPosition: [0.62, -0.48, -0.86],
    detailTarget: [0.56, -0.48, -0.76],
    detailOffset: [1.02, 0.28, 0.82],
  },
  {
    id: 'thermal-system',
    accentColor: '#ff8a78',
    focusRadius: 0.9,
    title: 'Systeme thermique',
    label: 'Thermique',
    description:
      "Le thermique participe directement aux conditions d'habitabilite de la cabine.",
    cinematicFov: 26.6,
    cinematicOffset: [1.34, 0.46, 0.96],
    cinematicTarget: [1.02, 0.04, -0.92],
    details: ['Confort cabine', 'Stabilite', 'Habitabilite'],
    position: [1.35, 0.2, -0.85],
    modelPosition: [1.18, 0.08, -1.02],
    detailTarget: [1.04, 0.04, -0.92],
    detailOffset: [1.0, 0.36, 0.74],
  },
]

export const getHotspotPosition = (hotspot: Hotspot, useModelPosition: boolean) =>
  useModelPosition ? hotspot.modelPosition ?? hotspot.position : hotspot.position

export const getHotspotDetailTarget = (hotspot: Hotspot) =>
  hotspot.detailTarget ?? hotspot.modelPosition ?? hotspot.position
