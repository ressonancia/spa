<template>
  <div class="min-h-full">
    <Header />
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>


<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>
