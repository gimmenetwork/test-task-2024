<template>
  <div class="body bg-cover h-screen">
    <div
      class="bg-black bg-opacity-70 text-black font-bold border-3 border-gray-300 rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-1/3 p-8 text-center"
    >
      <select v-model="locale" class="absolute right-10">
        <option value="en">en</option>
        <option value="de">de</option>
        <option value="es">es</option>
        <option value="ru">ru</option>
        <option value="az">az</option>
        <option value="tr">tr</option>
        <option value="uk">uk</option>
      </select>
      <h2 class="text-2xl mb-4 text-white uppercase">{{ $t("login") }}</h2>
      <form @submit.prevent="signInWithEmail">
        <div class="mb-4">
          <label for="email" class="block text-white">{{ $t("email") }}:</label>
          <input
            v-model.trim="email"
            type="email"
            id="email"
            placeholder=""
            required
            class="block w-full h-10 border-2 border-gray-400 rounded-md p-2"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-white"
            >{{ $t("password") }}:</label
          >
          <input
            v-model.trim="password"
            type="password"
            placeholder=""
            id="password"
            required
            class="block w-full h-10 border-2 border-gray-400 rounded-md p-2"
          />
        </div>
        <p v-if="!formIsValid" class="text-red-200">
          {{ $t("Please enter correct username and password") }}
        </p>
        <p v-if="!textIsValid" class="text-red-200">
          {{ $t("Invalid user name or password") }}
        </p>
        <div class="flex flex-nowrap">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded w-1/5 border-2 border-grey mt-5"
          >
            {{ $t("Login") }}
          </button>
          <nuxt-link to="/register" class="block mt-9 ml-3 text-white">{{
            $t("notRegistered")
          }}</nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const email = ref("");
const password = ref("");
const formIsValid = ref(true);
const textIsValid = ref(true);
const client = useSupabaseClient();
const { locale } = useI18n();
import { useI18n } from "#imports";

definePageMeta({
  layout: "login",
});

const signInWithEmail = async () => {
  if (password.value.length < 6) {
    formIsValid.value = false;
    return false;
  }
  try {
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      console.log("Error signing in:", error.message);
      textIsValid.value = false;
    } else {
      navigateTo("/MainPage");
    }
  } catch (error) {
    console.log("An error occurred during sign-in:", error.message);
  }
};
</script>

<style scoped>
div.body {
  background-image: url("@/assets/images/books5.png");
}

body {
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  margin: 0;
}
</style>
