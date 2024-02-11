<template>
  <div v-if="book" class="max-w-sm bg-yellow-100 rounded overflow-hidden shadow-lg">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ book.title }}</div>
      <p class="text-gray-700 text-base">
        Genre: {{ book.genre }}
      </p>
      <p class="text-gray-700 text-base">
        Pages: {{ book.pageCount }}
      </p>
        
      <p class="text-gray-700 text-base">
        Pages Read: {{ book.pagesRead }}
      </p>
      <div v-if="book.review">
         <p class="text-gray-700 text-base">
            Review: {{ book.review }}
          </p>
          <p class="text-gray-700 text-base">
            Rating:
          </p><StarRating :rating="5.5" />
      </div>
    </div>
    <div class="px-6 pt-4 pb-2">
      <button v-if="!book.finished" @click="openUpdateProgressModal" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors">Update Progress</button>
      <button v-else @click="openLeaveReviewModal" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors">Leave Review</button>
    </div>
    
    <!-- Modal -->
    <Modal ref="updateProgressModalRef">
      <form @submit.prevent="handleUpdateProgress">
        <div>
          <label class="block text-gray-700 text-sm font-bold mt-4 mb-2" for="progress">How many pages did you read today?</label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="progress" v-model="pagesRead" required>
        </div>
        <div class="flex items-center justify-between mt-6">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Update Progress</button>
        </div>
      </form>
    </Modal>

    <Modal ref="leaveReviewModalRef">
      <form @submit.prevent="handleLeaveReview">
        <div>
          <label class="block text-gray-700 text-sm font-bold mt-4 mb-2" for="progress">Review:</label>
          <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="review" v-model="review" required></textarea>
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mt-4 mb-2" for="progress">Rating:</label>
           <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" max="5" step="any" type="number" id="rating" v-model="rating" required>
        </div>
        <div class="flex items-center justify-between mt-6">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Add Review</button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import Modal from '../components/Modal.vue';
import StarRating from './StarRating.vue'
import { useBooksStore } from '@/stores/books'; // Import the books store from Pinia

const booksStore = useBooksStore(); // Access the books store


// Define props using `defineProps`
const props = defineProps({
  bookId: {
    type: String,
    required: true
  }
});
const book = ref(null);

// Define refs
const pagesRead = ref('');
const review = ref('');
const rating = ref('');
const updateProgressModalRef = ref(null);
const leaveReviewModalRef = ref(null);

// Method to open the update progress modal
const openUpdateProgressModal = () => {
  updateProgressModalRef.value.openModal();
};

const openLeaveReviewModal = () => {
  leaveReviewModalRef.value.openModal();
};

// Method to handle updating the progress
const handleUpdateProgress = async () => {
  try {
    await booksStore.updateBookProgress(book.value.id, pagesRead.value);    
    // Make API call to get all books
  } catch (error) {
    console.error('Error updating progress:', error);
  }
  updateProgressModalRef.value.closeModal();
};

const handleLeaveReview = async () => {
  try {
      await booksStore.addReview(book.value.id, review.value, rating.value);    
      // Make API call to get all books
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  leaveReviewModalRef.value.closeModal();
}


onMounted(async () => {
  try {
    const bookData = await booksStore.getBookById(props.bookId);
    book.value = bookData;
  } catch (error) {
    console.error('Failed to fetch book data:', error);
  }
});

</script>

<style>
/* Add styles here if needed */
</style>
