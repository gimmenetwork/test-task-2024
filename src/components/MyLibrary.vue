<template>
    <div class="w-full">
        <h3 class="text-3xl font-Roboto mt-10 mb-6 font-bold">My Library:</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <BookCard
                v-for="book in books"
                :key="book.id"
                :book="book"
            />
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import BookCard from './BookCard.vue';
import { ref, onMounted} from 'vue';
import { useBooksStore } from '@/stores/books'; // Import the books store from Pinia

const booksStore = useBooksStore();
const books = ref([]);

// Fetch books when the component is mounted
const fetchBooks = async () => {
    try {
        const response = await axios.get('http://localhost:3000/books');
        books.value = response.data; // Update the reactive books variable
        booksStore.setBooks(response.data); // Update the books store
    } catch (error) {
        console.error('Failed to fetch books:', error);
        // Handle the error appropriately
    }
};

// Define a reactive variable to store the books

// Call the fetchBooks function when the component is mounted
onMounted(fetchBooks);
</script>
