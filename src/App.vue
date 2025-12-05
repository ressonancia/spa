<template>
  <RouterView v-slot="{Component}">
    <DefaultTransition>
      <component :is="Component"></component>
    </DefaultTransition>
  </RouterView>
  <Toaster />
</template>

<script setup>
import { RouterView } from "vue-router";
import DefaultTransition from "@/components/Transitions/DefaultTransition.vue";
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>
