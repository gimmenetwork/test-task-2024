<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import {object, string}  from 'yup';
import { useAuthStore } from '@/stores/authStore'
import { RouterLink } from 'vue-router'
import { VueSpinnerBall } from 'vue3-spinners';
import { useLocalStorage} from '@/composables/useLocalStorage'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from '@/router';
const store = useAuthStore()
const { localStorageSetup } = useLocalStorage()
const isLoading = ref(false)

    interface Login {
        email?: string;
        password?: string;
    }
    const schema = object({
        email: string().email().required(),
        password: string().min(6).required(),
    });
    const { defineField, errors, handleSubmit} = useForm<Login>({
        validationSchema: schema,
    });

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(async (values) => {
   isLoading.value = true
        const user = await store.authLogin(values.email as string, values.password as string)
        if(user){
            localStorageSetup('user', user)
            isLoading.value = false
            router.push('/home')
        }
        else{
            toast.error("Incorrect user details!", { autoClose: 2000});
            isLoading.value = false
            return
        }
});

</script>

<template>
    <section class="">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-r from-bermuda-gray-200 to-bermuda-gray-300">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" @submit="onSubmit">
                  <div>
                      <p id="err-email">{{ errors.email }}</p>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" v-bind="emailAttrs" name="email" aria-errormessage="err-email" v-model="email" class="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3" placeholder="name@company.com">
                  </div>
                  <div>
                      <p id="err-password">{{ errors.password }}</p>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" v-bind="passwordAttrs" name="password" aria-errormessage="err-password" v-model="password" placeholder="••••••••" class="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3">
                  </div>
                  <button type="submit" class="w-full text-white bg-bermuda-gray-400 hover:bg-bermuda-gray-500 focus:ring-4 focus:outline-none focus:ring-bermuda-gray-500 font-medium rounded-lg text-sm px-5 py-3 text-center">
                    <span v-if="!isLoading">Sign in </span>
                    <span v-if="isLoading" class="m-auto">
                        <VueSpinnerBall size="30" color="white" />
                    </span>
                  </button>
                  <!-- <div class="flex items-center justify-between">
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                  </div> -->
                  <p class="text-sm font-light text-gray-500">
                      Don’t have an account yet? <RouterLink class="font-medium" to="/register">Register</RouterLink>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</template>
@/store/authStore