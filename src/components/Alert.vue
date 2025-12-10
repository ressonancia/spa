<template>
  <div v-if="show" class="p-4 mb-6 rounded-md bg-green-50">
    <div class="flex">
      <div class="shrink-0">
        <CheckCircleIcon class="text-green-400 size-5" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium text-green-800">{{ message }}</p>
      </div>
      <div class="pl-3 ml-auto">
        <div class="-mx-1.5 -my-1.5">
          <button @click="$emit('close')" type="button" class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-green-50 focus-visible:outline-hidden">
            <span class="sr-only">Dismiss</span>
            <XMarkIcon class="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid'

defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: "Thanks for your subscription! We're currently setting up your experience"
  }
})

defineEmits(['close'])
</script>