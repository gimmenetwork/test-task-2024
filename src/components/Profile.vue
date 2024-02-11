<template> 
    <div class="container max-w-5xl flex flex-col sm:flex-row items-center gap-4 text-white py-6">
        <div v-if="user" class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Hi {{ user.name}}</div>
            <p class="text-gray-700 text-base">
               Name: {{ user.name }}
            </p>
            <p class="text-gray-700 text-base">
                Email: {{ user.email }}
            </p>
            <div v-if="finishedBooks.length > 0">
                <h3 class="font-bold text-gray-700 text-xl mb-2">Finished Books</h3>
                <ul>
                    <li class="text-gray-700 text-base" v-for="book in finishedBooks" :key="book.id">
                        {{ book.title }}
                    </li>
                </ul>
            </div>
            <div v-if="unfinishedBooks.length > 0">
                <h3 class="font-bold text-gray-700 text-xl mb-2">Latest Progress:</h3>
                <ul>
                    <li class="text-gray-700 text-base" v-for="book in unfinishedBooks" :key="book.id">
                        {{ book.title }} :
                        <p v-if="book.recentProgress" >You read {{ book.recentProgress.pagesRead }} pages on {{ book.recentProgress.date }} </p>
                    </li>
                </ul>
            </div>
        
        <!-- <p class="text-gray-700 text-base">
            Pages: {{ book.pageCount }}
        </p>
        
        <p class="text-gray-700 text-base">
            Pages Read: {{ book.pagesRead }}
        </p> -->
        <!-- <div v-if="book.review">
            <p class="text-gray-700 text-base">
                Review: {{ book.review }}
            </p>
            <p class="text-gray-700 text-base">
                Rating:
            </p><StarRating :rating="5.5" />
        </div> -->
        </div>
    </div>
    
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useBooksStore } from '@/stores/books';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const booksStore = useBooksStore();

const user = computed(() => userStore.user);
const finishedBooks = ref([]);
const unfinishedBooks = ref([]);

const mostRecentProgress = (books) => {
    return books.value.map(book => {
        
        console.log('books999', book.progressUpdates);
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
        console.log('mostRecentProgress123', mostRecentProgress);
        return book = {
            title: book.title,
            recentProgress: mostRecentProgress
        }
    });
}

onMounted(async () => {
    
    try {
        console.log('user', user.value);
        if (user.value) {
            const bookData = await booksStore.getBookByUserId(user.value.id);
            finishedBooks.value = bookData.filter(book => book.finished === true);
            unfinishedBooks.value = bookData.filter(book => book.finished == false);

            console.log('book--121', unfinishedBooks.value.length)
            if (unfinishedBooks.value.length > 0) {
                unfinishedBooks.value = mostRecentProgress(unfinishedBooks);
            }
        }
        // const bookData = await booksStore.getBookByUserId(user.value.id);
        // finishedBooks = bookData.filter(book => book.finished === true);
        // console.log('book--12', bookData);
    } catch (error) {
        console.error('Failed to fetch book data:', error);
    }
});
</script>
