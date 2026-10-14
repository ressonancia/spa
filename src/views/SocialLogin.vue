<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
    <img class="h-16 w-16" :src="loadingGifUrl" alt="Loading" />
    <p class="mt-4 text-sm font-medium text-gray-700">Signing you in...</p>
    <Modal ref="modal" />
  </div>
</template>

<script>
const reportedSignUpAuthorizationCodes = new Set()
</script>

<script setup>
import Modal from "@/views/modals/Modal.vue";
import loadingGifUrl from "@/assets/img/loading.gif";
import { useRoute, useRouter } from "vue-router";
import apiRequester from '@/services/requester';
import { useGlobalStore } from "@/stores/global";
import posthog from 'posthog-js';
import { trackSignUp } from '@/services/googleAnalytics';

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

      const authProvider = response.data.auth_provider
      const signupAuthorizationCode = Array.isArray(authorizationCode)
        ? authorizationCode.join(',')
        : authorizationCode

      if (
        response.data.is_new_user === true &&
        (authProvider === 'google' || authProvider === 'github') &&
        typeof signupAuthorizationCode === 'string' &&
        !reportedSignUpAuthorizationCodes.has(signupAuthorizationCode)
      ) {
        reportedSignUpAuthorizationCodes.add(signupAuthorizationCode)
        trackSignUp(authProvider)
      }

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
