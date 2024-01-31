<template>
  <NuxtLayout class="h-min-full min-h-screen">
    <div class="parallax bg-cover z-0 h-screen">
      <div
        class="flex pt-5 cursor-pointer justify-between ml-80 mb-10 text-sm"
        @click="navigateBack"
      >
        <div class="flex">
          <img
            src="@/assets/images/arrowLeft.png"
            class="h-3 mt-1 mr-4"
            alt=""
          />
          <p class="text-white mr-2">back</p>
        </div>
      </div>
      <div class="flex justify-between mb-5">
        <p class="text-2xl font-bold ml-80 uppercase text-white">Book</p>
      </div>
      <div
        class="w-1/2 ml-80 p-4 border border-gray-500 bg-white bg-opacity-90 rounded-md"
      >
        <div
          class="uppercase flex justify-between"
          v-for="book in allBooks"
          :key="book.id"
        >
          <div class="w-4/5 mr-8 border-r pr-5 h-auto border-black">
            <div class="flex justify-between mb-2">
              <p>ID:</p>
              <p class="font-bold text-green-600 pr-4 text-right">
                {{ book.id }}
              </p>
            </div>
            <div class="flex justify-between mb-2">
              <p>{{ $t("bookName") }}:</p>
              <input
                v-model="book.Book_Name"
                class="w-1/3 font-bold border-black rounded-md text-green-600 border pr-4 text-right"
              />
            </div>
            <div class="flex justify-between mb-2">
              <p>{{ $t("bookGenre") }}:</p>
              <input
                v-model="book.Book_Genre"
                class="w-1/3 font-bold text-green-600 border-black rounded-md border pr-4 text-right"
              />
            </div>
            <div class="flex justify-between mb-2">
              <p>{{ $t("bookSize") }}:</p>
              <input
                v-model="book.Book_Size"
                class="w-1/3 font-bold text-green-600 border-black rounded-md border pr-4 text-right"
              />
            </div>
            <div class="flex justify-between mb-2">
              <p>readedPages:</p>
              <input
                type="number"
                id="readedPages"
                v-model="book.Read_Page"
                class="w-1/3 font-bold text-green-600 border-black rounded-md border text-right"
              />
            </div>
            <div v-if="book.Book_Review" class="flex justify-between mb-2">
              <p>Book Review:</p>
              <input
                type="text"
                id="readedPages"
                v-model="book.Book_Review"
                class="w-1/3 font-bold text-green-600 border-black rounded-md pr-4 border text-right"
              />
            </div>
            <div v-if="book.Book_Stars" class="flex justify-between mb-2">
              <p>Book Rating:</p>
              <input
                type="number"
                id="readedPages"
                v-model="book.Book_Stars"
                class="w-1/3 font-bold text-green-600 border-black rounded-md border text-right"
              />
            </div>
          </div>
          <div class="w-1/5">
            <div>
              <div @click="deleteBook(selectedBook)">
                <img
                  src="@/assets/images/delete.png"
                  class="w-1/3 m-auto transition-all duration-300 cursor-pointer hover:scale-90 border border-black p-2 rounded-full"
                  alt="deleteButton"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="m-auto mt-4">
          <button
            @click="saveChanges"
            class="bg-green-500 p-2 w-1/6 text-white uppercase"
          >
            Save
          </button>
        </div>
      </div>

      <div
        v-if="finished"
        class="w-1/2 mt-10 ml-80 p-4 border border-gray-500 bg-white bg-opacity-90 rounded-md"
      >
        <p class="mb-4">Your Review</p>
        <input
          type="text"
          v-model="bookReview"
          class="border w-full p-3 h-20 border-gray-300"
          id="review"
        />
        <div class="flex align-middle items-center">
          <p class="mb-4 mt-5 mr-5">Your Rating:</p>
          <input
            type="number"
            v-model="bookRating"
            class="border w-12 pl-4 h-8 border-gray-300"
            id="review"
          />
        </div>
        <div class="m-auto mt-4">
          <button
            @click="sentReview"
            class="bg-green-500 border p-2 w-1/6 text-white uppercase"
          >
            Sent Review
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();

