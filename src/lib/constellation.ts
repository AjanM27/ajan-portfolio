export type OrbitInput = { name: string; clusterId: string }
export type OrbitNode = OrbitInput & { orbit: number; angle: number }

/**
 * Places semantic groups in contiguous arcs while sharing four compact bands.
 * The outer lane carries the most labels; inner lanes leave room for the core.
 */
export function assignUnifiedOrbits<T extends OrbitInput>(skills: T[], orbitCount = 4): Array<T & OrbitNode> {
  if (!skills.length) return []
  const groups = new Map<string, T[]>()
  skills.forEach((skill) => groups.set(skill.clusterId, [...(groups.get(skill.clusterId) ?? []), skill]))
  const ordered = [...groups.entries()].sort(([a, left], [b, right]) => right.length - left.length || a.localeCompare(b))
  const usableArc = 304
  const bands = [3, 3, 2, 3, 1, 2, 1, 3, 2, 1, 2, 1, 0]
  let cursor = 28

  return ordered.flatMap(([clusterId, group]) => {
    const arc = Math.max(24, (group.length / skills.length) * usableArc)
    const groupBands = group.map((_, index) => bands[index % bands.length] % orbitCount)
    const totals = Array.from({ length: orbitCount }, (_, orbit) => groupBands.filter((band) => band === orbit).length)
    const seen = Array.from({ length: orbitCount }, () => 0)
    const nodes = group.map((skill, index) => {
      const orbit = groupBands[index]
      const slot = seen[orbit]++
      return { ...skill, clusterId, orbit, angle: cursor + ((slot + .5) / totals[orbit]) * arc }
    })
    cursor += arc
    return nodes
  })
}
