export type Project = {
  id: string
  title: string
  category: 'Robotics' | 'Autonomy' | 'AI' | 'Embedded'
  summary: string
  challenge: string
  contribution: string
  tags: string[]
  source: string
  status: string
}

export const profile = {
  name: 'Ajan Muthuraj',
  role: 'Robotics & autonomous-systems engineer',
  tagline: 'I build practical systems where motion planning, navigation, learning, and embedded hardware meet.',
  education: {
    institution: 'Indian Institute of Technology Madras (IIT Madras)',
    degree: 'B.Tech — Mechanical Engineering',
    status: 'Graduated',
  },
  links: {
    email: 'ajanm2003@gmail.com',
    github: 'https://github.com/AjanM27',
    linkedin: 'https://www.linkedin.com/in/ajanmuthuraj/',
  },
}

export const experience = [
  {
    company: 'Dai-ichi Life Techno Cross (DLTX)',
    location: 'Japan',
    date: '2026+',
    role: 'Systems Engineer',
    status: 'UPCOMING',
    detail: 'Upcoming systems-engineering role.',
    source: '',
  },
  {
    company: 'IIT Madras — Swarm Rescue Challenge team',
    location: 'Palaiseau, France',
    date: '2025–2026',
    role: 'Team member',
    status: 'COMPETITION',
    detail: 'Member of the IIT Madras team that placed second in the 2025–2026 Swarm Rescue Challenge final.',
    source: 'https://www.ip-paris.fr/en/news/swarm-rescue-challenge-final-2025-2026-save-lives-controlling-swarm-drones',
    linkLabel: 'View Result',
  },
  {
    company: 'IIT Madras — course and team projects',
    location: 'Chennai, India',
    date: '2023–2026',
    role: 'Robotics / autonomy project work',
    status: 'PROJECT EXPERIENCE',
    detail: 'Course and team projects in motion planning, multi-robot navigation, Gazebo simulation, and swarm-navigation workflows.',
    source: 'https://github.com/AjanM27',
    linkLabel: 'View Projects',
  },
]

