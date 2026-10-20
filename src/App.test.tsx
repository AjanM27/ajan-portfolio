// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('portfolio interactions', () => {
  afterEach(() => cleanup())

  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', IntersectionObserverStub)
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
  })

  it('switches project category and case-study tabs', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('tab', { name: 'Autonomy03' }))
    fireEvent.click(screen.getByRole('tab', { name: /Time-varying DDQN/ }))

    expect(screen.getByRole('heading', { name: 'Reach–avoid RL in time-varying environments' })).toBeInTheDocument()
    expect(screen.getByText('DDQN')).toBeInTheDocument()
  })

  it('switches the engineering method readout', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('tab', { name: /Stress the interfaces/ }))

    expect(screen.getByRole('heading', { name: 'Most robotics failures live between good subsystems.' })).toBeInTheDocument()
    expect(screen.getByText(/stale maps, noisy sensing/)).toBeInTheDocument()
  })

  it('offers the resume from the header and about section', () => {
    render(<App />)

    const links = screen.getAllByRole('link', { name: /résumé/i })
    expect(links.length).toBeGreaterThanOrEqual(2)
    expect(links[0].getAttribute('href')).toMatch(/\/Ajan_Muthuraj_Resume\.pdf$/)
  })
})
