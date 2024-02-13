
<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useForm } from 'vee-validate';
import {object, string}  from 'yup';
import 'vue3-toastify/dist/index.css';
import type { Book } from '@/types/Books/Book';
import { VueSpinnerBall } from 'vue3-spinners';
import { useBookStore } from '@/stores/bookStore';
import { toast } from 'vue3-toastify';


const bookStore = useBookStore()

const props = defineProps<{
  pageCount: string
  pagesRead: string
  reviews: string | undefined
  bookId: string
}>()



const isLoading = ref(false)
const showReview = ref(false)

const schema = object({
        review: string().required(),
    });
    //add relevant type
const { defineField, errors, handleSubmit} = useForm<any>({
    validationSchema: schema,
});

const [review, reviewAttrs] = defineField('review');

const onSubmit = handleSubmit(async (values) => {
isLoading.value = true
const response:any = await bookStore.updateBookReview(values.review, props.bookId)
     // const user = await store.authLogin(values.title as string, values.pageCount as string)
     if(response){
         toast.success("Your book has been successfully added!", { autoClose: 2000});
         showReview.value = false
        //  router.push('home')
         bookStore.getAllBooks()
     }
     else{
         toast.error("Book could not be added!", { autoClose: 2000});
         isLoading.value = false
         return
     }
});


function toggleReview() {
    showReview.value = !showReview.value
}
</script>

<template>
    <section>
                    <div v-if="props.pageCount === props.pagesRead" class="pt-2">
                        
                        <div v-if="props.reviews && props.reviews.length > 0">
                            <h1 class="text-bermuda-gray-700 font-semibold">Your Review</h1>
                            <p class="text-sm italic font-mono pt-1">"{{ props.reviews }}"</p>
                        </div>
                        <div v-else>
                            <button class="w-30 bg-bermuda-gray-300 px-10 py-2 rounded-xl " @click="toggleReview" v-if="!showReview">Leave a Review</button>
                            <button class="w-30 bg-red-400 px-3 py-1 rounded-xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium me-2 mb-2 focus:outline-none" @click="toggleReview" v-if="showReview">X</button>
                        </div>
                    </div>
                    <div v-if="showReview">
                        <div>
                            <form @submit="onSubmit">
                                <p id="err-review" class="text-red-500">{{ errors.review }}</p>
                                <label for="review" class="block mb-2 text-sm font-medium text-gray-900 ">Review</label>
                                <textarea v-bind="reviewAttrs" name="review" aria-errormessage="err-review" v-model="review" id="review" rows="5" class="block p-2.5 w-full mb-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-bermuda-gray-400 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter a review"></textarea>
                                <button type="submit" class="w-full text-white bg-bermuda-gray-400 hover:bg-bermuda-gray-500 focus:ring-4 focus:outline-none focus:ring-bermuda-gray-500 font-medium rounded-lg text-sm px-5 py-3 sm:px-4 sm:py-2 text-center">
                                    <span v-if="!isLoading">Add a review </span>
                                    <span v-if="isLoading" class="m-auto">
                                        <VueSpinnerBall size="30" color="white" />
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

</template>