<template>
	<div>
		<div class="max-w-2xl mt-20">
			<p for="name" class="block text-sm font-medium leading-6 text-gray-900 text-left">Project Name</p>
			<div class="mt-2">
				<input type="text" v-model="appName" name="appName" id="appName" :class="{
					'ring-gray-300': valid,
					'ring-orange-500': !valid
				}" class="block w-full rounded-md border-0 py-5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					placeholder="Name your next big dream" />
			</div>
		</div>

		<div class="mt-20">
			<button @click="createProject" type="button"
				class="inline-flex items-center gap-x-2 rounded-md bg-gray-800  px-10 py-5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700">
				Create Project
				<PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
			</button>
		</div>

		<Modal ref="modal" />
	</div>
</template>

<script setup>
import Modal from "@/views/modals/Modal.vue";
import { PlusIcon } from '@heroicons/vue/20/solid'
import axios from 'axios';
import { ref, useTemplateRef } from 'vue'
import { useRouter } from "vue-router";

let router = useRouter()
const modalRef = useTemplateRef('modal')

const chosenLanguage = ref('')
const appName = ref('')
const valid = ref(true)

const createProject = async () => {
	try {

		if (!appName.value) {
			valid.value = false
			return false
		} else {
			valid.value = true
		}

		let response;

		response = await axios.post(`${import.meta.env.VITE_API_URL}/api/apps`, {
			app_name: appName.value,
			app_language_choice: chosenLanguage.value ?? ''
		});

		appName.value = ''
		chosenLanguage.value = ''
		router.push({
			name: "projectSettings",
			params: {
				project: response.data.id
			}
		});

	} catch (error) {
		modalRef.value.apiDownResponse()
	}
}
</script>