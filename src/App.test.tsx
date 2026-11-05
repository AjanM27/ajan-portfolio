// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('portfolio interactions', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/')
    Element.prototype.scrollIntoView = vi.fn()
  })

  afterEach(() => cleanup())

  it('filters projects and opens a case study', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Navigation & planning' }))
    fireEvent.click(screen.getByRole('tab', { name: 'Reach–avoid RL' }))
    expect(screen.getByRole('heading', { name: 'Reach–avoid RL in time-varying environments' })).toBeInTheDocument()
    expect(screen.getByText('DDQN')).toBeInTheDocument()
    expect(window.location.hash).toBe('#project=reach-avoid')
  })

  it('supports arrow keys and exposes the selected tab and its panel', () => {
    render(<App />)
    const initial = screen.getByRole('tab', { selected: true })
    initial.focus()
    fireEvent.keyDown(initial, { key: 'ArrowRight' })
    const next = screen.getByRole('tab', { name: 'UR5 and eBot', selected: true })
    expect(next).toHaveFocus()
    expect(initial).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('UR5 and eBot')
  })

  it('opens a shared project outside the default filter', () => {
    window.history.replaceState(null, '', '#project=swarm-rescue')
    render(<App />)
    expect(screen.getByRole('button', { name: 'Multi-robot systems', pressed: true })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Swarm Rescue', selected: true })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Official challenge results' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'ICRA 2026 XPLORE workshop poster' })).toBeInTheDocument()
  })

  it('keeps project recordings inside their cases', () => {
    render(<App />)
    expect(screen.queryByRole('heading', { name: 'Robotics simulations' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Watch the nine-drone Isaac Sim demo' })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=07T3-0PnAlo')
    fireEvent.click(screen.getByRole('tab', { name: 'Humanoid navigation' }))
    expect(screen.getByLabelText('Navigation in Gazebo')).toHaveAttribute('src', expect.stringMatching(/\/media\/humanoid-navigation\.mp4$/))
    expect(screen.getByRole('link', { name: 'Watch the full humanoid simulation demo' })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=mj8LEdT97FQ')
  })

  it('opens the renamed collective navigation case from its old link', () => {
    window.history.replaceState(null, '', '#project=multi-robot-slam')
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Collective Navigation for Multi-Robot Swarms' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Baseline paper by Olcay et al.' })).toHaveAttribute('href', 'https://doi.org/10.1016/j.robot.2020.103604')
    expect(window.location.hash).toBe('#project=collective-navigation')
  })

  it('lists all projects and shows a still illustration for Adaptive RRT*', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'All projects' }))
    expect(screen.getAllByRole('tab')).toHaveLength(14)
    fireEvent.click(screen.getByRole('tab', { name: 'Adaptive RRT*' }))
    expect(screen.getByRole('img', { name: /Illustration of the replanning strategy/ })).toHaveAttribute('src', expect.stringMatching(/adaptive-rrt-replanning\.svg$/))
    fireEvent.click(screen.getByRole('button', { name: 'Embedded & controls' }))
    fireEvent.click(screen.getByRole('tab', { name: 'GeoGuide rover' }))
    expect(screen.getByRole('heading', { name: 'GeoGuide overhead-vision rover' })).toBeInTheDocument()
  })

  it('makes the résumé and learning interests easy to find', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'View résumé' })).toHaveAttribute('href', expect.stringMatching(/\/Ajan_Muthuraj_Resume\.pdf$/))
    expect(screen.getByText('Vision-language-action models and RL')).toBeInTheDocument()
    expect(screen.getByText('“Anything can be learnt.”')).toBeInTheDocument()
    expect(screen.getByText(/Systems Engineer at Dai-ichi Life Techno Cross/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Systems Engineer, DLTX' })).toBeInTheDocument()
    expect(screen.getByText(/English, Hindi, Tamil and basic Japanese/)).toBeInTheDocument()
  })

  it('exposes mobile navigation state and closes it after navigation', () => {
    render(<App />)
    const menu = screen.getByRole('button', { name: 'Toggle navigation' })
    expect(menu).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(screen.getByRole('link', { name: 'Projects' }))
    expect(menu).toHaveAttribute('aria-expanded', 'false')
  })
})
