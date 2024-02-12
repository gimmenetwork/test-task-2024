<template>
  <main class="container flex justify-center max-w-5xl pt-6" role="main">
    <div class="max-w-2xl w-full justify-center">
      <h3 class="text-3xl font-Roboto mt-10 mb-6 font-bold">Registration:</h3>
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
