<template>
    <div>
        <button @click="openAddBookModal" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Add New Book
        </button>
        <Modal ref="addBookModalRef">
            <form @submit.prevent="handleAddBook">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-4 mb-2" for="email">Title:</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="title" required>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-4 mb-2" for="password">Genre:</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="genre" required>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-4 mb-2" for="password">Page Count:</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="pageCount" required>
                </div>
                <div class="flex items-center justify-between mt-6">
                    <button @click="addNewBook" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add Book
                    </button>
                </div>
            </form>
        </Modal>
  </div>
</template>

<script setup>
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import Modal from '../components/Modal.vue';

const userStore = useUserStore();

const addBookModalRef = ref(null);
const title = ref('');
const genre = ref('');
const pageCount = ref(0);

function openAddBookModal() {
  addBookModalRef.value.openModal();
}

function closeAddBookModal() {
  addBookModalRef.value.closeModal();
}

const addNewBook = async () => {
    try {
        const user = computed(() => userStore.user);
        const bookId = uuidv4();
        const formData = {
            id: bookId,
            userId: user.value.id,
            title: title.value,
            genre: genre.value,
            pageCount: pageCount.value,
            progress: 0, // Initial progress
            finished: false, // Initial finished state
        }
        await axios.post('http://localhost:3000/books', formData);
        title.value = '';
        genre.value = '';
        pageCount.value = 0;

        closeAddBookModal();
    } catch (error) {
        // Handle any errors
        console.error('Error registering user:', error);
    }
}

// const handleLogin = async () => {
//   try {
//     // Call the login action from the authentication store
//     await userStore.login(formData.email, formData.password);
    
//     // Clear the form after successful login
//     formData.email = '';
//     formData.password = '';
//     router.push('/');
//     // Optionally, you can add logic to redirect the user to another page
//   } catch (error) {
//     console.error('Error logging in:', error);
//     errorMessage.value = 'Failed to log in. Please check your credentials and try again.';
//   }
// };
</script>
