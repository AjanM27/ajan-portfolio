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
    outcome: 'Evaluated the learned policy against moving safe and target zones in simulation. Precision among states predicted safe reached 94.4% on the two-obstacle map.',
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
    id: 'collective-navigation', title: 'Collective Navigation for Multi-Robot Swarms', shortTitle: 'Collective swarm navigation', domain: 'ME5253 · Network Dynamics & Controls',
    summary: 'A MATLAB simulation of a robot swarm navigating an unknown environment, extending the decentralized flocking framework of Olcay et al.',
    challenge: 'Local flocking alone gives robots little memory of where they have been. It can also leave the group trapped in a maze or jittering under noisy range measurements.',
    build: 'Added three stages to the baseline: shared occupancy-grid memory through a SLAM layer, Deadlock Detection and Recovery (DDR), and a Delayed Self-Reinforcement (DSR) filter for noisy sensing.',
    outcome: 'Compared goal convergence and exploration coverage against the baseline in simulated corridor mazes.',
    role: 'Co-authored with Aadityanshu Abhinav for ME5253, Network Dynamics & Controls in Mechanical Engineering at IIT Madras.',
    tags: ['MATLAB', 'Decentralized flocking', 'Occupancy grids', 'Deadlock recovery', 'DSR'], href: 'https://github.com/AjanM27/Multi-Robot-SLAM-Navigation',
    media: { src: 'https://raw.githubusercontent.com/AjanM27/Multi-Robot-SLAM-Navigation/main/Demonstrations/DSR_Maze.gif', label: 'MATLAB maze simulation with delayed self-reinforcement', width: 640, height: 360 }, collaborative: true,
    evidenceLinks: [{ label: 'Baseline paper by Olcay et al.', url: 'https://doi.org/10.1016/j.robot.2020.103604' }],
  },
  {
    id: 'humanoid', title: 'Autonomous Humanoid Navigation and Manipulation', shortTitle: 'Humanoid navigation', domain: 'Research internship',
    summary: 'At IIT Roorkee, I worked on a simulated humanoid that navigates to a table, locates a cup and plans a grasp.',
    challenge: 'Move from detecting an object to navigating, localizing it in 3D and executing a collision-aware grasp as one system.',
    build: 'Created the Gazebo/URDF simulation and integrated Nav2, SLAM, YOLOv9, depth localization, MoveIt 2, TRAC-IK and OctoMap.',
    outcome: 'I reported about 96.6% grasp success across 30 trials in the simulated setup.',
    role: 'Robot simulation, navigation, perception, 3D localization and manipulation integration.',
    tags: ['ROS 2', 'Nav2', 'MoveIt 2', 'YOLOv9', 'Gazebo'], href: 'https://www.youtube.com/watch?v=mj8LEdT97FQ', linkLabel: 'Watch the full humanoid simulation demo',
    media: { src: '/media/humanoid-hospital.webp', label: 'Humanoid simulation screenshot from the co-authored IIT Roorkee SPARK poster', width: 790, height: 365 },
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
    id: 'adaptive-rrt', title: 'Adaptive RRT* · Replanning on the Move', shortTitle: 'Adaptive RRT*', domain: 'Motion planning · collaboration',
    summary: 'A side-by-side comparison of planners that repair routes when obstacles move.',
    challenge: 'Replan quickly enough for a changing scene without throwing away every useful part of the previous search.',
    build: 'Implemented and compared Adaptive RRT*, RRT*, A*, Adaptive A* and LPA* across dynamic scenarios.',
    outcome: 'Benchmarked path length and replanning behavior across dynamic simulation scenarios; see the linked repository for comparisons and baseline definitions.',
    role: 'Collaborative algorithm implementation, simulation design and planner evaluation.',
    tags: ['RRT*', 'LPA*', 'Python', 'Pygame', 'Planning'], href: 'https://github.com/AjanM27/Dynamic-Path-Planning-with-Adaptive-RRT-',
    media: { src: '/media/adaptive-rrt-simulation.webp', label: 'Original planner capture showing the search tree, path and moving obstacle', width: 711, height: 686 },
    gallery: [{ src: '/media/adaptive-rrt-replanning.svg', label: 'Replanning schematic showing the blocked route and detour' }],
    collaborative: true,
  },
  {
    id: 'logistics-cobot', title: 'Logistic coBot · From Docking to Pick-and-Place', shortTitle: 'UR5 and eBot', domain: 'e-Yantra · IIT Bombay',
    summary: 'Our team built a logistics system that used a mobile rover and a robot arm to sort and move packages.',
    challenge: 'Bring the eBot into position, locate the package and get the arm to pick and place it.',
    build: 'Used MoveIt 2 Servo and ArUco-based pose estimates for the UR5. The eBot combined EKF-based localization with ultrasonic docking.',
    outcome: 'We tested the integrated system in Gazebo and on physical hardware at IIT Bombay.',
    role: 'I worked on both the manipulation and mobile-robot sides, including package localization and sensor-guided docking.',
    tags: ['ROS 2', 'MoveIt 2', 'UR5', 'ArUco', 'EKF', 'Ultrasonic sensors'],
    href: 'https://www.linkedin.com/in/ajanmuthuraj/', linkLabel: 'Project details on LinkedIn',
    media: { src: '/media/logistic-cobot-simulation.webp', label: 'Project simulation with the UR5 arm, eBot and tagged packages', width: 754, height: 501 },
    evidenceLinks: [{ label: 'Official e-Yantra competition themes', url: 'https://portal.e-yantra.org/past-themes' }],
    collaborative: true,
  },
  {
    id: 'cubitect', title: 'Cubitect · Modular Robot Cubes', shortTitle: 'Cubitect', domain: 'Electronics Club · Project lead',
    summary: 'I led work on cubes designed to move and connect so they could form a structure together.',
    challenge: 'A cube needs a way to move without an external drive, and the group needs a way to assign each cube a destination.',
    build: 'Explored reaction-wheel actuation and controlled toppling. Built a vision-based tracking and assignment pipeline using A* and the Hungarian algorithm.',
    outcome: 'Developed the actuation and coordination approach and worked on a ROS 2 and Gazebo test environment.',
    role: 'Project lead across the mechanical concept, actuation, simulation and multi-cube coordination.',
    tags: ['Reaction wheels', 'ROS 2', 'Gazebo', 'A*', 'Hungarian algorithm'],
    href: 'https://www.linkedin.com/in/ajan-muthuraj/', linkLabel: 'Cubitect on LinkedIn',
    media: { src: '/media/cubitect-prototypes.webp', label: 'Cubitect prototypes with visual tracking markers on the cube faces', width: 1920, height: 1309 },
    collaborative: true,
  },
  {
    id: 'geoguide', title: 'GeoGuide · The Vision-Guided Rover', shortTitle: 'GeoGuide rover', domain: 'e-Yantra · IIT Bombay',
    summary: 'Our rover followed routes through a physical arena using event detections from an overhead camera.',
    challenge: 'Classify events, work out where they are on the map and send the rover to the right places in priority order.',
    build: 'Used OpenCV and ResNet-50 for event classification, Dijkstra for routes, and ArUco/QGIS for positioning and georeferencing. The ESP32 received commands over Wi-Fi/TCP.',
    outcome: 'Built a working prototype that combined overhead localization and planning with on-robot IR line following.',
    role: 'Worked on the team’s vision-guided navigation and the interfaces between the laptop and rover.',
    tags: ['OpenCV', 'ResNet-50', 'Dijkstra', 'ArUco', 'ESP32', 'TCP'],
    href: 'https://www.linkedin.com/in/ajan-muthuraj/', linkLabel: 'GeoGuide on LinkedIn',
    media: { src: '/media/geoguide-arena.webp', label: 'GeoGuide’s ArUco-marked arena beside the georeferenced QGIS map', width: 1920, height: 881 },
    evidenceLinks: [{ label: 'Official e-Yantra competition themes', url: 'https://portal.e-yantra.org/past-themes' }],
    collaborative: true,
  },
  {
    id: 'solar-tracker', title: 'Sunseeker · Dual-Axis Solar Tracker', shortTitle: 'Solar tracker', domain: 'IIT Madras · Instrumentation and control',
    summary: 'A physical controls project that adjusts a solar panel in two axes as the light direction changes.',
    challenge: 'Use low-cost light sensors to estimate how to turn the panel, then correct the angle with feedback.',
    build: 'Compared light readings across directions and used PID feedback to drive two servos. Designed mechanical parts in Fusion 360 and added an OLED readout.',
    outcome: 'Integrated the sensing, two-axis mechanism and feedback controller in a working course prototype.',
    role: 'Worked across CAD, sensor and actuator integration, feedback control and voltage monitoring.',
    tags: ['PID', 'LDRs', 'Servo control', 'Fusion 360', 'Embedded systems'],
    href: 'https://www.linkedin.com/in/ajan-muthuraj/', linkLabel: 'Solar tracker on LinkedIn',
    media: { src: '/media/sunseeker-prototype.webp', label: 'Bench prototype with the solar panel, two-axis mount and control electronics', width: 1920, height: 1040 },
  },
  {
    id: 'gesture-rover', title: 'Gesture-Controlled Defence Rover', shortTitle: 'Gesture rover', domain: 'Embedded prototype',
    summary: 'An early project where hand movements drove a small rover and a servo-operated arm.',
    challenge: 'Translate motion and flex-sensor readings into commands that the rover and arm can execute over a wireless link.',
    build: 'Used an MPU6050, flex sensing and Arduino sketches. The rover received motor commands over 433 MHz RF, and the arm received servo commands over nRF24L01.',
    outcome: 'Published transmitter and receiver sketches for both the rover and the arm.',
    role: 'Built an educational prototype spanning sensing, radio communication and motor and servo control.',
    tags: ['Arduino C++', 'MPU6050', 'RF', 'Servo control'],
    href: 'https://github.com/AjanM27/Gesture-Controlled-Defence-Rover',
    media: { src: '/media/gesture-rover-illustration.webp', label: 'AI illustration based on the four-wheel rover and its deck-mounted robotic arm', width: 1536, height: 1024 },
    gallery: [{ src: '/media/gesture-rover-prototype.webp', label: 'Original rover and arm prototype photo' }],
    evidenceLinks: [{ label: 'ESP32 TCP workshop example', url: 'https://github.com/AjanM27/Elec-club-session-wifi-chat-between-2-esp32s' }],
  },
  {
    id: 'gazebo-tooling', title: 'Gazebo Test Bench · Models, Worlds and C++ Plugins', shortTitle: 'Gazebo tooling', domain: 'Simulation tooling',
    summary: 'Small examples that helped me understand how robot descriptions, sensors and simulator plugins fit together.',
    challenge: 'Isolate simulator behaviors so I can inspect one sensor, model or plugin at a time.',
    build: 'Collected C++ plugin examples for model motion, world changes and frame capture, plus mobile-robot models with depth and LiDAR sensing.',
    outcome: 'Published CMake-based plugin projects, reusable model assets and a ROS 1 launch example.',
    role: 'Built and documented reusable examples for testing Gazebo Classic behavior.',
    tags: ['C++', 'CMake', 'Gazebo Classic', 'SDF', 'URDF', 'ROS 1'],
    href: 'https://github.com/AjanM27/GazeboPlugins',
    media: { src: '/media/gazebo-test-bench-illustration.webp', label: 'AI illustration of a mobile robot testing LiDAR and depth sensing in a simulated world', width: 1536, height: 1024 },
    evidenceLinks: [
      { label: 'Gazebo robot and sensor models', url: 'https://github.com/AjanM27/GazeboModels' },
      { label: 'ROS 1 robot package', url: 'https://github.com/AjanM27/my_robot-package' },
    ],
  },
  {
    id: 'transcript-ner', title: 'Transcript NER · Finding Sensitive Text', shortTitle: 'Transcript NER', domain: 'Applied ML assignment',
    summary: 'A Python assignment for finding and evaluating personally identifiable text spans in speech-style transcripts.',
    challenge: 'Translate token predictions into exact character spans and measure both detection quality and latency.',
    build: 'Implemented DistilBERT token classification, BIO-to-span decoding and rule-based validation.',
    outcome: 'Published scripts for training, exact-span precision/recall/F1 evaluation and batch-size-one latency measurement.',
    role: 'Built the model pipeline and the scripts that make its outputs and timing inspectable.',
    tags: ['Python', 'PyTorch', 'DistilBERT', 'Model evaluation'],
    href: 'https://github.com/AjanM27/pii-ner-assignment',
    media: { src: '/media/transcript-ner-illustration.webp', label: 'AI illustration of sensitive text spans detected in a speech transcript', width: 1536, height: 1024 },
  },
]

export const projectGroups: { id: string; label: string; projectIds: string[] }[] = [
  { id: 'selected', label: 'Highlights', projectIds: ['isaac-drone', 'logistics-cobot', 'reach-avoid', 'humanoid'] },
  { id: 'navigation', label: 'Navigation & planning', projectIds: ['isaac-drone', 'adaptive-rrt', 'reach-avoid', 'geoguide'] },
  { id: 'manipulation', label: 'Manipulation & integration', projectIds: ['logistics-cobot', 'humanoid', 'cubitect'] },
  { id: 'multi-robot', label: 'Multi-robot systems', projectIds: ['swarm-rescue', 'collective-navigation', 'swarm-rl', 'cubitect'] },
  { id: 'embedded', label: 'Embedded & controls', projectIds: ['geoguide', 'gesture-rover', 'solar-tracker', 'cubitect'] },
  { id: 'software', label: 'Simulation & software', projectIds: ['gazebo-tooling', 'transcript-ner', 'isaac-drone'] },
  { id: 'all', label: 'All projects', projectIds: projects.map((project) => project.id) },
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
    projectId: 'humanoid', linkLabel: 'See humanoid navigation and manipulation',
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
