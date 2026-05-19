import { buildAssetPath } from '@/utils/assetPaths'

export const galleryCategories = [
  'All',
  'Sketches',
  'Renders',
  'Process',
  'Technical',
  'Interior',
] as const

export const galleryCategoryLabels: Record<(typeof galleryCategories)[number], string> = {
  All: 'Tous',
  Sketches: 'Croquis',
  Renders: 'Rendus',
  Process: 'Processus',
  Technical: 'Technique',
  Interior: 'Intérieur',
}

export type GalleryCategory = (typeof galleryCategories)[number]

export type GalleryItem = {
  src: string
  title: string
  category: Exclude<GalleryCategory, 'All'>
  description: string
  type: 'image'
  fit?: 'cover' | 'contain'
  objectPosition?: string
}

export const galleryItems: GalleryItem[] = [
  {
    src: buildAssetPath('/images/renders/exterior-front.jpg'),
    title: 'Vue extérieure du véhicule',
    category: 'Renders',
    description: 'Rendu final',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/custom/vehicle-styled-exit.png'),
    title: 'Mise en scène sur la surface lunaire',
    category: 'Renders',
    description: 'Vue extérieure',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/renders/exterior-rear.jpg'),
    title: 'Vue arrière du véhicule',
    category: 'Renders',
    description: 'Lecture arrière',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/renders/transport-stowage.jpg'),
    title: 'Module arrimé',
    category: 'Renders',
    description: 'Hypothèse de transport',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/renders/workshop-assembly.jpg'),
    title: "Vue d'atelier",
    category: 'Renders',
    description: 'Maintenance',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/custom/comfort-zone-astronauts.jpg'),
    title: 'Zone arrière occupée',
    category: 'Renders',
    description: 'Pause et observation',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/renders/cutaway-module.jpg'),
    title: 'Coupe du véhicule',
    category: 'Renders',
    description: 'Volume habitable',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/archive/motion-exterior-front.jpg'),
    title: 'Exploration de la silhouette',
    category: 'Renders',
    description: 'Vue trois-quarts',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/sidedq.jpg'),
    title: 'Profil du véhicule',
    category: 'Renders',
    description: 'Vue latérale',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/custom/steering-research.jpg'),
    title: 'Étude du poste de conduite',
    category: 'Sketches',
    description: 'Poste de conduite',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/custom/top-view-interieur-vehicule.png'),
    title: "Première intention d'habitacle",
    category: 'Sketches',
    description: 'Habitacle',
    type: 'image',
    fit: 'contain',
    objectPosition: 'center center',
  },
  {
    src: buildAssetPath('/images/gallery-extra/comment-trabs.jpg'),
    title: 'Lecture du châssis',
    category: 'Sketches',
    description: 'Structure',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/custom/door-research.jpg'),
    title: "Hypothèse d'accès",
    category: 'Sketches',
    description: 'Porte latérale',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/custom/comfort-zone.png'),
    title: "Recherche d'assise",
    category: 'Sketches',
    description: 'Posture',
    type: 'image',
    fit: 'contain',
    objectPosition: 'center center',
  },
  {
    src: buildAssetPath('/images/gallery-extra/portedd.jpg'),
    title: 'Recherche de porte',
    category: 'Sketches',
    description: 'Ouverture',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/custom/comment-se-range-le-vehicule.png'),
    title: 'Schéma de transport',
    category: 'Process',
    description: 'Transport lunaire',
    type: 'image',
    fit: 'contain',
    objectPosition: 'center center',
  },
  {
    src: buildAssetPath('/images/custom/tableau-de-bord.png'),
    title: 'Détail du tableau de bord',
    category: 'Process',
    description: 'Commandes',
    type: 'image',
    fit: 'contain',
    objectPosition: 'center center',
  },
  {
    src: buildAssetPath('/images/technical/chassis-layout.jpg'),
    title: 'Organisation générale',
    category: 'Process',
    description: 'Sous-ensembles',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/dash.jpg'),
    title: 'Tableau de bord latéral',
    category: 'Process',
    description: 'Interface',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/dash-volant-trop-cool.jpg'),
    title: 'Volant et interface',
    category: 'Process',
    description: 'Commandes',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/custom/wheel-concept.jpg'),
    title: 'Concept de roue',
    category: 'Technical',
    description: 'Contact au sol',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/custom/helmet-storage.png'),
    title: 'Stockage scaphandre',
    category: 'Technical',
    description: 'Rangement',
    type: 'image',
    fit: 'contain',
    objectPosition: 'center center',
  },
  {
    src: buildAssetPath('/images/custom/dashboard-driver.png'),
    title: 'Vue conducteur',
    category: 'Interior',
    description: 'Poste avant',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/custom/dashboard-passenger.png'),
    title: 'Vue passager',
    category: 'Interior',
    description: 'Tableau de bord',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/vue3-4av.jpg'),
    title: 'Habitacle côté avant',
    category: 'Interior',
    description: 'Perspective intérieure',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/vue3-4ar.jpg'),
    title: "Vue arrière de l'habitacle",
    category: 'Interior',
    description: 'Banquette',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/custom/zone-detente.png'),
    title: 'Zone de repos',
    category: 'Interior',
    description: 'Banquette arrière',
    type: 'image',
    objectPosition: 'center center',
  },
  {
    src: buildAssetPath('/images/custom/zone-detente-2.png'),
    title: 'Rapport au paysage',
    category: 'Interior',
    description: 'Vue arrière',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/interior/rear-observatory.jpg'),
    title: 'Ouverture arrière',
    category: 'Interior',
    description: 'Observation',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/technical/interior-section.jpg'),
    title: 'Coupe intérieure',
    category: 'Technical',
    description: 'Habitacle',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/technical/wheel-detail.jpg'),
    title: 'Contact au sol',
    category: 'Technical',
    description: 'Roue',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/transport1.jpg'),
    title: 'Hypothèse de transport',
    category: 'Technical',
    description: 'Mise en place',
    type: 'image',
  },
]
