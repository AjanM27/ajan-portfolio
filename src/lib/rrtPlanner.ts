export type Point = { x: number; y: number }
export type Obstacle = { x: number; y: number; width: number; height: number; radius?: number }
export type TreeNode = Point & { parent: number; cost: number }
export type PlannerMode = 'rrt' | 'rrt-star' | 'a-star'
export type PlanStatus = 'success' | 'no-route' | 'invalid-goal'
export type PlanStage = 'searching' | 'optimizing' | 'final'
export type Rewiring = { node: number; from: number; to: number }
export type PlanResult = { status: PlanStatus; stage: PlanStage; nodes: TreeNode[]; path: Point[]; rawLength: number; smoothedLength: number; rewirings: Rewiring[]; firstSolutionNodeCount: number; goalCosts: number[] }
export type PlanOptions = { start: Point; goal: Point; obstacles?: Obstacle[]; seed?: number; maxNodes?: number; stepSize?: number; goalBias?: number }
export type Rect = { left: number; top: number; width: number; height: number }

export const WORKSPACE = { width: 405, height: 215, padding: 10 }
/** Planner-space units; deliberately broad relative to the 405×215 viewBox. */
export const DEFAULT_TURN_RADIUS = 28
/** The final approach starts wider than ordinary corners when geometry permits. */
export const TERMINAL_PREFERRED_RADIUS = 34
// Kept as a compatibility export for callers from the previous smoothing API.
export const DEFAULT_SMOOTHING_STRENGTH = DEFAULT_TURN_RADIUS
export const DEFAULT_OBSTACLES: Obstacle[] = [
  { x: 92, y: 29, width: 42, height: 55, radius: 7 },
  { x: 205, y: 119, width: 44, height: 48, radius: 7 },
  { x: 292, y: 32, width: 40, height: 55, radius: 7 },
]
const EPSILON = .001
const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y)
const squaredDistance = (a: Point, b: Point) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2
const inWorkspace = (p: Point) => p.x >= WORKSPACE.padding && p.x <= WORKSPACE.width - WORKSPACE.padding && p.y >= WORKSPACE.padding && p.y <= WORKSPACE.height - WORKSPACE.padding
export const pathLength = (path: Point[]) => path.slice(1).reduce((sum, point, i) => sum + distance(path[i], point), 0)

/** Correct client->viewBox transform; independent of responsive SVG CSS scaling. */
export function clientPointToWorkspace(point: { clientX: number; clientY: number }, rect: Rect): Point {
  return { x: ((point.clientX - rect.left) / rect.width) * WORKSPACE.width, y: ((point.clientY - rect.top) / rect.height) * WORKSPACE.height }
}
export function pointIsFree(point: Point, obstacles: Obstacle[]) { return inWorkspace(point) && !obstacles.some((o) => point.x >= o.x && point.x <= o.x + o.width && point.y >= o.y && point.y <= o.y + o.height) }
export function lineIsFree(from: Point, to: Point, obstacles: Obstacle[]) {
  const samples = Math.max(2, Math.ceil(distance(from, to) / 2))
  for (let i = 0; i <= samples; i += 1) if (!pointIsFree({ x: from.x + (to.x - from.x) * i / samples, y: from.y + (to.y - from.y) * i / samples }, obstacles)) return false
  return true
}
function seededRandom(seed: number) { let state = seed >>> 0; return () => { state += 0x6D2B79F5; let value = state; value = Math.imul(value ^ value >>> 15, value | 1); value ^= value + Math.imul(value ^ value >>> 7, value | 61); return ((value ^ value >>> 14) >>> 0) / 4294967296 } }
function sample(random: () => number, goal: Point, bias: number): Point { return random() < bias ? goal : { x: WORKSPACE.padding + random() * (WORKSPACE.width - WORKSPACE.padding * 2), y: WORKSPACE.padding + random() * (WORKSPACE.height - WORKSPACE.padding * 2) } }
function nearestIndex(nodes: TreeNode[], target: Point) { let nearest = 0; for (let i = 1; i < nodes.length; i += 1) if (squaredDistance(nodes[i], target) < squaredDistance(nodes[nearest], target)) nearest = i; return nearest }
function steer(from: Point, target: Point, step: number): Point | undefined { const d = distance(from, target); return d < EPSILON ? undefined : { x: from.x + (target.x - from.x) * Math.min(step / d, 1), y: from.y + (target.y - from.y) * Math.min(step / d, 1) } }
function extend(nodes: TreeNode[], target: Point, step: number, obstacles: Obstacle[]) { const nearest = nearestIndex(nodes, target), next = steer(nodes[nearest], target, step); return next && lineIsFree(nodes[nearest], next, obstacles) ? { nearest, next } : undefined }
function reconstruct(nodes: TreeNode[], last: number, goal: Point): Point[] {
  const path = [goal], seen = new Set<number>()
  for (let current = last; current >= 0; current = nodes[current].parent) {
    if (seen.has(current) || !nodes[current]) return []
    seen.add(current); path.push({ x: nodes[current].x, y: nodes[current].y })
    if (nodes[current].parent === -1) return path.reverse()
  }
  return []
}
function makeResult(status: PlanStatus, nodes: TreeNode[] = [], path: Point[] = [], obstacles = DEFAULT_OBSTACLES, rewirings: Rewiring[] = [], firstSolutionNodeCount = 0, goalCosts: number[] = []): PlanResult {
  const rawLength = pathLength(path)
  return { status, stage: 'final', nodes, path, rawLength, smoothedLength: pathLength(smoothPath(path, obstacles)), rewirings, firstSolutionNodeCount, goalCosts: goalCosts.length ? goalCosts : rawLength ? [rawLength] : [] }
}

