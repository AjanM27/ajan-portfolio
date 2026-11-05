import { useEffect, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Download, Menu, X } from 'lucide-react'
import { interests, profile, projectGroups, projects, type Project } from './data/portfolio'
import './App.css'

const publicUrl = (path: string) => path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path
const projectHash = (id: string) => `#project=${id}`
const navigation = [['work', 'Projects'], ['experience', 'Experience'], ['about', 'About'], ['interests', 'Interests'], ['contact', 'Contact']] as const

function focusWork() {
  document.getElementById('work')?.scrollIntoView()
  document.getElementById('work-title')?.focus({ preventScroll: true })
}

function reopenProject(event: MouseEvent<HTMLAnchorElement>) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  if (event.currentTarget.hash === window.location.hash) {
    event.preventDefault()
    focusWork()
  }
}

const highlights = [
  { id: 'isaac-drone', label: 'Autonomy stack', title: 'Nine drones in Isaac Sim', detail: 'ROS 2, ArduPilot, 3D SLAM and frontier exploration' },
  { id: 'logistics-cobot', label: 'Hardware integration', title: 'UR5 arm and mobile rover', detail: 'Marker-based pose estimation, docking and pick-and-place' },
  { id: 'reach-avoid', label: 'Robot learning', title: 'When safe routes change with time', detail: 'Time-aware DDQN, safety evaluation and thesis poster' },
] as const

function ProjectMedia({ project }: { project: Project }) {
  if (!project.media) return null
  const { src, width, height, label } = project.media
  return (
    <figure className="project-media" data-project={project.id}>
      <div className="project-image">
        <img src={publicUrl(src)} width={width} height={height} alt={label} loading="lazy" decoding="async" />
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  )
}

