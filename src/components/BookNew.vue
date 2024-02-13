<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useRouter } from 'vue-router'
import { VueSpinnerBall } from 'vue3-spinners';
import { useBookStore } from '@/stores/bookStore';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { storeToRefs } from 'pinia';
import type { Book } from '@/types/Books/Book';


const isLoading = ref(false)
const bookGenres = ref(['Business', 'Fantasy', 'Romance', 'Action'])
const bookStore = useBookStore()
const router = useRouter()


const schema = object({
    title: string().required(),
    pageCount: string().required(),
    genre: string().required()
});
//add relevant type
const { defineField, errors, handleSubmit } = useForm<any>({
    validationSchema: schema,
});

const [title, titleAttrs] = defineField('title');
const [pageCount, pageCountAttrs] = defineField('pageCount');
const [genre, genreAttrs] = defineField('genre');



const onSubmit = handleSubmit(async (values) => {

    isLoading.value = true
    const response: any = await bookStore.addBook(values)
    // const user = await store.authLogin(values.title as string, values.pageCount as string)
    if (response) {
        toast.success("Your book has been successfully added!", { autoClose: 2000 });
        bookStore.showAddNewBookView = false
        bookStore.getAllBooks()
    }
    else {
        toast.error("Book could not be added!", { autoClose: 2000 });
        isLoading.value = false
        return
    }
});

</script>

<template>
    <section class="">
        <div class="flex flex-col items-center justify-center px-6 py-2 mx-auto lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-r from-bermuda-gray-100 to-bermuda-gray-200">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Add a new Book
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit="onSubmit">
                        <div>
                            <p id="err-title" class="text-red-500">{{ errors.title }}</p>
                            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 text-black">Book
                                Title</label>
                            <input type="text" v-bind="titleAttrs" name="title" aria-errormessage="err-title"
                                v-model="title"
                                class="bg-gray-50 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                                placeholder="Enter a title for your book">
                        </div>
                        <div>
                            <p id="err-pageCount" class="text-red-500">{{ errors.pageCount }}</p>
                            <label for="pageCount" class="block mb-2 text-black text-sm font-medium text-gray-900">Book Page
                                Count</label>
                            <input type="number" min="1" v-bind="pageCountAttrs" name="pageCount"
                                aria-errormessage="err-pageCount" v-model="pageCount" placeholder="Enter book pages count"
                                class="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3">
                        </div>
                        <div>
                            <p id="err-genre" class="text-red-500">{{ errors.pageCount }}</p>
                            <label for="genres" class="block mb-2 text-sm font-medium text-black">Select an option</label>
                            <select v-model="genre" v-bind="genreAttrs" name="genre" id="genres"
                                aria-errormessage="err-pageCount"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option selected disabled>Choose a genre</option>
                                <option v-for="genre in bookGenres" :key="genre" :value="genre">{{ genre }}</option>
                            </select>
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-bermuda-gray-400 hover:bg-bermuda-gray-500 focus:ring-4 focus:outline-none focus:ring-bermuda-gray-500 font-medium rounded-lg text-sm px-5 py-3 sm:px-4 sm:py-2 text-center">
                            <span v-if="!isLoading">Add Book </span>
                            <span v-if="isLoading" class=" flex flex-row justify-center align-center">
                            <VueSpinnerBall size="30" color="white" />
                        </span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</section></template>
