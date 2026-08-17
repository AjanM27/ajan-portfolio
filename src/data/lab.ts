export type LabStatus = 'NOW' | 'RECENT'
export type LabType = 'BUILDING' | 'LEARNING' | 'EXPERIMENT' | 'NOTE' | 'SHIPPED' | 'PAUSED'

export type LabEntry = {
  date: string // ISO date keeps ordering automatic and is easy for an agent to append later.
  title: string
  summary: string
  type: LabType
  status: LabStatus
  technologies: string[]
  links?: { label: string; href: string }[]
  optionalImage?: string
}

// Add a new object here; the UI sorts it newest-first. No React component edits required.
export const labEntries: LabEntry[] = [
  { date: '2026-08-17', title: 'Interactive browser-based RRT visualization', summary: 'A bounded planning demo that exposes tree growth, the raw parent-chain route, and a separate post-processing step.', type: 'EXPERIMENT', status: 'NOW', technologies: ['RRT*', 'TypeScript', 'SVG'] },
  { date: '2026-08-17', title: 'Personal operating-system workflow', summary: 'Exploring a Telegram-led workflow across Multica, Honcho, calendar, and durable project context.', type: 'BUILDING', status: 'NOW', technologies: ['Telegram', 'Multica', 'Honcho'] },
  { date: '2026-08-16', title: 'Agent memory architectures', summary: 'Learning how short-term context, durable memory, and retrieval can support useful long-running assistants.', type: 'LEARNING', status: 'NOW', technologies: ['Agent systems', 'Memory'] },
  { date: '2026-08-15', title: 'Portfolio command center', summary: 'Built a recruiter-friendly interactive portfolio around documented robotics, autonomy, AI, and embedded work.', type: 'SHIPPED', status: 'RECENT', technologies: ['React', 'TypeScript', 'Vite'] },
]

export const sortLabEntries = (entries: LabEntry[]) => [...entries].sort((a, b) => b.date.localeCompare(a.date))
export const nowEntries = sortLabEntries(labEntries).filter((entry) => entry.status === 'NOW')
export const recentEntries = sortLabEntries(labEntries).filter((entry) => entry.status === 'RECENT')
