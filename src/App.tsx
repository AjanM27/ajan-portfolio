import { useEffect, useMemo, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react'
import { ArrowDown, ArrowUpRight, Award, BriefcaseBusiness, CircuitBoard, CircleDot, Code2, Download, Gauge, GraduationCap, Mail, Menu, Route, ScanEye, UserRound, Wrench, X } from 'lucide-react'
import { engineeringLoop, milestones, profile, projects, type Project } from './data/portfolio'
import './App.css'

type GithubRepo = { id: number; name: string; html_url: string; description: string | null; language: string | null; pushed_at: string; fork: boolean }

const projectTabs = [
  { id: 'featured', label: 'Flagship', projectIds: ['isaac-drone', 'reach-avoid', 'multi-robot-slam', 'humanoid'] },
  { id: 'autonomy', label: 'Autonomy', projectIds: ['isaac-drone', 'reach-avoid', 'adaptive-rrt'] },
  { id: 'multi', label: 'Multi-robot', projectIds: ['multi-robot-slam', 'swarm-rl', 'isaac-drone'] },
  { id: 'embodied', label: 'Embodied', projectIds: ['humanoid', 'isaac-drone'] },
] as const

const systemLayers = [
  { id: 'mechanism', label: 'Mechanics', detail: 'Geometry · kinematics · fit', evidence: 'UR5 · humanoid', icon: Wrench },
  { id: 'electronics', label: 'Electronics', detail: 'Sensors · embedded I/O', evidence: 'Arduino · ESP32', icon: CircuitBoard },
  { id: 'perception', label: 'Perception', detail: 'Images · depth · maps', evidence: 'YOLO · SLAM', icon: ScanEye },
  { id: 'autonomy', label: 'Autonomy', detail: 'Learning · planning · safety', evidence: 'DDQN · RRT*', icon: Route },
  { id: 'control', label: 'Control', detail: 'Commands · motion · feedback', evidence: 'Nav2 · ArduPilot', icon: Gauge },
]

const fallbackRepos: GithubRepo[] = [
  { id: 1, name: 'ddqn-reach-avoid-rl', html_url: 'https://github.com/AjanM27/ddqn-reach-avoid-rl', description: 'DDQN for reach–avoid reinforcement learning with time-varying safe and target zones.', language: 'Python', pushed_at: '2026-10-20T11:37:17Z', fork: false },
  { id: 2, name: 'isaac-sim-drone-autonomy', html_url: 'https://github.com/AjanM27/isaac-sim-drone-autonomy', description: 'Reproducible Isaac Sim, ArduPilot and ROS 2 drone autonomy stack.', language: 'Python', pushed_at: '2026-10-09T14:46:50Z', fork: false },
  { id: 3, name: 'Multi-Robot-SLAM-Navigation', html_url: 'https://github.com/AjanM27/Multi-Robot-SLAM-Navigation', description: 'Collaborative multi-robot SLAM and navigation course project.', language: 'MATLAB', pushed_at: '2026-06-06T04:16:24Z', fork: true },
]

const publicUrl = (path: string) => path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path

function useGithubRepos() {
  const [repos, setRepos] = useState<GithubRepo[]>(fallbackRepos)
  const [live, setLive] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    fetch('https://api.github.com/users/AjanM27/repos?sort=pushed&direction=desc&per_page=30&type=owner', { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
      .then((response) => { if (!response.ok) throw new Error('GitHub feed unavailable'); return response.json() as Promise<GithubRepo[]> })
      .then((items) => {
        const visible = items.filter((repo) => repo.description && !['AjanM27', 'ajan-portfolio', 'Inter_IIT'].includes(repo.name)).slice(0, 4)
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

function ProjectMedia({ project }: { project: Project }) {
  return <figure className={`project-media fit-${project.imageFit ?? 'cover'}`}>
    <img src={publicUrl(project.image)} alt={`${project.title} visual`} loading="lazy" decoding="async" />
    <div className="media-grid" aria-hidden="true" />
    <figcaption>
      <span>{project.mediaLabel}</span>
      {project.mediaSource && <a href={project.mediaSource} target="_blank" rel="noreferrer">Image source <ArrowUpRight size={12} /></a>}
    </figcaption>
  </figure>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [projectTab, setProjectTab] = useState<(typeof projectTabs)[number]['id']>('featured')
  const [activeProjectId, setActiveProjectId] = useState('isaac-drone')
  const [activeMethod, setActiveMethod] = useState(engineeringLoop[0].id)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const { repos, live } = useGithubRepos()
  const selectedTab = projectTabs.find((tab) => tab.id === projectTab) ?? projectTabs[0]
  const tabProjects = useMemo(() => selectedTab.projectIds.map((id) => projects.find((project) => project.id === id)).filter(Boolean) as Project[], [selectedTab])
  const activeProject = tabProjects.find((project) => project.id === activeProjectId) ?? tabProjects[0]
  const selectedMethod = engineeringLoop.find((item) => item.id === activeMethod) ?? engineeringLoop[0]

  useEffect(() => {
    if (!selectedTab.projectIds.includes(activeProjectId as never)) setActiveProjectId(selectedTab.projectIds[0])
  }, [activeProjectId, selectedTab])

  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(height > 0 ? window.scrollY / height : 0)
      document.documentElement.style.setProperty('--page-scroll', `${window.scrollY}px`)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item))
    const sectionObserver = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (current?.target.id) setActiveSection(current.target.id)
    }, { rootMargin: '-24% 0px -64% 0px', threshold: [0.05, 0.25, 0.55] })
    document.querySelectorAll('main > section[id]').forEach((section) => sectionObserver.observe(section))
    return () => { revealObserver.disconnect(); sectionObserver.disconnect() }
  }, [])

  const handleHeroMove = (event: ReactMouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', (((event.clientX - rect.left) / rect.width - 0.5) * 2).toFixed(2))
    event.currentTarget.style.setProperty('--my', (((event.clientY - rect.top) / rect.height - 0.5) * 2).toFixed(2))
  }
  const navigate = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setMenuOpen(false) }
  const navItems = [['about', 'About'], ['work', 'Work'], ['method', 'Method'], ['now', 'Now'], ['story', 'Journey']]

  return <div className="site-shell">
    <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${scrollProgress})` }} /></div>
    <header className="site-header">
      <button className="wordmark" onClick={() => navigate('home')} aria-label="Back to top"><b>Ajan Muthuraj</b><small>Robotics systems</small></button>
      <nav className={menuOpen ? 'nav-open' : ''} aria-label="Primary navigation">
        {navItems.map(([id, label]) => <button key={id} className={activeSection === id ? 'active' : ''} onClick={() => navigate(id)}>{label}</button>)}
      </nav>
      <a className="header-cta" href={publicUrl(profile.resume)} download>Résumé <Download size={14} /></a>
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section id="home" className="hero-section" onMouseMove={handleHeroMove}>
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-copy reveal is-visible">
          <p className="kicker"><span /> Systems Engineer at DLTX · IIT Madras</p>
          <h1>Robotic systems<br />for environments<br /><em>that keep changing.</em></h1>
          <p className="hero-lede">My work connects mechanics, sensing, computer vision, planning and control—from time-varying reach–avoid learning to aerial and multi-robot autonomy.</p>
          <div className="hero-actions">
            <button className="button primary-button" onClick={() => navigate('work')}>See the systems <ArrowDown size={17} /></button>
            <a className="text-link" href={publicUrl(profile.resume)} download>Download résumé <Download size={15} /></a>
          </div>
        </div>
        <div className="hero-system-map reveal is-visible" aria-label="Five-layer robotics system cross-section">
          <div className="map-topline"><span>ENGINEERING RANGE</span><b>PROJECT EVIDENCE</b></div>
          <div className="map-axis"><span>PHYSICAL</span><i /><span>COMPUTATIONAL</span></div>
          <div className="system-stack">
            {systemLayers.map((layer, index) => {
              const Icon = layer.icon
              return <div className="system-layer" key={layer.id} style={{ '--layer': index } as CSSProperties}>
                <span>{String(index + 1).padStart(2, '0')}</span><div className="layer-icon"><Icon size={19} /></div><div><b>{layer.label}</b><small>{layer.detail}</small></div><em>{layer.evidence}</em>
              </div>
            })}
          </div>
          <div className="map-footer"><span>ONE SYSTEM, FIVE DISCIPLINES</span><p>Examples are drawn from the projects below.</p></div>
        </div>
        <button className="scroll-cue" onClick={() => navigate('about')}><span>Continue</span><ArrowDown size={16} /></button>
      </section>

      <section id="about" className="about-section section-pad">
        <div className="about-photo reveal">
          <img src={publicUrl('/media/ajan-graduation.webp')} alt="Ajan Muthuraj at IIT Madras graduation" loading="lazy" decoding="async" width="1200" height="1600" />
          <div className="photo-meta"><span>CHENNAI · 2026</span><strong>IIT Madras graduate</strong></div>
        </div>
        <div className="about-copy reveal">
          <p className="section-index">01 / ABOUT</p>
          <h2>Mechanical by training.<br /><em>Systems-minded by practice.</em></h2>
          <div className="about-body">
            <p>I graduated from IIT Madras with a B.Tech in Mechanical Engineering and a CGPA of 8.52/10. I now work as a Systems Engineer at Dai-ichi Life Techno Cross in Japan.</p>
            <p>I work on problems where uncertainty is part of the specification: moving obstacles, imperfect maps, delayed communication and noisy sensing. I test how information and commands cross subsystem boundaries, because that is where otherwise good components often fail together.</p>
          </div>
          <div className="about-facts">
            <div><GraduationCap /><span>Education</span><strong>IIT Madras · B.Tech Mechanical Engineering</strong></div>
            <div><Award /><span>Research</span><strong>ICRA 2026 XPLORE Workshop poster</strong></div>
            <div><BriefcaseBusiness /><span>Current role</span><strong>Systems Engineer · DLTX, Japan</strong></div>
          </div>
          <div className="about-actions"><a className="button dark-button" href={publicUrl(profile.resume)} download>Download résumé <Download size={16} /></a><a className="inline-link" href={profile.linkedin} target="_blank" rel="noreferrer">Full profile <ArrowUpRight size={15} /></a></div>
        </div>
      </section>

      <section id="work" className="work-section section-pad">
        <div className="section-heading reveal"><p className="section-index">02 / SELECTED WORK</p><h2>Selected work,<br /><em>with the decisions visible.</em></h2><p>Each case separates the engineering problem, my contribution and the reported result. Collaborative work is labelled explicitly.</p></div>
        <div className="project-tabs reveal" role="tablist" aria-label="Project categories">
          {projectTabs.map((tab) => <button key={tab.id} role="tab" aria-selected={projectTab === tab.id} className={projectTab === tab.id ? 'active' : ''} onClick={() => setProjectTab(tab.id)}><span>{tab.label}</span><small>{String(tab.projectIds.length).padStart(2, '0')}</small></button>)}
        </div>
        <div className="project-selector reveal" role="tablist" aria-label={`${selectedTab.label} projects`}>
          {tabProjects.map((project) => <button key={project.id} role="tab" aria-selected={activeProject.id === project.id} aria-controls="project-case" className={activeProject.id === project.id ? 'active' : ''} onClick={() => setActiveProjectId(project.id)}><span>{project.index}</span><b>{project.shortTitle}</b><small>{project.domain}</small><i /></button>)}
        </div>
        <article id="project-case" className="project-case" key={activeProject.id} role="tabpanel">
          <ProjectMedia project={activeProject} />
          <div className="case-content">
            <div className="case-heading"><p>{activeProject.domain}{activeProject.collaborative ? ' · team work' : ''}</p><span>{activeProject.index} / 06</span></div>
            <h3>{activeProject.title}</h3>
            <p className="case-summary">{activeProject.summary}</p>
            <div className="case-decisions">
              <div><span>THE PROBLEM</span><p>{activeProject.challenge}</p></div>
              <div><span>WHAT I BUILT</span><p>{activeProject.build}</p></div>
              <div><span>EVIDENCE</span><p>{activeProject.outcome}</p></div>
              <div><span>MY SCOPE</span><p>{activeProject.role}</p></div>
            </div>
            <div className="case-footer"><div className="tag-list">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="button dark-button" href={activeProject.href} target="_blank" rel="noreferrer">Inspect evidence <ArrowUpRight size={16} /></a></div>
          </div>
        </article>
      </section>

      <section id="method" className="method-section section-pad">
        <div className="method-layout">
          <div className="method-intro reveal"><p className="section-index">03 / ENGINEERING METHOD</p><h2>How I approach<br /><em>robotics problems.</em></h2><p>Four steps I use to make the work testable and the results easier to inspect.</p></div>
          <div className="method-console reveal">
            <div className="method-tabs" role="tablist" aria-label="Engineering method">
              {engineeringLoop.map((item) => <button key={item.id} role="tab" aria-selected={activeMethod === item.id} aria-controls="method-readout" className={activeMethod === item.id ? 'active' : ''} onClick={() => setActiveMethod(item.id)}><span>{item.eyebrow.slice(0, 2)}</span><b>{item.label}</b><ArrowUpRight size={15} /></button>)}
            </div>
            <div id="method-readout" className="method-readout" key={selectedMethod.id} role="tabpanel">
              <p>{selectedMethod.eyebrow}</p><h3>{selectedMethod.principle}</h3><div className="method-detail"><span>PRACTICE</span><p>{selectedMethod.practice}</p></div><div className="method-detail evidence"><span>FROM THE WORK</span><p>{selectedMethod.evidence}</p></div><div className="method-tools">{selectedMethod.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="principle-section section-pad reveal" aria-label="Engineering principle">
        <p className="section-index">04 / WORKING RULE</p>
        <blockquote>“The handoff is part of the system.”</blockquote>
        <div><span>IN PRACTICE</span><p>A planner is only as useful as the map it reads, the timing it keeps and the mechanism that executes it. I test those boundaries explicitly.</p></div>
      </section>

      <section id="now" className="now-section section-pad">
        <div className="section-heading reveal"><p className="section-index">05 / RECENT PUBLIC WORK</p><h2>Latest repositories,<br /><em>direct from GitHub.</em></h2><p>The feed uses the GitHub API and shows described public repositories by most recent push. Private work is not included.</p></div>
        <div className="live-status reveal"><span className={live ? 'pulse live' : 'pulse'} />{live ? 'GitHub API connected' : 'Curated fallback · GitHub API unavailable'}<small>public activity only</small></div>
        <div className="repo-grid">{repos.map((repo, index) => <a className="repo-card reveal" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id} style={{ '--delay': `${index * 80}ms` } as CSSProperties}><div><Code2 size={20} /><span>{repo.fork ? 'COLLABORATIVE / FORK' : 'PUBLIC REPOSITORY'}</span><ArrowUpRight size={17} /></div><h3>{repo.name.replaceAll('-', ' ')}</h3><p>{repo.description || 'Public robotics and engineering work on GitHub.'}</p><footer><span>{repo.language || 'Mixed'}</span><time dateTime={repo.pushed_at}>Pushed {timeAgo(repo.pushed_at)}</time></footer></a>)}</div>
        <a className="all-work-link reveal" href={`${profile.github}?tab=repositories`} target="_blank" rel="noreferrer">Browse all repositories <ArrowUpRight /></a>
      </section>

      <section id="story" className="story-section section-pad">
        <div className="journey-layout">
          <div className="journey-intro reveal"><p className="section-index">06 / TRAJECTORY</p><h2>Education, research<br /><em>and industry.</em></h2><p>A concise record of the roles and projects that shaped how I work.</p></div>
          <div className="journey-list">{milestones.map((item, index) => <article className={`journey-item reveal${item.current ? ' current' : ''}`} key={`${item.year}-${item.title}`}><div className="journey-track"><span>{String(index + 1).padStart(2, '0')}</span><i /></div><div className="journey-card"><header><time>{item.year}</time><span>{item.tag}</span>{item.current && <b>NOW</b>}</header><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}</div>
        </div>
      </section>

      <section id="contact" className="contact-section section-pad reveal">
        <p className="section-index">07 / CONTACT</p><div><h2>Working on a robot<br />that must <em>leave the lab?</em></h2><p>I’m interested in robotics software, autonomy, multi-robot systems, motion planning and research-engineering work.</p></div>
        <a className="contact-orb" href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}><Mail size={28} /><span>Start a conversation</span><ArrowUpRight /></a>
        <div className="contact-links"><a href={profile.github} target="_blank" rel="noreferrer"><Code2 /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><UserRound /> LinkedIn</a><a href={publicUrl(profile.resume)} download><Download /> Résumé</a><a href={`mailto:${profile.email}`}><Mail /> {profile.email}</a></div>
      </section>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} {profile.name}</span><span><CircleDot size={13} /> Robotics · autonomy · systems</span><button onClick={() => navigate('home')}>Back to top <ArrowUpRight size={14} /></button></footer>
  </div>
}

export default App
