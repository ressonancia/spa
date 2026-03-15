<template>
	<div>
		<label for="key" class="block text-sm font-medium leading-6 text-gray-900"><slot></slot></label>
		<div class="mt-2 flex rounded-md shadow-sm">
			<div class="relative flex flex-grow items-stretch focus-within:z-10">
				<input readonly :type="inputType" name="key" :value="value"
					class="block w-full rounded-l-md border-0 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
			</div>
			<button v-if="hide" type="button" @click="toggle"
				class="relative -ml-px inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
				<EyeIcon v-if="redacted" class="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
				<EyeSlashIcon v-if="!redacted" class="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
				{{ showText }}
			</button>
				<button type="button" @click="copy"
					class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
					<ClipboardDocumentIcon class="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
					Copy
					<CopyTooltip position="top" ref="copyTooltipRef" />
				</button>
			</div>
		</div>
</template>

<script setup>
import { EyeIcon, EyeSlashIcon, ClipboardDocumentIcon} from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import CopyTooltip from '@/components/CopyTooltip.vue'

const props = defineProps({
  value: String,
  hide: String,
})

let redacted = ref(true);
let inputType = ref(props.hide ? 'password' : 'text');
let showText = ref('Show');
const copyTooltipRef = ref(null)

const copy = () => {
	navigator.clipboard.writeText(props.value).catch(() => null)
	copyTooltipRef.value?.show()
}

const toggle = () => {
	redacted.value = !redacted.value;

	if (redacted.value) {
		inputType.value = 'password'
		showText.value = 'Show';
	} else {
		inputType.value = 'text'
		showText.value = 'Hide';
	}
}
</script>
