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
  imageFit?: 'cover' | 'contain'
  featured?: boolean
  collaborative?: boolean
}

export const projects: Project[] = [
  {
    id: 'isaac-drone', index: '01', title: 'Autonomous UAV exploration in Isaac Sim', shortTitle: 'Isaac Sim UAV', domain: 'Autonomy stack',
    summary: 'A reproducible quadrotor research platform connecting simulation, flight control, mapping and collision-aware exploration.',
    challenge: 'Make a drone autonomy stack understandable and reproducible across several systems that normally fail at their interfaces.',
    build: 'Connected Isaac Sim, ArduPilot SITL, ROS 2 and RTAB-Map, then added collision-aware 3D frontier selection and multi-drone launch workflows.',
    outcome: 'A documented path from simulated sensors to SLAM, planning, commands and multi-drone trials.',
    role: 'System architecture, simulation integration, flight control, SLAM and autonomous exploration.',
    tags: ['Isaac Sim', 'ROS 2', 'ArduPilot', 'RTAB-Map', 'Python'], href: 'https://github.com/AjanM27/isaac-sim-drone-autonomy',
    image: '/media/drone-reference.jpg', mediaLabel: 'Representative visual · Project Kei · CC BY-SA 4.0', mediaSource: 'https://commons.wikimedia.org/wiki/File:Quadcopter_Drone_in_flight.jpg', imageFit: 'cover', featured: true,
  },
  {
    id: 'reach-avoid', index: '02', title: 'Reach–avoid RL in time-varying environments', shortTitle: 'Time-varying DDQN', domain: 'B.Tech thesis',
    summary: 'A DDQN framework for safety-critical navigation when obstacles and targets move over time.',
    challenge: 'A policy that only sees position cannot distinguish identical locations at different times when the safe and target sets are moving.',
    build: 'Augmented the state with time, corrected baseline implementation issues, and trained a DDQN against a discounted reach–avoid Bellman objective.',
    outcome: 'Reported up to 94.4% safe-state prediction precision in large-scale evaluation while preserving the reach–avoid formulation.',
    role: 'Problem formulation, environment design, implementation, training, evaluation and thesis research.',
    tags: ['DDQN', 'PyTorch', 'Safe RL', 'Gym', 'Dynamic systems'], href: 'https://github.com/AjanM27/ddqn-reach-avoid-rl',
    image: 'https://raw.githubusercontent.com/AjanM27/ddqn-reach-avoid-rl/main/docs/images/learned-value-rollout-action.png', mediaLabel: 'Learned value, rollout and action after training', imageFit: 'contain', featured: true,
  },
  {
    id: 'multi-robot-slam', index: '03', title: 'Multi-robot SLAM and temporal map fusion', shortTitle: 'Multi-robot SLAM', domain: 'Research · collaboration',
    summary: 'Collective exploration under noisy sensing with shared occupancy-grid memory and recovery from navigation deadlocks.',
    challenge: 'Keep several robots productive when their local maps, communication and frontier choices are all uncertain.',
    build: 'Combined temporal map fusion, deadlock detection and delayed self-reinforcement with coordinated frontier-based exploration.',
    outcome: 'The wider research was accepted for a poster at the ICRA 2026 XPLORE Workshop.',
    role: 'Collaborative research and engineering across navigation, mapping and evaluation.',
    tags: ['Multi-robot', 'SLAM', 'Map fusion', 'MATLAB', 'Control'], href: 'https://github.com/AjanM27/Multi-Robot-SLAM-Navigation',
    image: 'https://raw.githubusercontent.com/AjanM27/Multi-Robot-SLAM-Navigation/main/Demonstrations/DSR_Maze.gif', mediaLabel: 'Project simulation capture', imageFit: 'contain', featured: true, collaborative: true,
  },
  {
    id: 'humanoid', index: '04', title: 'Hospital humanoid navigation and manipulation', shortTitle: 'Humanoid system', domain: 'Research internship',
    summary: 'An integrated ROS 2 workflow for a humanoid operating in a hospital-like environment.',
    challenge: 'Move from detecting an object to navigating, localizing it in 3D and executing a collision-aware grasp as one system.',
    build: 'Created the Gazebo/URDF simulation and integrated Nav2, SLAM, YOLOv8, depth localization, MoveIt 2 and OctoMap.',
    outcome: 'Approximately 96.6% grasp success across 30 reported experimental trials.',
    role: 'Robot simulation, navigation, perception, 3D localization and manipulation integration.',
    tags: ['ROS 2', 'Nav2', 'MoveIt 2', 'YOLOv8', 'Gazebo'], href: 'https://www.linkedin.com/in/ajanmuthuraj/',
    image: '/media/humanoid-reference.webp', mediaLabel: 'Representative visual · Wikideas1 · CC0', mediaSource: 'https://commons.wikimedia.org/wiki/File:Humanoid_Robot.webp', imageFit: 'cover', featured: true,
  },
  {
    id: 'swarm-rl', index: '05', title: 'RL-based swarm navigation', shortTitle: 'Swarm RL', domain: 'Inter-IIT · collaboration',
    summary: 'A ROS 2 and Gazebo swarm workflow for navigation in dynamic warehouse environments.',
    challenge: 'Coordinate many robots without turning perception, mapping and policy execution into independent demos.',
    build: 'Worked across LiDAR clustering, map merging, TD3-oriented training assets, simulation and operator visualization.',
    outcome: 'Reported 94% obstacle-classification accuracy, under 5 cm average mapping error and about 27% better collision-free navigation than a PPO baseline.',
    role: 'Collaborative swarm robotics and simulation work with the IIT Madras team.',
    tags: ['Swarm robotics', 'ROS 2', 'Gazebo', 'TD3', 'Python'], href: 'https://github.com/AjanM27/Swarm_RL_InterIIT',
    image: 'https://raw.githubusercontent.com/AjanM27/Swarm_RL_InterIIT/main/Videos/Large%20Swarm.gif', mediaLabel: 'Project simulation capture', imageFit: 'contain', collaborative: true,
  },
  {
    id: 'adaptive-rrt', index: '06', title: 'Adaptive planning around moving obstacles', shortTitle: 'Adaptive RRT*', domain: 'Motion planning · collaboration',
    summary: 'A visual planning environment for routes that must be repaired as obstacles invalidate them.',
    challenge: 'Replan quickly enough for a changing scene without throwing away every useful part of the previous search.',
    build: 'Implemented and compared Adaptive RRT*, RRT*, A*, Adaptive A* and LPA* across dynamic scenarios.',
    outcome: 'Reported paths were approximately 12% shorter on average in the evaluated scenarios.',
    role: 'Collaborative algorithm implementation, simulation design and planner evaluation.',
    tags: ['RRT*', 'LPA*', 'Python', 'Pygame', 'Planning'], href: 'https://github.com/AjanM27/Dynamic-Path-Planning-with-Adaptive-RRT-',
    image: 'https://raw.githubusercontent.com/AjanM27/Dynamic-Path-Planning-with-Adaptive-RRT-/main/trimmed.gif', mediaLabel: 'Project planning demonstration', imageFit: 'contain', collaborative: true,
  },
]

