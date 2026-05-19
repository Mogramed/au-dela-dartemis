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
    title: 'Accès latéral',
    label: 'Accès',
    description:
      "L'entrée doit rester simple, identifiable et compatible avec les contraintes d'un environnement extrême.",
    cinematicFov: 27.5,
    cinematicOffset: [1.7, 0.52, 1.18],
    cinematicTarget: [-0.48, 0.14, 0.92],
    details: ['Entrée', 'Repère', 'Contraintes'],
    position: [-1.9, 0.2, 0.95],
    modelPosition: [-0.45, 0.14, 1.08],
    detailTarget: [-0.52, 0.1, 0.94],
    detailOffset: [1.28, 0.36, 0.82],
  },
  {
    id: 'cockpit',
    accentColor: '#9bc1ff',
    focusRadius: 1.12,
    title: 'Cabine pressurisée',
    label: 'Cabine',
    description:
      "Volume principal du véhicule. Il protège l'équipage et permet d'imaginer un déplacement sans combinaison pressurisée pendant les trajets courts.",
    cinematicFov: 26.5,
    cinematicOffset: [1.5, 0.6, 1.02],
    cinematicTarget: [-1.0, 0.38, 0.08],
    details: ['Volume principal', 'Trajet court', 'Protection'],
    position: [-0.2, 0.95, 0],
    modelPosition: [-1.12, 0.46, 0.04],
    detailTarget: [-1.02, 0.38, 0.08],
    detailOffset: [1.18, 0.42, 0.88],
  },
  {
    id: 'rear-lounge',
    accentColor: '#d7c8ff',
    focusRadius: 1.18,
    title: 'Zone de repos',
    label: 'Repos',
    description:
      "Un espace moins frontal, destiné à changer de posture et à sortir du rythme strictement opérationnel de la base.",
    cinematicFov: 27,
    cinematicOffset: [1.72, 0.54, 1.12],
    cinematicTarget: [1.14, 0.28, 0.04],
    details: ['Pause', 'Posture', 'Récupération'],
    position: [1.6, 0.55, 0],
    modelPosition: [1.28, 0.34, 0],
    detailTarget: [1.18, 0.28, 0.04],
    detailOffset: [1.42, 0.52, 0.96],
  },
  {
    id: 'dashboard',
    accentColor: '#78d0ff',
    focusRadius: 0.86,
    title: 'Poste de conduite',
    label: 'Conduite',
    description:
      "Une zone pensée pour piloter, mais aussi pour rester lisible dans un environnement où chaque geste doit être clair.",
    cinematicFov: 25.5,
    cinematicOffset: [1.2, 0.38, 0.82],
    cinematicTarget: [-1.18, 0.18, 0.42],
    details: ['Lecture claire', 'Champ visuel', 'Pilotage'],
    position: [-0.85, 0.65, 0.7],
    modelPosition: [-1.38, 0.2, 0.54],
    detailTarget: [-1.2, 0.18, 0.42],
    detailOffset: [1.04, 0.34, 0.66],
  },
  {
    id: 'wheels',
    accentColor: '#ffb36b',
    focusRadius: 1.02,
    title: 'Roues et contact au sol',
    label: 'Roues',
    description:
      "Le contact avec le sol lunaire impose stabilité, franchissement et protection. Les roues participent à l'identité du véhicule.",
    cinematicFov: 26.8,
    cinematicOffset: [1.28, 0.34, 0.94],
    cinematicTarget: [0.02, -0.68, 0.94],
    details: ['Stabilité', 'Franchissement', 'Contact au sol'],
    position: [0.6, -0.35, 1.55],
    modelPosition: [0.08, -0.68, 1.04],
    detailTarget: [0.02, -0.72, 0.94],
    detailOffset: [1.02, 0.26, 0.56],
  },
  {
    id: 'chassis',
    accentColor: '#9aa8bb',
    focusRadius: 1.36,
    title: 'Châssis',
    label: 'Châssis',
    description:
      "La structure concentre une partie des contraintes : poids, rigidité, intégration des systèmes et protection des volumes habitables.",
    cinematicFov: 28.2,
    cinematicOffset: [1.48, 0.28, 1.16],
    cinematicTarget: [0.02, -0.78, 0.02],
    details: ['Structure', 'Rigidité', 'Intégration'],
    position: [0.3, -0.55, 0],
    modelPosition: [0.02, -0.86, 0],
    detailTarget: [0.02, -0.78, 0.02],
    detailOffset: [1.28, 0.22, 0.9],
  },
  {
    id: 'oxygen-tanks',
    accentColor: '#74c7ff',
    focusRadius: 0.92,
    title: 'Stockage',
    label: 'Stockage',
    description:
      "Les rangements accompagnent l'usage quotidien : matériel, équipements, éléments de survie et objets liés à la mission.",
    cinematicFov: 27,
    cinematicOffset: [1.56, 0.48, 0.98],
    cinematicTarget: [1.32, -0.14, -0.62],
    details: ['Matériel', 'Équipements', 'Mission'],
    position: [1.95, -0.05, -0.65],
    modelPosition: [1.56, -0.16, -0.72],
    detailTarget: [1.34, -0.14, -0.62],
    detailOffset: [1.12, 0.42, 0.76],
  },
  {
    id: 'batteries',
    accentColor: '#ffd06d',
    focusRadius: 0.94,
    title: 'Systèmes de bord',
    label: 'Systèmes',
    description:
      "Énergie, oxygène, communication, contrôle thermique. Ces éléments restent en arrière-plan, mais conditionnent toute l'expérience.",
    cinematicFov: 27.2,
    cinematicOffset: [1.36, 0.4, 1.06],
    cinematicTarget: [0.56, -0.46, -0.76],
    details: ['Énergie', 'Oxygène', 'Contrôle thermique'],
    position: [0.45, -0.15, -0.95],
    modelPosition: [0.62, -0.48, -0.86],
    detailTarget: [0.56, -0.48, -0.76],
    detailOffset: [1.02, 0.28, 0.82],
  },
  {
    id: 'thermal-system',
    accentColor: '#ff8a78',
    focusRadius: 0.9,
    title: 'Vue arrière',
    label: 'Arrière',
    description:
      "La vue devient une fonction du projet. Regarder le paysage lunaire fait partie de l'usage, pas seulement du décor.",
    cinematicFov: 26.6,
    cinematicOffset: [1.34, 0.46, 0.96],
    cinematicTarget: [1.02, 0.04, -0.92],
    details: ['Paysage', 'Arrêt', 'Observation'],
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
