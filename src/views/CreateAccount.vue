<template>
  <div class="flex flex-col justify-center flex-1 min-h-full py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="w-auto h-10 mx-auto" :src="logoUrl" alt="Ressonance Logo" />
      <h2 class="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9">Create a new account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      
      <Alert 
        :show="showPaymentAlert" 
        message="Payment confirmed successfully! Please create your account."
        @close="showPaymentAlert = false"
      />

      <div class="px-6 py-12 bg-white shadow sm:rounded-lg sm:px-12">
        <Form @submit="login" class="space-y-6" :validation-schema="schema" v-slot="{ errors }">
          
          <div>
            <label for="name" class="block font-medium text-gray-900 text-sm/6">Name</label>
            <div class="mt-2">
              <Field
                v-model="name"
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                :class="[ errors.name ? 'ring-orange-300' : 'ring-gray-300' ]"
                v-slot="{ errors }" 
              />
              <p class="mt-2 text-sm text-orange-300" id="name-error">{{ errors.name }}</p>
            </div>
          </div>

          <div>
            <label for="email" class="block font-medium text-gray-900 text-sm/6">Email address</label>
            <div class="mt-2">
              <Field
                v-model="email"
                id="email"
                name="email"
                type="text"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                :class="[ errors.email ? 'ring-orange-300' : 'ring-gray-300' ]"
                v-slot="{ errors }"
              />
              <p class="mt-2 text-sm text-orange-300" id="email-error">{{ errors.email }}</p>
            </div>
          </div>

          <div>
            <label for="password" class="block font-medium text-gray-900 text-sm/6">Password</label>
            <div class="mt-2">
              <Field
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                :class="[ errors.password ? 'ring-orange-300' : 'ring-gray-300' ]"
                v-slot="{ errors }"
              />
              <p class="mt-2 text-sm text-orange-300" id="password-error">{{ errors.password }}</p>
            </div>
          </div>

          <div>
            <label for="passwordConfirmation" class="block font-medium text-gray-900 text-sm/6">Password Confirmation</label>
            <div class="mt-2">
              <Field
                v-model="passwordConfirmation"
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                autocomplete="passwordConfirmation"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                :class="[ errors.passwordConfirmation ? 'ring-orange-300' : 'ring-gray-300' ]"
                v-slot="{ errors }"
              />
              <p class="mt-2 text-sm text-orange-300" id="passwordConfirmation-error">{{ errors.passwordConfirmation }}</p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input checked="true" id="news" name="news" type="checkbox" class="text-gray-900 border-gray-300 rounded size-4" />
              <label for="news" class="block ml-3 text-gray-900 text-sm/6">I want to receive news by email</label>
            </div>
          </div>

          <div>
            <button type="submit" class="flex justify-center w-full px-3 py-5 text-sm font-semibold text-white bg-gray-800 rounded-md shadow-sm hover:bg-gray-700">Create Account</button>
          </div>
        </Form>
        <div v-show="!isSelfHosted">
          <div class="relative mt-10">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200" />
            </div>
            <div class="relative flex justify-center text-sm/6 font-medium">
              <span class="bg-white px-6 text-gray-900">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <a :href="googleRedirect" class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
              <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
              </svg>
              <span class="text-sm/6 font-semibold">Google</span>
            </a>

            <a :href="githubRedirect" class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
              <svg class="size-5 fill-[#24292F]" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm/6 font-semibold">GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <p class="mt-10 text-center text-gray-500 text-sm/6">
        <RouterLink class="font-semibold text-gray-900 hover:text-gray-500" to="login"><-- Get back to login page.</RouterLink>
      </p>
    </div>

    <Modal ref="modal" />
  </div>
</template>

<script setup>
import { ref, useTemplateRef, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import apiRequester from '@/services/requester';
import logoUrl from '@/assets/img/logo-text.png'
import Modal from "@/views/modals/Modal.vue";
import { useGlobalStore } from "@/stores/global";
import { Form, Field, defineRule } from 'vee-validate';
import { required, max, min, confirmed, email as emailRule } from '@vee-validate/rules';
import Alert from '@/components/Alert.vue';
import posthog from 'posthog-js';

const isSelfHosted = import.meta.env.VITE_RESSONANCE_SELF_HOSTED === 'true'
const googleRedirect = import.meta.env.VITE_API_URL + '/api/auth/google/redirect';
const githubRedirect = import.meta.env.VITE_API_URL + '/api/auth/github/redirect';

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const modalRef = useTemplateRef('modal')

const router = useRouter()
const route = useRoute()
const globalStore = useGlobalStore()

const showPaymentAlert = ref(false);

defineRule('required', required);
defineRule('max', max);
defineRule('min', min);
defineRule('email', emailRule);
defineRule('confirmed', confirmed);

const schema = {
  name: 'required|max:200',
  email: 'required|email|max:200',
  password: 'required|min:8|password',
  passwordConfirmation: 'required|confirmed:@password'
};

onMounted(() => {
  if (route.query.payment_confirmed === 'true') {
    showPaymentAlert.value = true;
  }
});

const login = async () => {
  apiRequester.post('/api/account', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    })
    .then( (response) => {
      globalStore.login(response.data.access_token)
      posthog.identify(email.value, { name: name.value })
      posthog.capture('user_signed_up', { name: name.value })
      router.push({
        name: 'email-verification'
      })
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