<template>
  <DefaultTransition name="slide-fade" appear>
    <div>
      <Form @submit="createOrganization" :validation-schema="schema" v-slot="{ errors }">
        <div class="max-w-2xl mt-20">
          <p for="name" class="block text-sm font-medium leading-6 text-gray-900 text-left">Organization Name</p>
          <div class="mt-2">
            <Field
              v-model="name"
              id="name"
              name="name"
              type="text"
              autocomplete="organization"
              class="block w-full rounded-md border-0 py-5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              :class="[errors.name ? 'ring-orange-300' : 'ring-gray-300']"
              placeholder="Name your organization"
            />
            <p class="mt-2 text-sm text-orange-300" id="name-error">{{ errors.name }}</p>
          </div>
        </div>

        <div class="mt-20">
          <button
            type="submit"
            class="inline-flex items-center gap-x-2 rounded-md bg-gray-800 px-10 py-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-700"
          >
            Create Organization
            <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </Form>

      <Modal ref="modal" />
    </div>
  </DefaultTransition>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue'
import { Form, Field, defineRule } from 'vee-validate'
import { required, max } from '@vee-validate/rules'
import { PlusIcon } from '@heroicons/vue/20/solid'
import { useRouter } from 'vue-router'
import posthog from 'posthog-js'
import { useGlobalStore } from '@/stores/global'
import DefaultTransition from '@/components/Transitions/DefaultTransition.vue'
import Modal from '@/views/modals/Modal.vue'
import apiRequester from '@/services/requester'

const router = useRouter()
const globalStore = useGlobalStore()

globalStore.setHeaderLabel('Add Organization')

const modalRef = useTemplateRef('modal')
const name = ref('')

defineRule('required', required)
defineRule('max', max)

const schema = {
  name: 'required|max:200',
}

const createOrganization = () => {
  try {
    apiRequester.post('/api/organizations', {
      name: name.value,
    }).then(response => {
      posthog.capture('organization_created')
      globalStore.setCurrentOrganizationId(response.data.id)
      
      var createProjectRoute = router.resolve({
        name: 'create-projects',
      }).href

      window.location = createProjectRoute
    })
  } catch (error) {
    switch (error.response?.status) {
      case 412:
        modalRef.value.showModal(
          'Organization Limit Reached',
          'warning',
          'You have reached the organization number limit.'
        )
        break

      default:
        modalRef.value.apiDownResponse()
        break
    }
  }
}
</script>
