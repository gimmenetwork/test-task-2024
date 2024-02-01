<template>
  <div class="body bg-cover h-screen">
    <div class="w-1/3 mx-auto absolute top-24 left-1/3">
      <div
        class="bg-black bg-opacity-40 text-black font-bold border-3 border-gray-100 relative rounded-3xl p-8"
      >
        <select v-model="locale" class="absolute right-10">
          <option value="en">en</option>
          <option value="de">de</option>
          <option value="es">es</option>
          <option value="ru">ru</option>
          <option value="az">az</option>
          <option value="uk">uk</option>
          <option value="tr">tr</option>
        </select>
        <h2 class="text-2xl mb-8 text-white">{{ $t("createAccount") }}</h2>
        <form @submit.prevent="signup" class="flex flex-col">
          <label for="name" class="mb-2 font-bold font-weight-700 text-white"
            >{{ $t("name") }}:</label
          >
          <input
            v-model="name"
            type="text"
            id="name"
            required
            class="mb-4 px-2 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <label for="email" class="mb-2 font-bold font-weight-700 text-white"
            >{{ $t("email") }}:</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="mb-4 px-2 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <label
            for="password"
            class="mb-2 font-bold font-weight-700 text-white"
            >{{ $t("password") }}:</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="mb-4 px-2 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <label
            for="confirm-password"
            class="mb-2 font-bold font-weight-700 text-white"
            >{{ $t("confPassword") }}:</label
          >
          <input
            v-model="confirmPassword"
            type="password"
            id="confirm-password"
            required
            class="mb-4 px-2 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <p v-if="!formIsValid" class="text-red-300 text-lg">
            {{ $t("registrError") }}
          </p>
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm mt-8 w-1/3 border-2 border-grey mx-auto"
          >
            {{ $t("signUp") }}
          </button>
        </form>
        <nuxt-link to="/" class="text-white underline">{{
          $t("back")
        }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const name = ref("");
const surname = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const formIsValid = ref(true);
const client = useSupabaseClient();
const { locale } = useI18n();

const signup = async (data) => {
  if (password.value.length < 6 || password.value !== confirmPassword.value) {
    formIsValid.value = false;
    return false;
  }
  const { user, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
    name: name.value,
    surname: surname.value,
    confirmPassword: confirmPassword.value,
  });
  if (user !== "") {
    navigateTo("/");
    alert(
      "Congratulations, you have successfully registered! Verify your email address"
    );
    return;
  } else {
    return console.log(error);
  }
};

definePageMeta({
  layout: "signin",
});
</script>

<style scoped>
body {
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  margin: 0;
}

div.body {
  background-image: url("@/assets/images/books3.png");
  background-repeat: no-repeat;
}
</style>
