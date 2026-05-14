import { assetPaths, buildAssetPath } from '@/utils/assetPaths'

export const siteContent = {
  metadata: {
    title: "AU-DELA D'ARTEMIS",
    subtitle: 'Concevoir une experience humaine pour la Lune',
    question:
      "A l'ere de l'automatisation, pourquoi ressentons-nous encore le besoin d'envoyer des humains sur la Lune ?",
  },
  hero: {
    label: 'MISSION ARCHIVE',
    title: "AU-DELA D'ARTEMIS",
    subtitle: 'Concevoir une experience humaine pour la Lune',
    question:
      "A l'ere de l'automatisation, pourquoi ressentons-nous encore le besoin d'envoyer des humains sur la Lune ?",
    description:
      "Une archive de projet a mi-chemin entre dossier de mission, manifeste de design et support de soutenance.",
    image: assetPaths.hero.exterior,
    secondaryImage: assetPaths.hero.profile,
    stats: [
      { label: 'STATUT', value: 'Prototype conceptuel' },
      { label: 'USAGE', value: 'Detente + exploration courte' },
      { label: 'EQUIPAGE', value: '2 astronautes' },
    ],
  },
  manifesto: {
    title: 'La Lune comme miroir',
    body: [
      "Ce projet ne demande pas seulement comment aller plus loin. Il demande ce qu'il reste a vivre pour l'humain lorsque la machine sait deja explorer, mesurer et construire.",
      "Le memoire replace le vehicule dans une question plus large: sur la Lune, l'efficacite ne suffit pas. Il faut aussi penser la respiration mentale, la sensation du paysage et le besoin de recuperer.",
    ],
    quote:
      "La Lune n'est pas seulement un territoire a atteindre. C'est un miroir qui nous oblige a redefinir ce que signifie habiter, ressentir et rester humain.",
    opposingForces: [
      {
        title: 'Machine',
        points: ['Explorer vite', 'Mesurer precisement', 'Repeter sans fatigue'],
      },
      {
        title: 'Humain',
        points: ['Interpreter', 'Se relier au paysage', 'Faire experience'],
      },
    ],
  },
  humanProblem: {
    title:
      "Travailler sur la Lune ne suffit pas. Il faut aussi y respirer, ressentir, recuperer.",
    categories: [
      {
        title: 'Fatigue mentale',
        description:
          "En environnement contraint, chaque interface et chaque trajet s'ajoutent a la charge cognitive.",
      },
      {
        title: 'Solitude',
        description:
          "Le paysage lunaire est sublime et pourtant depourvu de repere vivant. L'isolement change la qualite du temps.",
      },
      {
        title: 'Corps contraint',
        description:
          "Scaphandre, capsule et protocoles resserrent les gestes. Le projet cherche des espaces de detente corporelle.",
      },
    ],
  },
  rover: {
    title: "Un refuge mobile pour habiter l'inhabitable.",
    description:
      "Le vehicule n'est pas seulement un moyen de transport pressurise. Il devient un espace de detente, de balade, d'observation et de liberte corporelle.",
    image: buildAssetPath('/images/renders/cutaway-module.jpg'),
    specs: [
      { label: 'Type', value: 'Vehicule lunaire pressurise' },
      { label: 'Usage', value: 'Detente, exploration courte, contemplation' },
      { label: 'Capacite', value: '2 personnes' },
      { label: 'Intention', value: 'Transformer la mobilite en experience sensible' },
    ],
  },
  viewer: {
    title: 'Viewer 3D interactif',
    description:
      "Le module charge maintenant un GLB exterieur du vehicule, recadre proprement pour le web et accompagne de hotspots lisibles. Les vues interieure et chassis restent preparees pour des exports separes si besoin.",
    posterImage: buildAssetPath('/images/thumbnails/viewer-thumb.jpg'),
  },
  process: {
    title: 'Du memoire au volume',
    description:
      "Le process condense recherche, croquis, usage, modelisation et rendu en une meme logique: dessiner un vehicule qui porte une experience humaine.",
    steps: [
      {
        title: 'Recherche',
        description:
          "Identifier ce que l'automatisation ne regle pas: fatigue, horizon mental, besoin de sas.",
      },
      {
        title: 'Croquis',
        description:
          "Faire apparaitre la posture, la circulation interieure et le rapport au paysage avant toute sophistication technique.",
      },
      {
        title: 'Modelisation',
        description:
          "Stabiliser un volume pressurise qui assume autant la protection que la mise en scene de l'exterieur.",
      },
      {
        title: 'Rendus',
        description:
          "Utiliser les rendus pour tester la promesse sensible du projet: refuge, lumiere, contemplation, echelle.",
      },
    ],
  },
  interior: {
    title: "L'interieur comme espace de transition",
    description:
      "Entre journee de mission et retour a la base, l'habitacle devient un lieu de decompression. L'ergonomie reste presente, mais elle se met au service du confort et de l'observation.",
    spaces: [
      'Poste de conduite compact',
      'Zone de detente arriere',
      'Surfaces pour observation du paysage',
      'Stockage et acces technique lisibles',
    ],
  },
  technical: {
    title: "Une architecture technique au service d'une experience humaine.",
    description:
      "Le projet rassure sans se perdre dans l'ingenierie demonstrative. Chaque choix technique soutient d'abord l'habitabilite et la lisibilite du concept.",
    image: buildAssetPath('/images/technical/chassis-layout.jpg'),
  },
  scenario: {
    title: "Scenario d'usage",
    description:
      "Apres une journee de travail dans une base lunaire, deux astronautes quittent le module principal. Le vehicule devient un espace de transition: entre mission, repos et contemplation.",
    steps: [
      '01 - Sortie de la base',
      '02 - Traversee silencieuse',
      '03 - Arret en bord de cratere',
      '04 - Observation de la Terre',
      "05 - Retour vers l'habitat",
    ],
  },
  memoire: {
    title: 'Memoire et documents',
    description:
      "Le site reste un support de soutenance, mais il donne aussi acces au memoire PDF, aux planches et aux visuels clefs pour consultation apres le jury.",
    pdfUrl: assetPaths.pdf,
    previewImage: buildAssetPath('/images/thumbnails/hero-thumb.jpg'),
  },
  finalStatement: {
    title:
      "La Lune n'est pas seulement un territoire a atteindre. C'est un miroir qui nous oblige a redefinir ce que signifie habiter, ressentir et rester humain.",
    ctaPrimary: 'Revoir le vehicule',
    ctaSecondary: 'Lire le memoire',
  },
  footer: {
    credit: 'Buron Mateo - Diplomes 2026 - Strate Ecole de Design',
    secondary: 'Archive web pour soutenance et consultation QR code',
  },
  presentationSlides: [
    {
      title: "AU-DELA D'ARTEMIS",
      subtitle: 'Concevoir une experience humaine pour la Lune',
      image: assetPaths.hero.exterior,
      kicker: 'Slide 01',
    },
    {
      title: 'Pourquoi encore des humains ?',
      subtitle: "Le projet place l'experience sensible au coeur d'un contexte hyper automatise.",
      image: buildAssetPath('/images/process/usage-scenario.jpg'),
      kicker: 'Slide 02',
    },
    {
      title: 'Un refuge mobile',
      subtitle: 'Le vehicule devient un sas entre effort, recuperation et contemplation.',
      image: buildAssetPath('/images/renders/cutaway-module.jpg'),
      kicker: 'Slide 03',
    },
    {
      title: 'Interieur, posture, horizon',
      subtitle: "L'habitacle est pense comme un espace de respiration plutot qu'une simple cellule de transport.",
      image: buildAssetPath('/images/interior/rear-observatory.jpg'),
      kicker: 'Slide 04',
    },
    {
      title: 'Architecture technique',
      subtitle: "Le chassis et les systemes soutiennent l'experience humaine sans prendre le dessus sur elle.",
      image: buildAssetPath('/images/technical/chassis-layout.jpg'),
      kicker: 'Slide 05',
    },
  ],
} as const
