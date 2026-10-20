export type Project = {
  id: string
  index: string
  title: string
  shortTitle: string
  domain: string
  summary: string
  outcome: string
  role: string
  tags: string[]
  href: string
  image?: string
  visual: 'drone' | 'image' | 'humanoid'
  featured?: boolean
  collaborative?: boolean
}

export const projects: Project[] = [
  {
    id: 'isaac-drone',
    index: '01',
    title: 'Autonomous UAV exploration in Isaac Sim',
    shortTitle: 'Isaac Sim UAV',
    domain: 'Autonomy stack',
    summary: 'A reproducible quadrotor research platform connecting Isaac Sim, ArduPilot SITL, ROS 2, RTAB-Map and collision-aware 3D frontier exploration.',
    outcome: 'From simulated sensors to mapping, planning, flight control and multi-drone trials in one documented stack.',
    role: 'System integration, simulation, flight control, SLAM and autonomous exploration.',
    tags: ['Isaac Sim', 'ROS 2', 'ArduPilot', 'RTAB-Map', 'Python'],
    href: 'https://github.com/AjanM27/isaac-sim-drone-autonomy',
    visual: 'drone',
    featured: true,
  },
  {
    id: 'reach-avoid',
    index: '02',
    title: 'Reach–avoid RL in time-varying environments',
    shortTitle: 'Time-varying DDQN',
    domain: 'B.Tech research',
    summary: 'A DDQN framework for navigation where safe and target sets move over time, using a time-augmented state and discounted reach–avoid Bellman updates.',
    outcome: 'Evaluated safety and liveness across moving obstacles, moving targets and learned value-function slices.',
    role: 'Environment design, baseline correction, DDQN training, evaluation and thesis research.',
    tags: ['DDQN', 'PyTorch', 'Safe RL', 'Gym', 'Dynamic systems'],
    href: 'https://github.com/AjanM27/ddqn-reach-avoid-rl',
    image: 'https://raw.githubusercontent.com/AjanM27/ddqn-reach-avoid-rl/main/docs/images/learned-value-time-slices.png',
    visual: 'image',
    featured: true,
  },
  {
    id: 'multi-robot-slam',
    index: '03',
    title: 'Multi-robot SLAM and temporal map fusion',
    shortTitle: 'Multi-robot SLAM',
    domain: 'Research · collaboration',
    summary: 'Collective navigation with shared occupancy-grid memory, deadlock detection and recovery, and delayed self-reinforcement under noisy sensing.',
    outcome: 'The wider multi-robot exploration work was accepted for a poster presentation at the ICRA 2026 XPLORE Workshop.',
    role: 'Collaborative research and engineering across multi-robot navigation, mapping and evaluation.',
    tags: ['Multi-robot', 'SLAM', 'Map fusion', 'MATLAB', 'Control'],
    href: 'https://github.com/AjanM27/Multi-Robot-SLAM-Navigation',
    image: 'https://raw.githubusercontent.com/AjanM27/Multi-Robot-SLAM-Navigation/main/Demonstrations/DSR_Maze.gif',
    visual: 'image',
    featured: true,
    collaborative: true,
  },
  {
    id: 'humanoid',
    index: '04',
    title: 'Hospital humanoid navigation and manipulation',
    shortTitle: 'Humanoid system',
    domain: 'Research internship',
    summary: 'A ROS 2 humanoid workflow combining Gazebo simulation, SLAM, Nav2, YOLOv8-based perception, depth localization and collision-aware MoveIt 2 manipulation.',
    outcome: 'Approximately 96.6% grasp success across 30 reported experimental trials.',
    role: 'Robot simulation, navigation, perception, 3D localization and manipulation integration.',
    tags: ['ROS 2', 'Nav2', 'MoveIt 2', 'YOLOv8', 'Gazebo'],
    href: 'https://www.linkedin.com/in/ajanmuthuraj/',
    visual: 'humanoid',
    featured: true,
  },
  {
    id: 'swarm-rl',
    index: '05',
    title: 'RL-based swarm navigation',
    shortTitle: 'Swarm RL',
    domain: 'Inter-IIT · collaboration',
    summary: 'A multi-robot learning workflow spanning ROS 2, Gazebo, TD3-oriented training assets, visualization and operator interfaces.',
    outcome: 'Developed with the IIT Madras team for the 13th Inter-IIT Tech Meet challenge by Bharat Forge.',
    role: 'Collaborative swarm robotics and simulation work; repository retained with team attribution.',
    tags: ['Swarm robotics', 'ROS 2', 'Gazebo', 'RL', 'Python'],
    href: 'https://github.com/AjanM27/Swarm_RL_InterIIT',
    image: 'https://raw.githubusercontent.com/AjanM27/Swarm_RL_InterIIT/main/Videos/Large%20Swarm.gif',
    visual: 'image',
    collaborative: true,
  },
  {
    id: 'adaptive-rrt',
    index: '06',
    title: 'Adaptive planning around moving obstacles',
    shortTitle: 'Adaptive RRT*',
    domain: 'Motion planning · collaboration',
    summary: 'A visual planning environment comparing Adaptive RRT*, RRT*, A*, Adaptive A* and LPA* as obstacles invalidate routes.',
    outcome: 'Reported paths were approximately 12% shorter on average in the evaluated dynamic scenarios.',
    role: 'Collaborative algorithm implementation, simulation design and planner evaluation.',
    tags: ['RRT*', 'LPA*', 'Python', 'Pygame', 'Planning'],
    href: 'https://github.com/AjanM27/Dynamic-Path-Planning-with-Adaptive-RRT-',
    image: 'https://raw.githubusercontent.com/AjanM27/Dynamic-Path-Planning-with-Adaptive-RRT-/main/trimmed.gif',
    visual: 'image',
    collaborative: true,
  },
]

