<template>
    <div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
        <div class="max-w-xl px-5 text-center">
            <h2 class="mb-2 text-[42px] font-bold text-zinc-800">Check your inbox</h2>
            <p class="mb-2 text-lg text-zinc-500">We are glad, that you’re with us ? We’ve sent you a verification link
                to the email address <span class="font-semibold text-gray-900">{{ email }}</span>.</p>
            <p v-show="isLoggedIn" class="mb-2 text-lg text-zinc-500"><span class="text-sm">The link is valid for 60 minutes. Click <a @click="send()" class="text-gray-900 hover:text-gray-500" href="#"><b>here</b></a> if
                    you need another link.</span></p>
            <a v-show="activated" href="/dashboard/projects/create"
                class="mt-3 inline-block w-96 px-3 py-5 rounded-md bg-gray-800 text-sm font-semibold text-white shadow-sm hover:bg-gray-700">Let's create your first app →</a>
            <a v-show="!isLoggedIn" href="/login"
                class="mt-3 inline-block w-96 px-3 py-5 rounded-md bg-gray-800 text-sm font-semibold text-white shadow-sm hover:bg-gray-700">Login to use the validation link →</a>
        </div>

        <Modal ref="modal" />
    </div>
</template>

<script setup>
import apiRequester from '@/services/requester'
import { ref, useTemplateRef } from "vue";
import { useRoute } from 'vue-router'
import Modal from "@/views/modals/Modal.vue";
import { useGlobalStore } from "@/stores/global";

const email = ref('')
const activated = ref(false)
const isLoggedIn = ref(true)
const route = useRoute()
const routeParam = route.query.route;
const modalRef = useTemplateRef('modal')
const globalStore = useGlobalStore()

isLoggedIn.value = globalStore.isLoggedIn

if (routeParam) {
    apiRequester.post(atob(decodeURIComponent(routeParam))).then(() => {
        modalRef.value.showModal(
            'Account Activated',
            'success',
            'Now you have access to Ressonance. Realtime power with easy integration process.',
            true,
            'Let\'s create your first app →',
            'create-projects'
        )

        activated.value = true
    }).catch( error => {
        switch (error.response.status) {
            case 403:
                modalRef.value.showModal(
                    'Activation Failed',
                    'danger',
                    'The activation link has expired.',
                )
            break;

            case 401:
                modalRef.value.showModal(
                    'Activation Failed',
                    'danger',
                    'Log in to activate your account.',
                    true,
                    'Go to login page',
                    'login'
                )
            break;

            default:
                modalRef.value.apiDownResponse()
            break;
        }
    })
}

if (isLoggedIn) {
    globalStore.getUser().then(user => {
        email.value = user.email
    })
}

const send = () => {
    apiRequester.post('/api/email/verification-notification').then(() => {
        modalRef.value.showModal(
            'Link Sent',
            'success',
            'A new link was sent to your inbox. This link is valid for 60 minutes.',
        )
    }).catch(error => {
        switch (error.response.status) {
            case 429:
                modalRef.value.showModal(
                    'Too Much Emails',
                    'warning',
                    'You need to wait 60 minutes to send another email.',
                )
            break;

            default:
                modalRef.value.apiDownResponse()
            break;
        }
    })
}
</script>