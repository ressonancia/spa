<template>
    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div>
                                <div v-if="type==='success'" class="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                                    <CheckIcon class="size-6 text-green-600" aria-hidden="true" />
                                </div>
                                <div v-if="type==='danger'" class="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100">
                                    <ExclamationTriangleIcon class="size-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div v-if="type==='warning'" class="mx-auto flex size-12 items-center justify-center rounded-full bg-yellow-100">
                                    <ExclamationTriangleIcon class="size-6 text-yellow-600" aria-hidden="true" />
                                </div>
                                <div class="mt-3 text-center sm:mt-5">
                                    <DialogTitle as="h3" class="text-base font-semibold text-gray-900">{{ title }}</DialogTitle>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">{{ description }}</p>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const open = ref(false)
const title = ref('')
const type = ref('')
const description = ref('')

const showModal = (
    modalTitle = "",
    modalType = "success",
    ModalDescription = "",
) => {
    title.value = modalTitle
    type.value = modalType
    description.value = ModalDescription
    open.value = true
}

const apiDownResponse = () => {
    showModal(
		'Something is wrong',
		'danger',
		'Our API is not responding properly. Our team is working on it just try again latter.'
	)
}

defineExpose({
    showModal,
    apiDownResponse
})
</script>