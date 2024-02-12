<template>
  <form 
    @submit.prevent="handleRegistration" 
    class="bg-amber-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    aria-label="Registration Form"
    >
    <div>
      <label class="block text-gray-700 text-sm font-bold mt-4 mb-2" for="name">Name:</label>
      <input 
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" 
        id="name" 
        v-model="formData.name"
        aria-required="true"
        aria-label="Name" 
        required>
    </div>
    <div>
      <label class="block text-gray-700 text-sm font-bold mt-4 mb-2" for="email">Email:</label>
      <input 
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="email" 
        id="email" 
        v-model="formData.email"
        aria-required="true"
        aria-label="Email" 
        required>
    </div>
    <div>
      <label class="block text-gray-700 text-sm font-bold mt-4 mb-2" for="password">Password:</label>
      <input 
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="password" 
        id="password" 
        v-model="formData.password" 
        aria-required="true"
        aria-label="Password"
        required>
    </div>
    <div class="flex items-center justify-between mt-6">
      <button 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
        type="submit"
        aria-label="Register User"
        >
        Register
      </button>
    </div>
  </form>
</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = {
  name: '',
  email: '',
  password: ''
};

//Handles the registration process
const handleRegistration = async () => {
  try {
    // Make an HTTP POST request to your JSON server endpoint
    await axios.post('http://localhost:3000/users', formData);

        // Clear the form data after successful registration
    formData.value = { name: '', email: '', password: '' };


    router.push('/login');

  } catch (error) {

    console.error('Error registering user:', error);
  }
};
</script>
