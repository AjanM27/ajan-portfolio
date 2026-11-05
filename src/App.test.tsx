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
    fireEvent.click(screen.getByRole('tab', { name: 'Hospital humanoid' }))
    expect(screen.getByLabelText('Navigation in Gazebo')).toHaveAttribute('src', expect.stringMatching(/\/media\/humanoid-navigation\.mp4$/))
    expect(screen.getByRole('link', { name: 'Watch the full humanoid simulation demo' })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=mj8LEdT97FQ')
  })

  it('makes the résumé and learning interests easy to find', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'View résumé' })).toHaveAttribute('href', expect.stringMatching(/\/Ajan_Muthuraj_Resume\.pdf$/))
    expect(screen.getByText('Vision-language-action models and RL')).toBeInTheDocument()
    expect(screen.getByText('“Anything can be learnt.”')).toBeInTheDocument()
    expect(screen.getAllByText(/Systems Engineer at Dai-ichi Life Techno Cross/)).toHaveLength(2)
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
