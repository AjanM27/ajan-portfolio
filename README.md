# Ajan Muthuraj — Robotics & Autonomous Systems Portfolio

[![Live portfolio](https://img.shields.io/badge/Live_Portfolio-Open-0F766E?style=for-the-badge)](https://ajanm27.github.io/ajan-portfolio/)
[![GitHub Pages](https://img.shields.io/badge/Deployed_with-GitHub_Pages-222?style=for-the-badge&logo=github)](https://github.com/AjanM27/ajan-portfolio/actions/workflows/deploy-pages.yml)

An interactive, recruiter-oriented portfolio presenting robotics work from
sensing to action: UAV autonomy, safe reinforcement learning, multi-robot
mapping, motion planning, humanoid navigation, perception, and manipulation.

## Highlights

- Scroll-led one-page narrative with sticky transitions and motion-aware reveals.
- Keyboard-accessible tabs for flagship work, autonomy, multi-robot systems,
  embodied robotics, and the sense–locate–decide–act–collaborate loop.
- Evidence-linked project case studies with clear role and collaboration labels.
- Live public GitHub feed that updates from the GitHub API without a redeploy.
- Research, education, competition work, systems-engineering trajectory, and
  direct contact channels.
- Responsive layout and reduced-motion support for desktop and mobile.

## Technology

- React 19 and TypeScript
- Vite
- Vitest and Testing Library
- Lucide icons
- GitHub Actions and GitHub Pages

## Live GitHub activity

The “What I’m working on” section requests Ajan's public repository feed from
GitHub's API in the visitor's browser, sorts it by recent pushes, and shows the
latest described projects while excluding profile, portfolio, and duplicate
workspace repositories. No token or secret is embedded. If GitHub is
unavailable or rate-limited, the interface falls back to a curated set of
flagship repositories.

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
