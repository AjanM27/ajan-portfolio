import { useEffect, useMemo, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react'
import { ArrowDown, ArrowUpRight, Bot, CircleDot, Code2, Cpu, Mail, Menu, Radar, UserRound, X } from 'lucide-react'
import { milestones, profile, projects, systemNodes, type Project } from './data/portfolio'
import './App.css'

type GithubRepo = { id: number; name: string; html_url: string; description: string | null; language: string | null; pushed_at: string; fork: boolean }

const projectTabs = [
  { id: 'featured', label: 'Flagship', projectIds: ['isaac-drone', 'reach-avoid', 'multi-robot-slam', 'humanoid'] },
  { id: 'autonomy', label: 'Autonomy', projectIds: ['isaac-drone', 'reach-avoid', 'adaptive-rrt'] },
  { id: 'multi', label: 'Multi-robot', projectIds: ['multi-robot-slam', 'swarm-rl', 'isaac-drone'] },
  { id: 'embodied', label: 'Embodied', projectIds: ['humanoid', 'isaac-drone'] },
] as const

const fallbackRepos: GithubRepo[] = [
  { id: 1, name: 'ddqn-reach-avoid-rl', html_url: 'https://github.com/AjanM27/ddqn-reach-avoid-rl', description: 'DDQN for reach–avoid reinforcement learning with time-varying safe and target zones.', language: 'Python', pushed_at: '2026-10-20T11:37:17Z', fork: false },
  { id: 2, name: 'isaac-sim-drone-autonomy', html_url: 'https://github.com/AjanM27/isaac-sim-drone-autonomy', description: 'Reproducible Isaac Sim, ArduPilot and ROS 2 drone autonomy stack.', language: 'Python', pushed_at: '2026-10-09T14:46:50Z', fork: false },
  { id: 3, name: 'Multi-Robot-SLAM-Navigation', html_url: 'https://github.com/AjanM27/Multi-Robot-SLAM-Navigation', description: 'Collaborative multi-robot SLAM and navigation course project.', language: 'MATLAB', pushed_at: '2026-06-06T04:16:24Z', fork: true },
]

function useGithubRepos() {
  const [repos, setRepos] = useState<GithubRepo[]>(fallbackRepos)
  const [live, setLive] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    fetch('https://api.github.com/users/AjanM27/repos?sort=pushed&direction=desc&per_page=30&type=owner', { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
      .then((response) => { if (!response.ok) throw new Error('GitHub feed unavailable'); return response.json() as Promise<GithubRepo[]> })
      .then((items) => {
        const visible = items
          .filter((repo) => repo.description && !['AjanM27', 'ajan-portfolio', 'Inter_IIT'].includes(repo.name))
          .slice(0, 4)
        if (visible.length) { setRepos(visible); setLive(true) }
      })
      .catch(() => setLive(false))
    return () => controller.abort()
  }, [])
  return { repos, live }
}

function timeAgo(value: string) {
  const days = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 86_400_000))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  return months === 1 ? '1 month ago' : `${months} months ago`
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === 'drone') return <div className="drone-visual" aria-label="Diagram of an autonomous drone system"><span className="scan-line" /><div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="drone-body"><span /><span /><span /><span /><Bot size={34} /></div><p className="telemetry telemetry-a">SLAM / ONLINE</p><p className="telemetry telemetry-b">ALT 1.52 M</p><p className="telemetry telemetry-c">PATH / CLEAR</p></div>
  if (project.visual === 'humanoid') return <div className="humanoid-visual" aria-label="Abstract humanoid perception and planning diagram"><div className="human-head"><span /></div><div className="human-body" /><div className="vision-cone" /><span className="joint joint-a" /><span className="joint joint-b" /><span className="joint joint-c" /><p>PERCEIVE → NAVIGATE → MANIPULATE</p></div>
  return <div className="image-visual"><img src={project.image} alt={`${project.title} project visualization`} loading="lazy" /><span className="image-grid" /></div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [projectTab, setProjectTab] = useState<(typeof projectTabs)[number]['id']>('featured')
  const [activeProjectId, setActiveProjectId] = useState<string>('isaac-drone')
  const [activeNode, setActiveNode] = useState(systemNodes[0].id)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const { repos, live } = useGithubRepos()
  const selectedTab = projectTabs.find((tab) => tab.id === projectTab) ?? projectTabs[0]
  const tabProjects = useMemo(() => selectedTab.projectIds.map((id) => projects.find((project) => project.id === id)).filter(Boolean) as Project[], [selectedTab])
  const activeProject = tabProjects.find((project) => project.id === activeProjectId) ?? tabProjects[0]
  const selectedNode = systemNodes.find((node) => node.id === activeNode) ?? systemNodes[0]

  useEffect(() => { if (!selectedTab.projectIds.some((id) => id === activeProjectId)) setActiveProjectId(selectedTab.projectIds[0]) }, [activeProjectId, selectedTab])
  useEffect(() => {
    const update = () => { const height = document.documentElement.scrollHeight - window.innerHeight; setScrollProgress(height > 0 ? window.scrollY / height : 0) }
    update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update)
  }, [])
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item))
    const sectionObserver = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (current?.target.id) setActiveSection(current.target.id)
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0.05, 0.25, 0.6] })
    document.querySelectorAll('main > section[id]').forEach((section) => sectionObserver.observe(section))
    return () => { revealObserver.disconnect(); sectionObserver.disconnect() }
  }, [])

  const handleHeroMove = (event: ReactMouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', (((event.clientX - rect.left) / rect.width - 0.5) * 2).toFixed(2))
    event.currentTarget.style.setProperty('--my', (((event.clientY - rect.top) / rect.height - 0.5) * 2).toFixed(2))
  }
  const navigate = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setMenuOpen(false) }
  const navItems = [['work', 'Work'], ['systems', 'Systems'], ['now', 'Now'], ['story', 'Story']]

  return <div className="site-shell">
    <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${scrollProgress})` }} /></div>
    <header className="site-header">
      <button className="wordmark" onClick={() => navigate('home')} aria-label="Back to top"><span>AM</span><b>Ajan Muthuraj</b></button>
      <nav className={menuOpen ? 'nav-open' : ''} aria-label="Primary navigation">{navItems.map(([id, label]) => <button key={id} className={activeSection === id ? 'active' : ''} onClick={() => navigate(id)}>{label}</button>)}</nav>
      <a className="header-cta" href={`mailto:${profile.email}`}>Let’s talk <ArrowUpRight size={15} /></a>
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section id="home" className="hero-section" onMouseMove={handleHeroMove}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy reveal is-visible"><p className="kicker"><span /> Robotics & autonomous systems engineer</p><h1>I build robots that understand <em>where they are</em>—and what to do next.</h1><p className="hero-lede">From safety-aware learning and shared maps to flight control and manipulation, I engineer the complete loop between sensing and action.</p><div className="hero-actions"><button className="button primary-button" onClick={() => navigate('work')}>Explore selected work <ArrowDown size={17} /></button><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a></div></div>
        <div className="hero-machine reveal is-visible" aria-label="Interactive autonomy loop graphic"><div className="machine-orbit orbit-a" /><div className="machine-orbit orbit-b" /><div className="machine-core"><Radar size={42} /><b>AUTONOMY</b><small>closed loop</small></div>{systemNodes.slice(0, 4).map((node, index) => <span key={node.id} className={`orbit-label orbit-label-${index}`}>{node.label}</span>)}<span className="machine-coordinate coordinate-a">X 13.0827</span><span className="machine-coordinate coordinate-b">Y 80.2707</span></div>
        <button className="scroll-cue" onClick={() => navigate('proof')}><span>Scroll to inspect</span><ArrowDown size={16} /></button>
      </section>

      <section id="proof" className="proof-strip reveal" aria-label="Profile highlights"><div><strong>IIT Madras</strong><span>B.Tech · Mechanical Engineering</span></div><div><strong>ICRA 2026</strong><span>XPLORE Workshop poster</span></div><div><strong>ROS 2 → Hardware</strong><span>Simulation, autonomy & deployment</span></div><div><strong>{profile.location}</strong><span>Systems engineering next</span></div></section>

      <section id="work" className="work-section section-pad">
        <div className="section-heading reveal"><p className="section-index">01 / SELECTED WORK</p><h2>Engineering stories,<br /><em>not a project dump.</em></h2><p>Choose a domain, then inspect the problem, contribution and evidence behind each system.</p></div>
        <div className="project-tabs reveal" role="tablist" aria-label="Project categories">{projectTabs.map((tab) => <button key={tab.id} role="tab" aria-selected={projectTab === tab.id} className={projectTab === tab.id ? 'active' : ''} onClick={() => setProjectTab(tab.id)}>{tab.label}<span>{String(tab.projectIds.length).padStart(2, '0')}</span></button>)}</div>
        <div className="project-browser reveal">
          <div className="project-rail" role="tablist" aria-label={`${selectedTab.label} projects`}>{tabProjects.map((project) => <button key={project.id} role="tab" aria-selected={activeProject.id === project.id} className={activeProject.id === project.id ? 'active' : ''} onClick={() => setActiveProjectId(project.id)}><span>{project.index}</span><b>{project.shortTitle}</b><small>{project.domain}</small></button>)}</div>
          <article className="project-stage" key={activeProject.id} role="tabpanel"><div className="project-visual"><ProjectVisual project={activeProject} /></div><div className="project-copy"><p className="project-domain">{activeProject.domain}{activeProject.collaborative ? ' · team work' : ''}</p><h3>{activeProject.title}</h3><p className="project-summary">{activeProject.summary}</p><div className="case-grid"><div><span>My role</span><p>{activeProject.role}</p></div><div><span>Evidence</span><p>{activeProject.outcome}</p></div></div><div className="tag-list">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="button dark-button" href={activeProject.href} target="_blank" rel="noreferrer">Open case evidence <ArrowUpRight size={16} /></a></div></article>
        </div>
      </section>

      <section id="systems" className="systems-section section-pad"><div className="systems-sticky"><div className="section-heading light-heading reveal"><p className="section-index">02 / HOW I THINK</p><h2>One robot.<br /><em>The whole loop.</em></h2><p>I enjoy the boundaries between subsystems—the place where a clean algorithm has to survive real sensors, timing and motion.</p></div><div className="systems-console reveal"><div className="system-tabs" role="tablist" aria-label="Robotics system capabilities">{systemNodes.map((node, index) => <button key={node.id} role="tab" aria-selected={activeNode === node.id} className={activeNode === node.id ? 'active' : ''} onClick={() => setActiveNode(node.id)}><span>{String(index + 1).padStart(2, '0')}</span>{node.label}</button>)}</div><div className="system-readout" role="tabpanel" key={selectedNode.id}><div className="readout-icon"><Cpu size={38} /></div><p>CURRENT LAYER</p><h3>{selectedNode.label}</h3><strong>{selectedNode.detail}</strong><div>{selectedNode.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div><div className="signal-path" aria-hidden="true">{systemNodes.map((node, index) => <span key={node.id} className={node.id === activeNode ? 'active' : ''} style={{ '--delay': `${index * 0.12}s` } as CSSProperties}><i /></span>)}</div></div></div></section>

      <section id="now" className="now-section section-pad"><div className="section-heading reveal"><p className="section-index">03 / LIVE FROM GITHUB</p><h2>What I’m working on,<br /><em>without manual updates.</em></h2><p>This feed reads the latest public repositories pushed on GitHub. New public work appears here automatically; private work remains private.</p></div><div className="live-status reveal"><span className={live ? 'pulse live' : 'pulse'} />{live ? 'GitHub API connected' : 'Curated fallback · GitHub API unavailable'}<small>public activity only</small></div><div className="repo-grid">{repos.map((repo, index) => <a className="repo-card reveal" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id} style={{ '--delay': `${index * 80}ms` } as CSSProperties}><div><Code2 size={20} /><span>{repo.fork ? 'COLLABORATIVE / FORK' : 'PUBLIC REPOSITORY'}</span><ArrowUpRight size={17} /></div><h3>{repo.name.replaceAll('-', ' ')}</h3><p>{repo.description || 'Public robotics and engineering work on GitHub.'}</p><footer><span>{repo.language || 'Mixed'}</span><time dateTime={repo.pushed_at}>Pushed {timeAgo(repo.pushed_at)}</time></footer></a>)}</div><a className="all-work-link reveal" href={`${profile.github}?tab=repositories`} target="_blank" rel="noreferrer">Browse all repositories <ArrowUpRight /></a></section>

      <section id="story" className="story-section section-pad"><div className="section-heading reveal"><p className="section-index">04 / TRAJECTORY</p><h2>Built through research,<br /><em>teams and real systems.</em></h2></div><div className="timeline">{milestones.map((item, index) => <article className="timeline-item reveal" key={`${item.year}-${item.title}`}><div className="timeline-marker"><span>{String(index + 1).padStart(2, '0')}</span><i /></div><time>{item.year}</time><div><p>{item.tag}</p><h3>{item.title}</h3><span>{item.copy}</span></div></article>)}</div></section>

      <section id="contact" className="contact-section section-pad reveal"><p className="section-index">05 / CONTACT</p><div><h2>Have a difficult system<br />that needs to <em>move?</em></h2><p>I’m interested in robotics software, autonomy, multi-robot systems, motion planning and research-engineering work.</p></div><a className="contact-orb" href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}><Mail size={28} /><span>Start a conversation</span><ArrowUpRight /></a><div className="contact-links"><a href={profile.github} target="_blank" rel="noreferrer"><Code2 /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><UserRound /> LinkedIn</a><a href={`mailto:${profile.email}`}><Mail /> {profile.email}</a></div></section>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} {profile.name}</span><span><CircleDot size={13} /> Designed around the work, not a template.</span><button onClick={() => navigate('home')}>Back to top <ArrowUpRight size={14} /></button></footer>
  </div>
}

export default App