export const systemNodes = [
  { id: 'sense', label: 'Sense', detail: 'RGB, depth, LiDAR, IMU and range sensing', tools: ['OpenCV', 'YOLOv8', 'LiDAR', 'Depth'] },
  { id: 'locate', label: 'Locate', detail: 'State estimation, SLAM and shared mapping', tools: ['RTAB-Map', 'SLAM', 'EKF', 'OctoMap'] },
  { id: 'decide', label: 'Decide', detail: 'Planning, learning and safety-aware policies', tools: ['RRT*', 'DDQN', 'Frontiers', 'Nav2'] },
  { id: 'act', label: 'Act', detail: 'Flight, locomotion and manipulation control', tools: ['ArduPilot', 'MoveIt 2', 'PID', 'ROS 2'] },
  { id: 'collaborate', label: 'Collaborate', detail: 'Swarm coordination and multi-robot map fusion', tools: ['Swarm RL', 'Map fusion', 'ROS 2', 'Control'] },
]

export const milestones = [
  { year: '2026', title: 'ICRA XPLORE Workshop', copy: 'Multi-robot frontier-based exploration under uncertainty with SLAM and temporal map fusion accepted for a poster presentation.', tag: 'RESEARCH' },
  { year: '2026', title: 'B.Tech · IIT Madras', copy: 'Mechanical Engineering graduate; thesis focused on reach–avoid reinforcement learning with time-varying safe and target zones.', tag: 'EDUCATION' },
  { year: '2025', title: 'Humanoid robotics research', copy: 'Integrated navigation, perception and collision-aware manipulation for a hospital-like humanoid robot environment.', tag: 'INTERNSHIP' },
  { year: '2024–25', title: 'Logistics coBot · e-Yantra', copy: 'UR5 manipulation and eBot mobile navigation for autonomous package sorting and delivery in simulation and on hardware.', tag: 'COMPETITION' },
  { year: 'Next', title: 'Systems Engineer · DLTX', copy: 'Upcoming systems-engineering role at Dai-ichi Life Techno Cross in Japan.', tag: 'WORK' },
]

export const profile = {
  name: 'Ajan Muthuraj',
  email: 'ajanm2003@gmail.com',
  github: 'https://github.com/AjanM27',
  linkedin: 'https://www.linkedin.com/in/ajanmuthuraj/',
  location: 'India → Japan',
}
