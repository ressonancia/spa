<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-10 w-auto" :src="logoUrl" alt="Ressonance Logo" />
      <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Change Your Password</h2>
      <p class="mt-6 text-center text-gray-900">Enter your email and a new password.</p>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <Form @submit="reset" class="space-y-6" :validation-schema="schema" v-slot="{ errors }">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div class="mt-2">
              <Field
                v-model="email"
                id="email"
                name="email"
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
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="mt-2">
              <Field
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                :validation-schema="schema"
                :class="[ errors.password ? 'ring-orange-300' : 'ring-gray-300' ]"
                v-slot="{ errors }" />
                <p class="mt-2 text-sm text-orange-300" id="password-error">{{ errors.password }}</p>
            </div>
          </div>

          <div>
            <label for="passwordConfirmation" class="block text-sm/6 font-medium text-gray-900">Password Confirmation</label>
            <div class="mt-2">
              <Field
                v-model="passwordConfirmation"
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                autocomplete="passwordConfirmation"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                :validation-schema="schema"
                :class="[ errors.passwordConfirmation ? 'ring-orange-300' : 'ring-gray-300' ]"
                v-slot="{ errors }" />
                <p class="mt-2 text-sm text-orange-300" id="passwordConfirmation-error">{{ errors.passwordConfirmation }}</p>
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center px-3 py-5 rounded-md bg-gray-800 text-sm font-semibold text-white shadow-sm hover:bg-gray-700">Reset My Password</button>
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
import { useRoute } from "vue-router";
import apiRequester from '@/services/requester';
import logoUrl from '@/assets/img/logo.png'
import Modal from "@/views/modals/Modal.vue";
import { Form, Field, defineRule } from 'vee-validate';
import { required, max, min, confirmed, email as emailRule } from '@vee-validate/rules';

const route = useRoute();
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const modalRef = useTemplateRef('modal')
const token = route.query.token;

defineRule('required', required);
defineRule('max', max);
defineRule('min', min);
defineRule('confirmed', confirmed);
defineRule('email', emailRule);

const schema = {
  email: 'required|email|max:200',
  password: 'required|min:8|password',
  passwordConfirmation: 'required|confirmed:@password'
};

const reset = async () => {
  apiRequester.post('/api/reset-password', {
      token: token,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    })
    .then( (response) => {
      console.log(response)
      modalRef.value.showModal(
        'Password Reseted',
        'success',
        'Your password has changed. Now log in using the new credentials',
        true,
        'Redirect to login page →',
        'login'
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
      
        case 400:
        modalRef.value.showModal(
          'Expired Token',
          'warning',
          'The token has expired. Try to recover agin',
          true,
          'Go to Password Email Form',
          'forgot-password'
        )
        break;

        default:
          modalRef.value.apiDownResponse()
          break;
      }
    });
  }
</script>