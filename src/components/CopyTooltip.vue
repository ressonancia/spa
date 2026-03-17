<template>
  <Transition name="tooltip-slide-fade">
    <span v-if="visible" :class="['tooltip', `tooltip-${position}`]">{{ text }}</span>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Copied!',
  },
  duration: {
    type: Number,
    default: 4000,
  },
  position: {
    type: String,
    default: 'left',
  },
})

const visible = ref(false)
const show = () => {
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, props.duration)
}

defineExpose({ show })
</script>

<style scoped>
.tooltip {
  position: absolute;
  transform: var(--tooltip-rest-transform);
  background: #111827;
  color: #ffffff;
  padding: 10px;
  border-radius: 6px;
  font-size: 1.25rem;
  white-space: nowrap;
  z-index: 100;
}

.tooltip-left {
  top: 50%;
  right: calc(100% + 8px);
  --tooltip-rest-transform: translateY(-50%);
  --tooltip-enter-transform: translate(30px, -50%);
}

.tooltip-top {
  bottom: calc(100% + 8px);
  left: 50%;
  --tooltip-rest-transform: translateX(-50%);
  --tooltip-enter-transform: translate(-50%, 30px);
}

.tooltip-slide-fade-enter-active,
.tooltip-slide-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.5s ease;
}

.tooltip-slide-fade-enter-from,
.tooltip-slide-fade-leave-to {
  opacity: 0;
  transform: var(--tooltip-enter-transform);
}

.tooltip-slide-fade-enter-to,
.tooltip-slide-fade-leave-from {
  opacity: 1;
  transform: var(--tooltip-rest-transform);
}
</style>
