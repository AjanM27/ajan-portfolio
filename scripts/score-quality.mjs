import { readFileSync } from 'node:fs'

const [scorecardPath = 'quality/scorecard.json', assessmentPath] = process.argv.slice(2)

if (!assessmentPath) {
  throw new Error('Usage: node scripts/score-quality.mjs quality/scorecard.json <assessment.json>')
}

const scorecard = JSON.parse(readFileSync(scorecardPath, 'utf8'))
const assessment = JSON.parse(readFileSync(assessmentPath, 'utf8'))

const assertScore = (name, value) => {
  if (!Number.isFinite(value) || value < 0 || value > 100) throw new Error(`${name} must be between 0 and 100`)
  return value
}

const scoreChecks = (name, expected, actual, weight) => {
  const expectedIds = new Set(expected)
  const suppliedIds = Object.keys(actual ?? {})
  const unknown = suppliedIds.filter((id) => !expectedIds.has(id))
  const missing = expected.filter((id) => !(id in (actual ?? {})))
  if (unknown.length || missing.length) throw new Error(`${name} check mismatch. Missing: ${missing.join(', ') || 'none'}; unknown: ${unknown.join(', ') || 'none'}`)
  const passed = expected.filter((id) => actual[id] === true).length
  return { score: (passed / expected.length) * weight, passed, total: expected.length }
}

const lighthouseMetrics = scorecard.dimensions.lighthouse.metrics
const lighthouseScores = Object.entries(lighthouseMetrics).map(([name, weight]) => ({
  name,
  weight,
  value: assertScore(`lighthouse.${name}`, assessment.lighthouse?.[name]),
}))
const lighthouse = lighthouseScores.reduce((sum, metric) => sum + metric.value / 100 * metric.weight, 0)
const visualVerdict = assertScore('visualVerdict', assessment.visualVerdict) / 100 * scorecard.dimensions.visualVerdict.weight
const recruiterScan = scoreChecks('recruiterScan', scorecard.dimensions.recruiterScan.checks, assessment.recruiterScan, scorecard.dimensions.recruiterScan.weight)
const responsiveInteraction = scoreChecks('responsiveInteraction', scorecard.dimensions.responsiveInteraction.checks, assessment.responsiveInteraction, scorecard.dimensions.responsiveInteraction.weight)
const engineeringReliability = scoreChecks('engineeringReliability', scorecard.dimensions.engineeringReliability.checks, assessment.engineeringReliability, scorecard.dimensions.engineeringReliability.weight)

const total = lighthouse + visualVerdict + recruiterScan.score + responsiveInteraction.score + engineeringReliability.score
const result = {
  scorecardVersion: scorecard.version,
  total: Number(total.toFixed(2)),
  passThreshold: scorecard.passThreshold,
  passes: total > scorecard.passThreshold,
  breakdown: {
    lighthouse: Number(lighthouse.toFixed(2)),
    visualVerdict: Number(visualVerdict.toFixed(2)),
    recruiterScan: Number(recruiterScan.score.toFixed(2)),
    responsiveInteraction: Number(responsiveInteraction.score.toFixed(2)),
    engineeringReliability: Number(engineeringReliability.score.toFixed(2)),
  },
  checks: {
    recruiterScan: `${recruiterScan.passed}/${recruiterScan.total}`,
    responsiveInteraction: `${responsiveInteraction.passed}/${responsiveInteraction.total}`,
    engineeringReliability: `${engineeringReliability.passed}/${engineeringReliability.total}`,
  },
}

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
