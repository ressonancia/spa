<template>
    <div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
        <div class="min-h-screen flex flex-col items-center justify-center px-6">
            <img class="h-16 w-16" :src="loadingGifUrl" alt="Loading" />
            <p class="mt-4 text-sm font-medium text-gray-700">Accepting Invite...</p>
        </div>

        <Modal ref="modal" />
    </div>
</template>

<script setup>
import apiRequester from '@/services/requester'
import { useTemplateRef } from "vue";
import { useRouter, useRoute } from 'vue-router'
import Modal from "@/views/modals/Modal.vue";
import { useGlobalStore } from "@/stores/global";
import loadingGifUrl from "@/assets/img/loading.gif";

const router = useRouter()
const route = useRoute()
const routeParam = route.query.route;
const modalRef = useTemplateRef('modal')
const globalStore = useGlobalStore()

if (routeParam) {
    apiRequester.post(atob(routeParam.replace(/-/g, "+").replace(/_/g, "/"))).then((response) => {
        globalStore.login(response.data.data.access_token)
        globalStore.setCurrentOrganizationId(
            response.data.data.invited_organization_id
        )

        router.push({
            name: 'projects'
        })
    }).catch( error => {
        switch (error.response.status) {
            case 412:
            case 404:
                modalRef.value.showModal(
                    'Invitation Expired',
                    'danger',
                    'The invitation link has expired.',
                    true,
                    'Get Out',
                    'login'
                )
            break;

            case 429:
                modalRef.value.showModal(
                    'Too many tries',
                    'danger',
                    'Too many tries. Try again later.',
                    true,
                    'Get Out',
                    'login'
                )
            break;
            
            default:
                modalRef.value.apiDownResponse()
            break;
        }
    })
}
</script>