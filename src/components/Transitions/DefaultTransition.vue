<template>
  <Transition
    :name="routeTransition"
    mode="out-in">
    <slot></slot>
  </Transition>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: opacity 0.2s ease, transform 0.5s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
</style>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const routeTransition = computed(() => route.meta.transition || "");
</script>