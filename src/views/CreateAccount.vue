<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-10 w-auto" :src="logoUrl" alt="Ressonance Logo" />
      <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create a new account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form @submit.prevent="login" class="space-y-6">

          <div>
            <label for="name" class="block text-sm/6 font-medium text-gray-900">Name</label>
            <div class="mt-2">
              <input v-model="name" id="name" name="name" type="text" autocomplete="name" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div class="mt-2">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="mt-2">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <label for="passwordConfirmation" class="block text-sm/6 font-medium text-gray-900">Password Confirmation</label>
            <div class="mt-2">
              <input v-model="passwordConfirmation" id="passwordConfirmation" name="passwordConfirmation" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input checked="true" id="news" name="news" type="checkbox" class="size-4 rounded border-gray-300 text-gray-900" />
              <label for="news" class="ml-3 block text-sm/6 text-gray-900">I want to receive news by email</label>
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center px-3 py-5 rounded-md bg-gray-800 text-sm font-semibold text-white shadow-sm hover:bg-gray-700">Create Account</button>
          </div>
        </form>
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
import { useRouter } from "vue-router";
import apiRequester from '@/services/requester';
import logoUrl from '@/assets/img/logo.png'
import Modal from "@/views/modals/Modal.vue";
import { useGlobalStore } from "@/stores/global";

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const modalRef = useTemplateRef('modal')
const router = useRouter()
const globalStore = useGlobalStore()

const login = async () => {
  apiRequester.post('/api/account', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    })
    .then( (response) => {
      console.log(response)
      globalStore.login(response.data.access_token)
      router.push({
        name: 'email-verification'
      })
    })
    .catch(error => {
      switch (error.code) {
        case 'ERR_BAD_REQUEST':
          modalRef.value.showModal(
            'Wrong Credentias',
            'warning',
            'validation erros'
          )
          break;
      
        default:
          modalRef.value.apiDownResponse()
          break;
      }
    });
  }
</script>