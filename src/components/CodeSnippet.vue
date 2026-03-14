<template>
	<div class="rounded-lg overflow-hidden border border-gray-700 shadow-xl">
		<div class="bg-gray-800 text-gray-400 px-4 py-2 text-sm font-mono flex items-center justify-between border-b border-gray-700">
			<span>{{ filename }}</span>
			<button @click="copy" class="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors">
			Copy
			</button>
		</div>

		<highlightjs :code="code" />
	</div>
</template>

<script setup>
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

const copy = () => {
	navigator.clipboard.writeText(props.copyCode ?? props.code)
}
</script>
