<template>
	<div>
		<h1 class="mt-10 text-3xl tracking-tight text-gray-900 sm:text-4xl">API Key</h1>
		<p class="mt-6 text-xl leading-8">Use this API Key to authenticate and sent messages to Ressonance at the server side.
			<br> For more instructions follow the <a target="_blank" class="text-orange-600 hover:text-orange-900" href="https://laravel.com/docs/11.x/broadcasting#client-reverb">Laravel Documentation.</a></p>

		<div class="mt-10">
			<CopyField value="https://websocket.ressonance.com">Websocket Host</CopyField>
		</div>

		<div class="mt-10">
			<CopyField :value="app.app_id">App ID</CopyField>
		</div>

		<div class="mt-10">
			<CopyField :value="app.app_key">App Key</CopyField>
		</div>

		<div class="mt-10">
			<CopyField hide="true" :value="app.app_secret">App Secret</CopyField>
		</div>

		<!-- <div class="mt-16 max-w-2xl">
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
		</div> -->

		<Modal ref="modal" />
	</div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, useTemplateRef } from 'vue'
import apiRequester from '@/services/requester';
import CopyField from '@/components/CopyField.vue';
import Modal from "@/views/modals/Modal.vue";
import { useGlobalStore } from "@/stores/global";
import { stringLimit } from '@/services/utils';

const globalStore = useGlobalStore();
const modalRef = useTemplateRef('modal')

let app = ref({})
const route = useRoute();
const projectName = route.params.project;

apiRequester.get(`${import.meta.env.VITE_API_URL}/api/apps/${projectName}`).then(function (response) {
	app.value = response.data
	globalStore.setHeaderLabel(stringLimit(app.value.app_name.toLowerCase(), 50))
})
.catch(function () {
	modalRef.value.apiDownResponse()
});
</script>