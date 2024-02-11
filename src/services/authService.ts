import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { User, AuthResponse } from '@/types';

const API_URL = 'http://localhost:3001';

export const AuthService = {
    async register(userData: User): Promise<AuthResponse> {
        // Checks if user exists
        const { data: existingUsers } = await axios.get<User[]>(
            `${API_URL}/users?username=${userData.username}`
        );
        if (existingUsers.length > 0) {
            /* TODO: handle error better - notification */
            throw new Error('Username not available');
        }
        // Adds id and an empty books [] upon registartion
        const emptyUserObj = { ...userData, id: uuidv4(), books: [] };
        const { data: newUser } = await axios.post<User>(
            `${API_URL}/users`,
            emptyUserObj
        );

        const token = newUser.id || 'mock-token';
        return { token, user: newUser };
    },

    async login({ username, password }: User): Promise<AuthResponse> {
        const { data: users } = await axios.get<User[]>(
            `${API_URL}/users?username=${username}&password=${password}`
        );
        if (users.length === 0) {
            /* TODO: handle error better - notification */
            throw new Error('Username or password incorrect');
        }

        const user = users[0];
        const token = user.id || 'mock-token';
        return { token, user };
    },
};