function ProjectCase({ project }: { project: Project }) {
  return (
    <article id="project-case" className={project.media ? 'project-case' : 'project-case text-case'} role="tabpanel" aria-labelledby={`tab-${project.id}`}>
      <header className="case-intro">
        <p className="eyebrow">{project.domain}{project.collaborative && ' · Team project'}</p>
        <h3>{project.title}</h3>
        <p className="case-summary">{project.summary}</p>
      </header>
      {project.media && (
        <div className="case-visuals">
          <ProjectMedia project={project} />
          {project.gallery && (
            <div className="project-figures">
              <h4>Research figures</h4>
              <div className="project-figure-grid">
                {project.gallery.map((figure) => (
                  <a key={figure.src} href={figure.src}>
                    <img src={figure.src} alt="" loading="lazy" />
                    <span>{figure.label} <ArrowUpRight size={14} aria-hidden="true" /></span>
                  </a>
                ))}
              </div>
            </div>
          )}
          {project.clips && (
            <div className="project-figures">
              <h4>Simulation clips</h4>
              <div className="project-clip-grid">
                {project.clips.map((clip) => (
                  <figure key={clip.src}>
                    <video controls muted playsInline preload="none" src={publicUrl(clip.src)} poster={publicUrl(clip.poster)} aria-label={clip.label} />
                    <figcaption>{clip.label}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="case-content">
        <dl className="case-decisions">
          <div><dt>Problem</dt><dd>{project.challenge}</dd></div>
          <div><dt>Implementation</dt><dd>{project.build}</dd></div>
          <div><dt>Result</dt><dd>{project.outcome}</dd></div>
          <div><dt>My contribution</dt><dd>{project.role}</dd></div>
        </dl>
        <ul className="tag-list" aria-label="Tools and methods">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <div className="project-sources" aria-label="Project evidence">
          <a className="button button-dark" href={project.href}>{project.linkLabel ?? 'View source code'} <ArrowUpRight size={16} aria-hidden="true" /></a>
          {project.evidenceLinks?.map((link) => (
            <a className="evidence-link" key={link.url} href={publicUrl(link.url)}>{link.label} <ArrowUpRight size={14} aria-hidden="true" /></a>
          ))}
        </div>
      </div>
    </article>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [groupId, setGroupId] = useState(projectGroups[0].id)
  const [projectId, setProjectId] = useState(projectGroups[0].projectIds[0])
  const group = projectGroups.find((item) => item.id === groupId) ?? projectGroups[0]
  const visibleProjects = group.projectIds.map((id) => projects.find((project) => project.id === id)!)
  const activeProject = visibleProjects.find((project) => project.id === projectId) ?? visibleProjects[0]

  useEffect(() => {
    let frame = 0
    const showHash = () => {
      const hash = window.location.hash
      if (hash.startsWith('#project=')) {
        const id = hash.slice('#project='.length)
        const match = projectGroups.find((item) => item.projectIds.includes(id))
        if (!match) return
        setGroupId(match.id)
        setProjectId(id)
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(focusWork)
      }
    }
    showHash()
    window.addEventListener('hashchange', showHash)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', showHash)
    }
  }, [])

  const selectProject = (id: string) => {
    setProjectId(id)
    window.history.replaceState(null, '', projectHash(id))
  }

  const selectGroup = (id: string) => {
    const nextGroup = projectGroups.find((item) => item.id === id)
    if (!nextGroup || id === groupId) return
    setGroupId(id)
    selectProject(nextGroup.projectIds.includes(activeProject.id) ? activeProject.id : nextGroup.projectIds[0])
  }

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = visibleProjects.length - 1
    const keyTargets: Record<string, number> = {
      ArrowRight: (index + 1) % visibleProjects.length,
      ArrowLeft: (index + last) % visibleProjects.length,
      ArrowDown: (index + 1) % visibleProjects.length,
      ArrowUp: (index + last) % visibleProjects.length,
      Home: 0,
      End: last,
    }
    const target = keyTargets[event.key]
    if (target === undefined) return
    event.preventDefault()
    const id = visibleProjects[target].id
    selectProject(id)
    document.getElementById(`tab-${id}`)?.focus()
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="nav-inner">
          <a className="wordmark" href="#home" onClick={() => setMenuOpen(false)}>Ajan Muthuraj</a>
          <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
          <nav id="site-nav" className={menuOpen ? 'is-open' : ''} aria-label="Primary navigation">
            {navigation.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="nav-resume" href={publicUrl(profile.resume)}>Résumé <Download size={15} aria-hidden="true" /></a>
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section id="home" className="hero-section">
          <div className="wrap hero-layout">
            <div className="hero-copy">
              <p className="eyebrow hero-location"><span aria-hidden="true" /> Systems Engineer at Dai-ichi Life Techno Cross</p>
              <h1>Ajan Muthuraj</h1>
              <p className="hero-specialty">Robotics &amp; autonomy</p>
              <p className="hero-lede">I like taking a robotics idea far enough to see where it breaks. I’ve worked across mechanisms, electronics and software, from a gesture-controlled rover to ROS 2 systems for drone exploration and manipulation.</p>
              <div className="hero-actions">
                <a className="button button-accent" href="#work">Explore projects <ArrowDown size={17} aria-hidden="true" /></a>
                <a className="button button-outline" href={publicUrl(profile.resume)}>View résumé <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
            <aside className="hero-proof" aria-labelledby="proof-title">
              <h2 id="proof-title" className="eyebrow">Three projects to start with</h2>
              {highlights.map((item, index) => (
                <a className="proof-link" href={projectHash(item.id)} key={item.id} onClick={reopenProject}>
                  <span className="proof-index" aria-hidden="true">0{index + 1}</span>
                  <span className="proof-copy"><small>{item.label}</small><strong>{item.title}</strong><span>{item.detail}</span></span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              ))}
            </aside>
          </div>
        </section>

        <section id="work" className="work-section section-pad">
          <div className="wrap">
            <div className="section-heading">
              <div><p className="eyebrow">01 / Portfolio</p><h2 id="work-title" tabIndex={-1}>Selected projects</h2></div>
              <p>{projects.length} projects across autonomy, manipulation, swarms, embedded systems and software. Filter by area to see what I built and how I tested it.</p>
            </div>
            <div className="project-filters" role="group" aria-label="Filter projects">
              {projectGroups.map((item) => <button type="button" key={item.id} aria-pressed={groupId === item.id} onClick={() => selectGroup(item.id)}>{item.label}</button>)}
            </div>
            <div className="work-browser">
              <div className="project-index">
                <p className="index-label"><span>{group.label}</span><span>{visibleProjects.length} of {projects.length}</span></p>
                <div className="project-selector" role="tablist" aria-label={`Project list · ${group.label}`} data-group={groupId}>
                  {visibleProjects.map((project, index) => (
                    <button key={project.id} type="button" role="tab" id={`tab-${project.id}`} aria-selected={project.id === activeProject.id} aria-controls="project-case" tabIndex={project.id === activeProject.id ? 0 : -1} onClick={() => selectProject(project.id)} onKeyDown={(event) => handleTabKey(event, index)}>
                      {project.shortTitle}<ArrowRight size={15} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
              <ProjectCase key={activeProject.id} project={activeProject} />
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section section-pad">
          <div className="wrap">
            <div className="section-heading">
              <div><p className="eyebrow">02 / Experience</p><h2>Work and leadership</h2></div>
              <a className="evidence-link" href={publicUrl(profile.resume)}>Read my résumé <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
            <div className="experience-grid">
              <article className="experience-card">
                <p className="eyebrow">Oct 2026 to present · Japan</p>
                <h3>Systems Engineer, DLTX</h3>
                <p>At Dai-ichi Life Techno Cross, I’ve practised reverse and forward engineering of Lotus Notes applications and built a React interface from supplied XML exports.</p>
                <p><strong>Full-stack learning:</strong> Java and Spring Boot, data persistence, Docker containers and Kubernetes fundamentals.</p>
              </article>
              <article className="experience-card">
                <p className="eyebrow">Jun to Jul 2025 · IIT Roorkee</p>
                <h3>Robotics Research Intern</h3>
                <p>I worked on a simulated hospital humanoid, connecting RGB-D perception and Nav2 navigation with MoveIt 2 manipulation.</p>
                <a className="evidence-link" href={projectHash('humanoid')} onClick={reopenProject}>Open the humanoid project <ArrowRight size={15} aria-hidden="true" /></a>
              </article>
              <article className="experience-card">
                <p className="eyebrow">Student leadership · IIT Madras</p>
                <h3>Electronics &amp; Robotics Guild</h3>
                <p>I led robotics training and helped assemble teams for Inter-IIT competitions. In the Electronics Club, I led Cubitect and taught hands-on sessions, including a Shaastra workshop on parallel processing.</p>
                <a className="evidence-link" href={projectHash('cubitect')} onClick={reopenProject}>Open Cubitect <ArrowRight size={15} aria-hidden="true" /></a>
              </article>
            </div>
          </div>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="wrap about-layout">
            <div className="about-copy">
              <p className="eyebrow">03 / About me</p>
              <h2>Why I like robotics</h2>
              <p>I studied mechanical engineering at IIT Madras. What drew me to robotics was being able to follow a problem all the way from a noisy sensor reading to what a mechanism actually does.</p>
              <p>In an early rover project, that meant turning IMU and flex-sensor readings into motor and servo commands. At e-Yantra, it meant getting an eBot to dock and a UR5 to pick up a package. I like learning unfamiliar tools quickly, and building something with them is how I find out what I’ve understood.</p>
              <blockquote>“Anything can be learnt.”</blockquote>
              <p><strong>Languages:</strong> English, Hindi, Tamil and basic Japanese.</p>
              <div className="inline-links">
                <a href={projectHash('gesture-rover')} onClick={reopenProject}>Rover architecture and Arduino sketches <ArrowRight size={15} aria-hidden="true" /></a>
                <a href={projectHash('swarm-rescue')} onClick={reopenProject}>Swarm Rescue competition and ICRA poster <ArrowRight size={15} aria-hidden="true" /></a>
              </div>
            </div>
            <figure className="about-photo">
              <img src={publicUrl('/media/ajan-graduation.webp')} alt="Ajan Muthuraj at his IIT Madras graduation" loading="lazy" decoding="async" width="1200" height="1600" />
              <figcaption>IIT Madras · B.Tech, Mechanical Engineering</figcaption>
            </figure>
          </div>
        </section>

        <section id="interests" className="interests-section section-pad">
          <div className="wrap">
            <div className="section-heading">
              <div><p className="eyebrow">04 / What I want to explore</p><h2>Questions I keep coming back to</h2></div>
              <p>These are the problems I’d like to spend more time on. Each starts from something I’ve built or studied.</p>
            </div>
            <div className="interest-grid">
              {interests.map((item) => (
                <details key={item.title}>
                  <summary>{item.title}</summary>
                  <p>{item.question}</p>
                  <a className="evidence-link" href={projectHash(item.projectId)} onClick={reopenProject}>{item.linkLabel} <ArrowRight size={15} aria-hidden="true" /></a>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-pad">
          <div className="wrap contact-layout">
            <div><p className="eyebrow">05 / Contact</p><h2>Get in touch</h2><p>I’m interested in robotics software, autonomy and integration roles, especially where I can work across perception, planning and control.</p></div>
            <div className="contact-links">
              <a className="button button-accent" href={`mailto:${profile.email}`}>Email me <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a href={profile.github}>GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>
              <a href={profile.linkedin}>LinkedIn <ArrowUpRight size={15} aria-hidden="true" /></a>
              <a href={publicUrl(profile.resume)}>Résumé <Download size={15} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="wrap footer-inner"><span>Ajan Muthuraj</span><a href="#home">Back to top ↑</a></div>
      </footer>
    </>
  )
}

export default App
