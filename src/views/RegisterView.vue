<template>
  <main class="container max-w-5xl pt-6">
    <div>
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
