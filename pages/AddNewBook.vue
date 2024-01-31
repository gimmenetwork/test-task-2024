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
          <div class="mb-4">
            <label for="bookImg" class="block text-white">Book Image:</label>
            <input
              type="file"
              id="bookImg"
              ref="imageInput"
              accept="image/*"
              @change="handleImageChange"
              class="block w-full h-10 border-2 border-gray-400 rounded-md p-2"
            />
          </div>
          <div class="flex flex-nowrap">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded w-1/5 border-2 border-grey mt-5"
            >
              {{ $t("save") }}
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
const bookImg = ref(""); // Store image URL

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      bookImg.value = file; // Store the file object itself
    };
    reader.readAsDataURL(file);
  }
};

const saveBook = async () => {
  console.log(bookImg.value); // Log the file object
  const filename = `${bookImg.value.name}`;
  const { data: fileError, error: fileUploadError } = await supabase.storage
    .from("Book_Images")
    .upload(`book_images/${filename}`, bookImg.value);

  if (fileError || fileUploadError) {
    console.error(fileError || fileUploadError);
    return;
  }

  const imageUrl = `${supabase.storage
    .from("Book_Images")
    .url(`book_images/${bookImg.value.name}`)}`;
    console.log(imageUrl)
  const { data: dbError } = await supabase
    .from("Book_History")
    .insert({
      Book_Name: bookName.value,
      Book_Genre: bookGenre.value,
      Book_Size: bookSize.value,
      Book_Image: imageUrl,
    })
    .select();

  if (dbError) {
    console.error(dbError);
    return;
  }

  alert("Book was added successfully");
  // navigateTo("/listofbooks"); // Assuming navigateTo is defined somewhere
};



// const saveBook = async () => {
//   const { data: error } = await supabase
//     .from("Book_History")
//     .insert({
//       Book_Name: bookName.value,
//       Book_Genre: bookGenre.value,
//       Book_Size: bookSize.value,
//       Book_Image: bookImg.value,
//     })
//     .select();
//   if (error) {
//     console.log(error);
//   }
//   alert("Book was added successfully");
//   navigateTo("/listofbooks");
// };
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
