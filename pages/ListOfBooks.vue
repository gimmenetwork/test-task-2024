<template>
  <NuxtLayout class="bg-white w-full">
    <div class="text-center w-full pl-60 pt-10 body bg-cover h-screen">
      <h2 class="font-semibold text-xl">{{ $t("welcome") }}</h2>
      <div class="w-11/12 ml-96 m-auto">
        <img class="pl-52 mt-10" src="" alt="" />
      </div>
      <div class="min-h-80 custom-max-height overflow-y-scroll">
        <div
          v-for="book in allBooks"
          :key="book.id"
          @click="selectBook(book)"
          class="pl-40 overflow-y-scroll m-auto p-3 pb-0 w-2/3"
        >
          <div
            class="text-left cursor-pointer hover:scale-95  transition-all duration-500 flex w-full bg-white bg-opacity-40 rounded-md p-5"
          >
            <img src="@/assets/images/bookCover4.jpeg" class="w-1/5" />
            <div class="pl-5 pt-5 w-full">
              <p>
                Book Name:
                <span class="italic font-bold">{{ book.Book_Name }}</span>
              </p>
              <p>
                Book Genre:
                <span class="italic font-bold">{{ book.Book_Genre }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const supabase = useSupabaseClient();
const allBooks = ref([]);

const fetchBooks = async () => {
  try {
    const { data, error } = await supabase.from("Book_History").select("*");
    if (error) {
      console.error(error);
    } else {
      allBooks.value = data;
    }
  } catch (error) {
    console.error(error);
  }
  console.log(allBooks.value);
};

const selectBook = (book) => {
  const baseUrl = `/books/${book.id}`;
  const queryParam = { id: book.id };
  router.push({ path: baseUrl, query: queryParam });
};

onMounted(() => {
  fetchBooks();
});
</script>

<style scoped>
div.body {
  background-image: url("@/assets/images/bookWallaper2.jpeg");
}
body {
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  margin: 0;
}

.custom-max-height {
  max-height: 600px;
}
</style>