export const projects: Project[] = [
  {
    id: 'adaptive-rrt', title: 'Dynamic Path Planning with Adaptive RRT*', category: 'Autonomy', status: 'PUBLIC REPOSITORY',
    summary: 'A Python/Pygame simulation for real-time 2D robot path planning around static and moving obstacles.',
    challenge: 'Plan and replan when an obstacle interrupts a previously valid route.',
    contribution: 'Implemented and documented an adaptive RRT* approach alongside RRT*, A*, Adaptive A*, and LPA* baselines for an ED5215 course project.',
    tags: ['Python', 'Pygame', 'NumPy', 'Shapely', 'RRT*'], source: 'https://github.com/AjanM27/Dynamic-Path-Planning-with-Adaptive-RRT-'
  },
  {
    id: 'gazebo-plugins', title: 'Gazebo Classic Plugin Collection', category: 'Robotics', status: 'PUBLIC REPOSITORY',
    summary: 'A C++/CMake collection of Gazebo Classic model, world, and system plugins for robotics simulation.',
    challenge: 'Extend a simulation environment with reusable runtime behavior rather than configuration assets alone.',
    contribution: 'Public source implements SDF-driven runtime model insertion through Gazebo transport and a system plugin that connects to pre-render events and the GUI camera.',
    tags: ['C++', 'CMake', 'Gazebo Classic', 'SDF', 'Simulation'], source: 'https://github.com/AjanM27/GazeboPlugins'
  },
  {
    id: 'ros-robot-description', title: 'ROS Robot Description & Simulation Package', category: 'Robotics', status: 'PUBLIC REPOSITORY',
    summary: 'A ROS/catkin robot-description package combining a wheeled robot model, launch configuration, and Gazebo integration.',
    challenge: 'Compose a usable simulation-ready robot description across geometry, sensor links, joints, and launch assets.',
    contribution: 'Public package includes URDF/Xacro, launch and world files, and a model with chassis, continuous wheel joints, camera, and Hokuyo LiDAR links.',
    tags: ['ROS', 'Catkin', 'URDF/Xacro', 'Gazebo', 'LiDAR'], source: 'https://github.com/AjanM27/my_robot-package'
  },
  {
    id: 'multi-robot-slam', title: 'Multi-Robot SLAM Navigation', category: 'Robotics', status: 'PUBLIC REPOSITORY',
    summary: 'A MATLAB simulation of collective navigation for a multi-robot swarm in an unknown environment.',
    challenge: 'Coordinate decentralized agents while they build and share environmental context.',
    contribution: 'Course work for ME5253 at IIT Madras: shared occupancy-grid SLAM, deadlock detection/recovery, and Delayed Self-Reinforcement over a flocking baseline.',
    tags: ['MATLAB', 'SLAM', 'Occupancy grids', 'Multi-robot'], source: 'https://github.com/AjanM27/Multi-Robot-SLAM-Navigation'
  },
  {
    id: 'swarm-rl', title: 'RL-Based Swarm Navigation', category: 'Robotics', status: 'PUBLIC REPOSITORY',
    summary: 'A Bharat Forge swarm-navigation project associated with the 13th Inter-IIT Tech Meet team from IIT Madras.',
    challenge: 'Provide an executable multi-robot workflow across simulation, launch, visualization, and interface layers.',
    contribution: 'Repository documents ROS 2 Humble, Gazebo Classic, multi-robot launch files, a PyGame visualizer, Streamlit interface, and Groq inference integration.',
    tags: ['ROS 2', 'Gazebo', 'Reinforcement learning', 'Streamlit', 'Python'], source: 'https://github.com/AjanM27/Swarm_RL_InterIIT'
  },
  {
    id: 'gesture-rover', title: 'Gesture-Controlled Defence Rover', category: 'Embedded', status: 'PUBLIC REPOSITORY',
    summary: 'A public C++ rover repository exploring gesture-driven robotic control.',
    challenge: 'Connect human input with a robotic vehicle-control workflow.',
    contribution: 'A C++ rover prototype exploring gesture-driven robotic control.',
    tags: ['C++', 'Robotics', 'Embedded systems'], source: 'https://github.com/AjanM27/Gesture-Controlled-Defence-Rover'
  },
  {
    id: 'esp32-chat', title: 'ESP32 Wi-Fi Chat Session', category: 'Embedded', status: 'PUBLIC REPOSITORY',
    summary: 'An electronics-club session repository for Wi-Fi communication between two ESP32 devices.',
    challenge: 'Make embedded networking approachable in a hands-on fresher session.',
    contribution: 'The public repository records an electronics-club session coordinated by Ajan on 26 October 2023.',
    tags: ['ESP32', 'C++', 'Wi-Fi', 'Electronics'], source: 'https://github.com/AjanM27/Elec-club-session-wifi-chat-between-2-esp32s'
  },
  {
    id: 'pii-ner', title: 'PII Named-Entity Recognition', category: 'AI', status: 'PUBLIC REPOSITORY',
    summary: 'A Python repository for a PII NER assignment.',
    challenge: 'Apply natural-language processing to sensitive-entity recognition.',
    contribution: 'A Python PII-NER assignment applying named-entity recognition to sensitive information.',
    tags: ['Python', 'NLP', 'Named-entity recognition'], source: 'https://github.com/AjanM27/pii-ner-assignment'
  },
]

export const skillGroups = [
  { name: 'Robotics & navigation', color: '#7ef2cb', description: 'Planning and coordinated navigation', skills: ['ROS 2', 'Gazebo', 'SLAM', 'Motion planning', 'RRT*', 'Occupancy grids'], evidence: 'Adaptive RRT*, multi-robot SLAM/navigation, and ROS/Gazebo repositories' },
  { name: 'Perception & learning', color: '#9bb5ff', description: 'Learning-oriented technical work', skills: ['Reinforcement learning', 'NLP', 'PII NER', 'NumPy'], evidence: 'Swarm RL workflow and PII NER project repositories' },
  { name: 'Programming', color: '#ffca83', description: 'Core implementation tools', skills: ['Python', 'C++', 'MATLAB', 'Bash'], evidence: 'Public robotics, simulation, embedded, and AI repositories' },
  { name: 'Embedded & tooling', color: '#f58cad', description: 'Hardware-facing prototyping', skills: ['ESP32', 'Wi-Fi', 'Git', 'Linux'], evidence: 'ESP32 Wi-Fi session and rover-oriented project repositories' },
]

// Update this compact list to keep the portfolio's "Lab / Now" panel current.
// Each item is intentionally editorial and should only state work you are comfortable publishing.
export const labNow = [
  { label: 'Exploring', title: 'Path planning interactions', detail: 'A bounded browser RRT demo that makes planning decisions visible without pretending to be a full simulator.', tone: 'mint' },
  { label: 'Building with', title: 'Robotics software tools', detail: 'ROS, Gazebo, planning, navigation, and simulation-oriented project work.', tone: 'blue' },
  { label: 'Next', title: 'Systems engineering in Japan', detail: 'Upcoming Systems Engineer role at Dai-ichi Life Techno Cross (DLTX), presented as future employment.', tone: 'amber' },
]