export type TreeValidation = { valid: boolean; errors: string[] }
/** Verifies the tree contract relied on by reconstruction and rewiring. */
export function validateTree(nodes: TreeNode[], obstacles: Obstacle[]): TreeValidation {
  const errors: string[] = []
  if (!nodes.length) return { valid: true, errors }
  if (nodes[0].parent !== -1 || Math.abs(nodes[0].cost) > EPSILON) errors.push('root must have parent -1 and zero cost')
  nodes.forEach((node, index) => {
    if (index === 0) return
    if (!Number.isInteger(node.parent) || node.parent < 0 || node.parent >= nodes.length || node.parent === index) { errors.push(`invalid parent at ${index}`); return }
    const parent = nodes[node.parent]
    if (!lineIsFree(parent, node, obstacles)) errors.push(`blocked edge at ${index}`)
    if (Math.abs(node.cost - (parent.cost + distance(parent, node))) > .01) errors.push(`stale cost at ${index}`)
    const seen = new Set<number>()
    for (let current = index; current !== -1; current = nodes[current]?.parent ?? -2) { if (seen.has(current)) { errors.push(`cycle at ${index}`); break }; seen.add(current); if (current === 0) break }
    if (!seen.has(0)) errors.push(`orphan ancestry at ${index}`)
  })
  return { valid: errors.length === 0, errors }
}
function isAncestor(nodes: TreeNode[], candidateAncestor: number, node: number) {
  const seen = new Set<number>()
  for (let current = node; current >= 0 && !seen.has(current); current = nodes[current].parent) { if (current === candidateAncestor) return true; seen.add(current) }
  return false
}
function propagateCost(nodes: TreeNode[], root: number) {
  const queue = [root]
  while (queue.length) {
    const parentIndex = queue.shift()!
    nodes.forEach((node, index) => {
      if (node.parent !== parentIndex) return
      node.cost = nodes[parentIndex].cost + distance(nodes[parentIndex], node)
      queue.push(index)
    })
  }
}

export type TreeEdge = { parent: number; child: number }
/** Derive every visible edge from current parents only; never use stale rewiring history. */
export function visibleTreeEdges(nodes: TreeNode[], visibleNodes: number): TreeEdge[] {
  return nodes.slice(1, visibleNodes).flatMap((node, offset) => {
    const child = offset + 1
    return node.parent >= 0 && node.parent < visibleNodes ? [{ parent: node.parent, child }] : []
  })
}

export function planRrt({ start, goal, obstacles = DEFAULT_OBSTACLES, seed = 42, maxNodes = 420, stepSize = 13, goalBias = .18 }: PlanOptions): PlanResult {
  if (!pointIsFree(start, obstacles) || !pointIsFree(goal, obstacles)) return makeResult('invalid-goal', [], [], obstacles)
  const random = seededRandom(seed), nodes: TreeNode[] = [{ ...start, parent: -1, cost: 0 }]
  for (let attempt = 0; attempt < maxNodes - 1; attempt += 1) {
    const step = extend(nodes, sample(random, goal, goalBias), stepSize, obstacles)
    if (!step || nodes.some((node) => squaredDistance(node, step.next) < EPSILON)) continue
    nodes.push({ ...step.next, parent: step.nearest, cost: nodes[step.nearest].cost + distance(nodes[step.nearest], step.next) })
    if (distance(step.next, goal) <= stepSize * 1.45 && lineIsFree(step.next, goal, obstacles)) return makeResult('success', nodes, reconstruct(nodes, nodes.length - 1, goal), obstacles, [], nodes.length)
  }
  return makeResult('no-route', nodes, [], obstacles)
}

