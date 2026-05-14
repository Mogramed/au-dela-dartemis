import { buildAssetPath } from '@/utils/assetPaths'

export const galleryCategories = [
  'All',
  'Sketches',
  'Renders',
  'Process',
  'Technical',
  'Interior',
] as const

export type GalleryCategory = (typeof galleryCategories)[number]

export type GalleryItem = {
  src: string
  title: string
  category: Exclude<GalleryCategory, 'All'>
  description: string
  type: 'image'
}

export const galleryItems: GalleryItem[] = [
  {
    src: buildAssetPath('/images/renders/exterior-front.jpg'),
    title: 'Vue exterieure avant',
    category: 'Renders',
    description: "Une lecture frontale et directe du vehicule, comme capsule mobile d'exploration.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/renders/exterior-rear.jpg'),
    title: 'Vue exterieure arriere',
    category: 'Renders',
    description: "L'arriere montre deja un usage de pause et de respiration, plus qu'une simple charge utile.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/renders/cutaway-module.jpg'),
    title: 'Capsule en coupe',
    category: 'Renders',
    description: "Le vehicule en contexte de transport souligne la logique de module habite et protege.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/process/interior-linework.jpg'),
    title: 'Interieur en ligne claire',
    category: 'Sketches',
    description: "Une etape de mise au propre qui fixe les rapports de volumes, les postures et la console.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/sketches/control-wireframe.jpg'),
    title: 'Controle et espace lateral',
    category: 'Sketches',
    description: "Les perspectives de travail servent ici a arbitrer les usages et le degagement corporel.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/sketches/layout-wireframe.jpg'),
    title: 'Organisation interieure',
    category: 'Sketches',
    description: "Le dessin technique reste au service du recit d'usage: ou l'on s'assoit, se tourne, observe.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/process/dashboard-concept.jpg'),
    title: 'Poste de conduite',
    category: 'Interior',
    description: "Le tableau de bord concentre l'interface sans fermer l'espace, ni saturer le champ visuel.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/interior/rear-observatory.jpg'),
    title: 'Zone arriere',
    category: 'Interior',
    description: "La contemplation devient usage legitime: recuperer, regarder, sortir du seul registre productif.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/interior/lounge-seat.jpg'),
    title: 'Assise et posture',
    category: 'Interior',
    description: "L'habitabilite se dessine a travers la posture, le contact et l'amplitude du mouvement.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/process/usage-scenario.jpg'),
    title: "Scenario d'usage",
    category: 'Process',
    description: "La scene met en image la promesse du projet: transformer le trajet en experience sensible.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/technical/chassis-layout.jpg'),
    title: 'Implantation du chassis',
    category: 'Technical',
    description: "Le schema technique clarifie la distribution des fonctions sans perdre la logique de design.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/technical/wheel-detail.jpg'),
    title: 'Detail de roue',
    category: 'Technical',
    description: "Un detail qui tient autant de l'identite formelle que de l'appui mecanique.",
    type: 'image',
  },
]
