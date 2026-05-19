const normalizeImageAsset = (path: string) =>
  /\.(jpe?g|png)$/i.test(path) ? path.replace(/\.(jpe?g|png)$/i, '.webp') : path

const publicAsset = (path: string) => encodeURI(normalizeImageAsset(path))
const presentationVersion = '20260519b'

export const buildAssetPath = publicAsset

export const assetPaths = {
  pdf: publicAsset('/pdf/memoire-au-dela-artemis.pdf'),
  presentationManifest: `/presentation/slides-manifest.json?v=${presentationVersion}`,
  models: {
    high: publicAsset('/models/rover-high.glb'),
    low: publicAsset('/models/rover-low.glb'),
    chassis: publicAsset('/models/rover-chassis.glb'),
    interior: publicAsset('/models/rover-interior.glb'),
  },
  videos: {
    intro: publicAsset('/videos/intro-moon.mp4'),
    fallback: publicAsset('/videos/fallback-3d.mp4'),
    entryDoorA: publicAsset('/videos/entry-door-a.mp4'),
    entryDoorB: publicAsset('/videos/entry-door-b.mp4'),
    heroSpin: publicAsset('/videos/zip/hero-spin.mp4'),
    zip24: publicAsset('/videos/zip/24.mp4'),
    zip25: publicAsset('/videos/zip/25.mp4'),
    zip26: publicAsset('/videos/zip/26.mp4'),
    zip27: publicAsset('/videos/zip/27.mp4'),
    zip28: publicAsset('/videos/zip/28.mp4'),
    zip29: publicAsset('/videos/zip/29.mp4'),
    zip30: publicAsset('/videos/zip/30.mp4'),
    zip33: publicAsset('/videos/zip/33.mp4'),
    zip34: publicAsset('/videos/zip/34.mp4'),
    zip35: publicAsset('/videos/zip/35.mp4'),
    zip36: publicAsset('/videos/zip/36.mp4'),
    zip37: publicAsset('/videos/zip/37.mp4'),
    zip38: publicAsset('/videos/zip/38.mp4'),
    zip39: publicAsset('/videos/zip/39.mp4'),
    missionHangarRear: publicAsset('/videos/zip/mission-hangar-rear.mp4'),
    missionTurnaroundReflect: publicAsset('/videos/zip/mission-turnaround-reflect.mp4'),
  },
  hero: {
    exterior: publicAsset('/images/hero/hero-exterior.jpg'),
    profile: publicAsset('/images/hero/hero-profile.jpg'),
  },
} as const
