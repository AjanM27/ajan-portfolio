# Ajan Muthuraj — Robotics Systems Portfolio

[![Live portfolio](https://img.shields.io/badge/Live_Portfolio-Open-0F766E?style=for-the-badge)](https://ajanm27.github.io/ajan-portfolio/)
[![GitHub Pages](https://img.shields.io/badge/Deployed_with-GitHub_Pages-222?style=for-the-badge&logo=github)](https://github.com/AjanM27/ajan-portfolio/actions/workflows/deploy-pages.yml)

A recruiter-oriented portfolio for Ajan Muthuraj, Systems Engineer at DLTX and
IIT Madras Mechanical Engineering graduate. The selected work covers UAV
autonomy, safe reinforcement learning, multi-robot mapping, motion planning,
humanoid navigation, perception, and manipulation.

## Highlights

- Eight case studies grouped by navigation and planning, manipulation and
  integration, and multi-robot systems. Project links can be shared directly.
- Keyboard-accessible project tabs, touch-friendly filters and expandable
  research interests.
- Source-backed Reach-Avoid RL figures, official Swarm Rescue and ICRA research links,
  and project-linked YouTube recordings with short, locally hosted humanoid simulation clips.
- An about section and direct résumé, GitHub, LinkedIn and email links.
- Responsive layout and reduced-motion support for desktop and mobile.

## Technology

- React 19 and TypeScript
- Vite
- Vitest and Testing Library
- Lucide icons
- GitHub Actions and GitHub Pages

## Local development

~~~bash
npm ci
npm run dev
~~~

Quality checks:

~~~bash
npm run lint
npm test
npm run build
~~~

The previous assessments remain under `quality/`. The current recruiter
scorecard uses three Lighthouse runs, desktop and mobile visual reviews,
and checks for recruiter scanning, interaction and reliability. Score a current
assessment with:

~~~bash
node scripts/score-quality.mjs quality/recruiter-scorecard.json path/to/assessment.json
~~~

## Deployment

Pushes to `main` are built and deployed automatically by
[the Pages workflow](.github/workflows/deploy-pages.yml). Vite uses the
`/ajan-portfolio/` base path so generated assets resolve correctly on the
GitHub Pages project site.

## Links

- [Live portfolio](https://ajanm27.github.io/ajan-portfolio/)
- [GitHub profile](https://github.com/AjanM27)
- [LinkedIn](https://www.linkedin.com/in/ajan-muthuraj/)
