<template>
  <div class="max-w-sm bg-yellow-100 rounded overflow-hidden shadow-lg">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ book.title }}</div>
      <p class="text-gray-700 text-base">
        Genre: {{ book.genre }}
      </p>
      <p class="text-gray-700 text-base">
        Pages: {{ book.pageCount }}
      </p>
       <p class="text-gray-700 text-base">
        Progress: {{ book.progress }}
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <button @click="openUpdateProgressModal" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors">Update Progress</button>
    </div>
    
    <!-- Modal -->
    <Modal ref="updateProgressModalRef">
            <form @submit.prevent="handleUpdateProgress">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-4 mb-2" for="email">Progress:</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="progress" required>
                </div>
               
                <div class="flex items-center justify-between mt-6">
                    <button @click="addNewBook" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Update Progress
                    </button>
                </div>
            </form>
    </Modal>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import Modal from '../components/Modal.vue';

// Define props using `defineProps`
const props = defineProps({
  book: {
    type: Object,
    required: true
  }
});

const progress = ref(''); // Initialize the progress as an empty string or any default value
const updateProgressModalRef = ref(null);
// Define a method to open the modal
const openUpdateProgressModal = () => {
  // Logic to open modal
    updateProgressModalRef.value.openModal();
};

// Define a method to handle the form submission for updating progress
const handleUpdateProgress = async (book) => {
  // Logic to update the book's progress
    const response = await axios.get('http://localhost:3000/books');
    const resBooks = response.data; // Assume the API returns an array of book objects
    
    // Access the book directly from props
     const bookIndex = resBooks.findIndex(book => book.id === props.book.id);
    
    if (bookIndex !== -1) {
      // Update the progress of the book in the array
      resBooks[bookIndex].progress = progress.value;

      // Assuming you have an endpoint to update the book's progress
      await axios.put(`http://localhost:3000/books/${props.book.id}`, {
        ...resBooks[bookIndex],
        progress: progress.value
      });
      // You might want to update the local state or emit an event to notify the parent component of the update
    }
};
</script>

<style>
/* Add styles here if needed */
</style>
