<template>
  <main class="container flex justify-center max-w-5xl pt-6" role="main">
    <div class="max-w-2xl w-full justify-center">
      <BookDetail :bookId="bookId" />
    </div>
  </main>
</template>

<script>

import BookDetail from '../components/BookDetail.vue';

export default {
    components: {
        BookDetail
    },
    data() {
    return {
      bookId: null
    };
  },
  created() {
    // Access the id parameter from the route
    this.bookId = this.$route.params.id;
  },
};
</script>
