import { expect, describe, it } from 'vitest'
import { useLocalStorage } from '@/composables/useLocalStorage'
import type { User } from '@/types/auth/User'

describe('useLocalStorage', () => {
  it('should get item from localstorage', () => {
    const { localStorageSetup, getStorageItem } = useLocalStorage()
    const key = 'test'
    const value: User = {
      id: '1234',
      email: 'test@test.com',
      password: 'test',
      firstname: 'test',
      lastname: 'test'
    }
    localStorageSetup(key, value)
    const item = getStorageItem(key)

    expect(item).toStrictEqual(value)
  })
})
