<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useAuthStore } from '@/stores/authStore'
import { RouterLink, useRouter } from 'vue-router'
import { VueSpinnerBall } from 'vue3-spinners';
import { useLocalStorage } from '@/composables/useLocalStorage'
import type { User } from '@/types/auth/User';

const store = useAuthStore()
const router = useRouter()
const { localStorageSetup } = useLocalStorage()
const isLoading = ref(false)

const schema = object({
    email: string().email().required(),
    password: string().min(6).required(),
    firstname: string().min(1).required(),
    lastname: string().min(1).required()
});
const { defineField, errors, handleSubmit } = useForm<User>({
    validationSchema: schema,
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [firstname, firstnameAttrs] = defineField('firstname');
const [lastname, lastnameAttrs] = defineField('lastname');


const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true

    const user = await store.authRegister(values)
    if (user) {
        isLoading.value = false
        router.push('/')
    }
    else {
        isLoading.value = false
        console.log('error')
        return
    }
});

</script>

<template>
    <section class="flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md bg-gradient-to-r from-bermuda-gray-200 to-bermuda-gray-300">
                <div class="space-y-4 md:space-y-6 p-12">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Register a new account
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit="onSubmit">
                        <div>
                            <p id="err-firstname">{{ errors.firstname }}</p>
                            <label for="firstname" class="block mb-2 text-sm font-medium text-gray-900 ">Firstname</label>
                            <input type="firstname" v-bind="firstnameAttrs" name="firstname"
                                aria-errormessage="err-firstname" v-model="firstname" placeholder="Enter your first name"
                                class="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3">
                        </div>
                        <div>
                            <p id="err-lastname">{{ errors.lastname }}</p>
                            <label for="lastname" class="block mb-2 text-sm font-medium text-gray-900 ">Lastname</label>
                            <input type="lastname" v-bind="lastnameAttrs" name="lastname" aria-errormessage="err-lastname"
                                v-model="lastname" placeholder="Enter your last name"
                                class="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3">
                        </div>
                        <div>
                            <p id="err-email">{{ errors.email }}</p>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input type="email" v-bind="emailAttrs" name="email" aria-errormessage="err-email"
                                v-model="email"
                                class="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                                placeholder="name@company.com">
                        </div>
                        <div>
                            <p id="err-password">{{ errors.password }}</p>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input type="password" v-bind="passwordAttrs" name="password" aria-errormessage="err-password"
                                v-model="password" placeholder="••••••••"
                                class="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3">
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-bermuda-gray-400 hover:bg-bermuda-gray-500 focus:ring-4 focus:outline-none focus:ring-bermuda-gray-500 font-medium rounded-lg text-sm px-5 py-3 text-center">
                            <span v-if="!isLoading">Sign in </span>
                            <span v-if="isLoading" class="m-auto">
                                <VueSpinnerBall size="30" color="blue" />
                            </span>
                        </button>
                        <div class="flex items-center justify-between">
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                        </div>


                        <p class="text-sm font-light text-gray-500">
                            Already have an account? <RouterLink class="font-medium underline" to="/">Login Here
                            </RouterLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
