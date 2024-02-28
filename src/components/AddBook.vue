<template>
    <div>
       <button 
          @click="openAddBookModal" 
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          aria-controls="addBookModal" 
          aria-expanded="false">
            Add New Book
        </button>
       <Modal ref="addBookModalRef" id="addBookModal" aria-modal="true" role="dialog">
            <form @submit.prevent="addNewBook">
                 <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    {{ errorMessage }}
                </div>
                <div>
                    <label for="bookTitle" class="block text-gray-700 text-sm font-bold mt-4 mb-2">Title:</label>
                    <input id="bookTitle" type="text" name="title" v-model="title" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" aria-label="Book Title"/>
                </div>
                <div>
                    <label for="bookGenre" class="block text-gray-700 text-sm font-bold mt-4 mb-2">Genre:</label>
                    <input id="bookGenre" type="text" name="genre" v-model="genre" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" aria-label="Book Genre"/>
                </div>
                <div>
                    <label for="bookPageCount" class="block text-gray-700 text-sm font-bold mt-4 mb-2">Page Count:</label>
                    <input id="bookPageCount" type="text" name="pagecount" v-model="pageCount" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" aria-label="Page Count"/>
                </div>

                <div class="flex items-center justify-between mt-6">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" aria-label="Add Book">
                        Add Book
                    </button>
                </div>
            </form>
        </Modal>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';
import { computed, ref, defineEmits } from 'vue';
import { useUserStore } from '@/stores/user';
import { useBooksStore } from '@/stores/books';
import Modal from '../components/Modal.vue';

const userStore = useUserStore();
const bookStore = useBooksStore();
const addBookModalRef = ref(null);
const title = ref('');
const genre = ref('');
const pageCount = ref(0);
const errorMessage = ref('');

function openAddBookModal() {
  addBookModalRef.value.openModal();
}

function closeAddBookModal() {
  addBookModalRef.value.closeModal();
}
// Handle the submission of the new book form
const addNewBook = async () => {
    try {
        const user = computed(() => userStore.user);
        const bookId = uuidv4();
        const formData = {
            id: bookId,
            userId: user.value.id,
            title: title.value,
            genre: genre.value,
            pageCount: Number(pageCount.value),
            pagesRead: 0, 
            finished: false,
            progressUpdates: [],
            review: null,
            rating: null
        }
        await bookStore.addNewBook(formData);
        title.value = '';
        genre.value = '';
        pageCount.value = 0;

        closeAddBookModal();
        errorMessage.value = '';
    } catch (error) {
        errorMessage.value = 'Failed to add the book. Please try again.';
        console.error('Error registering user:', error);
    }
}
</script>
