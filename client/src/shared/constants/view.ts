export const ViewMode = {
  GRID: 'grid',
  LIST: 'list',
} as const

export type ViewMode = (typeof ViewMode)[keyof typeof ViewMode]
