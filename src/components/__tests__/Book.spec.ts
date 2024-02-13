import { fireEvent, render, screen } from '@testing-library/vue'
import { expect, describe, it, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import BookView from '@/components/BookView.vue'

describe('Books', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should find a book from user books', async () => {
    render(BookView)

    const value = await screen.findByText('Lies To Love')

    expect(value.innerHTML).toBe('Lies To Love')
  })

  it('should click a button to add books', async () => {
    render(BookView)

    const reviewButton = await screen.findByText('Add new book')
    await fireEvent.click(reviewButton)
    const value = await screen.findByText('Book Page Count')

    //asert
    expect(value.innerHTML).toBe('Book Page Count')
  })
  it('should click a button to add progress', async () => {
    render(BookView)

    const progressButton = await screen.findAllByText('Add new progress')
    await fireEvent.click(progressButton[0])
    const value = await screen.findByText('Add your progress')

    //asert
    expect(value.innerHTML).toBe('Add your progress')
  })
})
