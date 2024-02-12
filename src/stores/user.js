// auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    isUserLoggedIn: false,
    user: null
  }),
  actions: {
    async login(email, password) {
        try {
            // Make an HTTP request to fetch users
            const response = await axios.get('http://localhost:3000/users');
            const users = response.data;
            
            // Check if the provided email and password match with any user
            const matchedUser = users.find(user => user.email === email && user.password === password);
            
            if (matchedUser) {
              // Update authentication state and user information if login is successful
              this.isUserLoggedIn = true;
              this.user = matchedUser;
    
            } else {
              throw new Error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            throw new Error('Login failed. Please check your credentials.');
        }
    },
    async logout() {
      // Clear authentication state and user information on logout
      this.isUserLoggedIn = false;
      this.user = null;

      // Clear the token from local storage or session storage
      localStorage.removeItem('token');
    },
  },
});
