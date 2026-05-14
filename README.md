# Au-dela d'Artemis

Site vitrine immersif pour la soutenance de Mateo Buron autour de son projet de vehicule lunaire.

Le site est pense comme une archive de mission: narration du memoire, galerie de rendus, section viewer prete pour un GLB, mode presentation, PDF embarque et experience mobile QR-friendly.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Three.js + React Three Fiber + Drei
- Anime.js
- Lenis
- Zustand
- Lucide React

## Installation

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

## Structure

```txt
public/
  models/          -> GLB exportes depuis Blender
  images/          -> hero, process, renders, technical, thumbnails
  videos/          -> fallback video optionnel pour le viewer
  pdf/             -> memoire PDF
  icons/           -> favicon et futur QR preview

src/
  app/             -> bootstrap, routes, page principale
  components/      -> layout, UI, sections, viewer 3D, mode presentation
  data/            -> textes, hotspots, galerie, timeline
  hooks/           -> reveal, lenis, media queries, clavier
  stores/          -> etat viewer/presentation
  styles/          -> theme NASA, typo, globals
  utils/           -> assets, preload, perf, helpers
```

## Ou placer les assets

### Modele 3D

Place les exports Blender ici:

```txt
public/models/rover-high.glb
public/models/rover-low.glb
public/models/rover-chassis.glb
public/models/rover-interior.glb
```

Le site est deja protege si ces fichiers manquent:

- desktop -> apercu media propre dans la section viewer
- mobile -> fallback media prioritaire
- si le GLB arrive plus tard -> le viewer passe automatiquement en vrai mode 3D

### Images

Les images du zip ont deja ete extraites et une selection propre a ete recopiee dans:

```txt
public/images/hero
public/images/renders
public/images/process
public/images/sketches
public/images/technical
public/images/interior
public/images/thumbnails
```

### PDF

Le memoire est attendu ici:

```txt
public/pdf/memoire-au-dela-artemis.pdf
```

## Scripts utilitaires

Ces scripts sont optionnels, mais utiles pendant la semaine de prod:

```txt
scripts/optimize-images.js
scripts/generate-thumbnails.js
scripts/optimize-gltf.sh
```

Notes:

- `optimize-images.js` et `generate-thumbnails.js` demandent `sharp`
- `optimize-gltf.sh` utilise `@gltf-transform/cli` via `npx`
- le script shell est a lancer dans Git Bash, WSL ou macOS/Linux

## Deploiement

### Vercel

1. Pousser le repo sur GitHub
2. Importer le repo dans Vercel
3. Framework preset: `Vite`
4. Build command: `npm run build`
5. Output directory: `dist`

### Cloudflare Pages

1. Connecter le repo GitHub
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Node version recommandee: 20+

## Conseils de prod

- Garder le hero et les grandes images en priorite visuelle
- Ajouter un vrai `fallback-3d.mp4` dans `public/videos/` des que possible
- Exporter un `rover-low.glb` leger pour mobile
- Tester le site sur telephone apres chaque gros changement de media
- Generer le QR code seulement une fois le domaine final en ligne
