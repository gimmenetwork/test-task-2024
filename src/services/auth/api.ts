import axios from 'axios'
import type { User } from '@/types/auth/User'

export const Login = async (email: string, password: string) => {
  const users = await axios.get('http://localhost:3000/users')
  const data: User[] = users.data
  const loggedInUser = data?.filter(
    (user: User) => email === user.email && password === user.password
  )
  //find user with login details
  return loggedInUser
}

export const Register = async (registerData: User) => {
  const users = await axios.post('http://localhost:3000/users', registerData)
  console.log('return on register', users)
  return users.data
  // const data: User[] = users.data
  // const loggedInUser = data?.filter((user:User) => email === user.email && password === user.password)
  // //find user with login details
  // return loggedInUser
}

export const Logout = async () => {
  try {
    localStorage.removeItem('user')
    return true
  } catch (e) {
    console.log(e)
  }
  return
}
