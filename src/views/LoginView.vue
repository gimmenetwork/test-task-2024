<template>
  <main class="container flex justify-center max-w-5xl pt-6" role="main">
    <div class="max-w-2xl w-full justify-center">
      <h3 class="text-3xl font-Roboto mt-10 mb-6 font-bold">Login:</h3>
      <LoginForm />
    </div>
  </main>
</template>

<script>

import LoginForm from '../components/LoginForm.vue';

export default {
  components: {
    LoginForm
  }
};
</script>
