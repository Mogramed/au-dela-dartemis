import { assetPaths, buildAssetPath } from '@/utils/assetPaths'

const zipImage = (filename: string) => buildAssetPath(`/images/zip/${filename}.jpg`)

export const siteContent = {
  metadata: {
    title: "AU-DELÀ D'ARTÉMIS",
    subtitle:
      'Pourquoi envoyer encore des humains sur la Lune, quand les machines savent déjà explorer ?',
    question:
      "À l'ère de l'automatisation, pourquoi ressentons-nous le besoin d'envoyer des humains sur la Lune ?",
  },
  hero: {
    label: 'ARCHIVE DU PROJET',
    title: "AU-DELÀ D'ARTÉMIS",
    subtitle:
      'Pourquoi envoyer encore des humains sur la Lune, quand les machines savent déjà explorer ?',
    question:
      "À l'ère de l'automatisation, pourquoi ressentons-nous le besoin d'envoyer des humains sur la Lune ?",
    description:
      'Le projet propose Hermes-01, un véhicule pressurisé imaginé pour des sorties courtes hors de la base lunaire.',
    image: assetPaths.hero.exterior,
    secondaryImage: buildAssetPath('/images/custom/comfort-zone-astronauts.jpg'),
    video: {
      src: buildAssetPath('/videos/custom/rotation-vehicule.mp4'),
      poster: assetPaths.hero.exterior,
      label: 'Hermes-01 / rotation',
      objectPosition: 'center center',
    },
    trailer: {
      title: 'Film du projet',
      videoId: 'kX9Gz3SLDVo',
      url: 'https://youtu.be/kX9Gz3SLDVo',
    },
    stats: [
      { label: 'VÉHICULE', value: 'Hermes-01' },
      { label: 'USAGE', value: 'Sortie, pause, observation' },
      { label: 'ÉQUIPAGE', value: '2 personnes' },
    ],
    archiveStrip: [
      {
        src: buildAssetPath('/images/custom/door-research.jpg'),
        alt: 'Recherche sur la porte du véhicule',
        label: 'Recherche sur la porte',
      },
      {
        src: buildAssetPath('/images/custom/dashboard-driver.png'),
        alt: 'Vue conducteur du tableau de bord',
        label: 'Poste de conduite',
      },
      {
        src: buildAssetPath('/images/custom/dashboard-passenger.png'),
        alt: 'Vue passager du tableau de bord',
        label: 'Vue passager',
      },
      {
        src: buildAssetPath('/images/custom/vehicle-styled-exit.png'),
        alt: 'Hermes-01 sur la surface lunaire',
        label: 'Hermes-01 / sortie',
      },
    ],
    signals: [
      { label: 'Cadre', value: 'Mémoire' },
      { label: 'Question', value: 'Homme / machine' },
      { label: 'Horizon', value: 'Habiter la Lune' },
    ],
    callout: {
      eyebrow: 'Nom du projet',
      title: 'Hermes-01, véhicule de sortie courte',
      body:
        "Le projet nomme ainsi un véhicule pressurisé destiné à s'éloigner brièvement de la base, à ménager une pause et à garder le paysage dans le champ.",
    },
  },
  motion: {
    title: 'Lecture du projet',
    description:
      "Quelques vues permettent de lire le volume, l'habitacle, la posture et le rapport au paysage.",
    stats: [],
    tags: [],
    steps: [
      {
        eyebrow: '01 / Silhouette',
        title: "Le véhicule se lit d'abord comme un volume",
        description:
          "La première vue présente le véhicule dans son ensemble : silhouette, gabarit et rapport au sol.",
        accent: 'ice',
        note: 'Volume / silhouette / gabarit',
        media: {
          type: 'image',
          src: zipImage('49'),
          alt: 'Vue extérieure trois-quarts avant du véhicule',
          caption: "Lecture d'ensemble du volume extérieur.",
          objectPosition: 'center center',
        },
      },
      {
        eyebrow: '02 / Cabine',
        title: "La cabine garde le paysage dans le champ",
        description:
          "Cette vue introduit le poste de conduite, le regard et l'ouverture vers la surface lunaire.",
        accent: 'lime',
        note: 'Cabine / regard / horizon',
        media: {
          type: 'image',
          src: buildAssetPath('/images/interior/panorama-cockpit.jpg'),
          alt: 'Vue intérieure ouverte sur le paysage lunaire',
          caption: "Le poste avant reste lié au paysage.",
          objectPosition: 'center center',
        },
      },
      {
        eyebrow: '03 / Posture',
        title: 'Le projet ménage des postures de repos',
        description:
          "Le véhicule ne traite pas seulement le trajet. Il cherche aussi des positions d'attente, de pause et d'observation.",
        accent: 'ice',
        note: 'Corps / posture / pause',
        media: {
          type: 'image',
          src: buildAssetPath('/images/gallery-extra/psss-siege.jpg'),
          alt: "Étude d'assise et de posture pour l'habitacle",
          caption: "Le dessin met la posture au centre de l'habitacle.",
          objectPosition: 'center center',
        },
      },
      {
        eyebrow: '04 / Structure',
        title: 'La structure reste lisible',
        description:
          "Les sous-ensembles techniques rendent le projet crédible sans prendre toute la place.",
        accent: 'sand',
        note: 'Châssis / énergie / accès',
        media: {
          type: 'image',
          src: buildAssetPath('/images/archive/motion-chassis.jpg'),
          alt: "Schéma d'architecture et de châssis du véhicule",
          caption:
            'Lecture de la structure, des appuis et des sous-ensembles.',
          objectPosition: 'center center',
        },
      },
      {
        eyebrow: '05 / Horizon',
        title: 'Le véhicule retrouve le paysage lunaire',
        description:
          "La dernière vue replace le projet dans l'hypothèse d'une présence plus longue sur la Lune.",
        accent: 'lunar',
        note: 'Paysage / base / trajet',
        media: {
          type: 'image',
          src: zipImage('51'),
          alt: 'Rendu final du véhicule dans le paysage lunaire',
          caption: 'Retour du véhicule dans son contexte lunaire.',
          objectPosition: 'center center',
        },
      },
    ],
  },
  context: {
    image: zipImage('50'),
    insetImage: buildAssetPath('/images/custom/wheel-concept.jpg'),
    metrics: [
      { label: 'Terrain', value: 'Poussière, pente, vide' },
      { label: 'Base', value: 'Habitat et trajets courts' },
      { label: 'Temps', value: 'Mission et récupération' },
    ],
    village: {
      src: buildAssetPath('/images/custom/village-lunaire.jpg'),
      alt: 'Hypothèse de base et de village lunaire',
      title: 'Village lunaire / hypothèse de base',
      description:
        "Cette image replace le projet dans l'hypothèse d'une base lunaire avec habitat, logistique et déplacements de proximité.",
    },
  },
  manifesto: {
    title: 'De la conquête à la cohabitation',
    body: [
      "Au-delà d'Artémis part d'une question volontairement simple : que vient faire l'humain dans un environnement où la machine semble plus résistante, plus précise et plus rentable ?",
      "Le projet n'oppose pas l'homme et le robot. Il cherche plutôt à comprendre ce que la présence humaine apporte encore : le regard, la perception, l'erreur et le récit.",
    ],
    quote:
      "Donner à l'expérience spatiale non seulement une forme, mais un sens.",
    opposingForces: [
      {
        title: 'Machine',
        points: ['Cartographier', 'Mesurer', 'Travailler longtemps'],
      },
      {
        title: 'Présence humaine',
        points: ['Observer', 'Éprouver', 'Interpréter'],
      },
    ],
  },
  humanProblem: {
    title:
      "Une base lunaire peut protéger, nourrir et organiser le travail. Mais elle peut aussi enfermer.",
    categories: [
      {
        title: 'Fatigue',
        description:
          "Dans un milieu sans alternance naturelle et sans repères familiers, la fatigue devient une donnée du projet.",
      },
      {
        title: 'Isolement',
        description:
          "L'absence d'horizon vivant et la répétition des protocoles changent le rapport au temps et au paysage.",
      },
      {
        title: 'Corps',
        description:
          "Dans un environnement sans atmosphère, le déplacement devient plus qu'un besoin fonctionnel. Il engage la posture, l'effort et le retour au calme.",
      },
    ],
  },
  rover: {
    title: 'Habiter sans conquérir',
    description:
      "Le véhicule est pensé comme une extension de la base, mais aussi comme une coupure avec elle. Il permet de s'éloigner, de ralentir et d'observer.",
    image: buildAssetPath('/images/deck/rover-cutaway-observation.jpg'),
    imageLabel: 'Coupe / zone arrière de repos',
    imageCaption:
      'La coupe relie sas, poste de conduite, observation et zone de pause dans un même volume.',
    arguments: [
      {
        label: 'Pourquoi',
        title: 'Sortir de la base sans rompre le trajet',
        description:
          "Le projet propose un trajet court qui n'est pas seulement utilitaire. Il ouvre un temps différent dans la journée lunaire.",
      },
      {
        label: 'Usage',
        title: 'Déplacer, observer, récupérer',
        description:
          "Le véhicule est pensé pour s'éloigner, ralentir, regarder et revenir sans se limiter à un point A vers un point B.",
      },
      {
        label: 'Zone arrière',
        title: 'Une pause dans le volume',
        description:
          "La banquette arrière permet de changer de posture, de regarder le paysage et de sortir du seul temps opérationnel.",
      },
    ],
    mediaCards: [
      {
        type: 'video',
        src: buildAssetPath('/videos/custom/door-close.mp4'),
        poster: buildAssetPath('/images/custom/door-research.jpg'),
        label: 'Seuil pressurisé',
        description:
          "La porte marque la bascule entre travail de surface et espace de récupération.",
      },
      {
        type: 'image',
        src: buildAssetPath('/images/custom/dashboard-passenger.png'),
        alt: 'Vue intérieure du poste avant',
        label: 'Poste avant',
        description:
          "Le poste avant garde le paysage dans le champ et accompagne le déplacement.",
        objectPosition: 'center center',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/custom/comfort-zone-astronauts.jpg'),
        alt: 'Zone arrière occupée par deux astronautes',
        label: 'Zone arrière',
        description:
          "L'arrière accueille un temps de pause, d'observation et de récupération.",
      },
    ],
    specs: [
      { label: 'Type', value: 'Véhicule lunaire pressurisé' },
      { label: 'Usage', value: 'Sortie, pause, observation' },
      { label: 'Équipage', value: '2 personnes' },
      { label: 'Intention', value: 'Prolonger un trajet hors de la base' },
    ],
  },
  viewer: {
    title: 'Maquette 3D',
    description:
      "Cette maquette numérique permet de parcourir les volumes du véhicule, ses zones d'usage et ses choix de conception.",
    posterImage: buildAssetPath('/images/thumbnails/viewer-thumb.jpg'),
  },
  process: {
    title: 'Croquis et processus',
    description:
      "Les images de recherche ne montrent pas seulement un résultat final. Elles rendent visible la manière dont le projet s'est construit : par essais, ajustements, changements d'échelle et choix de proportions.",
    steps: [
      {
        title: 'Recherche',
        description:
          'Poser la question du mémoire et cadrer le terrain du projet.',
      },
      {
        title: 'Croquis',
        description:
          'Chercher des volumes, des accès et des postures.',
      },
      {
        title: 'Modélisation',
        description:
          "Tester l'habitacle, les proportions et les rapports d'échelle.",
      },
      {
        title: 'Rendus',
        description:
          "Vérifier l'usage, la lumière et la présence du véhicule sur la surface lunaire.",
      },
    ],
    visuals: [
      {
        type: 'image',
        src: buildAssetPath('/images/custom/comment-se-range-le-vehicule.png'),
        alt: 'Schéma de transport et de rangement du véhicule',
        label: 'Schéma de transport',
        fit: 'contain',
        objectPosition: 'center center',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/custom/top-view-interieur-vehicule.png'),
        alt: "Vue du dessus de l'intérieur du véhicule",
        label: 'Volume intérieur',
        fit: 'contain',
        objectPosition: 'center center',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/custom/dashboard-driver.png'),
        alt: 'Vue conducteur du tableau de bord',
        label: 'Tableau de bord',
        fit: 'cover',
        objectPosition: 'center center',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/custom/door-research.jpg'),
        alt: 'Recherche sur la porte du véhicule',
        label: "Hypothèse d'accès",
        fit: 'contain',
        objectPosition: 'center center',
      },
      {
        type: 'video',
        src: buildAssetPath('/videos/custom/dashboard-to-rear.mp4'),
        poster: buildAssetPath('/images/custom/dashboard-driver.png'),
        alt: "Parcours vidéo du poste avant vers la zone arrière",
        label: "Lecture de l'habitacle",
        fit: 'cover',
        objectPosition: 'center center',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/custom/steering-research.jpg'),
        alt: 'Recherche sur le volant du véhicule',
        label: 'Recherche sur le volant',
        fit: 'contain',
        objectPosition: 'center center',
      },
      {
        type: 'video',
        src: buildAssetPath('/videos/custom/rear-comfort-astronauts.mp4'),
        poster: buildAssetPath('/images/custom/comfort-zone-astronauts.jpg'),
        alt: 'Astronautes dans la zone arrière de confort',
        label: 'Pause dans la zone arrière',
        fit: 'cover',
        objectPosition: 'center center',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/custom/zone-detente-2.png'),
        alt: 'Seconde vue de la zone arrière de détente',
        label: 'Vue de la banquette',
        fit: 'cover',
        objectPosition: 'center center',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/custom/dashboard-passenger.png'),
        alt: 'Vue passager du tableau de bord',
        label: 'Vue passager',
        fit: 'cover',
        objectPosition: 'center center',
      },
    ],
  },
  interior: {
    title: 'Expérience intérieure',
    description:
      "L'intérieur est pensé autour du corps en faible gravité. Les postures peuvent changer, les appuis deviennent plus souples, et la cabine n'est plus seulement un poste de conduite.",
    spaces: [
      'Poste de conduite',
      'Zone de repos',
      'Ouverture sur le paysage',
      'Rangements et accès',
    ],
    visuals: [
      {
        type: 'video',
        src: buildAssetPath('/videos/custom/dashboard-to-rear.mp4'),
        poster: buildAssetPath('/images/custom/dashboard-passenger.png'),
        label: "Lecture de l'habitacle",
      },
      {
        type: 'image',
        src: buildAssetPath('/images/custom/dashboard-driver.png'),
        alt: 'Vue conducteur du tableau de bord',
        label: 'Poste de conduite',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/custom/dashboard-passenger.png'),
        alt: 'Vue passager du tableau de bord',
        label: 'Vue passager',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/custom/comfort-zone.png'),
        alt: 'Vue de la zone arrière de détente',
        label: 'Zone arrière',
      },
      {
        type: 'video',
        src: buildAssetPath('/videos/custom/rear-cabin-full.mp4'),
        poster: buildAssetPath('/images/custom/comfort-zone-astronauts.jpg'),
        label: 'Habitacle complet',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/interior/rear-observatory.jpg'),
        alt: "Vue arrière liée au paysage lunaire",
        label: 'Ouverture arrière',
      },
      {
        type: 'image',
        src: buildAssetPath('/images/interior/low-gravity-lounge.jpg'),
        alt: 'Banquette arrière et posture de repos',
        label: 'Banquette arrière',
      },
    ],
  },
  accessories: {
    title: 'Accessoires embarqués',
    description:
      "Le véhicule emporte quatre accessoires liés aux usages courts : support de survie, rations, eau et rangement du scaphandre.",
    spotlight: {
      src: buildAssetPath('/images/deck/accessories-loop.gif'),
      alt: "Animation d'implantation des accessoires dans l'habitacle",
      label: 'Implantation / habitacle',
      title: "Des accessoires intégrés à la zone de vie",
      description:
        "Le pack dorsal, les rations, la gourde et le rangement prennent place autour de la banquette et de la paroi latérale sans bloquer la circulation.",
    },
    leadCards: [
      {
        label: 'Ensemble',
        title: 'Quatre accessoires embarqués',
        description:
          'Chaque module répond à un usage précis : sortie courte, alimentation, eau et rangement du scaphandre.',
      },
      {
        label: 'Usage',
        title: 'Autonomie de courte durée',
        description:
          "Ces éléments prolongent une halte ou une sortie brève sans reconfigurer l'ensemble du véhicule.",
      },
    ],
    items: [
      {
        label: 'PLSS',
        title: 'Portable life support system',
        description: 'Pack dorsal prévu pour une sortie brève hors du véhicule.',
        media: {
          type: 'video',
          src: buildAssetPath('/videos/deck/plss-turnaround.mp4'),
          poster: buildAssetPath('/images/deck/accessories-pack-module.webp'),
        },
      },
      {
        label: 'Ration',
        title: 'Conserves alimentaires lyophilisées',
        description: 'Rations compactes pour prolonger une halte ou un retour différé.',
        media: {
          type: 'video',
          src: buildAssetPath('/videos/deck/freeze-dried-ration-turnaround.mp4'),
          poster: '/images/deck/freeze-dried-ration-poster.jpg',
        },
      },
      {
        label: 'Eau',
        title: 'Gourde rechargeable',
        description: "Réserve d'eau rechargeable accessible depuis la zone de vie.",
        media: {
          type: 'video',
          src: buildAssetPath('/videos/deck/rechargeable-bottle-turnaround.mp4'),
          poster: '/images/deck/rechargeable-bottle-poster.jpg',
        },
      },
      {
        label: 'Scaphandre',
        title: 'Stockage scaphandre',
        description: "Rangement latéral pour garder l'équipement au plus près du sas.",
        media: {
          type: 'video',
          src: buildAssetPath('/videos/deck/suit-storage-turnaround.mp4'),
          poster: '/images/deck/suit-storage-poster.jpg',
        },
      },
    ],
  },
  technical: {
    title: "Une architecture technique au service de l'usage.",
    description:
      "Les choix techniques sont traités comme des contraintes de design : protection, accès, stockage, énergie, visibilité et circulation intérieure.",
    image: buildAssetPath('/images/technical/chassis-layout.jpg'),
    detailImages: [
      {
        src: buildAssetPath('/images/custom/wheel-concept.jpg'),
        alt: 'Concept de roue et contact au sol',
        label: 'Roue',
      },
      {
        src: buildAssetPath('/images/custom/helmet-storage.png'),
        alt: 'Stockage des casques de scaphandre',
        label: 'Stockage',
      },
      {
        src: buildAssetPath('/images/custom/comment-se-range-le-vehicule.png'),
        alt: 'Schéma de transport et de rangement du véhicule',
        label: 'Transport',
      },
      {
        src: buildAssetPath('/images/technical/interior-section.jpg'),
        alt: 'Coupe intérieure et distribution des fonctions',
        label: 'Coupe',
      },
      {
        src: buildAssetPath('/images/custom/dashboard-driver.png'),
        alt: 'Vue conducteur du tableau de bord',
        label: 'Pilotage',
      },
      {
        src: buildAssetPath('/images/custom/top-view-interieur-vehicule.png'),
        alt: "Vue du dessus de l'habitacle",
        label: 'Organisation intérieure',
      },
    ],
  },
  scenario: {
    title: 'Une sortie hors de la base',
    description:
      "Après une journée de mission, l'équipage quitte la base pour un trajet court. Le but n'est pas de produire, de réparer ou d'extraire.",
    steps: [
      {
        code: '01',
        title: 'Sortie de la base',
        description:
          "Le sas marque la bascule entre l'habitat, le véhicule et le début du trajet.",
        media: {
          src: buildAssetPath('/videos/custom/door-close-wide.mp4'),
          poster: buildAssetPath('/images/custom/door-research.jpg'),
          label: 'Sas / départ',
        },
      },
      {
        code: '02',
        title: 'Trajet de surface',
        description:
          "Le véhicule prend le relais pour un déplacement court entre la base et la zone de pause.",
        media: {
          src: buildAssetPath('/videos/custom/astronaut-driving.mp4'),
          poster: buildAssetPath('/images/archive/motion-exterior-front.jpg'),
          label: 'Déplacement / surface',
        },
      },
      {
        code: '03',
        title: 'Lecture du terrain',
        description:
          'La progression rend visible le sol, les appuis et le rythme du trajet.',
        media: {
          src: buildAssetPath('/videos/custom/satellite-drive.mp4'),
          poster: buildAssetPath('/images/custom/wheel-concept.jpg'),
          label: 'Terrain / déplacement',
        },
      },
      {
        code: '04',
        title: 'Pause dans la zone arrière',
        description:
          "Le trajet ouvre un temps de pause et d'observation avant le retour vers la base.",
        media: {
          src: buildAssetPath('/videos/custom/rear-comfort-astronauts.mp4'),
          poster: buildAssetPath('/images/custom/comfort-zone-astronauts.jpg'),
          label: 'Pause / zone arrière',
        },
      },
      {
        code: '05',
        title: "Retour vers l'habitat",
        description:
          'Le retour replace le véhicule dans le rythme quotidien de la base lunaire.',
        media: {
          src: buildAssetPath('/videos/deck/hangar-front.mp4'),
          poster: buildAssetPath('/images/custom/village-lunaire.jpg'),
          label: 'Retour / habitat',
        },
      },
    ],
  },
  archiveFilms: {
    title: 'Faire lire le projet en mouvement',
    description:
      "Ces vidéos montrent le projet en mouvement : volumes extérieurs, accès, habitacle et détails de construction.",
    featuredClip: {
      title: "Du poste avant à la zone arrière",
      description:
        "Cette séquence traverse l'habitacle pour faire lire le poste de conduite, la banquette et les volumes de repos.",
      tag: 'Habitacle',
      src: buildAssetPath('/videos/custom/dashboard-to-rear.mp4'),
      poster: buildAssetPath('/images/custom/dashboard-driver.png'),
    },
    secondaryClips: [
      {
        title: 'Rotation du véhicule',
        description:
          'Rotation lente pour lire la masse, les surfaces et les proportions.',
        tag: 'Véhicule',
        src: buildAssetPath('/videos/custom/rotation-vehicule.mp4'),
        poster: buildAssetPath('/images/custom/vehicle-styled-exit.png'),
      },
      {
        title: 'Conduite du véhicule',
        description:
          'Une vue en situation pour garder une lecture simple du déplacement.',
        tag: 'Conduite',
        src: buildAssetPath('/videos/custom/astronaut-driving.mp4'),
        poster: buildAssetPath('/images/archive/motion-exterior-front.jpg'),
      },
    ],
    clips: [
      {
        title: 'Fermeture de porte',
        description: "Lecture de l'entrée et du sas.",
        tag: 'Accès',
        src: buildAssetPath('/videos/custom/door-close.mp4'),
        poster: buildAssetPath('/images/custom/door-research.jpg'),
      },
      {
        title: 'Fermeture du sas',
        description: "Une vue plus large de l'accès au véhicule.",
        tag: 'Accès',
        src: buildAssetPath('/videos/custom/door-close-wide.mp4'),
        poster: buildAssetPath('/images/custom/door-research.jpg'),
      },
      {
        title: 'Volant en approche',
        description: 'Le poste de conduite se met en place pour le trajet.',
        tag: 'Poste avant',
        src: buildAssetPath('/videos/custom/steering-column-advance.mp4'),
        poster: buildAssetPath('/images/custom/dashboard-driver.png'),
      },
      {
        title: 'Déploiement du siège',
        description: 'La posture de conduite se prépare dans le volume avant.',
        tag: 'Posture',
        src: buildAssetPath('/videos/custom/seat-rise.mp4'),
        poster: buildAssetPath('/images/custom/top-view-interieur-vehicule.png'),
      },
      {
        title: "Lecture complète de l'habitacle",
        description:
          "Une vue continue pour lire la cabine dans son ensemble.",
        tag: 'Habitacle',
        src: buildAssetPath('/videos/custom/rear-cabin-full.mp4'),
        poster: buildAssetPath('/images/custom/comfort-zone.png'),
      },
      {
        title: 'Zone arrière / pause',
        description: 'La pause prend place dans le volume arrière.',
        tag: 'Zone arrière',
        src: buildAssetPath('/videos/custom/rear-comfort-astronauts.mp4'),
        poster: buildAssetPath('/images/custom/comfort-zone-astronauts.jpg'),
      },
      {
        title: 'Vue latérale du trajet',
        description: 'Le trajet garde le paysage dans le champ.',
        tag: 'Déplacement',
        src: buildAssetPath('/videos/custom/side-window-drive.mp4'),
        poster: buildAssetPath('/images/interior/panorama-cockpit.jpg'),
      },
      {
        title: 'Vue satellite du trajet',
        description: 'Le véhicule se lit par ses appuis et sa trace au sol.',
        tag: 'Terrain',
        src: buildAssetPath('/videos/custom/satellite-drive.mp4'),
        poster: buildAssetPath('/images/custom/wheel-concept.jpg'),
      },
      {
        title: "Retour à l'atelier",
        description: "Le projet repasse par un temps de contrôle et de maintenance.",
        tag: 'Atelier',
        src: buildAssetPath('/videos/deck/repair-atelier.mp4'),
        poster: buildAssetPath('/images/renders/workshop-assembly.jpg'),
      },
      {
        title: 'Champ visuel',
        description: "Une vue intérieure qui garde la surface lunaire dans le champ.",
        tag: 'Habitacle',
        src: assetPaths.videos.zip33,
        poster: zipImage('33'),
      },
      {
        title: 'Architecture latérale',
        description: 'Lecture du véhicule par sa façade latérale et ses volumes.',
        tag: 'Détail',
        src: assetPaths.videos.zip29,
        poster: zipImage('29'),
      },
      {
        title: 'Passage rapide',
        description: 'Essai de mise en scène sur la surface lunaire.',
        tag: 'Mise en scène',
        src: buildAssetPath('/videos/custom/fast-drive.mp4'),
        poster: buildAssetPath('/images/archive/archive-side-profile.jpg'),
      },
      {
        title: 'Franchissement',
        description: 'Le véhicule est observé dans une séquence plus libre.',
        tag: 'Mise en scène',
        src: buildAssetPath('/videos/custom/vehicle-stunt.mp4'),
        poster: buildAssetPath('/images/renders/exterior-rear.jpg'),
      },
      {
        title: 'Approche sur la surface',
        description: 'Le véhicule est repris dans une vue de progression plus frontale.',
        tag: 'Déplacement',
        src: buildAssetPath('/videos/deck/drive-front.mp4'),
        poster: buildAssetPath('/images/archive/motion-exterior-front.jpg'),
      },
    ],
  },
  memoire: {
    title: 'Mémoire et archives',
    description:
      "Le site rassemble le mémoire, les planches et une sélection de visuels du projet.",
    pdfUrl: assetPaths.pdf,
    presentationDeckUrl: '/presentation',
    presentationManifestUrl: assetPaths.presentationManifest,
    previewImage: buildAssetPath('/images/thumbnails/hero-thumb.jpg'),
  },
  finalStatement: {
    title: "Concevoir pour la Lune, c'est aussi choisir ce que l'on veut préserver.",
    ctaPrimary: 'Voir le véhicule',
    ctaSecondary: 'Ouvrir le mémoire',
  },
  footer: {
    credit: 'Buron Matéo - Diplômes 2026 - Strate École de Design',
    secondary: 'Mémoire, images, vidéos et maquette du projet',
  },
} as const
