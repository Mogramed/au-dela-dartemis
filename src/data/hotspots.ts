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
  id: HotspotId
  title: string
  label: string
  description: string
  details: string[]
  position: [number, number, number]
  modelPosition?: [number, number, number]
}

export const hotspots: Hotspot[] = [
  {
    id: 'pressurized-door',
    title: 'Porte pressurisee',
    label: 'Entry',
    description:
      "Le seuil fait la transition entre zone de mission et capsule de recuperation. Il condense la logique du refuge mobile.",
    details: ['Acces rapide', 'Sas lisible', 'Geste de bascule entre effort et repos'],
    position: [-1.9, 0.2, 0.95],
    modelPosition: [-0.45, 0.14, 1.08],
  },
  {
    id: 'cockpit',
    title: 'Cabine',
    label: 'Cabin',
    description:
      "L'habitacle garde une lecture simple: conduite, lecture du terrain et respiration, plutot qu'un cockpit surcharge.",
    details: ['2 personnes', 'Lecture frontale', 'Volume protecteur'],
    position: [-0.2, 0.95, 0],
    modelPosition: [-1.12, 0.46, 0.04],
  },
  {
    id: 'rear-lounge',
    title: 'Zone arriere contemplative',
    label: 'Lounge',
    description:
      "La partie arriere ouvre un usage rare en contexte spatial: s'allonger, regarder, se desaturer du travail.",
    details: ['Observation', 'Micro-recuperation', 'Paysage comme ressource'],
    position: [1.6, 0.55, 0],
    modelPosition: [1.28, 0.34, 0],
  },
  {
    id: 'dashboard',
    title: 'Tableau de bord',
    label: 'Dash',
    description:
      "Les informations sont regroupees dans un geste compact pour garder le champ visuel ouvert et l'usage intuitif.",
    details: ['Interfaces concentrees', 'Lecture rapide', 'Moins de fatigue cognitive'],
    position: [-0.85, 0.65, 0.7],
    modelPosition: [-1.38, 0.2, 0.54],
  },
  {
    id: 'wheels',
    title: 'Roues',
    label: 'Mobility',
    description:
      "Le dessin des roues fait le lien entre robustesse mecanique, identite du projet et franchise visuelle.",
    details: ['Grand diametre', 'Presence sculpturale', 'Appui stable'],
    position: [0.6, -0.35, 1.55],
    modelPosition: [0.08, -0.68, 1.04],
  },
  {
    id: 'chassis',
    title: 'Chassis',
    label: 'Frame',
    description:
      "Sous le volume principal, le chassis porte l'autonomie technique sans ecraser la perception du vehicule.",
    details: ['Infrastructure dissociee', 'Assemblage lisible', 'Base de maintenance'],
    position: [0.3, -0.55, 0],
    modelPosition: [0.02, -0.86, 0],
  },
  {
    id: 'oxygen-tanks',
    title: "Reservoirs d'oxygene",
    label: 'O2',
    description:
      "Les ressources vitales restent integrees a la logique d'ensemble au lieu d'etre plaquees comme un appendice purement ingenieur.",
    details: ['Stockage dedie', 'Protection passive', 'Lecture fonctionnelle'],
    position: [1.95, -0.05, -0.65],
    modelPosition: [1.56, -0.16, -0.72],
  },
  {
    id: 'batteries',
    title: 'Batteries',
    label: 'Power',
    description:
      "Les batteries participent au centre de gravite du vehicule et soutiennent une autonomie orientee usage plutot que performance brute.",
    details: ['Masse controlee', 'Acces technique', 'Autonomie scenario'],
    position: [0.45, -0.15, -0.95],
    modelPosition: [0.62, -0.48, -0.86],
  },
  {
    id: 'thermal-system',
    title: 'Systeme thermique',
    label: 'Thermal',
    description:
      "Le confort thermique devient une condition de l'experience humaine, pas un sujet secondaire de coulisse.",
    details: ['Confort cabine', 'Stabilite des interfaces', 'Habiter durablement'],
    position: [1.35, 0.2, -0.85],
    modelPosition: [1.18, 0.08, -1.02],
  },
]

export const getHotspotPosition = (hotspot: Hotspot, useModelPosition: boolean) =>
  useModelPosition ? hotspot.modelPosition ?? hotspot.position : hotspot.position
