<template>
  <NuxtLayout class="h-min-full min-h-screen">
    <div class="body bg-cover h-screen">
    <div
      class="flex pt-5 cursor-pointer justify-between ml-80 mb-10 text-sm"
      @click="navigateBack"
    >
      <div class="flex">
        <img src="@/assets/images/arrowLeft.png" class="h-3 mt-1 mr-4" alt="" />
        <p class="text-white mr-2">
          {{ $t("back") }}
        </p>
      </div>
    </div>
    <div class="flex justify-between mb-5">
      <p class="text-2xl font-bold ml-80 uppercase text-white">{{ $t("Book") }}</p>
    </div>
    <div class="w-1/2 ml-80 p-4 border border-gray-500 bg-white bg-opacity-90 rounded-md">
      <div
        class="uppercase flex justify-between"
        v-for="book in allBooks"
        :key="book.id"
      >
        <div class="w-4/5 mr-8 border-r pr-5 h-auto border-black">
          <div class="flex justify-between mb-2">
            <p>ID:</p>
            <p class="font-bold text-green-600 text-right">
              {{ book.id }}
            </p>
          </div>
          <div class="flex justify-between mb-2">
            <p>{{ $t("bookName") }}:</p>
            <input
              v-model="book.Book_Name"
              class="w-1/3 font-bold border-black rounded-md text-green-600 border pr-2 text-right"
            />
          </div>
          <div class="flex justify-between mb-2">
            <p>{{ $t("bookGenre") }}:</p>
            <input
              v-model="book.Book_Genre"
              class="w-1/3 font-bold text-green-600 border-black rounded-md border pr-2 text-right"
            />
          </div>
          <div class="flex justify-between mb-2">
            <p>{{ $t("bookSize") }}:</p>
            <input
              v-model="book.Book_Size"
              class="w-1/3 font-bold text-green-600 border-black rounded-md border pr-2 text-right"
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
  console.log(selectedBook.value.id);
};

// const saveChanges = async () => {
//   const modifiedUnit = allBooks.value;
//   const updatePromises = modifiedUnit.map(async (unit) => {
//     const unitName = unit.Name_of_Unit;
//     if (unitName) {
//       const { data, error } = await supabase
//         .from("allBooks")
//         .update({
//           Name_of_Unit: unitName,
//         })
//         .eq("id", unit.id);
//       if (error) {
//         console.error(`Error updating advice ${term.id}:`, error);
//       }
//       return data;
//     } else {
//       alert(`Invalid numeric value entered for advice ${term.id}`);
//       return null;
//     }
//   });
//   const updatedData = await Promise.all(updatePromises);
//   const hasInvalidValue = updatedData.some((data) => data === null);
//   if (hasInvalidValue && invalidValueEncountered.value == false) {
//     alert("Changes saved successfully");
//     navigateTo("/units");
//     invalidValueEncountered.value = false;
//     modifiedTerm.forEach((advice) => {
//       advice.modified = false;
//     });
//   }
// };

// const deleteUnit = async () => {
//   if (window.confirm("Are you sure you want to delete this Unit?")) {
//     try {
//       const { data, error } = await supabase
//         .from("Units")
//         .delete()
//         .eq("id", selectedUnit.value.unit)
//         .select();
//       if (error) {
//         console.error("Deletion error:", error);
//       } else {
//         navigateTo("/units");
//       }
//     } catch (error) {
//       console.error("Exception during deletion:", error);
//     }
//   }
// };

const navigateBack = () => {
  router.go(-1);
};

onMounted(() => {
  fetchBook(allBooks.value);
});
</script>

<style scoped>
div.body {
  background-image: url("@/assets/images/bookWallap3.jpeg");
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