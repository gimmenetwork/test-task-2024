<template>
  <main class="container flex justify-center max-w-5xl pt-6">
    <div class="max-w-2xl w-full justify-center">
      <h1>This is the registration page</h1>
      <RegistrationFrom />
    </div>
  </main>
</template>

<script>
import RegistrationFrom from '../components/RegistrationForm.vue';

export default {
  components: {
    RegistrationFrom
  }
};
</script>