/** Deterministic, bounded RRT*: SEARCHING, then at most 96 accepted OPTIMIZING nodes. */
export function planRrtStar(options: PlanOptions): PlanResult {
  const { start, goal, obstacles = DEFAULT_OBSTACLES, seed = 42, maxNodes = 420, stepSize = 13, goalBias = .18 } = options
  if (!pointIsFree(start, obstacles) || !pointIsFree(goal, obstacles)) return makeResult('invalid-goal', [], [], obstacles)
  const random = seededRandom(seed), nodes: TreeNode[] = [{ ...start, parent: -1, cost: 0 }], rewirings: Rewiring[] = [], goalCandidates = new Set<number>()
  const goalCosts: number[] = []
  let firstSolutionNodeCount = 0, optimizationNodes = 0, displayedBest = Infinity
  for (let attempt = 0; attempt < maxNodes - 1; attempt += 1) {
    const candidate = extend(nodes, sample(random, goal, goalBias), stepSize, obstacles)
    if (!candidate || nodes.some((node) => squaredDistance(node, candidate.next) < EPSILON)) continue
    const radius = Math.max(stepSize * 2.5, Math.min(stepSize * 4, stepSize * 6 * Math.sqrt(Math.log(nodes.length + 1) / (nodes.length + 1))))
    const nearby = nodes.map((node, index) => ({ node, index, d: distance(node, candidate.next) }))
      .filter(({ node, d }) => d <= radius && lineIsFree(node, candidate.next, obstacles)).sort((a, b) => a.d - b.d).slice(0, 28)
    let parent = candidate.nearest, cost = nodes[parent].cost + distance(nodes[parent], candidate.next)
    nearby.forEach(({ node, index }) => { const candidateCost = node.cost + distance(node, candidate.next); if (candidateCost + EPSILON < cost) { parent = index; cost = candidateCost } })
    nodes.push({ ...candidate.next, parent, cost })
    const child = nodes.length - 1
    nearby.forEach(({ node, index }) => {
      // Only reparent a non-root node that is not already an ancestor of child.
      // This preserves a single parent and makes cycles structurally impossible.
      if (index === 0 || index === child || isAncestor(nodes, index, child)) return
      const rewiredCost = nodes[child].cost + distance(nodes[child], node)
      if (rewiredCost + EPSILON < nodes[index].cost) {
        const from = nodes[index].parent
        nodes[index].parent = child
        nodes[index].cost = rewiredCost
        propagateCost(nodes, index)
        rewirings.push({ node: index, from, to: child })
      }
    })
    if (lineIsFree(nodes[child], goal, obstacles)) goalCandidates.add(child)
    if (goalCandidates.size && !firstSolutionNodeCount) firstSolutionNodeCount = nodes.length
    // Compute progress from current costs after rewiring rather than stale pre-rewire values.
    const currentBest = [...goalCandidates].reduce((best, index) => Math.min(best, nodes[index].cost + distance(nodes[index], goal)), Infinity)
    if (currentBest + EPSILON < displayedBest) { goalCosts.push(currentBest); displayedBest = currentBest }
    if (firstSolutionNodeCount && ++optimizationNodes >= 96) break
  }
  const bestGoalNode = [...goalCandidates].reduce((best, index) => best < 0 || nodes[index].cost + distance(nodes[index], goal) < nodes[best].cost + distance(nodes[best], goal) ? index : best, -1)
  const path = bestGoalNode >= 0 ? reconstruct(nodes, bestGoalNode, goal) : []
  const integrity = validateTree(nodes, obstacles)
  if (!integrity.valid) throw new Error(`RRT* tree integrity failed: ${integrity.errors.join('; ')}`)
  const finalCost = pathLength(path)
  if (finalCost && Math.abs(goalCosts.at(-1)! - finalCost) > .01) goalCosts.push(finalCost)
  return bestGoalNode >= 0 && path.length ? makeResult('success', nodes, path, obstacles, rewirings, firstSolutionNodeCount, goalCosts) : makeResult('no-route', nodes, [], obstacles, rewirings, firstSolutionNodeCount)
}

