<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
    <img class="h-16 w-16" :src="loadingGifUrl" alt="Loading" />
    <p class="mt-4 text-sm font-medium text-gray-700">Signing you in...</p>
    <Modal ref="modal" />
  </div>
</template>

<script setup>
import Modal from "@/views/modals/Modal.vue";
import loadingGifUrl from "@/assets/img/loading.gif";
import { useRoute, useRouter } from "vue-router";
import apiRequester from '@/services/requester';
import { useGlobalStore } from "@/stores/global";
import posthog from 'posthog-js';

const route = useRoute();
const authorizationCode = route.query.authorizationCode
const router = useRouter()
const globalStore = useGlobalStore()

if (!authorizationCode) {
  router.push({ name: 'login' })
}

const loginWithAuthorizationCode = async () => {
  apiRequester.post('api/auth/access-token/' + authorizationCode, {
      authorizationCode: authorizationCode
    })
    .then( (response) => {
      globalStore.login(response.data.access_token)
      posthog.identify(response.data.user.email)
      posthog.capture('social_login_completed')

      router.push({
        name: "projects",
      })
    })
    .catch(error => {
      console.log("invalid authorization code")
      router.push({ name: 'login' })
    });
  }

loginWithAuthorizationCode()
</script>
