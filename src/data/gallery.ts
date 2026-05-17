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
    description:
      'Une lecture frontale du vehicule, utile pour comprendre la face avant et le volume general.',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/renders/exterior-rear.jpg'),
    title: 'Vue exterieure arriere',
    category: 'Renders',
    description:
      "La vue arriere montre l'organisation generale du vehicule et son rapport au paysage.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/renders/cutaway-module.jpg'),
    title: 'Capsule en coupe',
    category: 'Renders',
    description: "La coupe montre l'organisation interieure du projet et la repartition des fonctions.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/renders/transport-stowage.jpg'),
    title: 'Module arrime',
    category: 'Renders',
    description: "Cette vue montre le module dans une logique de transport et d'arrimage.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/renders/workshop-assembly.jpg'),
    title: "Vue d'atelier",
    category: 'Renders',
    description: 'Cette vue replace le rover dans un contexte de maintenance et de mission.',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/archive/motion-exterior-front.jpg'),
    title: 'Trois-quarts avant',
    category: 'Renders',
    description:
      'Cette vue trois-quarts avant aide a lire la silhouette et les proportions generales.',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/encrzqdazad.jpg'),
    title: 'Rendu contexte lunaire',
    category: 'Renders',
    description: 'Une vue de contexte qui replace le rover dans le paysage lunaire.',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/sketches/control-wireframe.jpg'),
    title: 'Poste avant et degagement lateral',
    category: 'Sketches',
    description: "Ce croquis sert a etudier les usages et les degagements dans la zone avant.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/sketches/layout-wireframe.jpg'),
    title: 'Organisation interieure',
    category: 'Sketches',
    description: "Le dessin permet de lire l'organisation interieure et les positions d'usage.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/comment-trabs.jpg'),
    title: 'Vue eclatee technique',
    category: 'Sketches',
    description: "Une vue eclatee qui rend lisible la composition du vehicule et de ses sous-ensembles.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/mise-en-scene1.jpg'),
    title: 'Coupe de cabine',
    category: 'Sketches',
    description: "Cette coupe simplifiee clarifie l'organisation de la cabine.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/mise-en-scene-3.jpg'),
    title: 'Variante de cabine',
    category: 'Sketches',
    description: "Autre variante de lecture pour l'implantation de la cabine.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/paxkage.jpg'),
    title: 'Organisation generale',
    category: 'Process',
    description:
      "Cette planche fixe le rapport entre gabarit, volume habitable et architecture roulante.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/dash2.jpg'),
    title: 'Plan du tableau de bord',
    category: 'Process',
    description: "Cette vue aide a comprendre la concentration des interfaces dans la zone avant.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/portedd.jpg'),
    title: 'Porte pressurisee',
    category: 'Process',
    description: "Le seuil apparait ici comme une piece importante dans l'organisation du projet.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/transport1.jpg'),
    title: 'Module en transport',
    category: 'Process',
    description: 'Cette vue montre le module dans une logique de transport et de mise en oeuvre.',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/interior/rear-lounge-panorama.jpg'),
    title: 'Observation terrestre',
    category: 'Interior',
    description: "La vue arriere cadre la Terre comme horizon et oriente la zone d'observation.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/vue3-4av.jpg'),
    title: 'Vue laterale avant',
    category: 'Interior',
    description: "Autre lecture du cockpit et de l'ouverture visuelle de la cabine.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/vue3-4ar.jpg'),
    title: 'Vue laterale arriere',
    category: 'Interior',
    description: "La zone arriere se lit comme un espace de pause et d'observation.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/zone-arriere.jpg'),
    title: 'Zone arriere',
    category: 'Interior',
    description: "Lecture de la posture et de l'usage de la zone arriere.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/dash.jpg'),
    title: 'Tableau de bord',
    category: 'Technical',
    description: "Lecture de la zone avant et de l'organisation des commandes.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/wheel.jpg'),
    title: 'Detail de roue',
    category: 'Technical',
    description: "La roue se lit ici comme un point d'appui essentiel du projet.",
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/cool.jpg'),
    title: 'Module avant',
    category: 'Technical',
    description: 'Vue detaillee du module avant et de sa composition generale.',
    type: 'image',
  },
  {
    src: buildAssetPath('/images/gallery-extra/sidedq.jpg'),
    title: 'Profil lateral',
    category: 'Technical',
    description:
      'Cette vue laterale sert de document de lecture pour la silhouette et les details du rover.',
    type: 'image',
  },
]
