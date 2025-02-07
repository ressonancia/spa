<template>
  <RouterView v-slot="{Component}">
    <DefaultTransition>
      <component :is="Component"></component>
    </DefaultTransition>
  </RouterView>
</template>

<script setup>
import { RouterView } from "vue-router";
import DefaultTransition from "@/components/Transitions/DefaultTransition.vue";
</script>