/** Coarse 10-unit occupancy-grid A*, intentionally visually distinct from tree planners. */
export function planAStar({ start, goal, obstacles = DEFAULT_OBSTACLES }: PlanOptions): PlanResult {
  if (!pointIsFree(start, obstacles) || !pointIsFree(goal, obstacles)) return makeResult('invalid-goal', [], [], obstacles)
  const cell = 10, cols = Math.floor(WORKSPACE.width / cell), rows = Math.floor(WORKSPACE.height / cell), key = (x: number, y: number) => `${x}:${y}`
  const toPoint = (x: number, y: number): Point => ({ x: Math.min(WORKSPACE.width - WORKSPACE.padding, x * cell + cell / 2), y: Math.min(WORKSPACE.height - WORKSPACE.padding, y * cell + cell / 2) })
  const toCell = (p: Point) => ({ x: Math.max(1, Math.min(cols - 2, Math.round((p.x - cell / 2) / cell))), y: Math.max(1, Math.min(rows - 2, Math.round((p.y - cell / 2) / cell))) })
  const source = toCell(start), target = toCell(goal), open = [{ ...source, g: 0, f: distance(start, goal) }], parents = new Map<string, string>(), cost = new Map([[key(source.x, source.y), 0]]), seen: TreeNode[] = []
  while (open.length) { open.sort((a, b) => a.f - b.f); const current = open.shift()!, currentPoint = toPoint(current.x, current.y); seen.push({ ...currentPoint, parent: -1, cost: current.g })
    if (current.x === target.x && current.y === target.y) { const route = [goal]; let here = key(current.x, current.y); while (parents.has(here)) { const [x, y] = here.split(':').map(Number); route.push(toPoint(x, y)); here = parents.get(here)! } route.push(start); return makeResult('success', seen, shortcutPath(route.reverse(), obstacles), obstacles, [], seen.length) }
    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]) { const x = current.x + dx, y = current.y + dy, next = toPoint(x, y); if (x < 1 || x >= cols - 1 || y < 1 || y >= rows - 1 || !pointIsFree(next, obstacles) || !lineIsFree(currentPoint, next, obstacles)) continue; const nextKey = key(x, y), g = current.g + distance(currentPoint, next); if (g < (cost.get(nextKey) ?? Infinity)) { parents.set(nextKey, key(current.x, current.y)); cost.set(nextKey, g); open.push({ x, y, g, f: g + distance(next, goal) }) } }
  }
  return makeResult('no-route', seen, [], obstacles)
}
export const planWithMode = (mode: PlannerMode, options: PlanOptions) => mode === 'rrt-star' ? planRrtStar(options) : mode === 'a-star' ? planAStar(options) : planRrt(options)
export function shortcutPath(path: Point[], obstacles: Obstacle[]) { if (path.length < 3) return path; const out = [path[0]]; for (let current = 0; current < path.length - 1;) { let next = path.length - 1; while (next > current + 1 && !lineIsFree(path[current], path[next], obstacles)) next -= 1; out.push(path[next]); current = next } return out }
/**
 * Tangent-matched quadratic Bézier fillets. Each meaningful corner starts at
 * the incoming tangent and leaves on the outgoing tangent. The nominal radius
 * is attempted first, then reduced only when obstacle clearance requires it.
 */
export function smoothPath(path: Point[], obstacles: Obstacle[], turnRadius = DEFAULT_TURN_RADIUS): Point[] {
  const base = shortcutPath(path, obstacles)
  if (base.length < 3) return base
  const out: Point[] = [base[0]]
  for (let i = 1; i < base.length - 1; i += 1) {
    const previous = base[i - 1], corner = base[i], next = base[i + 1]
    const previousLength = distance(previous, corner), nextLength = distance(corner, next)
    const incoming = { x: (corner.x - previous.x) / previousLength, y: (corner.y - previous.y) / previousLength }
    const outgoing = { x: (next.x - corner.x) / nextLength, y: (next.y - corner.y) / nextLength }
    const headingChange = Math.acos(Math.max(-1, Math.min(1, incoming.x * outgoing.x + incoming.y * outgoing.y)))
    if (!Number.isFinite(headingChange) || headingChange < .08) { out.push(corner); continue }
    let rounded: Point[] | undefined
    const preferredRadius = i === base.length - 2 ? Math.max(turnRadius, TERMINAL_PREFERRED_RADIUS) : turnRadius
    // The final corner uses a wider terminal preference before the same safety reductions.
    for (const scale of [1, .8, .6, .4, .25, .15]) {
      const trim = Math.min(preferredRadius * scale, previousLength * .42, nextLength * .42)
      if (trim < 1) continue
      const entry = { x: corner.x - incoming.x * trim, y: corner.y - incoming.y * trim }
      const exit = { x: corner.x + outgoing.x * trim, y: corner.y + outgoing.y * trim }
      // Control at the original vertex gives endpoint tangents aligned with the two straight runs.
      const curve = Array.from({ length: 12 }, (_, index) => {
        const t = (index + 1) / 12, inverse = 1 - t
        return { x: inverse * inverse * entry.x + 2 * inverse * t * corner.x + t * t * exit.x, y: inverse * inverse * entry.y + 2 * inverse * t * corner.y + t * t * exit.y }
      })
      const candidate = [out.at(-1)!, entry, ...curve]
      if (candidate.slice(1).every((point, index) => lineIsFree(candidate[index], point, obstacles))) { rounded = [entry, ...curve]; break }
    }
    // Raw corner is the last-resort safety behaviour when no tangent fillet has clearance.
    out.push(...(rounded ?? [corner]))
  }
  out.push(base.at(-1)!)
  return out
}
