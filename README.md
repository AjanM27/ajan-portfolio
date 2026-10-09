# Ajan Muthuraj — Engineering Portfolio

[![Live portfolio](https://img.shields.io/badge/Live_Portfolio-Open-0F766E?style=for-the-badge)](https://ajanm27.github.io/ajan-portfolio/)
[![GitHub Pages](https://img.shields.io/badge/Deployed_with-GitHub_Pages-222?style=for-the-badge&logo=github)](https://github.com/AjanM27/ajan-portfolio/actions/workflows/deploy-pages.yml)

An interactive portfolio presenting my work across robotics, autonomous
systems, motion planning, multi-robot navigation, AI, and embedded engineering.

## Highlights

- Evidence-linked project archive covering planning, SLAM, swarm navigation,
  simulation, AI, and hardware prototypes.
- Interactive technical-skills constellation.
- Browser-based RRT/RRT* and A* planning playground.
- Professional experience, education, competition work, and contact channels.
- Responsive, accessible interface designed for desktop and mobile viewing.

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

## Deployment

Pushes to `main` are built and deployed automatically by
[the Pages workflow](.github/workflows/deploy-pages.yml). Vite uses the
`/ajan-portfolio/` base path so generated assets resolve correctly on the
GitHub Pages project site.

## Links

- [Live portfolio](https://ajanm27.github.io/ajan-portfolio/)
- [GitHub profile](https://github.com/AjanM27)
- [LinkedIn](https://www.linkedin.com/in/ajanmuthuraj/)
