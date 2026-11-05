export type Project = {
  id: string
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
  linkLabel?: string
  media?: { src: string; label: string; width: number; height: number }
  evidenceLinks?: { label: string; url: string }[]
  gallery?: { src: string; label: string }[]
  clips?: { src: string; poster: string; label: string }[]
  collaborative?: boolean
}

export const projectGroups: { id: string; label: string; projectIds: string[] }[] = [
  { id: 'selected', label: 'Highlights', projectIds: ['isaac-drone', 'logistics-cobot', 'reach-avoid', 'humanoid'] },
  { id: 'navigation', label: 'Navigation & planning', projectIds: ['isaac-drone', 'adaptive-rrt', 'reach-avoid'] },
  { id: 'manipulation', label: 'Manipulation & integration', projectIds: ['logistics-cobot', 'humanoid'] },
  { id: 'multi-robot', label: 'Multi-robot systems', projectIds: ['swarm-rescue', 'multi-robot-slam', 'swarm-rl'] },
]

export const projects: Project[] = [
  {
    id: 'isaac-drone', title: 'Autonomous UAV exploration in Isaac Sim', shortTitle: 'Isaac Sim UAV', domain: 'Autonomy stack',
    summary: 'I built a ROS 2 stack for quadrotors to map and explore indoor environments in Isaac Sim.',
    challenge: 'How does a drone explore a warehouse when it starts without a map?',
    build: 'Connected Isaac Sim, ArduPilot SITL, ROS 2 and RTAB-Map, then added collision-aware 3D frontier selection and multi-drone launch workflows.',
    outcome: 'Recorded a nine-drone simulation. The repository includes container definitions, a flight-controller profile, launch instructions and benchmark tools.',
    role: 'I integrated simulated sensors with flight control and mapping, then added frontier selection and multi-drone launches.',
    tags: ['Isaac Sim', 'ROS 2', 'ArduPilot', 'RTAB-Map', 'Python'], href: 'https://github.com/AjanM27/isaac-sim-drone-autonomy',
    media: { src: '/media/isaac-drone-demo.jpg', label: 'Simulation viewport from the nine-drone Isaac Sim recording', width: 1280, height: 720 },
    evidenceLinks: [{ label: 'Watch the nine-drone Isaac Sim demo', url: 'https://www.youtube.com/watch?v=07T3-0PnAlo' }],
  },
  {
    id: 'reach-avoid', title: 'Reach–avoid RL in time-varying environments', shortTitle: 'Reach–avoid RL', domain: 'B.Tech thesis',
    summary: 'For my B.Tech thesis, I trained a double deep Q-network (DDQN) to reach a moving target while avoiding obstacles that also move.',
    challenge: 'A policy that only sees position cannot distinguish identical locations at different times when the safe and target sets are moving.',
    build: 'Augmented the state with time, corrected baseline implementation issues, and trained a DDQN against a discounted reach–avoid Bellman objective.',
    outcome: 'In the thesis simulation, grid rollout success was 79.5% and 76.0% across two environments. Precision among states predicted safe reached 94.4% on the two-obstacle map.',
    role: 'I formulated the problem, designed the environments, implemented and trained the model, and ran the evaluation.',
    tags: ['DDQN', 'PyTorch', 'Safe RL', 'Gym', 'Dynamic systems'], href: 'https://github.com/AjanM27/ddqn-reach-avoid-rl',
    media: { src: 'https://raw.githubusercontent.com/AjanM27/ddqn-reach-avoid-rl/main/docs/images/learned-value-rollout-action.png', label: 'Actual project evaluation figure · value, rollout and action', width: 1200, height: 400 },
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
    id: 'swarm-rescue', title: 'Swarm Rescue Challenge · ten-drone autonomous exploration', shortTitle: 'Swarm Rescue', domain: 'Research · competition',
    summary: 'An autonomous ten-UAV search-and-rescue system for GPS-denied, obstacle-rich environments, developed collaboratively at IIT Madras.',
    challenge: 'Coordinate exploration, localization and shared maps despite moving hazards and imperfect information.',
    build: 'The team integrated FastSLAM with ICP scan matching, adaptive frontier exploration, temporal occupancy-grid fusion and hazard avoidance.',
    outcome: 'Second among Indian teams at the 2025–26 Swarm Rescue Challenge. Related research appeared as a poster at the ICRA 2026 XPLORE Workshop.',
    role: 'Collaborative multi-drone autonomy research and integration; see the official results and co-authored poster for team attribution.',
    tags: ['Swarm robotics', 'FastSLAM', 'ICP', 'Frontier exploration', 'Map fusion'],
    href: 'https://openreview.net/forum?id=tbvhPL9Ftk', linkLabel: 'ICRA 2026 XPLORE workshop poster',
    media: { src: '/media/swarm-rescue-cover.webp', label: 'Illustrated Swarm Rescue project cover supplied by Ajan Muthuraj', width: 1100, height: 619 }, collaborative: true,
    evidenceLinks: [
      { label: 'Official challenge results', url: 'https://www.ip-paris.fr/en/news/swarm-rescue-challenge-final-2025-2026-save-lives-controlling-swarm-drones' },
    ],
  },
  {
    id: 'multi-robot-slam', title: 'Multi-robot SLAM and temporal map fusion', shortTitle: 'Multi-robot SLAM', domain: 'Research · collaboration',
    summary: 'A team project on sharing occupancy maps and getting multiple robots unstuck during exploration.',
    challenge: 'Robots can get stuck pursuing the same frontier when their local maps disagree.',
    build: 'Combined temporal map fusion, deadlock detection and delayed self-reinforcement with coordinated frontier-based exploration.',
    outcome: 'The repository documents simulated maze exploration and shared map updates.',
    role: 'Collaborative research and engineering across navigation, mapping and evaluation.',
    tags: ['Multi-robot', 'SLAM', 'Map fusion', 'MATLAB', 'Control'], href: 'https://github.com/AjanM27/Multi-Robot-SLAM-Navigation',
    media: { src: 'https://raw.githubusercontent.com/AjanM27/Multi-Robot-SLAM-Navigation/main/Demonstrations/DSR_Maze.gif', label: 'Actual collaborative project simulation capture', width: 640, height: 360 }, collaborative: true,
  },
  {
    id: 'humanoid', title: 'Hospital humanoid navigation and manipulation', shortTitle: 'Hospital humanoid', domain: 'Research internship',
    summary: 'At IIT Roorkee, I worked on a simulated hospital robot that navigates to a table, locates a cup and plans a grasp.',
    challenge: 'Move from detecting an object to navigating, localizing it in 3D and executing a collision-aware grasp as one system.',
    build: 'Created the Gazebo/URDF simulation and integrated Nav2, SLAM, YOLOv9, depth localization, MoveIt 2, TRAC-IK and OctoMap.',
    outcome: 'I reported about 96.6% grasp success across 30 trials in the simulated setup.',
    role: 'Robot simulation, navigation, perception, 3D localization and manipulation integration.',
    tags: ['ROS 2', 'Nav2', 'MoveIt 2', 'YOLOv9', 'Gazebo'], href: 'https://www.youtube.com/watch?v=mj8LEdT97FQ', linkLabel: 'Watch the full humanoid simulation demo',
    media: { src: '/media/humanoid-hospital.webp', label: 'Hospital simulation screenshot from the co-authored IIT Roorkee SPARK poster', width: 790, height: 365 },
    clips: [
      { label: 'Navigation in Gazebo', src: '/media/humanoid-navigation.mp4', poster: '/media/humanoid-navigation-poster.webp' },
      { label: 'Cup manipulation in Gazebo and RViz', src: '/media/humanoid-manipulation.mp4', poster: '/media/humanoid-manipulation-poster.webp' },
    ],
    evidenceLinks: [{ label: 'Internship results on LinkedIn', url: 'https://www.linkedin.com/in/ajan-muthuraj/' }],
  },
  {
    id: 'swarm-rl', title: 'RL-based swarm navigation', shortTitle: 'Swarm RL', domain: 'Inter-IIT · collaboration',
    summary: 'A ROS 2 and Gazebo swarm workflow for navigation in dynamic warehouse environments.',
    challenge: 'Coordinate many robots without turning perception, mapping and policy execution into independent demos.',
    build: 'Worked across LiDAR clustering, map merging, TD3-oriented training assets, simulation and operator visualization.',
    outcome: 'The repository includes recorded runs, training checkpoints and launch configurations for four- and five-robot simulations.',
    role: 'Collaborative swarm robotics and simulation work with the IIT Madras team.',
    tags: ['Swarm robotics', 'ROS 2', 'Gazebo', 'TD3', 'Python'], href: 'https://github.com/AjanM27/Swarm_RL_InterIIT',
    media: { src: 'https://raw.githubusercontent.com/AjanM27/Swarm_RL_InterIIT/main/Videos/Large%20Swarm.gif', label: 'Project simulation capture', width: 1280, height: 720 }, collaborative: true,
  },
  {
    id: 'adaptive-rrt', title: 'Adaptive planning around moving obstacles', shortTitle: 'Adaptive RRT*', domain: 'Motion planning · collaboration',
    summary: 'A side-by-side comparison of planners that repair routes when obstacles move.',
    challenge: 'Replan quickly enough for a changing scene without throwing away every useful part of the previous search.',
    build: 'Implemented and compared Adaptive RRT*, RRT*, A*, Adaptive A* and LPA* across dynamic scenarios.',
    outcome: 'Benchmarked path length and replanning behavior across dynamic simulation scenarios; see the linked repository for comparisons and baseline definitions.',
    role: 'Collaborative algorithm implementation, simulation design and planner evaluation.',
    tags: ['RRT*', 'LPA*', 'Python', 'Pygame', 'Planning'], href: 'https://github.com/AjanM27/Dynamic-Path-Planning-with-Adaptive-RRT-',
    media: { src: 'https://raw.githubusercontent.com/AjanM27/Dynamic-Path-Planning-with-Adaptive-RRT-/main/trimmed.gif', label: 'Project planning demonstration', width: 1030, height: 681 }, collaborative: true,
  },
  {
    id: 'logistics-cobot', title: 'Package handling with a UR5 and eBot', shortTitle: 'UR5 and eBot', domain: 'e-Yantra · IIT Bombay',
    summary: 'Our team built a logistics system that used a mobile rover and a robot arm to sort and move packages.',
    challenge: 'Bring the eBot into position, locate the package and get the arm to pick and place it.',
    build: 'Used MoveIt 2 Servo and ArUco-based pose estimates for the UR5. The eBot combined EKF-based localization with ultrasonic docking.',
    outcome: 'We tested the integrated system in Gazebo and on physical hardware at IIT Bombay.',
    role: 'I worked on both the manipulation and mobile-robot sides, including package localization and sensor-guided docking.',
    tags: ['ROS 2', 'MoveIt 2', 'UR5', 'ArUco', 'EKF', 'Ultrasonic sensors'],
    href: 'https://www.linkedin.com/in/ajanmuthuraj/', linkLabel: 'Project details on LinkedIn',
    evidenceLinks: [{ label: 'Official e-Yantra competition themes', url: 'https://portal.e-yantra.org/past-themes' }],
    collaborative: true,
  },
]

