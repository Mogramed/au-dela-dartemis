export const formatMissionIndex = (value: number) =>
  `MISSION ${String(value).padStart(2, '0')}`

export const formatModuleIndex = (value: number) =>
  `MODULE ${String(value).padStart(2, '0')}`

export const formatArchiveIndex = (value: number) =>
  `ARCHIVE ${String(value).padStart(2, '0')}`
