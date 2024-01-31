<template>
  <NuxtLayout class="bg-white w-full">
    <div class="body bg-cover h-screen">
      <div
        class="bg-black bg-opacity-70 ml-36 text-black font-bold border-3 border-gray-300 rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-1/3 p-8"
      >
        <form @submit.prevent="saveBook" class="h-96">
          <div class="mb-4">
            <label for="email" class="block text-white">Book Name:</label>
            <input
              type="text"
              id="bookName"
              required
              v-model="bookName"
              class="block w-full h-10 border-2 border-gray-400 rounded-md p-2"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-white">Book Genre:</label>
            <input
              v-model="bookGenre"
              type="text"
              id="bookGenre"
              required
              class="block w-full h-10 border-2 border-gray-400 rounded-md p-2"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-white">Book Size:</label>
            <input
              v-model="bookSize"
              type="number"
              id="bookSize"
              required
              class="block w-full h-10 border-2 border-gray-400 rounded-md p-2"
            />
          </div>
          <div class="flex flex-nowrap">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded w-1/5 border-2 border-grey mt-5"
            >
              {{ $t("ave") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const supabase = useSupabaseClient();
const bookName = ref("");
const bookGenre = ref("");
const bookSize = ref(0);

const saveBook = async () => {
  const { data: error } = await supabase
    .from("Book_History")
    .insert({
      Book_Name: bookName.value,
      Book_Genre: bookGenre.value,
      Book_Size: bookSize.value,
    })
    .select();
  if (error) {
    console.log(error);
  }
  alert("Book was added successfully");
  navigateTo("/listofbooks");
};
</script>

<style scoped>
div.body {
  background-image: url("@/assets/images/boolWallaper.jpeg");
}

body {
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  margin: 0;
}
</style>
