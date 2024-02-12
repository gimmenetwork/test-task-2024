<template>
    <div class="grid place-items-center gap-y-10">
        <h1 class="text-3xl md:text-5xl">Page not found 🧭🚶</h1>
        <div class="text-center">
            <p>Opps! You navigated to a non-existent page...</p>
            <br />
            <p class="inline">Try going back to the previous page or&nbsp;</p>
            <router-link to="/"
                ><span class="link"><b>click here</b></span>
            </router-link>
            <p class="inline">&nbsp;to go to the homepage</p>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
