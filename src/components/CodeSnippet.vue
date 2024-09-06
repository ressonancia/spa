<template>
	<div
		class="mt-6 flex items-center justify-between text-white bg-gray-900 font-mono text-sm py-5 px-5 w-full rounded-md">
		<div class="flex gap-1">
			<span>$</span>
			<span>
				<slot></slot>
			</span>
		</div>
		<span class="flex text-white cursor-pointer w-5 h-5 hover:text-gray-400 duration-200"
		@click="copy">
			<ClipboardDocumentIcon />
		</span>
	</div>
</template>

<script setup>
import { ClipboardDocumentIcon} from '@heroicons/vue/20/solid'
import { useSlots } from 'vue'

const slots = useSlots()

const copy = () => {
	navigator.clipboard.writeText(
		slots.default().map(vnode => vnode.children).join('')
	)
}
</script>