<template>
  <form 
    @submit.prevent="handleLogin" 
    class="bg-amber-100 w-full shadow-md rounded flex-1 px-8 pt-6 pb-8 mb-4"
    aria-label="Login Form" >
    <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
      {{ errorMessage }}
    </div>
    <div>
      <label class="block text-gray-700 text-sm font-bold mt-4 mb-2" for="email">Email:</label>
      <input 
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="email" 
        id="email" 
        v-model="formData.email"
        aria-label="Email Address" 
        aria-required="true" 
        required>
    </div>
    <div>
      <label class="block text-gray-700 text-sm font-bold mt-4 mb-2" for="password">Password:</label>
      <input 
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        id="password" 
        v-model="formData.password" 
        type="password"
        aria-label="Password" 
        aria-required="true" 
        required>
    </div>
    <div class="flex items-center justify-between mt-6">
      <button 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
        type="submit" 
        aria-label="Submit Log in">
          Log In
      </button>
    </div>
  </form>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();

const userStore = useUserStore();
const errorMessage = ref('');
const formData = {
  email: '',
  password: ''
};

const handleLogin = async () => {
  try {
    // Call the login action from the authentication store
    await userStore.login(formData.email, formData.password);
    // Clear the form after successful login
    formData.email = '';
    formData.password = '';
    router.push('/');

  } catch (error) {
    console.error('Error logging in:', error);
    errorMessage.value = 'Failed to log in. Please check your credentials and try again.';
  }
};
</script>
