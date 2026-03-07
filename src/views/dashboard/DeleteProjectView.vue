<template>
	<DefaultTransition name="slide-fade" appear>
		<div>
			<div class="max-w-2xl mt-20">
				<p for="name" class="block text-lg font-medium leading-6 text-red-600 text-left">To confirm project <span class="text-red-900 uppercase">{{ route.query.projectName }}</span> deletion tipe "CONFIRM DELETE" in the text area. Be careful this action cannot be undone</p>
				<div class="mt-2">
					<input type="text" v-model="appName" name="appName" id="appName" :class="{
						'ring-gray-300': valid,
						'ring-orange-500': !valid
					}" class="block w-full rounded-md border-0 py-5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="Time to wake up :(" />
				</div>
			</div>

			<div class="mt-20">
				<button @click="deleteProject" type="button"
					class="inline-flex items-center gap-x-2 rounded-md bg-gray-800  px-10 py-5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700">
					Remove Project For Ever
				</button>
			</div>

			<Modal ref="modal" />
		</div>
	</DefaultTransition>
</template>

<script setup>
import { useGlobalStore } from "@/stores/global";
import Modal from "@/views/modals/Modal.vue";
import apiRequester from '@/services/requester';
import { ref, useTemplateRef } from 'vue'
import { useRouter, useRoute } from "vue-router";
import DefaultTransition from "@/components/Transitions/DefaultTransition.vue";


let router = useRouter()
let route = useRoute()
const modalRef = useTemplateRef('modal')

const appName = ref('')
const valid = ref(true)

const globalStore = useGlobalStore()
globalStore.setHeaderLabel('Are you sure?')

const deleteProject = async () => {
	try {

		if (appName.value != "CONFIRM DELETE") {
			valid.value = false
			return false
		} else {
			valid.value = true
		}

		let response;

		response = await apiRequester.delete(`/api/apps/${route.params.project}`);

		appName.value = ''
		router.push({
			name: "projects",
		});

	} catch (error) {
		modalRef.value.apiDownResponse()
	}
}
</script>