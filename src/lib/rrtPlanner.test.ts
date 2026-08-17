import { describe, expect, it } from 'vitest'
import { DEFAULT_OBSTACLES, DEFAULT_TURN_RADIUS, TERMINAL_PREFERRED_RADIUS, clientPointToWorkspace, lineIsFree, planRrt, planWithMode, smoothPath, validateTree, visibleTreeEdges } from './rrtPlanner'

const start = { x: 34, y: 172 }
const goal = { x: 370, y: 46 }
const options = { start, goal, obstacles: DEFAULT_OBSTACLES, seed: 42, maxNodes: 420 }
const segmentsAreFree = (path: { x: number; y: number }[]) => path.slice(1).every((point, index) => lineIsFree(path[index], point, DEFAULT_OBSTACLES))
const turnAngle = (a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }) => {
  const ux = b.x - a.x, uy = b.y - a.y, vx = c.x - b.x, vy = c.y - b.y
  return Math.acos(Math.max(-1, Math.min(1, (ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy)))))
}

describe('bounded planning playground', () => {
  it('maps client coordinates to the same viewBox point at responsive sizes', () => {
    expect(clientPointToWorkspace({ clientX: 250, clientY: 155 }, { left: 10, top: 20, width: 480, height: 270 })).toEqual({ x: 202.5, y: 107.5 })
    expect(clientPointToWorkspace({ clientX: 490, clientY: 290 }, { left: 10, top: 20, width: 960, height: 540 })).toEqual({ x: 202.5, y: 107.5 })
  })

  it('finds a bounded, collision-free RRT route', () => {
    const result = planRrt(options)
    expect(result.status).toBe('success')
    expect(result.path[0]).toEqual(start)
    expect(result.path.at(-1)).toEqual(goal)
    expect(result.nodes.length).toBeLessThanOrEqual(420)
    expect(segmentsAreFree(result.path)).toBe(true)
  })

  it('finds collision-free routes with all algorithms', () => {
    ;(['rrt', 'rrt-star', 'a-star'] as const).forEach((mode) => {
      const result = planWithMode(mode, options)
      expect(result.status).toBe('success')
      expect(result.path.at(-1)).toEqual(goal)
      expect(segmentsAreFree(result.path)).toBe(true)
    })
  })

  it('uses the same seeded sampling sequence for genuine, cost-improving RRT* rewiring', () => {
    const rrt = planWithMode('rrt', options)
    const star = planWithMode('rrt-star', options)
    expect(star.status).toBe('success')
    expect(rrt.status).toBe('success')
    expect(segmentsAreFree(rrt.path)).toBe(true)
    expect(segmentsAreFree(star.path)).toBe(true)
    expect(star.rewirings.length).toBeGreaterThan(0)
    expect(star.rawLength).toBeLessThanOrEqual(rrt.rawLength)
    expect(star.goalCosts.at(-1)).toBeCloseTo(star.rawLength, 4)
  })

  it('keeps RRT* parentage, costs, and final ancestry coherent through bounded optimization', () => {
    const result = planWithMode('rrt-star', options)
    expect(result.status).toBe('success')
    expect(result.stage).toBe('final')
    expect(result.firstSolutionNodeCount).toBeGreaterThan(0)
    expect(result.firstSolutionNodeCount).toBeLessThanOrEqual(result.nodes.length)
    expect(validateTree(result.nodes, DEFAULT_OBSTACLES).valid).toBe(true)
    expect(result.rewirings.every(({ node, to }) => node !== 0 && node !== to)).toBe(true)
    expect(segmentsAreFree(result.path)).toBe(true)
  })

  it('is deterministic for a repeated RRT* seed and never renders an edge to an unseen parent', () => {
    const one = planWithMode('rrt-star', options)
    const two = planWithMode('rrt-star', options)
    expect(two.nodes).toEqual(one.nodes)
    expect(two.path).toEqual(one.path)
    expect(two.goalCosts).toEqual(one.goalCosts)
    for (let visible = 1; visible <= one.nodes.length; visible += 1) {
      expect(visibleTreeEdges(one.nodes, visible).every(({ parent, child }) => parent < visible && child < visible)).toBe(true)
    }
  })

  it('uses an adaptive, collision-safe 28-unit turn-radius model with tangent-continuous sampled corners', () => {
    const raw = planRrt(options).path
    const smooth = smoothPath(raw, DEFAULT_OBSTACLES)
    expect(DEFAULT_TURN_RADIUS).toBe(28)
    expect(smooth.length).toBeGreaterThan(3)
    expect(smooth[0]).toEqual(raw[0])
    expect(smooth.at(-1)).toEqual(raw.at(-1))
    expect(segmentsAreFree(smooth)).toBe(true)
    const angles = smooth.slice(1, -1).map((point, index) => turnAngle(smooth[index], point, smooth[index + 2])).filter(Number.isFinite)
    expect(angles.some((angle) => angle > .01)).toBe(true)
    expect(Math.max(...angles)).toBeLessThan(1.1)
  })

  it('uses a larger adaptive terminal fillet while preserving the exact goal and a calm final heading', () => {
    const raw = planRrt(options).path
    const smooth = smoothPath(raw, DEFAULT_OBSTACLES)
    expect(TERMINAL_PREFERRED_RADIUS).toBeGreaterThan(DEFAULT_TURN_RADIUS)
    expect(smooth.at(-1)).toEqual(goal)
    expect(segmentsAreFree(smooth)).toBe(true)
    const finalAngle = turnAngle(smooth.at(-3)!, smooth.at(-2)!, smooth.at(-1)!)
    expect(finalAngle).toBeLessThan(.35)
  })

  it('rejects blocked goals', () => {
    expect(planRrt({ start, goal: { x: 110, y: 50 }, obstacles: DEFAULT_OBSTACLES, seed: 42 }).status).toBe('invalid-goal')
  })
})
