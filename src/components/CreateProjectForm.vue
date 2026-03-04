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

		<div class="max-w-2xl mt-6">
			<p for="language" class="block text-sm font-medium leading-6 text-gray-900 text-left">Backend Stack</p>
			<div class="mt-2">
				<Listbox v-model="chosenLanguage">
					<div class="relative">
						<ListboxButton
							class="relative w-full cursor-pointer rounded-md border-0 bg-white py-5 pl-3 pr-10 text-left ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
							<span :class="{ 'text-gray-400': !chosenLanguage }" class="block truncate">
								{{ selectedLanguageLabel }}
							</span>
							<span class="absolute inset-y-0 right-0 flex items-center pr-3">
								<ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
							</span>
						</ListboxButton>

						<transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
							<ListboxOptions
								class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
								<ListboxOption
									v-for="language in languageOptions" :key="language.value" :value="language.value"
									v-slot="{ active, selected }" as="template">
									<li :class="[active ? 'bg-gray-800 text-white' : 'text-gray-900','relative cursor-pointer select-none py-2 pl-3 pr-9']">
										<span :class="[
											selected ? 'font-semibold' : 'font-normal',
											'block truncate'
										]">
											{{ language.label }}
										</span>

										<span class="absolute inset-y-0 right-0 flex items-center pr-4">
											<img :src="laravelLogoUrl" alt="Laravel" class="h-5 w-5 rounded-sm object-cover" />
										</span>
									</li>
								</ListboxOption>
							</ListboxOptions>
						</transition>
					</div>
				</Listbox>
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
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { ChevronUpDownIcon, PlusIcon } from '@heroicons/vue/20/solid'
import apiRequester from '@/services/requester';
import { computed, ref, useTemplateRef } from 'vue'
import { useRouter } from "vue-router";
import laravelLogoUrl from '@/assets/img/laravel.png'

let router = useRouter()
const modalRef = useTemplateRef('modal')

const chosenLanguage = ref('')
const languageOptions = [
	{ value: 'php', label: 'PHP' },
	{ value: 'javascript', label: 'JavaScript' },
	{ value: 'python', label: 'Python' },
	{ value: 'java', label: 'Java' }
]
const selectedLanguageLabel = computed(() => {
	return languageOptions.find((language) => language.value === chosenLanguage.value)?.label ?? 'Select your backend stack'
})
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

		response = await apiRequester.post(`/api/apps`, {
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
