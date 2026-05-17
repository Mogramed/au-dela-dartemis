import { assetPaths, buildAssetPath } from '@/utils/assetPaths'

const zipImage = (filename: string) => buildAssetPath(`/images/zip/${filename}.jpg`)

export const siteContent = {
  metadata: {
    title: "AU-DELA D'ARTEMIS",
    subtitle: 'Concevoir une experience humaine pour la Lune',
    question:
      "A l'ere de l'automatisation, pourquoi ressentons-nous le besoin d'envoyer des humains sur la Lune ?",
  },
  hero: {
    label: 'ARCHIVE PROJET',
    title: "AU-DELA D'ARTEMIS",
    subtitle: 'Concevoir une experience humaine pour la Lune',
    question:
      "A l'ere de l'automatisation, pourquoi ressentons-nous le besoin d'envoyer des humains sur la Lune ?",
    description:
      'Le site rassemble le memoire, les visuels, les videos et les vues techniques du projet.',
    image: assetPaths.hero.exterior,
    secondaryImage: buildAssetPath('/images/archive/motion-rear-lounge.jpg'),
    video: {
      src: assetPaths.videos.missionTurnaroundReflect,
      poster: assetPaths.hero.exterior,
      label: 'Rotation exterieure',
      objectPosition: 'center center',
    },
    stats: [
      { label: 'STATUT', value: 'Prototype conceptuel' },
      { label: 'USAGE', value: 'Detente + exploration courte' },
      { label: 'EQUIPAGE', value: '2 astronautes' },
    ],
    archiveStrip: [
      {
        src: buildAssetPath('/images/archive/archive-side-profile.jpg'),
        alt: 'Profil archive du rover',
        label: 'Profil lateral',
      },
      {
        src: buildAssetPath('/images/technical/dashboard-steering.jpg'),
        alt: 'Detail de dashboard et de commandes',
        label: 'Tableau de bord',
      },
      {
        src: buildAssetPath('/images/technical/interior-section.jpg'),
        alt: 'Coupe interieure du projet',
        label: 'Coupe interieure',
      },
    ],
    signals: [
      { label: 'Cadre', value: 'Memoire' },
      { label: 'Question', value: 'Homme / machine' },
      { label: 'Horizon', value: 'Habiter la Lune' },
    ],
    callout: {
      eyebrow: 'Question de projet',
      title: "Donner a l'experience spatiale non seulement une forme, mais un sens.",
      body:
        "Le memoire interroge la place de l'humain face a la machine et ouvre le projet vers des usages de cohabitation, d'observation et de recuperation.",
    },
  },
  motion: {
    title: 'Le projet en cinq vues',
    description:
      "Cette section suit cinq lectures simples du projet: volume, habitacle, posture, architecture technique et retour au paysage.",
    stats: [
      { label: 'MODE', value: 'Cinq vues' },
      { label: 'DESKTOP', value: 'Sequence guidee' },
      { label: 'MOBILE', value: 'Lecture simplifiee' },
    ],
    tags: ['Volume', 'Habitacle', 'Posture', 'Technique', 'Paysage'],
    steps: [
      {
        eyebrow: '01 / Silhouette',
        title: "Le rover se lit d'abord comme un volume",
        description:
          "La premiere vue presente le vehicule dans son ensemble: silhouette, gabarit et rapport au sol.",
        accent: 'ice',
        note: 'Volume / silhouette / gabarit',
        media: {
          type: 'image',
          src: zipImage('49'),
          alt: 'Vue exterieure trois-quarts avant du rover',
          caption: 'Lecture generale du volume exterieur.',
          objectPosition: 'center center',
        },
      },
      {
        eyebrow: '02 / Cockpit',
        title: "L'habitacle ouvre le projet au paysage",
        description:
          "La lecture interieure fait apparaitre la question du regard, du champ visuel et du rapport a l'horizon.",
        accent: 'lime',
        note: 'Habitacle / horizon / observation',
        media: {
          type: 'image',
          src: buildAssetPath('/images/interior/panorama-cockpit.jpg'),
          alt: 'Vue interieure vers le paysage lunaire',
          caption: "L'habitacle se lit d'abord par son ouverture sur le paysage.",
          objectPosition: 'center center',
        },
      },
      {
        eyebrow: '03 / Posture',
        title: 'Le corps retrouve une place dans l usage',
        description:
          "Le projet ne traite pas seulement le pilotage. Il cherche aussi des positions de repos, de relachement et d'observation.",
        accent: 'ice',
        note: 'Corps / posture / recuperation',
        media: {
          type: 'image',
          src: buildAssetPath('/images/gallery-extra/psss-siege.jpg'),
          alt: "Etude de siege et de posture pour l'habitacle",
          caption: 'Le siege et la posture rendent visible la question de la recuperation.',
          objectPosition: 'center center',
        },
      },
      {
        eyebrow: '04 / Modules',
        title: "La technique reste lisible sans prendre toute la place",
        description:
          "Les sous-ensembles donnent de la credibilite au projet, mais ils restent au service de l'habitabilite.",
        accent: 'sand',
        note: 'Structure / energie / maintenance',
        media: {
          type: 'image',
          src: buildAssetPath('/images/archive/motion-chassis.jpg'),
          alt: "Schema d'architecture et de chassis du vehicule",
          caption:
            'Lecture de la structure, des appuis et des sous-ensembles.',
          objectPosition: 'center center',
        },
      },
      {
        eyebrow: '05 / Horizon',
        title: 'Le paysage referme la lecture du projet',
        description:
          "La derniere vue remet le vehicule dans son contexte lunaire et relie usage, horizon et mission.",
        accent: 'lunar',
        note: 'Paysage / synthese / mission',
        media: {
          type: 'image',
          src: zipImage('51'),
          alt: 'Rendu final du rover en contexte lunaire',
          caption: 'Le vehicule retrouve le paysage et referme la lecture du projet.',
          objectPosition: 'center center',
        },
      },
    ],
  },
  context: {
    image: zipImage('50'),
    insetImage: buildAssetPath('/images/archive/archive-wheel.jpg'),
    metrics: [
      { label: 'Gravite', value: '1/6 g permanent' },
      { label: 'Horizon', value: 'Mineral et vide' },
      { label: 'Rythme', value: 'Mission + recuperation' },
    ],
  },
  manifesto: {
    title: 'De la conquete a la cohabitation',
    body: [
      "Le memoire ne traite pas la Lune comme un simple territoire a atteindre. Il deplace la question vers la cohabitation et vers la place de l'homme face a la machine.",
      "Dans cette perspective, le projet ne cherche pas seulement l'efficacite. Il interroge aussi les limites humaines, l'observation, le repos et la maniere d'habiter un temps de mission.",
    ],
    quote:
      'Le design comme art de survivre et de ressentir.',
    opposingForces: [
      {
        title: 'Machine',
        points: ['Explorer', 'Mesurer', 'Securiser'],
      },
      {
        title: 'Humain',
        points: ['Habiter', 'Observer', 'Ressentir'],
      },
    ],
  },
  humanProblem: {
    title:
      'Les limites humaines entre corps, esprit et solitude restent au centre du projet.',
    categories: [
      {
        title: 'Fatigue mentale',
        description:
          "Le memoire rappelle que l'environnement spatial ne se limite pas a une performance technique. Il engage aussi l'attention, le temps et la charge mentale.",
      },
      {
        title: 'Solitude',
        description:
          "L'isolement et l'absence de repere vivant changent la qualite du temps et du rapport au paysage.",
      },
      {
        title: 'Corps contraint',
        description:
          'Scaphandre, capsule et protocoles resserrent les gestes. Le projet cherche donc des marges de repos, de relachement et de repositionnement du corps.',
      },
    ],
  },
  rover: {
    title: 'Habiter sans conquerir',
    description:
      "Le projet de vehicule pressurise articule deplacement, observation, recuperation et retour a la base.",
    image: buildAssetPath('/images/archive/archive-dramatic-render.jpg'),
    media: {
      type: 'video',
      src: assetPaths.videos.entryDoorA,
      poster: buildAssetPath('/images/technical/entry-interface.jpg'),
      label: 'Seuil / entree pressurisee',
    },
    supportingMedia: [
      {
        type: 'video',
        src: assetPaths.videos.zip25,
        poster: zipImage('25'),
        label: 'Cockpit / poste avant',
      },
      {
        type: 'video',
        src: assetPaths.videos.zip33,
        poster: zipImage('33'),
        label: 'Module / oxygene',
      },
    ],
    specs: [
      { label: 'Type', value: 'Vehicule lunaire pressurise' },
      { label: 'Usage', value: 'Deplacement, observation, recuperation' },
      { label: 'Capacite', value: '2 personnes' },
      { label: 'Intention', value: 'Habiter la mobilite lunaire' },
    ],
  },
  viewer: {
    title: 'Viewer 3D interactif',
    description:
      "Le module privilegie une lecture propre du volume: vue archive rapide sur mobile, 3D optimisee sur desktop, et modes interieurs separes quand ils apportent vraiment quelque chose.",
    posterImage: buildAssetPath('/images/thumbnails/viewer-thumb.jpg'),
  },
  process: {
    title: 'Recherche, croquis, modelisation, rendus',
    description:
      "Le projet se construit par etapes: cadrage du memoire, croquis d'usage, mise au point du volume, puis rendus.",
    steps: [
      {
        title: 'Recherche',
        description:
          "Poser la question du memoire et cadrer la place de l'humain face a la machine.",
      },
      {
        title: 'Croquis',
        description:
          "Faire apparaitre les usages, la posture et le rapport au paysage avant la mise au point technique.",
      },
      {
        title: 'Modelisation',
        description:
          "Mettre au point un volume pressurise lisible dans ses masses et dans son organisation interieure.",
      },
      {
        title: 'Rendus',
        description:
          "Verifier les qualites d'usage, de lumiere, d'echelle et de mise en situation du projet.",
      },
    ],
    visuals: [
      {
        type: 'image',
        src: buildAssetPath('/images/process/interior-linework.jpg'),
        alt: 'Recherche de coupe interieure et de zones de vie',
        label: 'Recherche / coupe habitable',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/sketches/cabin-wireframe.jpg'),
        alt: 'Recherche de volumes interieurs en wireframe',
        label: 'Volumes / wireframe',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/process/dashboard-concept.jpg'),
        alt: 'Etude de poste de conduite et de commandes',
        label: 'Interface / cockpit',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/sketches/volume-wireframe.jpg'),
        alt: 'Lecture volumique du rover et de ses masses',
        label: 'Masse / volume',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/renders/overview-capsule.jpg'),
        alt: 'Vue generale de la capsule et de ses articulations',
        label: 'Capsule / synthese',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/archive/archive-dashboard.jpg'),
        alt: 'Lecture graphique du tableau de bord et de la zone avant',
        label: 'Usage / interface',
      },
    ],
  },
  interior: {
    title: 'Le design comme art de survivre et de ressentir',
    description:
      "Entre temps de mission et retour a la base, l'habitacle devient un lieu de recuperation, d'observation et de reorientation.",
    spaces: [
      'Poste de conduite compact',
      'Zone de detente arriere',
      'Surfaces pour observation du paysage',
      'Stockage et acces technique lisibles',
    ],
    visuals: [
      {
        type: 'video',
        src: assetPaths.videos.zip24,
        poster: zipImage('24'),
        label: 'Cockpit / horizon frontal',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/interior/driver-station.jpg'),
        alt: 'Poste conducteur et degagement interieur',
        label: 'Pilotage / degagement',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/interior/rear-observatory.jpg'),
        alt: 'Zone arriere dediee a l observation et au calme',
        label: 'Observation / zone arriere',
      },
      {
        type: 'video',
        src: assetPaths.videos.zip27,
        poster: zipImage('27'),
        label: 'Siege / posture de recuperation',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/interior/low-gravity-lounge.jpg'),
        alt: 'Zone de micro-recuperation en faible gravite',
        label: 'Posture / micro-recuperation',
      },
    ],
  },
  technical: {
    title: "Une architecture technique au service d'une experience humaine.",
    description:
      "La lecture technique reste secondaire par rapport a l'usage, mais elle rend le projet lisible dans sa structure, ses appuis et son organisation.",
    image: buildAssetPath('/images/technical/chassis-layout.jpg'),
    detailImages: [
      {
        src: buildAssetPath('/images/technical/dashboard-steering.jpg'),
        alt: 'Detail du tableau de bord et du volant',
        label: 'Commandes / interface',
      },
      {
        src: buildAssetPath('/images/technical/interior-section.jpg'),
        alt: "Coupe interieure et distribution des fonctions",
        label: 'Coupe / distribution',
      },
      {
        src: buildAssetPath('/images/technical/wheel-detail.jpg'),
        alt: 'Detail de roue et de contact au sol',
        label: 'Appui / roue',
      },
    ],
  },
  scenario: {
    title: "Scenario d'usage",
    description:
      "Le vehicule s'inscrit dans un aller-retour entre base, travail de surface, pause et retour a l'habitat.",
    steps: [
      '01 - Sortie de la base',
      '02 - Traversee silencieuse',
      '03 - Arret en bord de cratere',
      '04 - Observation de la Terre',
      "05 - Retour vers l'habitat",
    ],
    media: {
      clip: {
        src: assetPaths.videos.entryDoorB,
        poster: buildAssetPath('/images/archive/motion-entry-door.jpg'),
        label: 'Sortie de base / sas pressurise',
      },
      image: {
        src: buildAssetPath('/images/archive/motion-final-horizon.jpg'),
        alt: 'Le rover en suspension face au paysage lunaire',
        label: 'Arret / horizon terrestre',
      },
    },
    supportFrames: [
      {
        src: buildAssetPath('/images/process/usage-scenario.jpg'),
        alt: "Lecture narrative de l'usage du vehicule",
        title: 'Respiration / poste avant',
        description:
          "Le trajet conduit vers un usage plus habitable: souffler, regarder et se reorienter avant le retour.",
      },
      {
        src: buildAssetPath('/images/archive/archive-exterior-rear.jpg'),
        alt: 'Vue arriere du rover dans le paysage',
        title: 'Retour au volume',
        description:
          "Le rover se relit enfin comme un objet complet remis dans son environnement lunaire.",
      },
    ],
  },
  archiveFilms: {
    title: 'Vues video du projet',
    description:
      "La selection video rassemble des vues du projet: rover en contexte, habitacle, modules, structure et recherches.",
    featuredClip: {
      title: 'Lecture du chassis',
      description:
        "Cette sequence donne une lecture generale de la structure, des appuis et de l'enveloppe du projet.",
      tag: 'Sequence principale',
      src: assetPaths.videos.zip30,
      poster: zipImage('30'),
    },
    secondaryClips: [
      {
        title: 'Module oxygene',
        description:
          "Le clip isole un sous-ensemble du projet pour en montrer la logique de composition.",
        tag: 'Sous-ensemble',
        src: assetPaths.videos.zip34,
        poster: zipImage('34'),
      },
      {
        title: 'Sortie de base',
        description:
          "Le vehicule se met en mouvement dans un tempo plus calme, avec une lecture plus nette du projet.",
        tag: 'Mise en situation',
        src: assetPaths.videos.missionHangarRear,
        poster: buildAssetPath('/images/renders/transport-stowage.jpg'),
      },
    ],
    clips: [
      {
        title: 'Coupe habitable',
        description: "Cette coupe met en relation l'usage et l'architecture interieure.",
        tag: 'Recherche',
        src: assetPaths.videos.zip26,
        poster: zipImage('26'),
      },
      {
        title: 'Ensemble constructif',
        description:
          'Une lecture plus technique qui montre la construction du projet.',
        tag: 'Recherche',
        src: assetPaths.videos.zip28,
        poster: zipImage('28'),
      },
      {
        title: 'Architecture laterale',
        description: 'Lecture laterale et distribution interne du projet.',
        tag: 'Recherche',
        src: assetPaths.videos.zip29,
        poster: zipImage('29'),
      },
      {
        title: 'Sous-ensemble lumineux',
        description:
          "Autre lecture des sous-ensembles et de l'organisation des elements embarques.",
        tag: 'Sous-ensemble',
        src: assetPaths.videos.zip35,
        poster: zipImage('35'),
      },
      {
        title: 'Elements de service',
        description:
          'Lecture plus calme des objets techniques associes au rover.',
        tag: 'Sous-ensemble',
        src: assetPaths.videos.zip36,
        poster: zipImage('36'),
      },
      {
        title: 'Etude de face avant',
        description:
          'Variation autour de la face avant, de la masse et de la lecture generale des volumes.',
        tag: 'Recherche',
        src: assetPaths.videos.zip38,
        poster: zipImage('38'),
      },
      {
        title: 'Evolution de la forme',
        description:
          'Le rover se lit ici comme un ensemble complet en cours de mise au point.',
        tag: 'Recherche',
        src: assetPaths.videos.zip39,
        poster: buildAssetPath('/images/archive/archive-dramatic-render.jpg'),
      },
      {
        title: 'Rotation exterieure',
        description:
          "Le mouvement reste lent pour garder une lecture claire du vehicule dans son ensemble.",
        tag: 'Mise en situation',
        src: assetPaths.videos.missionTurnaroundReflect,
        poster: buildAssetPath('/images/archive/motion-exterior-front.jpg'),
      },
    ],
  },
  memoire: {
    title: 'Memoire et documents',
    description:
      "Le site donne acces au memoire PDF, aux planches et aux visuels clefs du projet.",
    pdfUrl: assetPaths.pdf,
    presentationUrl: assetPaths.presentation,
    presentationDeckUrl: '/presentation',
    presentationManifestUrl: assetPaths.presentationManifest,
    previewImage: buildAssetPath('/images/thumbnails/hero-thumb.jpg'),
  },
  finalStatement: {
    title: 'Ecrire la lune pour mieux habiter la terre.',
    ctaPrimary: 'Revoir le vehicule',
    ctaSecondary: 'Lire le memoire',
  },
  footer: {
    credit: 'Buron Mateo - Diplomes 2026 - Strate Ecole de Design',
    secondary: 'Site de reference pour consulter le memoire, les images et les videos du projet',
  },
} as const
