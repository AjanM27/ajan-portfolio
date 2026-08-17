import { describe, expect, it } from 'vitest'
import { assignUnifiedOrbits } from './constellation'

describe('assignUnifiedOrbits', () => {
  const skills = [
    ...Array.from({ length: 15 }, (_, index) => ({ name: `robotics-${index}`, clusterId: 'robotics' })),
    ...Array.from({ length: 7 }, (_, index) => ({ name: `ai-${index}`, clusterId: 'ai' })),
    ...Array.from({ length: 4 }, (_, index) => ({ name: `programming-${index}`, clusterId: 'programming' })),
    ...Array.from({ length: 7 }, (_, index) => ({ name: `embedded-${index}`, clusterId: 'embedded' })),
    ...Array.from({ length: 6 }, (_, index) => ({ name: `tools-${index}`, clusterId: 'tools' })),
  ]

  it('keeps every curated skill in one four-band system', () => {
    const nodes = assignUnifiedOrbits(skills, 4)
    expect(nodes).toHaveLength(39)
    expect(new Set(nodes.map((node) => node.name)).size).toBe(39)
    expect(nodes.every((node) => node.orbit >= 0 && node.orbit < 4)).toBe(true)
  })

  it('keeps each semantic group within a contiguous angular neighbourhood', () => {
    const nodes = assignUnifiedOrbits(skills, 4)
    for (const group of ['robotics', 'ai', 'programming', 'embedded', 'tools']) {
      const angles = nodes.filter((node) => node.clusterId === group).map((node) => node.angle)
      expect(Math.max(...angles) - Math.min(...angles)).toBeLessThanOrEqual(120)
    }
  })
})
