<template>
	<div>
    <Form @submit="changePassword" :validation-schema="schema" v-slot="{ errors }">
      <div class="max-w-2xl mt-20">
        <p for="name" class="block text-sm font-medium leading-6 text-gray-900 text-left">Password</p>
        <div class="mt-2">
          <Field
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="password"
              class="block w-full rounded-md border-0 py-5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
              :validation-schema="schema"
              :class="[ errors.password ? 'ring-orange-300' : 'ring-gray-300' ]"
              v-slot="{ errors }" />
            <p class="mt-2 text-sm text-orange-300" id="password-error">{{ errors.password }}</p>
        </div>
      </div>

      <div class="max-w-2xl mt-10">
        <p for="name" class="block text-sm font-medium leading-6 text-gray-900 text-left">Password Confirmation</p>
        <div class="mt-2">
          <Field
              v-model="passwordConfirmation"
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              autocomplete="passwordConfirmation"
              class="block w-full rounded-md border-0 py-5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
              :validation-schema="schema"
              :class="[ errors.passwordConfirmation ? 'ring-orange-300' : 'ring-gray-300' ]"
              v-slot="{ errors }" />
            <p class="mt-2 text-sm text-orange-300" id="password-error">{{ errors.passwordConfirmation }}</p>
        </div>
      </div>

      <div class="mt-20">
        <button @click="createProject" type="submit"
          class="inline-flex items-center gap-x-2 rounded-md bg-gray-800  px-10 py-5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700">
          Change My Password
        </button>
      </div>
    </Form>
		<Modal ref="modal" />
	</div>
</template>


<script setup>
import { ref, useTemplateRef } from "vue";
import { Form, Field, defineRule } from 'vee-validate';
import { required, min, confirmed } from '@vee-validate/rules';
import apiRequester from '@/services/requester';
import Modal from "@/views/modals/Modal.vue";
import { useGlobalStore } from "@/stores/global";

const password = ref("");
const passwordConfirmation = ref("");
const modalRef = useTemplateRef('modal')
const globalStore = useGlobalStore()

defineRule('required', required);
defineRule('min', min);
defineRule('confirmed', confirmed);

globalStore.setHeaderLabel('Change Password')

const schema = {
  password: 'required|min:8|password',
  passwordConfirmation: 'required|confirmed:@password'
};

const changePassword = async () => {
  apiRequester.post('/api/change-password', {
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    })
    .then( () => {
      password.value = ''
      passwordConfirmation.value = ''
      modalRef.value.showModal(
        'Password Changed',
        'success'
      )
    })
    .catch(error => {
      switch (error.response.status) {
        case 422:
        modalRef.value.showModal(
          'Validation Error',
          'warning',
          error.response.data.message
        )
        break;
      
        default:
          modalRef.value.apiDownResponse()
          break;
      }
    });
  }

</script>