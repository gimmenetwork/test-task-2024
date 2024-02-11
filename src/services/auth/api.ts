import axios from 'axios'
import type { User } from '@/types/auth/User'

export const Login = async (email:string, password:string) => {
    const users = await axios.get('http://localhost:3000/users')
    const data: User[] = users.data
    const loggedInUser = data?.filter((user:User) => email === user.email && password === user.password)
    //find user with login details   
    return loggedInUser

}