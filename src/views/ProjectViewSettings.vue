<template>
	<div>
		<h1 class="mt-10 text-3xl tracking-tight text-gray-900 sm:text-4xl">API Key</h1>
		<p class="mt-6 text-xl leading-8">Use this API Key to authenticate and sent messages to Ressonance at the server
			side</p>
		<div class="mt-10">
			<div>
				<label for="key" class="block text-sm font-medium leading-6 text-gray-900">API Key</label>
				<div class="mt-2 flex rounded-md shadow-sm">
					<div class="relative flex flex-grow items-stretch focus-within:z-10">
						<input :type="inputType" name="key" id="key"
							v-model="app.app_secret"
							class="block w-full rounded-l-md border-0 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
					</div>
					<button type="button" @click="toggle"
						class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
						<EyeIcon v-if="redacted" class="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						<EyeSlashIcon v-if="!redacted" class="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						{{ showText }}
					</button>
				</div>
			</div>
		</div>

		<figure class="mt-16">
		</figure>
		<div class="mt-16 max-w-2xl">
			<h2 class="text-2xl tracking-tight text-gray-900">Install the SDK on your application
			</h2>
			<CodeSnippet>composer require ressonance/sdk</CodeSnippet>
		</div>

		<div class="mt-16 max-w-2xl">
			<h2 class="text-2xl tracking-tight text-gray-900">Subscribe to a channel
			</h2>
			<CodeSnippet>composer require ressonance/sdk</CodeSnippet>
		</div>

		<div class="mt-16 max-w-2xl">
			<h2 class="text-2xl tracking-tight text-gray-900">Send a message
			</h2>
			<CodeSnippet>composer require ressonance/sdk</CodeSnippet>
		</div>
	</div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { EyeIcon, EyeSlashIcon} from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import axios from 'axios';
import CodeSnippet from '../components/CodeSnippet.vue';

let redacted = ref(true);
let inputType = ref('password');
let showText = ref('Show');
let app = ref({})

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

const route = useRoute();
const projectName = route.params.project;

axios.get(`${import.meta.env.VITE_API_URL}/api/apps/${projectName}`).then(function (response) {
	app.value = response.data
})
.catch(function (error) {
	alert(error)
});
</script>