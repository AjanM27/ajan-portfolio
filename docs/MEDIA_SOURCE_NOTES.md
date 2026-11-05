# Portfolio evidence and media notes

This branch improves the existing website without replacing its architecture.

## Source-backed updates
- The humanoid research poster supplied by Ajan identifies a simulated hospital-assistance robot using **YOLOv9**, a simulated RealSense D435i depth camera, ROS 2, Nav2, MoveIt 2 and TRAC-IK. The site now uses YOLOv9.
- The Reach–Avoid BTP poster reports grid rollout success of **79.5% and 76.0%** in two environments, with **94.4%** predicted-safe precision in the dual-obstacle map. The learned DDQN policy should **not** be described as having unconditional formal safety guarantees.
- The separate Swarm Rescue project cites the official results and the ICRA 2026 XPLORE workshop poster.
- Reach–Avoid plots are real project images from the linked source repository.
- The two YouTube videos were supplied as project recordings; their exact titles and project associations remain **unverified**, so they are labelled neutrally.

## Media still awaiting direct upload
The source photo of the hospital robot and the edited GIFs provided in the conversation are not publicly hosted in this repository. Therefore, this branch does **not** claim to have incorporated those binary files, and the representative image in the humanoid card remains clearly labelled. A subsequent binary upload should replace it with the actual hospital simulation screenshot. When the original MP4s for the two YouTube links are available, optimized MP4 loops can be added to the correct project cards.

## Review checklist
- Confirm the two YouTube videos belong to the user and rename each demo.
- Replace the humanoid stock visual with the original screenshot supplied by Ajan.
- Check copyright and collaborator permission before publishing any simulation assets.
- Run: `npm ci && npm run lint && npm test && npm run build`.
- Verify mobile layout, image loads, video links and the official research links.
- Merge only after review; `main` deploys the live GitHub Pages website.
