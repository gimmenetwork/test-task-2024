import type { User } from '@/types/auth/User'

export function useLocalStorage() {
  function getStorageItem(key: string) {
    try {
      const user = localStorage.getItem(key)
      return user && JSON.parse(user)
    } catch (error) {
      console.log(error)
      return false
    }
  }

  function setStorageItem(key: string, value: string) {
    try {
      const data = localStorage.setItem(key, value)
      return data
    } catch (e) {
      console.log(e)
    }
  }

  function removeStorageItem(key: string) {
    try {
      const data = localStorage.removeItem(key)
      return data
    } catch (e) {
      console.log(e)
    }
  }

  function localStorageSetup(key: string, value: User) {
    try {
      const user = localStorage.getItem(key)

      if (user && JSON.parse(user).email === value.email) {
        localStorage.setItem(key, JSON.stringify(value))
        return
      } else {
        localStorage.removeItem(key)
        localStorage.setItem(key, JSON.stringify(value))
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { localStorageSetup, getStorageItem, removeStorageItem, setStorageItem }
}
