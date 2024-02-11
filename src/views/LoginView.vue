<template>
  <main class="container max-w-5xl pt-6">
    <div>
      <h1>This is the Login page</h1>
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
