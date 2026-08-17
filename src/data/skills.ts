import { projects } from './profile'

export type SkillNode = { name: string; description: string; projectIds: string[] }
export type SkillCluster = { id: string; name: string; color: string; description: string; skills: SkillNode[] }

const projectsWith = (names: string[]) => projects.filter((project) => project.tags.some((tag) => names.includes(tag))).map((project) => project.id)
const skill = (name: string, description: string, projectIds: string[] = []) => ({ name, description, projectIds })

/** A curated recruiter-facing map, not an exhaustive inventory. */
export const skillConstellation: SkillCluster[] = [
  { id: 'robotics', name: 'ROBOTICS & AUTONOMY', color: '#7ef2cb', description: 'Navigation, simulation, planning, and coordinated robot systems.', skills: [
    skill('ROS 2', 'Multi-robot workflow documented in the swarm navigation project.', ['swarm-rl']), skill('Nav2', 'Autonomous navigation stack capability.'), skill('MoveIt 2', 'Motion-planning and manipulation capability.'), skill('Gazebo', 'Simulation environment and plugin work.', projectsWith(['Gazebo', 'Gazebo Classic'])), skill('RViz', 'Robot visualisation and navigation inspection capability.'), skill('TF2', 'Coordinate-frame management for robot systems.'), skill('SLAM', 'Shared occupancy-grid navigation work.', ['multi-robot-slam']), skill('AMCL', 'Robot localisation capability.'), skill('OMPL', 'Motion-planning library capability.'), skill('RRT / RRT*', 'Sampling-based planning used by the interactive local planner.', ['adaptive-rrt']), skill('A*', 'Deterministic planning comparison in the local planner.', ['adaptive-rrt']), skill('EKF', 'State-estimation capability.'), skill('PID / LQR', 'Feedback-control capability.'), skill('Autonomous Navigation', 'End-to-end navigation system design.'), skill('Multi-Robot / Swarm', 'Coordinated robot workflows.', ['swarm-rl']),
  ] },
  { id: 'ai', name: 'AI / PERCEPTION', color: '#9bb5ff', description: 'Learning, vision, localisation, and perceptual intelligence.', skills: [
    skill('PyTorch', 'Deep-learning workflow capability.'), skill('YOLOv8', 'Object-detection capability.'), skill('OpenCV', 'Computer-vision pipelines.'), skill('Reinforcement Learning', 'Learning-driven robotics workflow.', ['swarm-rl']), skill('DDQN / TD3 / PPO', 'Representative reinforcement-learning methods.'), skill('ArUco', 'Visual fiducial perception capability.'), skill('RGB-D Perception', 'Depth-aware perception capability.'),
  ] },
  { id: 'programming', name: 'PROGRAMMING', color: '#ffca83', description: 'Core language and scripting foundations.', skills: [
    skill('Python', 'Planning, swarm, and AI project work.', projectsWith(['Python'])), skill('C++', 'Simulation plugins, rover, and embedded work.', projectsWith(['C++'])), skill('MATLAB', 'Multi-robot SLAM navigation simulation.', ['multi-robot-slam']), skill('Bash', 'Systems and workflow scripting.'),
  ] },
  { id: 'embedded', name: 'EMBEDDED / HARDWARE', color: '#f58cad', description: 'Hardware-facing prototypes, sensing, and robot platforms.', skills: [
    skill('ESP32', 'Wi-Fi communication session.', ['esp32-chat']), skill('Arduino', 'Embedded prototyping capability.'), skill('EasyEDA / PCB Design', 'Electronics and board-design capability.'), skill('Intel RealSense', 'RGB-D sensing platform.'), skill('LiDAR', 'Range-sensing capability.'), skill('IMU', 'Inertial sensing used in rover work.', ['gesture-rover']), skill('UR5', 'Industrial robot platform capability.'),
  ] },
  { id: 'tools', name: 'TOOLS / ENGINEERING', color: '#b9a8ff', description: 'Development, deployment, and mechanical-design tools.', skills: [
    skill('Docker', 'Portable development and runtime environments.'), skill('Git / GitHub', 'Version control and collaboration.'), skill('Linux', 'Robotics and systems development environment.'), skill('CUDA', 'GPU-accelerated compute capability.'), skill('Fusion 360', 'Mechanical CAD capability.'), skill('AutoCAD', 'Technical design and drafting capability.'),
  ] },
]

export const allSkills = skillConstellation.flatMap((cluster) => cluster.skills.map((item) => ({ ...item, cluster })))
