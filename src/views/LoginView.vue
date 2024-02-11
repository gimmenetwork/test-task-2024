<template>
  <main class="container flex justify-center max-w-5xl pt-6">
    <div class="max-w-2xl w-full justify-center">
      <h1 class="">This is the Login page</h1>
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
