import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Bot, BriefcaseBusiness, ChevronRight, Command, Cpu, GraduationCap, Layers3, Mail, Map, Menu, RotateCcw, Search, Sparkles, UserRound, X } from 'lucide-react'
import { experience, profile, projects } from './data/profile'
import { nowEntries, recentEntries } from './data/lab'
import { allSkills } from './data/skills'
import { assignUnifiedOrbits } from './lib/constellation'
import iitMadrasLogo from './assets/organizations/iit-madras-emblem.png'
import { DEFAULT_OBSTACLES, planWithMode, smoothPath, visibleTreeEdges, type PlanResult, type PlannerMode, type Point } from './lib/rrtPlanner'
import './App.css'

type View = 'home' | 'projects' | 'experience' | 'skills' | 'lab' | 'about' | 'contact'
const views: { id: View; label: string; hint: string }[] = [
  { id: 'home', label: 'Home', hint: 'Recruiter overview' },
  { id: 'projects', label: 'Projects', hint: 'Build archive' },
  { id: 'experience', label: 'Experience', hint: 'Timeline' },
  { id: 'skills', label: 'Skills', hint: 'Technical map' },
  { id: 'lab', label: 'Lab', hint: 'Local planner' },
  { id: 'about', label: 'About', hint: 'Background' },
  { id: 'contact', label: 'Contact', hint: 'Reach out' },
]

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="external" href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={15} aria-hidden="true" /></a>
}

