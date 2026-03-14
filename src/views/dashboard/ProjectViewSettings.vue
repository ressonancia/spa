<template>
	<DefaultTransition name="slide-fade" appear>
		<div>
			<h1 class="mt-10 text-3xl tracking-tight text-gray-900 sm:text-4xl">API Key</h1>
			<p class="mt-6 text-xl leading-8">Use this API Key to authenticate and send messages to Ressonance at the server side.
				<br> For more instructions see the <a target="_blank" class="text-orange-600 hover:text-orange-900" href="https://docs.ressonance.com/">Complete Ressonance Documentation.</a></p>

			<div class="mt-10">
				<CopyField :value="websocketHost">Websocket Host</CopyField>
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
			<DjangoDoc v-if="selectedLanguage === 'django'" />
			<DotNetDoc v-else-if="selectedLanguage === 'dotnet'" />
			<FlaskDoc v-else-if="selectedLanguage === 'flask'" />
			<GolangDoc v-else-if="selectedLanguage === 'golang'" />
			<JavaDoc v-else-if="selectedLanguage === 'java'" />
			<LaravelDoc v-else-if="selectedLanguage === 'laravel'" />
			<PhpDoc v-else-if="selectedLanguage === 'php'" />
			<PythonDoc v-else-if="selectedLanguage === 'python'" />
			<SymfonyDoc v-else-if="selectedLanguage === 'symfony'" />
			<WordpressDoc v-else-if="selectedLanguage === 'wordpress'" />
			<NodeDoc v-else />
			<Modal ref="modal" />
		</div>
	</DefaultTransition>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, useTemplateRef } from 'vue'
import apiRequester from '@/services/requester';
import CopyField from '@/components/CopyField.vue';
import Modal from "@/views/modals/Modal.vue";
import { useGlobalStore } from "@/stores/global";
import { stringLimit } from '@/services/utils';
import DefaultTransition from "@/components/Transitions/DefaultTransition.vue";
import DjangoDoc from "@/components/StackDocumentations/DjangoDoc.vue";
import DotNetDoc from "@/components/StackDocumentations/DotNetDoc.vue";
import FlaskDoc from "@/components/StackDocumentations/FlaskDoc.vue";
import GolangDoc from "@/components/StackDocumentations/GolangDoc.vue";
import JavaDoc from "@/components/StackDocumentations/JavaDoc.vue";
import LaravelDoc from "@/components/StackDocumentations/LaravelDoc.vue";
import NodeDoc from "@/components/StackDocumentations/NodeDoc.vue";
import PhpDoc from "@/components/StackDocumentations/PhpDoc.vue";
import PythonDoc from "@/components/StackDocumentations/PythonDoc.vue";
import SymfonyDoc from "@/components/StackDocumentations/SymfonyDoc.vue";
import WordpressDoc from "@/components/StackDocumentations/WordpressDoc.vue";


const globalStore = useGlobalStore();
const modalRef = useTemplateRef('modal')

const websocketHost = import.meta.env.VITE_WEBSOCKET_HOST;
const app = ref({})
const route = useRoute();
const projectName = route.params.project;

const selectedLanguage = ref('')

apiRequester.get(`${import.meta.env.VITE_API_URL}/api/apps/${projectName}`).then(function (response) {
	app.value = response.data
	globalStore.setHeaderLabel(stringLimit(app.value.app_name.toLowerCase(), 50))
	selectedLanguage.value = app.value.app_language_choice.toLowerCase()
})
.catch(function () {
	modalRef.value.apiDownResponse()
});
</script>
