<template>
  <NuxtLayout class="bg-white w-full">
    <div
      class="text-center w-full pl-60 pt-10 body z-0 parallax bg-cover h-screen"
    >
      <div class="w-11/12 ml-96 m-auto">
        <img class="pl-52 mt-10" src="" alt="" />
      </div>
      <div class="w-1/3 ml-96 pl-4 mb-4 m-auto flex justify-between">
        <div class="flex flex-wrap mr-4">
          <label for="" class="text-white w-2/3">Filter by Name</label>
          <input
            type="text"
            v-model="filterName"
            @input="filterByName"
            class="border rounded-md"
          />
        </div>
        <div class="flex flex-wrap mr-4">
          <label for="" class="text-white w-2/3">Filter by Genre</label>
          <input
            type="text"
            v-model="filterGenre"
            @input="filterByGenre"
            class="border rounded-md"
          />
        </div>
        <div class="flex flex-wrap">
          <label for="" class="text-white w-2/3">Filter by Size</label>
          <input
            type="text"
            v-model="filterSize"
            @input="filterBySize"
            class="border rounded-md"
          />
        </div>
      </div>
      <div class="min-h-80 custom-max-height overflow-y-scroll">
        <div
          v-for="book in allBooks"
          :key="book.id"
          @click="selectBook(book)"
          class="pl-40 overflow-y-scroll m-auto p-3 pb-0 w-2/3"
        >
          <div
            class="text-left cursor-pointer hover:scale-95 transition-all duration-500 flex w-full bg-white bg-opacity-40 rounded-md p-5"
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
              <p>
                Book Size:
                <span class="italic font-bold">{{ book.Book_Size }}</span>
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
const filterName = ref("");
const filterGenre = ref("");
const filterSize = ref("");

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
};

const selectBook = (book) => {
  const baseUrl = `/books/${book.id}`;
  const queryParam = { id: book.id };
  router.push({ path: baseUrl, query: queryParam });
};



// filtration start

const filterByName = () => {
  if (!filterName.value) {
    fetchBooks();
  }
  const filteredBooks = allBooks.value.filter((book) => {
    return book.Book_Name.toLowerCase().includes(
      filterName.value.toLowerCase()
    );
  });
  allBooks.value = filteredBooks;
};

const filterByGenre = () => {
  if (!filterGenre.value) {
    fetchBooks();
  }
  const filteredBooks = allBooks.value.filter((book) => {
    return book.Book_Genre.toLowerCase().includes(
      filterGenre.value.toLowerCase()
    );
  });
  allBooks.value = filteredBooks;
};

const filterBySize = () => {
  if (!filterSize.value) {
    fetchBooks();
  }
  const filteredBooks = allBooks.value.filter((book) => {
    return String(book.Book_Size).includes(filterSize.value.toLowerCase());
  });
  allBooks.value = filteredBooks;
};

// filtration end


watchEffect(() => {
  if (filterGenre) {
    filterByGenre();
  }
  if (filterSize) {
    filterBySize();
  }
  if (filterName) {
    filterByName();
  }
});

onMounted(() => {
  fetchBooks();
});
</script>

<style scoped>
.custom-max-height {
  max-height: 600px;
}

.parallax {
  position: relative;
}
.parallax::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("@/assets/images/bookWallaper2.jpeg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  filter: brightness(55%);
  z-index: -1;
}
</style>