export const engineeringLoop = [
  { id: 'frame', label: 'Frame the failure', eyebrow: '01 · BEFORE THE ALGORITHM', principle: 'Define what failure means before choosing a method.', practice: 'I write down safety, liveness, latency and observability constraints first. That turns “make it autonomous” into testable engineering questions.', evidence: 'In reach–avoid RL, this meant treating time as part of state because the meaning of safe changes as obstacles and targets move.', tools: ['Safety constraints', 'State design', 'Baselines'] },
  { id: 'observe', label: 'Make it observable', eyebrow: '02 · BUILD THE HARNESS', principle: 'A system is not debuggable if its decisions are invisible.', practice: 'I build the smallest reproducible simulation, log the states that matter and expose intermediate outputs before scaling complexity.', evidence: 'The UAV stack documents every interface from simulated sensor topics to mapping, exploration goals and flight commands.', tools: ['Simulation', 'Telemetry', 'Reproducibility'] },
  { id: 'interfaces', label: 'Stress the interfaces', eyebrow: '03 · WHERE SYSTEMS BREAK', principle: 'Most robotics failures live between good subsystems.', practice: 'I test stale maps, noisy sensing, moving obstacles, recovery behavior and frame transforms—not only the happy path of each component.', evidence: 'Multi-robot work focused on temporal map fusion and deadlock recovery; humanoid work joined perception, depth, navigation and manipulation.', tools: ['Noise', 'Timing', 'Recovery'] },
  { id: 'measure', label: 'Measure the trade-off', eyebrow: '04 · EVIDENCE OVER DEMOS', principle: 'A polished video is a starting point, not the evaluation.', practice: 'I compare against baselines, isolate failure modes and report what was actually measured—without presenting team results as solo work.', evidence: 'My project summaries separate implementation scope, collaborative credit and reported metrics so a reviewer can inspect the evidence.', tools: ['Benchmarks', 'Ablations', 'Attribution'] },
]

export const milestones = [
  { year: '2026', title: 'B.Tech · IIT Madras', copy: 'Graduated in Mechanical Engineering with a CGPA of 8.52/10; thesis on reach–avoid reinforcement learning in time-varying environments.', tag: 'EDUCATION' },
  { year: '2026', title: 'ICRA XPLORE Workshop', copy: 'Collaborative work on multi-robot frontier exploration under uncertainty accepted for a poster presentation.', tag: 'RESEARCH' },
  { year: '2025', title: 'Humanoid robotics research · IIT Roorkee', copy: 'Integrated navigation, perception and collision-aware manipulation in a hospital-like environment.', tag: 'INTERNSHIP' },
  { year: '2024–25', title: 'Logistics coBot · e-Yantra', copy: 'Built UR5 manipulation and eBot navigation for autonomous package sorting and delivery in simulation and on hardware.', tag: 'COMPETITION' },
  { year: 'Next', title: 'Systems Engineer · DLTX', copy: 'Upcoming systems-engineering role at Dai-ichi Life Techno Cross in Japan.', tag: 'WORK' },
]

export const profile = {
  name: 'Ajan Muthuraj', email: 'ajanm2003@gmail.com', github: 'https://github.com/AjanM27', linkedin: 'https://www.linkedin.com/in/ajanmuthuraj/', location: 'India → Japan', resume: '/Ajan_Muthuraj_Resume.pdf',
}
