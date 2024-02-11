<template>
  <main class="container max-w-5xl pt-6">
    <div>
      <h1>Book Detail</h1>
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
