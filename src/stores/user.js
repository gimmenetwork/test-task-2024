// auth.js
import { defineStore } from 'pinia';

import { handleRegistrationApi, getUsers } from '@/api/api';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    isUserLoggedIn: false,
    user: null
  }),
  actions: {
    async login(email, password) {
      try {
          const users = await getUsers();
          
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
    async handleRegistration(formData) {
      try {  
        await handleRegistrationApi(formData);
      } catch (error) {
        throw error
      }
    },
    async logout() {
      // Clear authentication state and user information on logout
      this.isUserLoggedIn = false;
      this.user = null;
    },
  },
});
