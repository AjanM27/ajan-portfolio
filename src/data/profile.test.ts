import { describe, expect, it } from 'vitest'
import { experience, profile, projects, skillGroups } from './profile'

describe('portfolio content model', () => {
  it('has a verified identity, education, and recruiter pathways', () => {
    expect(profile.name).toBe('Ajan Muthuraj')
    expect(profile.education.degree).toContain('B.Tech')
    expect(profile.education.institution).toContain('Indian Institute of Technology Madras')
    expect(profile.links.linkedin).toContain('linkedin.com')
  })

  it('makes the explicitly supplied upcoming role unambiguous', () => {
    expect(experience).toEqual(expect.arrayContaining([
      expect.objectContaining({ company: 'Dai-ichi Life Techno Cross (DLTX)', location: 'Japan', status: 'UPCOMING' }),
    ]))
  })

  it('keeps project content structured, evidence-aware, and sufficiently broad', () => {
    expect(projects.length).toBeGreaterThanOrEqual(6)
    expect(projects.every((project) => project.title && project.tags.length > 0 && project.source)).toBe(true)
    expect(projects.some((project) => project.id === 'adaptive-rrt')).toBe(true)
  })

  it('groups skills into readable technical clusters', () => {
    expect(skillGroups.length).toBeGreaterThanOrEqual(4)
    expect(skillGroups.every((group) => group.skills.length >= 3)).toBe(true)
  })
})
