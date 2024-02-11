<template>
    <div>
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

<script>
import axios from 'axios';
import BookCard from './BookCard.vue';

export default {
  components: {
    BookCard
  },
  data() {
    return {
      books: [] // Initialize books as an empty array
    }
  },
  async mounted() {
    await this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3000/books');
        this.books = response.data; // Assume the API returns an array of book objects
      } catch (error) {
        console.error('Failed to fetch books:', error);
        // Handle the error appropriately
      }
    }
  }
}
</script>