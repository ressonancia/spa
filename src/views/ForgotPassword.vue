<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-10 w-auto" :src="logoUrl" alt="Ressonance Logo" />
      <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Forgot Password?</h2>
      <p class="mt-6 text-center text-gray-900">Dont worries. We will send you reset instructions.</p>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <Form @submit="send" class="space-y-6" :validation-schema="schema" v-slot="{ errors }">
          <div>
            <div class="mt-2">
              <Field
                v-model="email"
                id="email"
                name="email"
                placeholder="Email Address"
                type="text"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                :validation-schema="schema"
                :class="[ errors.email ? 'ring-orange-300' : 'ring-gray-300' ]"
                v-slot="{ errors }" />
                <p class="mt-2 text-sm text-orange-300" id="email-error">{{ errors.email }}</p>
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center px-3 py-5 rounded-md bg-gray-800 text-sm font-semibold text-white shadow-sm hover:bg-gray-700">Send Me a Reset Link</button>
          </div>
        </Form>
      </div>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        <RouterLink class="font-semibold text-gray-900 hover:text-gray-500" to="login"><-- Get back to login page.</RouterLink>
      </p>
    </div>

    <Modal ref="modal" />
  </div>
</template>

<script setup>
import { ref, useTemplateRef } from "vue";
import apiRequester from '@/services/requester';
import logoUrl from '@/assets/img/logo.png'
import Modal from "@/views/modals/Modal.vue";
import { Form, Field, defineRule } from 'vee-validate';
import { required, max, email as emailRule } from '@vee-validate/rules';

const modalRef = useTemplateRef('modal')

defineRule('required', required);
defineRule('max', max);
defineRule('email', emailRule);

const schema = {
  email: 'required|email|max:200'
};

const send = async () => {
  apiRequester.post('/api/forgot-password', {
      email: email.value
    })
    .then( (response) => {
      modalRef.value.showModal(
        'Reset Password Email Sent',
        'success',
        'We have emailed you the reset password instrictions. Please access your email and follow the instructions.'
      )
      email.value = ""
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