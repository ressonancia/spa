<template>
  <Transition
    :name="transitionName"
    :appear="appear"
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

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  appear: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const transitionName = computed(() => props.name || route.meta.transition || "");
</script>