function Planner() {
  const start = { x: 34, y: 172 }
  const svgRef = useRef<SVGSVGElement>(null)
  const pointerStartRef = useRef<{ x: number; y: number; pointerId: number } | null>(null)
  const [goal, setGoal] = useState<Point | null>(null)
  const [result, setResult] = useState<PlanResult | null>(null)
  const [visibleNodes, setVisibleNodes] = useState(0)
  const [showSmoothed, setShowSmoothed] = useState(false)
  const [mode, setMode] = useState<PlannerMode>('rrt')
  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => { const query = window.matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReducedMotion(query.matches); update(); query.addEventListener('change', update); return () => query.removeEventListener('change', update) }, [])
  useEffect(() => { if (!result || result.status !== 'success' || visibleNodes >= result.nodes.length || reducedMotion) return; const batch = mode === 'a-star' ? 10 : 4; const timer = window.setTimeout(() => setVisibleNodes((count) => Math.min(count + batch, result.nodes.length)), 58); return () => window.clearTimeout(timer) }, [result, visibleNodes, reducedMotion, mode])
  const solve = (nextGoal: Point, nextMode = mode) => { const nextResult = planWithMode(nextMode, { start, goal: nextGoal, obstacles: DEFAULT_OBSTACLES, seed: Math.round(nextGoal.x * 31 + nextGoal.y * 17), maxNodes: 420 }); setGoal(nextGoal); setResult(nextResult); setVisibleNodes(reducedMotion ? nextResult.nodes.length : 1); setShowSmoothed(false) }
  const chooseGoal = (event: React.PointerEvent<SVGSVGElement>) => {
    const started = pointerStartRef.current
    pointerStartRef.current = null
    // A deliberate click/tap selects a goal; a drag or scroll-release does not.
    if (!started || started.pointerId !== event.pointerId || Math.hypot(event.clientX - started.x, event.clientY - started.y) > 8) return
    const svg = event.currentTarget; const pt = svg.createSVGPoint(); pt.x = event.clientX; pt.y = event.clientY; const ctm = svg.getScreenCTM(); if (!ctm) return; const mapped = pt.matrixTransform(ctm.inverse()); solve({ x: Math.max(0, Math.min(405, mapped.x)), y: Math.max(0, Math.min(215, mapped.y)) })
  }
  const resetPlanner = () => { setGoal(null); setResult(null); setVisibleNodes(0); setShowSmoothed(false) }
  const selectMode = (nextMode: PlannerMode) => { setMode(nextMode); if (goal) solve(goal, nextMode) }
  const path = result?.status === 'success' ? (showSmoothed ? smoothPath(result.path, DEFAULT_OBSTACLES) : result.path) : []
  const currentEdges = result ? visibleTreeEdges(result.nodes, visibleNodes) : []
  const planning = Boolean(result?.status === 'success' && visibleNodes < result.nodes.length)
  const modeLabel = mode === 'rrt-star' ? 'RRT*' : mode === 'a-star' ? 'A*' : 'RRT'
  const plannerStage = mode === 'rrt-star' && result?.status === 'success' && visibleNodes < result.nodes.length ? (visibleNodes < result.firstSolutionNodeCount ? 'SEARCHING' : 'OPTIMIZING') : 'FINAL'
  const costReadout = mode === 'rrt-star' && result?.goalCosts.length ? ` · Cost ${result.goalCosts.slice(-3).map((cost) => Math.round(cost)).join(' → ')}` : ''
  const status = !goal ? 'Select a free-space goal to begin.' : result?.status === 'invalid-goal' ? 'Goal is blocked — choose open space.' : result?.status === 'no-route' ? 'No route found -- try another goal' : planning ? `${plannerStage.toLowerCase()} · ${visibleNodes}/${result?.nodes.length ?? 0} nodes${costReadout}` : showSmoothed ? `Smoothed ${modeLabel} route · ${path.length} waypoints` : `${mode === 'rrt-star' ? 'FINAL · ' : ''}${modeLabel} route · ${path.length} waypoints${costReadout}`
  return <section className="planner-panel" aria-labelledby="planner-title"><div className="panel-head"><div><p className="eyebrow">INTERACTIVE / LOCAL PLANNING</p><h2 id="planner-title">Choose a goal. Compare a route.</h2><p>RRT explores, RRT* improves local parent choices, A* provides a deterministic grid comparison, and smoothing stays explicitly in your control.</p></div><span className={`signal ${planning ? '' : 'quiet'}`}><span />{planning ? 'planning' : 'ready'}</span></div><div className="planner-canvas"><svg ref={svgRef} viewBox="0 0 405 215" role="application" aria-label="Interactive planning map. Click free space to choose a goal." preserveAspectRatio="xMidYMid meet" onPointerDown={(event) => { pointerStartRef.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId } }} onPointerCancel={() => { pointerStartRef.current = null }} onPointerUp={chooseGoal}><defs><pattern id="grid" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M 22 0 L 0 0 0 22" fill="none" stroke="currentColor" strokeOpacity=".13" strokeWidth=".7" /></pattern></defs><rect width="405" height="215" rx="14" className="planner-grid"/><rect width="405" height="215" rx="14" fill="url(#grid)" className="planner-grid-lines"/><g className="rrt-tree">{mode !== 'a-star' && currentEdges.map(({ parent, child }) => { const from = result!.nodes[parent], to = result!.nodes[child]; return <line key={`${parent}-${child}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} /> })}</g>{mode === 'a-star' && <g className="astar-frontier">{result?.nodes.slice(0, visibleNodes).map((node, index) => <rect key={`${node.x}-${node.y}-${index}`} x={node.x - 4} y={node.y - 4} width="8" height="8" rx="1" />)}</g>}{!planning && path.length > 0 && <><polyline points={path.map((p) => `${p.x},${p.y}`).join(' ')} className={`rrt-path ${showSmoothed ? 'smoothed' : ''}`} /><circle className="planner-agent" r="4.2"><animateMotion dur="6.8s" repeatCount="indefinite" path={`M ${path.map((p) => `${p.x} ${p.y}`).join(' L ')}`} /></circle></>}<g className="obstacles">{DEFAULT_OBSTACLES.map((o) => <rect key={o.x} x={o.x} y={o.y} width={o.width} height={o.height} rx={o.radius}/>)}</g><circle cx={start.x} cy={start.y} r="12" className="start"/><text x={start.x} y="151" textAnchor="middle">S</text>{goal && <><circle cx={goal.x} cy={goal.y} r="12" className="goal"/><text x={goal.x} y={goal.y + 4} textAnchor="middle">G</text></>}{!goal && <text x="202" y="111" textAnchor="middle" className="planner-prompt">CLICK ANY FREE SPACE</text>}</svg><div className="planner-legend"><span><i className="legend-start" />start</span><span><i className="legend-tree" />exploration</span><span><i className="legend-route" />route</span><span><i className="legend-goal" />goal</span></div></div><div className="planner-status" aria-live="polite"><Sparkles size={15}/>{status}</div>{result?.status === 'success' && !planning && <div className="planner-metrics"><span>{modeLabel} MODE</span><span>Nodes: {result.nodes.length}</span><span>Raw: {result.rawLength.toFixed(0)} px</span><span>Smoothed: {result.smoothedLength.toFixed(0)} px</span></div>}<div className="planner-controls"><div className="route-options" aria-label="Planning mode">{(['rrt','rrt-star','a-star'] as PlannerMode[]).map((item) => <button key={item} className={`planner-control mode-control ${mode === item ? 'active' : ''}`} aria-pressed={mode === item} onClick={() => selectMode(item)}>{item === 'rrt-star' ? 'RRT*' : item === 'a-star' ? 'A*' : 'RRT'}</button>)}</div><button className="planner-control action-control" onClick={() => solve({ x: 370, y: 46 })}><Map size={16}/> New Goal</button><button className={`planner-control action-control ${showSmoothed ? 'active' : ''}`} disabled={result?.status !== 'success'} onClick={() => setShowSmoothed(!showSmoothed)}>Smooth Path</button><button className="planner-control action-control" onClick={resetPlanner}><RotateCcw size={16}/> Reset</button></div></section>
}

