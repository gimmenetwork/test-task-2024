import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Login } from '@/services/auth/api'



export const useAuthStore = defineStore('auth', () => {

  // const loggedInUser= ref({})

  async function authLogin(email:string, password:string) {
    const userData = await Login(email, password)
    // const user = userData?.filter((user:User) => email === user.email && password === user.password)
    return userData[0] 
  }


  return { authLogin }
})
