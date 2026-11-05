export type Project = {
  id: string
  index: string
  title: string
  shortTitle: string
  domain: string
  summary: string
  challenge: string
  build: string
  outcome: string
  role: string
  tags: string[]
  href: string
  image: string
  mediaLabel: string
  mediaSource?: string
  evidenceLinks?: { label: string; url: string }[]
  gallery?: { src: string; label: string }[]
  clips?: { src: string; poster: string; label: string }[]
  imageSize: readonly [width: number, height: number]
  featured?: boolean
  collaborative?: boolean
}

export const demos = [
  { id: '07T3-0PnAlo', projectId: 'isaac-drone', title: 'Simulation of 9 drones in Isaac Sim', thumbnail: '/media/isaac-drone-demo.jpg' },
  { id: 'mj8LEdT97FQ', projectId: 'humanoid', title: 'Humanoid Robot in a hospital assisting patients', thumbnail: '/media/humanoid-hospital.webp' },
] as const

export const projects: Project[] = [
  {
    id: 'isaac-drone', index: '01', title: 'Autonomous UAV exploration in Isaac Sim', shortTitle: 'Isaac Sim UAV', domain: 'Autonomy stack',
    summary: 'A reproducible quadrotor research platform connecting simulation, flight control, mapping and collision-aware exploration.',
    challenge: 'Make a drone autonomy stack understandable and reproducible across several systems that normally fail at their interfaces.',
    build: 'Connected Isaac Sim, ArduPilot SITL, ROS 2 and RTAB-Map, then added collision-aware 3D frontier selection and multi-drone launch workflows.',
    outcome: 'A documented path from simulated sensors to SLAM, planning, commands and multi-drone trials.',
    role: 'System architecture, simulation integration, flight control, SLAM and autonomous exploration.',
    tags: ['Isaac Sim', 'ROS 2', 'ArduPilot', 'RTAB-Map', 'Python'], href: 'https://github.com/AjanM27/isaac-sim-drone-autonomy',
    image: demos[0].thumbnail, mediaLabel: 'Simulation viewport from the nine-drone Isaac Sim recording', imageSize: [1280, 720], featured: true,
    evidenceLinks: [{ label: 'Watch the nine-drone Isaac Sim demo', url: `https://www.youtube.com/watch?v=${demos[0].id}` }],
  },
  {
    id: 'reach-avoid', index: '02', title: 'Reach–avoid RL in time-varying environments', shortTitle: 'Time-varying DDQN', domain: 'B.Tech thesis',
    summary: 'A DDQN framework for safety-critical navigation when obstacles and targets move over time.',
    challenge: 'A policy that only sees position cannot distinguish identical locations at different times when the safe and target sets are moving.',
    build: 'Augmented the state with time, corrected baseline implementation issues, and trained a DDQN against a discounted reach–avoid Bellman objective.',
    outcome: '79.5% and 76.0% grid rollout success in two time-varying environments; 94.4% predicted-safe precision on the dual-obstacle map. These are simulation results, not a formal guarantee for the learned DDQN.',
    role: 'Problem formulation, environment design, implementation, training, evaluation and thesis research.',
    tags: ['DDQN', 'PyTorch', 'Safe RL', 'Gym', 'Dynamic systems'], href: 'https://github.com/AjanM27/ddqn-reach-avoid-rl',
    image: 'https://raw.githubusercontent.com/AjanM27/ddqn-reach-avoid-rl/main/docs/images/learned-value-rollout-action.png', mediaLabel: 'Actual project evaluation figure · value, rollout and action', imageSize: [1200, 400], featured: true,
    gallery: [
      { src: 'https://raw.githubusercontent.com/AjanM27/ddqn-reach-avoid-rl/main/docs/images/learned-value-time-slices.png', label: 'Time-conditioned value-function slices from the research implementation' },
      { src: 'https://raw.githubusercontent.com/AjanM27/ddqn-reach-avoid-rl/main/docs/images/metrics-summary.png', label: 'Experimental metrics and rollout evaluation' },
    ],
    evidenceLinks: [
      { label: 'Research implementation and methodology', url: 'https://github.com/AjanM27/ddqn-reach-avoid-rl/blob/main/docs/PROJECT_OVERVIEW.md' },
      { label: 'B.Tech thesis poster (PDF)', url: '/media/reach-avoid-poster.pdf' },
    ],
  },
  {
    id: 'swarm-rescue', index: '03', title: 'Swarm Rescue Challenge · ten-drone autonomous exploration', shortTitle: 'Swarm Rescue', domain: 'Research · competition',
    summary: 'An autonomous ten-UAV search-and-rescue system for GPS-denied, obstacle-rich environments, developed collaboratively at IIT Madras.',
    challenge: 'Coordinate exploration, localization and shared maps despite moving hazards and imperfect information.',
    build: 'The team integrated FastSLAM with ICP scan matching, adaptive frontier exploration, temporal occupancy-grid fusion and hazard avoidance.',
    outcome: 'Second among Indian teams at the 2025–26 Swarm Rescue Challenge. Related research appeared as a poster at the ICRA 2026 XPLORE Workshop.',
    role: 'Collaborative multi-drone autonomy research and integration; see the official results and co-authored poster for team attribution.',
    tags: ['Swarm robotics', 'FastSLAM', 'ICP', 'Frontier exploration', 'Map fusion'],
    href: 'https://openreview.net/forum?id=tbvhPL9Ftk',
    image: '/media/swarm-rescue-cover.webp', mediaLabel: 'Illustrated Swarm Rescue project cover supplied by Ajan Muthuraj', imageSize: [1100, 619], featured: true, collaborative: true,
    evidenceLinks: [
      { label: 'Official challenge results', url: 'https://www.ip-paris.fr/en/news/swarm-rescue-challenge-final-2025-2026-save-lives-controlling-swarm-drones' },
      { label: 'ICRA 2026 XPLORE workshop poster', url: 'https://openreview.net/forum?id=tbvhPL9Ftk' },
    ],
  },
  {
    id: 'multi-robot-slam', index: '04', title: 'Multi-robot SLAM and temporal map fusion', shortTitle: 'Multi-robot SLAM', domain: 'Research · collaboration',
    summary: 'Collective exploration under noisy sensing with shared occupancy-grid memory and recovery from navigation deadlocks.',
    challenge: 'Keep several robots productive when their local maps, communication and frontier choices are all uncertain.',
    build: 'Combined temporal map fusion, deadlock detection and delayed self-reinforcement with coordinated frontier-based exploration.',
    outcome: 'Documented collaborative multi-robot navigation and map-fusion experiments. The separate ten-UAV Swarm Rescue research is listed as its own project.',
    role: 'Collaborative research and engineering across navigation, mapping and evaluation.',
    tags: ['Multi-robot', 'SLAM', 'Map fusion', 'MATLAB', 'Control'], href: 'https://github.com/AjanM27/Multi-Robot-SLAM-Navigation',
    image: 'https://raw.githubusercontent.com/AjanM27/Multi-Robot-SLAM-Navigation/main/Demonstrations/DSR_Maze.gif', mediaLabel: 'Actual collaborative project simulation capture', imageSize: [640, 360], featured: true, collaborative: true,
    evidenceLinks: [{ label: 'Simulation source and collaborator attribution', url: 'https://github.com/AjanM27/Multi-Robot-SLAM-Navigation' }],
  },
  {
    id: 'humanoid', index: '05', title: 'Hospital humanoid navigation and manipulation', shortTitle: 'Humanoid system', domain: 'Research internship',
    summary: 'An integrated ROS 2 workflow for a humanoid operating in a hospital-like environment.',
    challenge: 'Move from detecting an object to navigating, localizing it in 3D and executing a collision-aware grasp as one system.',
    build: 'Created the Gazebo/URDF simulation and integrated Nav2, SLAM, YOLOv9, depth localization, MoveIt 2, TRAC-IK and OctoMap.',
    outcome: 'Approximately 96.6% grasp success across 30 reported experimental trials.',
    role: 'Robot simulation, navigation, perception, 3D localization and manipulation integration.',
    tags: ['ROS 2', 'Nav2', 'MoveIt 2', 'YOLOv9', 'Gazebo'], href: 'https://www.linkedin.com/in/ajanmuthuraj/',
    image: demos[1].thumbnail, mediaLabel: 'Hospital simulation screenshot from the co-authored IIT Roorkee SPARK poster', imageSize: [790, 365], featured: true,
    clips: [
      { label: 'Navigation in Gazebo', src: '/media/humanoid-navigation.mp4', poster: '/media/humanoid-navigation-poster.webp' },
      { label: 'Cup manipulation in Gazebo and RViz', src: '/media/humanoid-manipulation.mp4', poster: '/media/humanoid-manipulation-poster.webp' },
    ],
    evidenceLinks: [{ label: 'Watch the full humanoid simulation demo', url: `https://www.youtube.com/watch?v=${demos[1].id}` }],
  },
  {
    id: 'swarm-rl', index: '06', title: 'RL-based swarm navigation', shortTitle: 'Swarm RL', domain: 'Inter-IIT · collaboration',
    summary: 'A ROS 2 and Gazebo swarm workflow for navigation in dynamic warehouse environments.',
    challenge: 'Coordinate many robots without turning perception, mapping and policy execution into independent demos.',
    build: 'Worked across LiDAR clustering, map merging, TD3-oriented training assets, simulation and operator visualization.',
    outcome: 'Reported 94% obstacle-classification accuracy, under 5 cm average mapping error and about 27% better collision-free navigation than a PPO baseline.',
    role: 'Collaborative swarm robotics and simulation work with the IIT Madras team.',
    tags: ['Swarm robotics', 'ROS 2', 'Gazebo', 'TD3', 'Python'], href: 'https://github.com/AjanM27/Swarm_RL_InterIIT',
    image: 'https://raw.githubusercontent.com/AjanM27/Swarm_RL_InterIIT/main/Videos/Large%20Swarm.gif', mediaLabel: 'Project simulation capture', imageSize: [1280, 720], collaborative: true,
  },
  {
    id: 'adaptive-rrt', index: '07', title: 'Adaptive planning around moving obstacles', shortTitle: 'Adaptive RRT*', domain: 'Motion planning · collaboration',
    summary: 'A visual planning environment for routes that must be repaired as obstacles invalidate them.',
    challenge: 'Replan quickly enough for a changing scene without throwing away every useful part of the previous search.',
    build: 'Implemented and compared Adaptive RRT*, RRT*, A*, Adaptive A* and LPA* across dynamic scenarios.',
    outcome: 'Benchmarked path length and replanning behavior across dynamic simulation scenarios; see the linked repository for comparisons and baseline definitions.',
    role: 'Collaborative algorithm implementation, simulation design and planner evaluation.',
    tags: ['RRT*', 'LPA*', 'Python', 'Pygame', 'Planning'], href: 'https://github.com/AjanM27/Dynamic-Path-Planning-with-Adaptive-RRT-',
    image: 'https://raw.githubusercontent.com/AjanM27/Dynamic-Path-Planning-with-Adaptive-RRT-/main/trimmed.gif', mediaLabel: 'Project planning demonstration', imageSize: [1030, 681], collaborative: true,
  },
]

