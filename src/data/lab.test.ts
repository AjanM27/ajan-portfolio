import { describe, expect, it } from 'vitest'
import { labEntries, nowEntries, sortLabEntries } from './lab'

describe('Lab / Now content model', () => {
  it('keeps updateable entries structured and newest-first', () => {
    expect(labEntries.every((entry) => entry.date && entry.title && entry.summary && entry.type && entry.status && entry.technologies.length > 0)).toBe(true)
    expect(sortLabEntries(labEntries).map((entry) => entry.date)).toEqual([...labEntries].map((entry) => entry.date).sort((a, b) => b.localeCompare(a)))
  })

  it('keeps the Now panel derived from data rather than component markup', () => {
    expect(nowEntries.length).toBeGreaterThanOrEqual(3)
    expect(nowEntries.every((entry) => entry.status === 'NOW')).toBe(true)
  })
})
