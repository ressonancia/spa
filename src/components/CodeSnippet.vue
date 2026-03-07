<template>
	<div class="rounded-lg overflow-hidden border border-gray-700 shadow-xl">
		<div class="bg-gray-800 text-gray-400 px-4 py-2 text-sm font-mono flex items-center justify-between border-b border-gray-700">
			<span>{{ filename }}</span>
			<button @click="copy" class="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors">
			Copy
			</button>
		</div>
		<pre class="bg-gray-900 text-gray-100 px-6 overflow-x-auto">
			<code class="font-mono text-sm">{{ code }}</code>
		</pre>
	</div>
</template>

<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
	code: {
		type: String,
		default: '',
	},
	filename: {
		type: String,
		default: '',
	},
})

const slots = useSlots()

const copy = () => {
	navigator.clipboard.writeText(props.code)
}
</script>
