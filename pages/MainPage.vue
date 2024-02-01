<template>
  <NuxtLayout class="h-screen bg-white w-full">
    <div class="body h-screen bg-cover ml-60">
      <div class="text-center w-full pt-20" :style="formStyle">
        <h2 class="text-4xl w-1/3">
          {{ $t("welcome") }}
        </h2>
      </div>
      <div
        class="w-9/12 bg-white bg-opacity-80 border-8 border-red-300 border-opacity-70 rounded-md m-auto mt-80 flex align-middle items-center h-52"
        :style="formStyle"
      >
        <div
          class="divStyles w-1/3 border-r-2 border-gray-400 flex flex-col h-52 text-center"
          :style="formStyle"
        >
          <p
            class="uppercase font-semibold pt-6 items-center align-middle text-2xl"
          >
            first step
          </p>
          <p class="w-3/4 m-auto text-xl align-middle">
            You can add any book, indicating the genre, size, and number of
            pages already read!
          </p>
        </div>
        <div
          class="divStyles w-1/3 border-r-2 border-gray-400 flex flex-col h-52 text-center"
          :style="formStyle"
        >
          <p class="uppercase font-semibold pt-6 text-2xl">second step</p>
          <p class="w-3/4 m-auto text-xl align-middle">
            You can delete an already added book, change the number of pages
            read, title, genre, filter book lists by various categories.
          </p>
        </div>
        <div
          class="divStyles w-1/3 flex flex-col h-52 text-center"
          :style="formStyle"
        >
          <p class="uppercase font-semibold pt-6 text-2xl">third step</p>
          <p class="w-3/4 m-auto text-xl align-middle">
            After reading the book to the end, you can leave a review about it,
            rate it by giving a rating, and also share your feedback on the
            social network Twitter!
          </p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";

const formStyle = ref({
  opacity: 0,
  transition: "opacity 1s ease",
});

onMounted(() => {
  setTimeout(() => {
    formStyle.value.opacity = 1;
  }, 500);
});
</script>

<style scoped>
.body {
  background-image: url("@/assets/images/books5.png");
}

.divStyles {
  transition: opacity 1s ease;
}

h2 {
  color:#fffbf1;
  text-shadow: 0 20px 25px #2e2e31, 0 40px 60px #2e2e31;
  font-size: 80px;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: -3px;
  margin: 0;
  position: absolute;
  top: 30%;
  left: 56%;
  transform: translateX(-50%) translateY(-50%);
}

h2:before,
h2:after {
  content: "";
  padding: 0.9em 0.4em;
  position: absolute;
  left: 50%;
  width: 100%;
  top: 50%;
  display: block;
  border: 15px solid red;
  transform: translateX(-50%) translateY(-50%) rotate(0deg);
  animation: 10s infinite alternate ease-in-out tipsy;
}

h2:before {
  border-color: #d9524a #d9524a rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
  z-index: -1;
}

h2:after {
  border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #d9524a #d9524a ;
  box-shadow: 25px 25px 25px rgba(46, 46, 49, 0.8);
}

@keyframes tipsy {
  0% {
    transform: translateX(-50%) translateY(-50%) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) translateY(-50%) rotate(360deg);
  }
} 
</style>
