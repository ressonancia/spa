<template>
  <DefaultTransition name="slide-fade" appear>
    <div>
      <Form @submit="inviteMember" :validation-schema="schema" v-slot="{ errors }">
        <div class="max-w-2xl mt-20">
          <p for="name" class="block text-sm font-medium leading-6 text-gray-900 text-left">Member Name</p>
          <div class="mt-2">
            <Field
              v-model="name"
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              class="block w-full rounded-md border-0 py-5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              :class="[errors.name ? 'ring-orange-300' : 'ring-gray-300']"
              placeholder="Add the member full name"
            />
            <p class="mt-2 text-sm text-orange-300" id="name-error">{{ errors.name }}</p>
          </div>
        </div>

        <div class="max-w-2xl mt-6">
          <p for="email" class="block text-sm font-medium leading-6 text-gray-900 text-left">Member Email</p>
          <div class="mt-2">
            <Field
              v-model="email"
              id="email"
              name="email"
              type="text"
              autocomplete="email"
              class="block w-full rounded-md border-0 py-5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              :class="[errors.email ? 'ring-orange-300' : 'ring-gray-300']"
              placeholder="member@company.com"
            />
            <p class="mt-2 text-sm text-orange-300" id="email-error">{{ errors.email }}</p>
          </div>
        </div>

        <div class="max-w-2xl mt-6">
          <p for="role" class="block text-sm font-medium leading-6 text-gray-900 text-left">Role</p>
          <div class="mt-2">
            <Field v-model="role" name="role" type="hidden" />
            <Listbox v-model="role">
              <div class="relative">
                <ListboxButton
                  :class="[errors.role ? 'ring-orange-300' : 'ring-gray-300']"
                  class="relative w-full cursor-pointer rounded-md border-0 bg-white py-5 pl-3 pr-10 text-left ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <span class="flex items-center gap-2 truncate">
                    <component :is="selectedRole.icon" class="h-5 w-5 text-gray-500" aria-hidden="true" />
                    {{ selectedRole.label }}
                  </span>
                  <span class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                  <ListboxOptions
                    class="absolute z-10 mt-1 max-h-80 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-for="option in roleOptions"
                      :key="option.value"
                      :value="option.value"
                      v-slot="{ active, selected }"
                      as="template"
                    >
                      <li :class="[active ? 'bg-gray-800 text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-4 pl-5 pr-10']">
                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'flex items-center gap-2 truncate text-base']">
                          <component :is="option.icon" class="h-5 w-5" aria-hidden="true" />
                          {{ option.label }}
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
            <p class="mt-2 text-sm text-orange-300" id="role-error">{{ errors.role }}</p>
          </div>
        </div>

        <div class="mt-20">
          <button
            type="submit"
            :disabled="!canInviteMembers"
            :class="[
              canInviteMembers
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'cursor-not-allowed bg-gray-300',
              'inline-flex items-center gap-x-2 rounded-md px-10 py-5 text-sm font-semibold text-white shadow-sm transition-colors'
            ]"
          >
            Send Invitation
            <PaperAirplaneIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          </button>
          <p v-if="hasResolvedUser && !canInviteMembers" class="mt-4 text-sm text-gray-500">
            Only organization admins and owners can send invitations.
          </p>
        </div>
      </Form>

      <Modal ref="modal" />
    </div>
  </DefaultTransition>
</template>

<script setup>
import { computed, ref, useTemplateRef } from 'vue'
import { Form, Field, defineRule } from 'vee-validate'
import { required, max, email as emailRule } from '@vee-validate/rules'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { ChevronUpDownIcon, PaperAirplaneIcon } from '@heroicons/vue/20/solid'
import { ShieldCheckIcon, UserIcon } from '@heroicons/vue/24/outline'
import posthog from 'posthog-js'
import { useGlobalStore } from '@/stores/global'
import DefaultTransition from '@/components/Transitions/DefaultTransition.vue'
import Modal from '@/views/modals/Modal.vue'
import apiRequester from '@/services/requester'

const globalStore = useGlobalStore()
globalStore.setHeaderLabel('Invite Member')

const modalRef = useTemplateRef('modal')

const name = ref('')
const email = ref('')
const role = ref('member')
const user = ref(null)
const hasResolvedUser = ref(false)

const roleOptions = [
  { value: 'admin', label: 'Admin', icon: ShieldCheckIcon },
  { value: 'member', label: 'Member', icon: UserIcon },
]

const selectedRole = computed(() => {
  return roleOptions.find((option) => option.value === role.value) ?? roleOptions[1]
})

const canInviteMembers = computed(() => {
  const currentRole = user.value?.getCurrentOrganization?.()?.pivot?.role

  return currentRole === 'admin' || currentRole === 'owner'
})

const resetInvitationForm = (resetForm) => {
  const initialValues = {
    name: '',
    email: '',
    role: 'member',
  }

  name.value = initialValues.name
  email.value = initialValues.email
  role.value = initialValues.role
  resetForm({ values: initialValues })
}

defineRule('required', required)
defineRule('max', max)
defineRule('email', emailRule)

const schema = {
  name: 'required|max:200',
  email: 'required|email|max:200',
  role: 'required',
}

globalStore.getUser().then((userData) => {
  user.value = userData
  hasResolvedUser.value = true
})

const inviteMember = (_values, { resetForm }) => {
  if (!canInviteMembers.value || !user.value) {
    return
  }

  const organizationId = user.value.getCurrentOrganization().id

  modalRef.value.showModal(
    'Send Invitation?',
    'warning',
    `An invitation email will be sent to ${email.value} to be part of the organization.`,
    true,
    'Send invitation',
    () => {
      apiRequester.post(`/api/organizations/${organizationId}/invitations`, {
        email: email.value,
        name: name.value,
        role: role.value,
      }).then(() => {
        posthog.capture('member_invited', { role: role.value })
        resetInvitationForm(resetForm)
        modalRef.value.showModal(
          'Invitation Sent',
          'success',
          'An invitation email was sent'
        )
      }).catch((error) => {
        switch (error.response.status) {
          case 412:
          modalRef.value.showModal(
            'Invitation Failed',
            'warning',
            'Email was already invited to this organization',
          )
          break;
        
          default:
            modalRef.value.apiDownResponse()
            break;
        }
      })
    }
  )
}
</script>