export const engineeringLoop = [
  { id: 'frame', label: 'Frame the failure', eyebrow: '01 · BEFORE THE ALGORITHM', principle: 'Define what failure means before choosing a method.', practice: 'I write down safety, liveness, latency and observability constraints first. That turns “make it autonomous” into testable engineering questions.', evidence: 'In reach–avoid RL, this meant treating time as part of state because the meaning of safe changes as obstacles and targets move.', tools: ['Safety constraints', 'State design', 'Baselines'] },
  { id: 'observe', label: 'Make it observable', eyebrow: '02 · BUILD THE HARNESS', principle: 'A system is not debuggable if its decisions are invisible.', practice: 'I build the smallest reproducible simulation, log the states that matter and expose intermediate outputs before scaling complexity.', evidence: 'The UAV stack documents every interface from simulated sensor topics to mapping, exploration goals and flight commands.', tools: ['Simulation', 'Telemetry', 'Reproducibility'] },
  { id: 'interfaces', label: 'Stress the interfaces', eyebrow: '03 · WHERE SYSTEMS BREAK', principle: 'Most robotics failures live between good subsystems.', practice: 'I test stale maps, noisy sensing, moving obstacles, recovery behavior and frame transforms—not only the happy path of each component.', evidence: 'Multi-robot work focused on temporal map fusion and deadlock recovery; humanoid work joined perception, depth, navigation and manipulation.', tools: ['Noise', 'Timing', 'Recovery'] },
  { id: 'measure', label: 'Measure the trade-off', eyebrow: '04 · EVIDENCE OVER DEMOS', principle: 'A polished video is a starting point, not the evaluation.', practice: 'I compare against baselines, isolate failure modes and report what was actually measured—without presenting team results as solo work.', evidence: 'My project summaries separate implementation scope, collaborative credit and reported metrics so a reviewer can inspect the evidence.', tools: ['Benchmarks', 'Ablations', 'Attribution'] },
]

