
<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import 'vue3-toastify/dist/index.css';
import { storeToRefs } from 'pinia';
import type { Book } from '@/types/Books/Book';
import { VueSpinnerBall } from 'vue3-spinners';
import { useBookStore } from '@/stores/bookStore';
import { toast } from 'vue3-toastify';





const props = defineProps<{
    pageCount: string
    bookId: string
}>()



const isLoading = ref(false)
const showAddProgress = ref(false)

const bookStore = useBookStore()


const schema = object({
    pageRead: string().required(),
});
//add relevant type
const { defineField, errors, handleSubmit } = useForm<any>({
    validationSchema: schema,
});

const [pageRead, pageReadAttrs] = defineField('pageRead');

const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true
    const response: any = await bookStore.updateBookProgress(values.pageRead, props.bookId)
    if (response) {
        toast.success("Progress successfully added!", { autoClose: 2000 });
        isLoading.value = false
        showAddProgress.value = false
        bookStore.getAllBooks()
        return
    }
    else {
        toast.error("Progress could not be updated", { autoClose: 2000 });
        isLoading.value = false
        showAddProgress.value = false
        return
    }
});


function toggleProgress() {
    showAddProgress.value = !showAddProgress.value
}

</script>

<template>
    <div class="flex flex-row justify-between py-2">
        <p class="text-bermuda-gray-800">Progress</p>
        <button v-if="!showAddProgress" @click="toggleProgress"
            class="w-30 text-sm bg-bermuda-gray-500 px-3 py-1 rounded-xl text-white bg-blue-700 hover:bg-bermuda-gray-600 focus:ring-4 focus:ring-blue-300 font-medium me-2 mb-2 focus:outline-none">Add
            new progress</button>
        <button
            class="w-30 px-3 rounded-xl text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-blue-300 font-medium me-2 mb-2 focus:outline-none"
            @click="toggleProgress" v-if="showAddProgress">X</button>
    </div>
    <div v-if="showAddProgress" class="pb-4">
        <form @submit="onSubmit">
            <p id="err-pageRead" class="text-red-500 text-sm">{{ errors.pageRead }}</p>
            <label for="pageRead" class="block mb-2 text-sm font-medium text-00 ">Add your progress</label>
            <input type="number" min="1" :max="pageCount" v-bind="pageReadAttrs" name="pageRead"
                aria-errormessage="err-pageRead" v-model="pageRead" id="pageRead" rows="5"
                class="block p-2.5 w-full mb-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-bermuda-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your progress" />
            <button type="submit"
                class="w-full text-white bg-bermuda-gray-400 hover:bg-bermuda-gray-500 focus:ring-4 focus:outline-none focus:ring-bermuda-gray-500 font-medium rounded-lg text-sm px-5 py-3 sm:px-4 sm:py-2 text-center">
                <span v-if="!isLoading">Add Progress</span>
                <span v-if="isLoading" class="m-auto">
                    <VueSpinnerBall size="30" color="white" />
            </span>
        </button>
    </form>
</div></template>