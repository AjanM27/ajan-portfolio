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

  it('switches the robotics system readout', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('tab', { name: '03Decide' }))

    expect(screen.getByRole('heading', { name: 'Decide' })).toBeInTheDocument()
    expect(screen.getByText('Planning, learning and safety-aware policies')).toBeInTheDocument()
  })
})