export const interests = [
  {
    title: 'Motion planning and decision-making',
    question: 'When an obstacle moves, how much of the old plan can a robot reuse? I want to compare faster replanning with ways to reason about uncertainty before choosing a route.',
    projectId: 'adaptive-rrt', linkLabel: 'See the planner comparison',
  },
  {
    title: 'Perception and control for humanoids',
    question: 'How much pose error can a grasp tolerate? I want to trace what happens from the camera estimate through inverse kinematics to contact, and find where the robot should stop and try again.',
    projectId: 'humanoid', linkLabel: 'See the hospital humanoid',
  },
  {
    title: 'Vision-language-action models and RL',
    question: 'I’d like to test where a vision-language-action (VLA) policy helps with manipulation, where a classical planner still helps, and what a fair evaluation would look like. My starting point is the experience I gained training and evaluating policies in my RL thesis.',
    projectId: 'reach-avoid', linkLabel: 'See the reinforcement learning thesis',
  },
  {
    title: 'Swarm robotics',
    question: 'How much should each robot tell the others when the network is unreliable? I’m interested in what to share so a team can keep exploring when maps disagree or messages arrive late.',
    projectId: 'swarm-rescue', linkLabel: 'See the Swarm Rescue project',
  },
]

export const profile = {
  email: 'ajanm2003@gmail.com', github: 'https://github.com/AjanM27', linkedin: 'https://www.linkedin.com/in/ajan-muthuraj/', resume: '/Ajan_Muthuraj_Resume.pdf',
}