// CUDA deliberately has no external icon: Devicon's CUDA asset is not reliable here,
// so the clear text label is the designed fallback rather than a broken image.
const iconFor = (name: string) => ({ Python: '/tech-logos/python.svg', 'C++': '/tech-logos/cpp.svg', ROS: '/tech-logos/ros2.svg', 'ROS 2': '/tech-logos/ros2.svg', Docker: '/tech-logos/docker.svg', Git: '/tech-logos/github.svg', GitHub: '/tech-logos/github.svg', 'Git / GitHub': '/tech-logos/github.svg', Linux: '/tech-logos/linux.svg', MATLAB: '/tech-logos/matlab.svg', Arduino: '/tech-logos/arduino.svg', PyTorch: '/tech-logos/pytorch.svg', OpenCV: '/tech-logos/opencv.svg' }[name])
const organizationLogoFor = (name: string) => name.includes('IIT Madras') ? iitMadrasLogo : undefined
function OrbitConstellation({ activeSkill, onSelect }: { activeSkill: string; onSelect: (name: string) => void }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef(new globalThis.Map<string, HTMLButtonElement>())
  const nodes = assignUnifiedOrbits(allSkills.map((skill) => ({ ...skill, clusterId: skill.cluster.id })), 4)

  useEffect(() => {
    const positionNodes = (now: number) => {
      const host = hostRef.current
      if (!host || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const width = host.clientWidth
      // At narrow phone widths the companion detail panel is prioritised over
      // moving labels; tablet and desktop retain the live orbital map.
      if (width < 820) return
      const scale = Math.min(1, Math.max(.62, width / 1120))
      const radii = [[126, 54], [222, 94], [340, 140], [490, 205]].map(([rx, ry]) => ({ rx: rx * scale, ry: ry * scale }))
      nodes.forEach((skill) => {
        const element = nodeRefs.current.get(skill.name)
        const ring = radii[skill.orbit]
        if (!element || !ring) return
        // Shared cadence keeps the designed inter-orbit spacing stable—no surprise label crossings.
        const direction = 1
        const phaseOffset = skill.name === 'DDQN / TD3 / PPO' ? 150 : 0
        const theta = (skill.angle + phaseOffset + direction * now / 180) * Math.PI / 180
        const nudgeX = skill.name === 'Fusion 360' ? 44 : 0
        // Keep long labels in separate visual lanes without perturbing the shared orbit geometry.
        const nudgeY = 0
        element.style.transform = `translate(-50%, -50%) translate(${Math.cos(theta) * ring.rx + nudgeX}px, ${Math.sin(theta) * ring.ry + nudgeY}px)`
      })
    }
    positionNodes(performance.now())
    const interval = window.setInterval(() => positionNodes(performance.now()), 40)
    return () => window.clearInterval(interval)
  }, [nodes])

  return <div ref={hostRef} className="orbit-constellation compact-constellation" aria-label="Animated unified technical skill constellation"><div className="orbit-core"><b>AJAN</b><span>ROBOTICS · AUTONOMY · AI</span></div><p className="orbit-system-label">CURATED TECHNICAL SYSTEM</p>{[0,1,2,3].map((orbit) => <span className={`orbit-ring orbit-ring-${orbit}`} key={orbit}/>)}{nodes.map((skill) => { const icon = iconFor(skill.name); return <button ref={(element) => { if (element) nodeRefs.current.set(skill.name, element); else nodeRefs.current.delete(skill.name) }} key={skill.name} className={`orbit-skill orbit-${skill.orbit} ${activeSkill === skill.name ? 'selected' : ''}`} onClick={() => onSelect(skill.name)} aria-pressed={activeSkill === skill.name}>{icon && <img src={icon} alt="" onError={(event) => { event.currentTarget.style.display = 'none' }} />}<span>{skill.name}</span></button> })}<p className="orbit-caption">{nodes.length} selected capabilities · one engineering system</p></div>
}

function App() {
  const [view, setView] = useState<View>('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [paletteQuery, setPaletteQuery] = useState('')
  const [activeProject, setActiveProject] = useState(projects[0].id)
  const [filter, setFilter] = useState<'All' | typeof projects[number]['category']>('All')
  const [activeSkill, setActiveSkill] = useState(allSkills[0].name)
  const go = (next: View) => { setView(next); setMenuOpen(false); setPaletteOpen(false); setPaletteQuery(''); window.history.replaceState(null, '', `#${next}`) }
  useEffect(() => {
    const syncViewFromHash = () => { const candidate = window.location.hash.slice(1) as View; if (views.some((item) => item.id === candidate)) setView(candidate) }
    syncViewFromHash()
    window.addEventListener('hashchange', syncViewFromHash)
    return () => window.removeEventListener('hashchange', syncViewFromHash)
  }, [])
  useEffect(() => { const handler = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setPaletteOpen(true); setPaletteQuery('') } if (event.key === 'Escape') { setPaletteOpen(false); setMenuOpen(false) } }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler) }, [])
  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter)
  const selected = projects.find((project) => project.id === activeProject) ?? projects[0]
  const selectedSkill = allSkills.find((skill) => skill.name === activeSkill) ?? allSkills[0]
  const relatedProjects = projects.filter((project) => selectedSkill.projectIds.includes(project.id))
  const matchedViews = views.filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(paletteQuery.toLowerCase()))
  const nav = <nav aria-label="Primary navigation">{views.map((item) => <button key={item.id} className={view === item.id ? 'selected' : ''} onClick={() => go(item.id)}>{item.label}</button>)}</nav>
  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#home" onClick={(event) => { event.preventDefault(); go('home') }}><span className="brand-mark"><Bot size={18}/></span><span>AJAN<span className="muted">.LAB</span></span></a><div className="desktop-nav">{nav}</div><div className="top-actions"><button className="palette-trigger" onClick={() => { setPaletteQuery(''); setPaletteOpen(true) }} aria-label="Explore portfolio"><Search size={16} aria-hidden="true"/><span>Explore</span><kbd>⌘K</kbd></button><button className="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div></header>
    {menuOpen && <div className="mobile-nav">{nav}</div>}
    <main className="view-wrap" key={view}>
      {view === 'home' && <><section className="hero"><div className="hero-copy"><p className="eyebrow">ROBOTICS / AUTONOMY / EMBEDDED</p><h1>Engineering systems that <em>move with intent.</em></h1><p className="hero-text">{profile.tagline} I’m a Mechanical Engineering graduate from IIT Madras, focused on making technical ideas legible, interactive, and useful.</p><div className="hero-actions"><button className="primary" onClick={() => go('projects')}>Explore selected work <ChevronRight size={18}/></button><button className="secondary" onClick={() => go('contact')}>Get in touch</button></div><div className="proof-strip"><span><Cpu size={16}/> Robotics & autonomy</span><span><GraduationCap size={16}/> IIT Madras</span><span><BriefcaseBusiness size={16}/> DLTX — upcoming</span></div></div></section><section className="quick-grid"><article><Layers3/><h2>Selected builds</h2><p>Path planning, multi-robot coordination, swarm workflows, and embedded prototypes.</p><button onClick={() => go('projects')}>Open archive <ChevronRight size={16}/></button></article><article><Map/><h2>Live technical playground</h2><p>A compact, responsive local-planner simulation that responds to route choices.</p><button onClick={() => go('lab')}>Enter lab <ChevronRight size={16}/></button></article><article><BriefcaseBusiness/><h2>Next chapter</h2><p>Upcoming Systems Engineer at Dai-ichi Life Techno Cross (DLTX), Japan.</p><button onClick={() => go('experience')}>View timeline <ChevronRight size={16}/></button></article></section></>}
      {view === 'projects' && <section className="page"><div className="page-intro"><p className="eyebrow">BUILD ARCHIVE</p><h1>Projects with a clear technical story.</h1><p>Start with the summary. Open a project to inspect the challenge, implementation, and tools behind the work.</p></div><div className="filters" aria-label="Filter projects">{(['All', 'Robotics', 'Autonomy', 'AI', 'Embedded'] as const).map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="project-layout"><div className="project-list">{visibleProjects.map((project) => <button className={`project-card ${activeProject === project.id ? 'active' : ''}`} key={project.id} onClick={() => setActiveProject(project.id)}><span>{project.status}</span><h2>{project.title}</h2><p>{project.summary}</p><div>{project.tags.slice(0, 3).map((tag) => <i key={tag}>{tag}</i>)}</div></button>)}</div><article className="project-detail"><p className="eyebrow">SELECTED / {selected.category}</p><h2>{selected.title}</h2><p className="lead">{selected.summary}</p><dl className="case-study-details"><div><dt>Technical challenge</dt><dd>{selected.challenge}</dd></div><div><dt>My contribution</dt><dd>{selected.contribution}</dd></div></dl><div className="tag-row">{selected.tags.map((tag) => { const linkedSkill = allSkills.find((skill) => skill.name === tag); return linkedSkill ? <button className="skill-link" key={tag} onClick={() => { setActiveSkill(linkedSkill.name); go('skills') }}>{tag}</button> : <span key={tag}>{tag}</span> })}</div><External href={selected.source}>View Project</External></article></div></section>}
      {view === 'experience' && <section className="page experience-page"><div className="page-intro"><p className="eyebrow">TIMELINE</p><h1>Building across robotics, autonomy, and systems engineering.</h1><p>Selected engineering experience, competitions, and technical work.</p></div><div className="experience-timeline">{experience.map((item) => <article key={item.company} className="experience-entry timeline-entry"><div className="timeline-rail" aria-hidden="true"><span className="timeline-index">{item.date}</span><span className="timeline-dot"/></div><div className="timeline-card">{organizationLogoFor(item.company) ? <img className="organization-logo" src={organizationLogoFor(item.company)} alt="IIT Madras" /> : <div className="organization-wordmark" aria-label={`${item.company} wordmark`}>DLTX</div>}<div className="timeline-copy"><p className="eyebrow">{item.status}</p><h2>{item.role}</h2><h3>{item.company}</h3><p className="location">{item.location}</p><p>{item.detail}</p>{item.source && <External href={item.source}>{item.linkLabel}</External>}</div></div></article>)}</div></section>}
      {view === 'skills' && <section className="page"><div className="page-intro"><p className="eyebrow">TECHNICAL MAP</p><h1>A stable constellation of applied work.</h1><p>Choose a technology to highlight its domain and the projects that visibly use it. This is a curated engineering knowledge graph—not a proficiency ranking.</p></div><OrbitConstellation activeSkill={activeSkill} onSelect={setActiveSkill}/><article className="constellation-readout constellation-readout-aligned" style={{ borderLeftColor: selectedSkill.cluster.color }} aria-live="polite"><p className="eyebrow">SELECTED TECHNOLOGY · {selectedSkill.cluster.name}</p><h2>{selectedSkill.name}</h2><p>{selectedSkill.description}</p><div className="related-projects"><b>Used in</b>{relatedProjects.length ? relatedProjects.map((project) => <button key={project.id} onClick={() => { setActiveProject(project.id); go('projects') }}>{project.title}<ChevronRight size={14}/></button>) : <span>No specific project link is claimed in this portfolio.</span>}</div></article></section>}
      {view === 'lab' && <section className="page lab-page"><div className="page-intro"><p className="eyebrow">SYSTEMS PLAYGROUND / NOW</p><h1>A living engineering notebook.</h1><p>The planner is a lightweight educational demonstration, and Lab is deliberately content-driven: add an entry in <code>src/data/lab.ts</code>; the timeline sorts it newest-first.</p></div><section className="lab-section"><p className="eyebrow">NOW</p><div className="now-grid">{nowEntries.map((item) => <article className="now-card" key={`${item.date}-${item.title}`}><p className="eyebrow">● {item.type}</p><h2>{item.title}</h2><p>{item.summary}</p><small>{item.technologies.join(' · ')}</small></article>)}</div></section><Planner/><section className="recent-log"><p className="eyebrow">RECENT LOG</p>{recentEntries.map((item) => <article key={`${item.date}-${item.title}`}><time dateTime={item.date}>{new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${item.date}T00:00:00`))}</time><div><span>{item.type}</span><h2>{item.title}</h2><p>{item.summary}</p></div></article>)}</section></section>}
      {view === 'about' && <section className="page about-grid"><div className="page-intro"><p className="eyebrow">BACKGROUND</p><h1>Mechanical engineering, drawn toward autonomous systems.</h1><p>{profile.name} is a {profile.role} building at the intersection of robotics, planning, learning, and embedded hardware.</p></div><aside className="education-card organizationIdentity"><img className="education-logo" src={iitMadrasLogo} alt="Indian Institute of Technology Madras"/><div><p className="eyebrow">EDUCATION</p><h2>{profile.education.institution}</h2><p>{profile.education.degree}</p><span>{profile.education.status}</span></div></aside></section>}
      {view === 'contact' && <section className="page contact-page"><p className="eyebrow">CONTACT CHANNELS</p><h1>Let’s build something that moves.</h1><p>Choose the channel that works best. A résumé download will appear here only when an official file is available.</p><p className="contact-email"><Mail aria-hidden="true"/><a href={`mailto:${profile.links.email}`}>{profile.links.email}</a></p><div className="contact-grid"><a className="external" href={`mailto:${profile.links.email}`}><Mail aria-hidden="true"/><span>Email Me</span><ArrowUpRight size={15} aria-hidden="true"/></a><External href={profile.links.linkedin}><UserRound/> LinkedIn</External><External href={profile.links.github}><Command/> GitHub</External></div></section>}
    </main>
    {paletteOpen && <div className="palette-backdrop" onMouseDown={() => setPaletteOpen(false)}><section className="palette" aria-modal="true" role="dialog" aria-label="Command palette" onMouseDown={(event) => event.stopPropagation()}><div><Command size={18}/><input autoFocus value={paletteQuery} onChange={(event) => setPaletteQuery(event.target.value)} placeholder="Jump to a view…" aria-label="Search views"/><kbd>ESC</kbd></div><ul>{matchedViews.length ? matchedViews.map((item) => <li key={item.id}><button onClick={() => go(item.id)}><span>{item.label}<small>{item.hint}</small></span><ChevronRight size={16}/></button></li>) : <li className="empty">No matching views</li>}</ul></section></div>}
    <footer><span>© {new Date().getFullYear()} Ajan Muthuraj</span><span>Built as an interactive engineering portfolio</span></footer>
  </div>
}
export default App
