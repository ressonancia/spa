<template>
	<div class="rounded-lg overflow-hidden border border-gray-700 shadow-xl">
		<div class="bg-gray-800 text-gray-400 px-4 py-2 text-sm font-mono flex items-center justify-between border-b border-gray-700">
			<span>{{ filename }}</span>
			<button @click="copy" class="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors has-tooltip">
			Copy
			<CopyTooltip ref="copyTooltipRef" />
			</button>
		</div>

		<highlightjs :code="code" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import CopyTooltip from '@/components/CopyTooltip.vue'

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

const copyTooltipRef = ref(null)

const copy = () => {
	navigator.clipboard.writeText(props.copyCode ?? props.code).catch(() => null)
	copyTooltipRef.value?.show()
}
</script>

<style>
.has-tooltip {
  position: relative;
}
</style>