export const milestones = [
  { year: '2026—Now', title: 'Systems Engineer · DLTX', copy: 'Working as a Systems Engineer at Dai-ichi Life Techno Cross in Japan.', tag: 'INDUSTRY', current: true },
  { year: '2026', title: 'B.Tech · IIT Madras', copy: 'Graduated in Mechanical Engineering with a CGPA of 8.52/10; thesis on reach–avoid reinforcement learning in time-varying environments.', tag: 'EDUCATION', current: false },
  { year: '2026', title: 'ICRA XPLORE Workshop', copy: 'Collaborative work on multi-robot frontier exploration under uncertainty accepted for a poster presentation.', tag: 'RESEARCH', current: false },
  { year: '2025', title: 'Humanoid robotics research · IIT Roorkee', copy: 'Integrated navigation, perception and collision-aware manipulation in a hospital-like environment.', tag: 'INTERNSHIP', current: false },
  { year: '2024–25', title: 'Logistics coBot · e-Yantra', copy: 'Built UR5 manipulation and eBot navigation for autonomous package sorting and delivery in simulation and on hardware.', tag: 'COMPETITION', current: false },
]

export const profile = {
  name: 'Ajan Muthuraj', email: 'ajanm2003@gmail.com', github: 'https://github.com/AjanM27', linkedin: 'https://www.linkedin.com/in/ajanmuthuraj/', location: 'Japan', resume: '/Ajan_Muthuraj_Resume.pdf',
}
