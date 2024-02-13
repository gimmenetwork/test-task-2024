import { fireEvent, render, screen } from '@testing-library/vue'
import { expect, describe, it, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useLocalStorage } from '@/composables/useLocalStorage'
import type { User } from '@/types/auth/User'
import HomeView from '@/views/HomeView.vue'

describe('Users', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should get user data', async () => {
    render(HomeView)

    vi.waitFor(async () => {
      const value = await screen.findByText('john doe')

      expect(value.innerHTML).toBe('john doe')
    })
  })

  it('should go to login page on logout button click', async () => {
    const { getStorageItem, setStorageItem, removeStorageItem } = useLocalStorage()
    render(HomeView)

    vi.waitFor(async () => {
      const logoutButton = await screen.findByText('logout')
      await fireEvent.click(logoutButton)
      const elementToFind = await screen.findByText('Sign in to your account')

      //Mock empty storage data
      const key = 'test'
      const value: User = {
        id: '1234',
        email: 'test@test.com',
        password: 'test',
        firstname: 'test',
        lastname: 'test'
      }
      setStorageItem(key, JSON.stringify(value))
      removeStorageItem(key)
      const item = getStorageItem(key)

      // const MockLocalStorage = () => ({
      //   getItem: {
      //     "id": "67f8997g87g8665554",
      //     "email": "johndoe@mail.com",
      //     "password": "pass1234",
      //     "firstname": "john",
      //     "lastname": "doe"
      //   },
      //   removeItem: () => null
      // })

      // const logOut = MockLocalStorage().removeItem()

      expect(elementToFind.innerHTML).toBe('Sign in to your account')
      expect(item).toStrictEqual(null)
    }, 2000)
  })
})
