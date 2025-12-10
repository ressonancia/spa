<template>
  <div class="flex flex-col justify-center flex-1 min-h-full py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="w-auto h-10 mx-auto" :src="logoUrl" alt="Ressonance Logo" />
      <h2 class="mt-6 font-bold tracking-tight text-center text-gray-900 text-2xl/9">Create a new account</h2>
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
import logoUrl from '@/assets/img/logo.png'
import Modal from "@/views/modals/Modal.vue";
import { useGlobalStore } from "@/stores/global";
import { Form, Field, defineRule } from 'vee-validate';
import { required, max, min, confirmed, email as emailRule } from '@vee-validate/rules';
import Alert from '@/components/Alert.vue';

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