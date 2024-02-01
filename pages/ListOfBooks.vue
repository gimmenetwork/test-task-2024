<template>
  <NuxtLayout class="bg-white w-full">
    <div
      class="text-center w-full pl-60 pt-10 body z-0 parallax bg-cover h-screen"
    >
      <div class="w-11/12 ml-96 m-auto">
        <img class="pl-52 mt-10" src="" alt="" />
      </div>
      <div class="w-1/3 mb-4 m-auto flex justify-between">
        <div class="flex flex-wrap mr-4">
          <label for="" class="text-white w-full">{{ $t("filterName") }}</label>
          <input
            type="text"
            v-model="filterName"
            @input="filterByName"
            class="border rounded-md"
          />
        </div>
        <div class="flex flex-wrap mr-4">
          <label for="" class="text-white w-full">{{
            $t("filterGenre")
          }}</label>
          <input
            type="text"
            v-model="filterGenre"
            @input="filterByGenre"
            class="border rounded-md"
          />
        </div>
        <div class="flex flex-wrap mr-4">
          <label for="" class="text-white w-full">{{ $t("filterSize") }}</label>
          <input
            type="text"
            v-model="filterSize"
            @input="filterBySize"
            class="border rounded-md"
          />
        </div>
        <div class="flex flex-wrap">
          <label for="" class="text-white w-full">{{
            $t("filterPages")
          }}</label>
          <input
            type="text"
            v-model="filterReadPage"
            @input="filterByReadPage"
            class="border rounded-md"
          />
        </div>
      </div>
      <div class="min-h-80 custom-max-height overflow-y-scroll">
        <div
          v-for="book in allBooks"
          :key="book.id"
          class="pl-40 overflow-y-scroll m-auto p-3 pb-0 w-2/3"
          :style="formStyle"
        >
          <div
            class="text-left cursor-pointer hover:scale-95 transition-all duration-500 flex w-full bg-white bg-opacity-40 rounded-md p-5"
          >
            <img
              @click="selectBook(book)"
              src="@/assets/images/bookCover4.jpeg"
              class="w-1/5"
            />
            <div class="pl-5 pt-5 w-full">
              <p>
                {{ $t("bookName") }}:
                <span class="italic font-bold">{{ book.Book_Name }}</span>
              </p>
              <p>
                {{ $t("bookGenre") }}:
                <span class="italic font-bold">{{ book.Book_Genre }}</span>
              </p>
              <p>
                {{ $t("bookSize") }}:
                <span class="italic font-bold">{{ book.Book_Size }}</span>
              </p>
              <p>
                {{ $t("readPages") }}
                :
                <span class="italic font-bold">{{ book.Read_Page }}</span>
              </p>
              <p v-if="book.Book_Review">
                {{ $t("bookReview") }}:
                <span class="italic font-bold">{{ book.Book_Review }}</span>
              </p>
              <p v-if="book.Book_Stars">
                {{ $t("bookRating") }}:
                <span class="italic font-bold"
                  >{{ book.Book_Stars }} <span>{{ $t("stars") }}</span
                  >!</span
                >
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
const filterReadPage = ref("");

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
  } else {
    const filteredBooks = allBooks.value.filter((book) => {
      return book.Book_Name.toLowerCase().includes(
        filterName.value.toLowerCase()
      );
    });
    allBooks.value = filteredBooks;
  }
};

const filterByGenre = () => {
  if (!filterGenre.value) {
    fetchBooks();
  } else {
    const filteredBooks = allBooks.value.filter((book) => {
      return book.Book_Genre.toLowerCase().includes(
        filterGenre.value.toLowerCase()
      );
    });
    allBooks.value = filteredBooks;
  }
};

const filterBySize = () => {
  if (!filterSize.value) {
    fetchBooks();
  } else {
    const filteredBooks = allBooks.value.filter((book) => {
      return String(book.Book_Size).includes(filterSize.value.toLowerCase());
    });
    allBooks.value = filteredBooks;
  }
};

const filterByReadPage = () => {
  if (!filterReadPage.value) {
    fetchBooks();
  } else {
    const filteredBooks = allBooks.value.filter((book) => {
      return String(book.Read_Page).includes(
        filterReadPage.value.toLowerCase()
      );
    });
    allBooks.value = filteredBooks;
  }
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

const formStyle = ref({
  opacity: 0,
  transition: "opacity 1s ease",
});

onMounted(() => {
  fetchBooks(allBooks.value);

  setTimeout(() => {
    formStyle.value.opacity = 1;
  }, 500);
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

form {
  transition: opacity 1s ease;
}
</style>