const supabase = useSupabaseClient();
const route = useRoute();
const selectedBook = ref(route.query);
const allBooks = ref(null);
const readedPages = ref(0);
const finished = ref(false);
const bookReview = ref("");
const bookRating = ref(0);
const invalidValueEncountered = ref(false);

const fetchBook = async () => {
  try {
    const { data } = await supabase
      .from("Book_History")
      .select("*")
      .eq("id", Number(selectedBook.value.id));
    if (data) {
      allBooks.value = data;
    }
  } catch (error) {
    console.log(error);
  }
};

const saveChanges = async () => {
  const modifiedBook = allBooks.value;
  const updatePromises = modifiedBook.map(async (book) => {
    const bookName = book.Book_Name;
    const bookGenre = book.Book_Genre;
    const bookSize = book.Book_Size;
    const readPage = book.Read_Page;
    const bookReview = book.Book_Review;
    const bookRating = book.Book_Stars;
    if (readPage > bookSize) {
      alert(
        `Read pages (${readPage}) cannot be greater than Book Size (${bookSize}) for book ${book.id}`
      );
      return null;
    }

    if (readPage == bookSize) {
      alert(`Our congratulations! You finished reading ${book.Book_Name}`);
      finished.value = true;
      try {
        const { data, error } = await supabase
          .from("Book_History")
          .update({
            Book_Name: bookName,
            Book_Genre: bookGenre,
            Book_Size: bookSize,
            Read_Page: readPage,
            Book_Review: bookReview,
            Book_Stars: bookRating,
          })
          .eq("id", book.id);

        if (error) {
          console.error(`Error updating book ${book.id}:`, error);
          return { success: false, id: book.id };
        }
        return { success: true, id: book.id };
      } catch (error) {
        console.error(`Exception during update for book ${book.id}:`, error);
        return { success: false, id: book.id };
      }
    }

    if (readPage !== bookSize) {
      if (bookName || bookGenre || bookSize || readPage) {
        try {
          const { data, error } = await supabase
            .from("Book_History")
            .update({
              Book_Name: bookName,
              Book_Genre: bookGenre,
              Book_Size: bookSize,
              Read_Page: readPage,
              Book_Review: bookReview,
              Book_Stars: bookRating,
            })
            .eq("id", book.id);

          if (error) {
            console.error(`Error updating book ${book.id}:`, error);
            return { success: false, id: book.id };
          }
          alert("Changes saved successfully");
          navigateTo("/listofbooks");
          return { success: true, id: book.id };
        } catch (error) {
          console.error(`Exception during update for book ${book.id}:`, error);
          return { success: false, id: book.id };
        }
      } else {
        alert(`Invalid numeric value entered for book ${book.id}`);
        return { success: false, id: book.id };
      }
    }

    if (readPage !== bookSize) {
      const updatedData = await Promise.all(updatePromises);
      console.log("updatedData:", updatedData);

      const hasInvalidValue = updatedData.some(
        (data) => data.success === false
      );

      console.log("hasInvalidValue:", hasInvalidValue);

      if (!hasInvalidValue && updatedData.length > 0) {
        alert("Changes saved successfully");
        navigateTo("/listofbooks");
      } else {
        console.error("Save failed due to invalid data");
      }
    }
  });
};

const sentReview = async () => {
  try {
    const { data, error } = await supabase
      .from("Book_History")
      .update({
        Book_Review: bookReview.value,
        Book_Stars: bookRating.value,
      })
      .eq("id", selectedBook.value.id);
    navigateTo("/listofbooks");
  } catch (error) {
    console.error(`Exception during update for book ${book.id}:`, error);
  }
};

const deleteBook = async () => {
  if (window.confirm("Are you sure you want to delete this book?")) {
    try {
      const { data, error } = await supabase
        .from("Book_History")
        .delete()
        .eq("id", selectedBook.value.id)
        .select();
      if (error) {
        console.error("Deletion error:", error);
      } else {
        navigateTo("/listofbooks");
      }
    } catch (error) {
      console.error("Exception during deletion:", error);
    }
  }
};

const navigateBack = () => {
  router.go(-1);
};

onMounted(() => {
  fetchBook(allBooks.value);
});
</script>

<style scoped>
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
  background-image: url("@/assets/images/bookWallap3.jpeg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  filter: brightness(55%);
  z-index: -1;
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
