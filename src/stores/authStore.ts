import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Login, Register, Logout } from '@/services/auth/api'
import type { User } from '@/types/auth/User'

export const useAuthStore = defineStore('auth', () => {
  const loggedInUser = ref<User>()

  async function authLogin(email: string, password: string) {
    const userData = await Login(email, password)
    loggedInUser.value = userData[0]
    return userData[0]
  }

  async function authRegister(data: User) {
    const userData = await Register(data)
    return userData
  }

  async function authLogout() {
    const loggedOut = await Logout()
    return loggedOut
  }

  return { authLogin, authRegister, authLogout, loggedInUser }
})
