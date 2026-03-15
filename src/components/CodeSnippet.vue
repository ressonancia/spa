<template>
	<div class="rounded-lg overflow-hidden border border-gray-700 shadow-xl">
		<div class="bg-gray-800 text-gray-400 px-4 py-2 text-sm font-mono flex items-center justify-between border-b border-gray-700">
			<span>{{ filename }}</span>
			<button @click="copy" class="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors has-tooltip">
			Copy<span v-if="showTooltip" class='tooltip'>Copied!</span>
			</button>
		</div>

		<highlightjs :code="code" />
	</div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	code: {
		type: String,
		default: '',
	},
	copyCode: {
		type: String,
		default: null,
	},
	filename: {
		type: String,
		default: 'public-event.js',
	},
})

const showTooltip = ref(false)

const copy = () => {
	navigator.clipboard.writeText(props.copyCode ?? props.code)
	showTooltip.value = true
	setTimeout(() => {
		showTooltip.value = false
	}, 4000)
}
</script>

<style>
.has-tooltip {
  position: relative;
}

.tooltip {
  position: absolute;
  top: 50%;
  right: calc(100% + 8px);
  transform: translateY(-50%);
  opacity: 1;
  animation: tooltip-fade-in 0.2s ease, tooltip-slide-in 0.5s ease;
  text-decoration: bold;
  background: #111827;
  color: #ffffff;
  padding: 10px;
  border-radius: 6px;
  font-size: 1.25rem;
  white-space: nowrap;
  z-index: 100;
}

@keyframes tooltip-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes tooltip-slide-in {
  from {
    transform: translate(30px, -50%);
  }
  to {
    transform: translateY(-50%);
  }
}
</style>
