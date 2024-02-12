<template>
  <div v-if="book" class="w-full bg-yellow-100 rounded overflow-hidden shadow-lg">
    <RouterLink class="inline-flex items-center justify-center p-5 text-base font-medium text-gray-900 hover:text-blue-500 " to="/">
      <i class="fa-solid fa-arrow-left"></i>
      <span class="pl-3">Back</span>
    </RouterLink>

    <div class="px-8 py-6 flex  text-center flex-col">
      <div class="font-bold text-5xl mb-8">
        <h2>{{ book.title }}</h2>
      </div>
      <p class="text-gray-700 text-xl mb-2">
        <span class="font-bold">Genre:</span> {{ book.genre }}
      </p>
      <p class="text-gray-700 text-xl mb-2">
        <span class="font-bold">Pages:</span> {{ book.pageCount }}
      </p>
        
      <p class="text-gray-700 text-xl mb-2">
        <span class="font-bold">Pages Read:</span> {{ book.pagesRead }}
      </p>
      <div v-if="book.review">
         <p class="text-gray-700 text-xl mb-2">
            <span class="font-bold">Review:</span> {{ book.review }}
          </p>
          <div>
            <p class="text-gray-700 text-xl">
              <span class="font-bold">Rating:</span>
            </p>
            <StarRating :rating="book.rating" />
          </div>
          
      </div>
    </div>
    <div class="px-4 pt-2 pb-8 flex justify-center">
      <button v-if="!book.finished" @click="openUpdateProgressModal" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors">Update Progress</button>
      <button v-if="book.finished && !book.review" @click="openLeaveReviewModal" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors">Leave Review</button>
      <div v-if="book.review">
        <h4 class="font-bold text-xl mb-2">Please Share:</h4>
        <div class="flex justify-between">
          <button @click="shareOnTwitter"><i class="fab fa-twitter text-xl text-blue-500 hover:text-blue-700"></i></button>
          <button @click="shareOnFacebook"><i class="fa-brands fa-facebook-f text-xl text-blue-500 hover:text-blue-700"></i></button>
          <button @click="shareOnWhatsApp"><i class="fa-brands fa-whatsapp text-xl text-blue-500 hover:text-blue-700"></i></button>
        </div>
      </div>
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
import { RouterLink } from 'vue-router'
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
    fetchBookDetail(book.value.id);
  } catch (error) {
    console.error('Error updating progress:', error);
  }
  updateProgressModalRef.value.closeModal();
};

const handleLeaveReview = async () => {
  try {
      await booksStore.addReview(book.value.id, review.value, rating.value);    
      // Make API call to get all books
      fetchBookDetail(book.value.id);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  leaveReviewModalRef.value.closeModal();
}

// Fetch books when the component is mounted
const fetchBookDetail = async (bookId) => {
    try {
        const response = await axios.get(`http://localhost:3000/books/${bookId}`);
        book.value = response.data; // Update the reactive books variable
    } catch (error) {
        console.error('Failed to fetch books:', error);
        // Handle the error appropriately
    }
};

const shareText = 'Check this out!'; // Default share text

const getCurrentUrl = () => window.location.href; // Arrow function for getting the current URL

const shareOnTwitter = () => {
  const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(getCurrentUrl())}&text=${encodeURIComponent(shareText)}`;
  window.open(url, '_blank');
};

const shareOnFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getCurrentUrl())}`;
  window.open(url, '_blank');
};

const shareOnWhatsApp = () => {
  const text = `${shareText} ${encodeURIComponent(getCurrentUrl())}`;
  const url = `https://api.whatsapp.com/send?text=${text}`;
  window.open(url, '_blank');
};

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
