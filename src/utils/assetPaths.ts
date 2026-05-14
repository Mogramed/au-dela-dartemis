const publicAsset = (path: string) => encodeURI(path)

export const buildAssetPath = publicAsset

export const assetPaths = {
  pdf: publicAsset('/pdf/memoire-au-dela-artemis.pdf'),
  models: {
    high: publicAsset('/models/rover-high.glb'),
    low: publicAsset('/models/rover-low.glb'),
    chassis: publicAsset('/models/rover-chassis.glb'),
    interior: publicAsset('/models/rover-interior.glb'),
  },
  videos: {
    intro: publicAsset('/videos/intro-moon.mp4'),
    fallback: publicAsset('/videos/fallback-3d.mp4'),
  },
  hero: {
    exterior: publicAsset('/images/hero/hero-exterior.jpg'),
    profile: publicAsset('/images/hero/hero-profile.jpg'),
  },
} as const
