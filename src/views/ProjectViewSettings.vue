<template>
	<div>
		<h1 class="mt-10 text-3xl tracking-tight text-gray-900 sm:text-4xl">API Key</h1>
		<p class="mt-6 text-xl leading-8">Use this API Key to authenticate and sent messages to Ressonance at the server
			side</p>

		<div class="mt-10">
			<RedactedField :value="app.app_id">App ID</RedactedField>
		</div>

		<div class="mt-10">
			<RedactedField :value="app.app_key">App Key</RedactedField>
		</div>

		<div class="mt-10">
			<RedactedField :value="app.app_secret">App Secret</RedactedField>
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
import { ref } from 'vue'
import axios from 'axios';
import CodeSnippet from '../components/CodeSnippet.vue';
import RedactedField from '../components/RedactedField.vue';

let app = ref({})
const route = useRoute();
const projectName = route.params.project;

axios.get(`${import.meta.env.VITE_API_URL}/api/apps/${projectName}`).then(function (response) {
	app.value = response.data
})
.catch(function (error) {
	alert(error)
});
</script>