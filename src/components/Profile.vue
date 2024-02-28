<template> 
    <div class="container w-full bg-yellow-100 rounded overflow-hidden shadow-lg max-w-5xl sm:flex-row items-center gap-4 text-white py-6">
        <RouterLink class="inline-flex items-center justify-center p-5 text-base font-medium text-gray-900 hover:text-blue-500 " to="/" aria-label="Go back to home page">
            <i class="fa-solid fa-arrow-left"></i>
            <span class="pl-3">Back</span>
        </RouterLink>
        <div v-if="user" class="flex flex-col w-full px-6 py-4">
            <div class="flex flex-col items-center justify-center">
                 <i class="fa-solid text-black fa-user text-6xl"></i>
                    <p class="text-gray-700 text-xl mt-4 mb-2">
                    <span class="font-bold">Name:</span> {{ user.name }}
                    </p>
                    <p class="text-gray-700 text-xl mb-2">
                        <span class="font-bold">Email:</span> {{ user.email }}
                    </p>
            </div>
           
            <div id="finished-books" class="flex flex-col items-center text-center my-8" v-if="finishedBooks.length > 0">
                <h3 class="font-bold text-gray-700 text-2xl mb-2">Finished Books:</h3>
                <ul>
                    <li class="text-gray-700 text-base" v-for="book in finishedBooks" :key="book.id">
                        {{ book.title }}
                    </li>
                </ul>
            </div>
            <div class='text-center' v-if="unfinishedBooks.some(book => book.recentProgress)">

                <h3 class="font-bold text-gray-700 text-2xl mb-2">Latest Progress:</h3>
                <ul class="list-none text-center">
                    <li class="text-gray-700 text-base" v-for="book in unfinishedBooks" :key="book.id">
                        <p v-if="book.recentProgress">You read {{ book.recentProgress.pagesRead }} pages of {{ book.title }} on {{ book.recentProgress.date }} </p>
                    </li>
                </ul>
            </div>
             <div class="px-4 pt-8 pb-6 flex justify-center">
                <button id='user-logout' @click="handleLogout" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors" aria-label="Log out">Logout</button>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/books';
import { useUserStore } from '@/stores/user';

const router = useRouter();

const userStore = useUserStore();
const booksStore = useBooksStore();

const user = computed(() => userStore.user);
const finishedBooks = ref([]);
const unfinishedBooks = ref([]);

// Logout function to clear user session and redirect to the homepage.
const handleLogout = async () => {
    try {
        await userStore.logout()
        router.push('/');
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

// Function to process books data and extract most recent progress if relevant 
const mostRecentProgress = (books) => {
    return books.value.map(book => {
            
        if (book.progressUpdates.length > 0) {
            const mostRecentProgress = book.progressUpdates.reduce((a, b) => {   
                // Return the object with the more recent date
                return a.date > b.date ? a : b;
            });
            const dateString = mostRecentProgress.date;
            const date = new Date(dateString);

            // Convert to a readable date format, e.g., "MM/DD/YYYY"
            const readableDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            mostRecentProgress.date = readableDate
            const unfinishedBook = {
                title: book.title,
                recentProgress: {...mostRecentProgress}
            }

            return unfinishedBook
        }

        book.recentProgress = null;
        return book
    });
}

onMounted(async () => {
    // Fetch book data and check if it is finished or not
    try {

        if (user.value) {
            const bookData = await booksStore.getBookByUserId(user.value.id);
            finishedBooks.value = bookData.filter(book => book.finished === true);
            unfinishedBooks.value = bookData.filter(book => book.finished == false && book.recentProgress !== null);


            if (unfinishedBooks.value.length > 0) {
                unfinishedBooks.value = mostRecentProgress(unfinishedBooks);
            }
        }
    } catch (error) {
        console.error('Failed to fetch book data:', error);
    }
});
</script>
