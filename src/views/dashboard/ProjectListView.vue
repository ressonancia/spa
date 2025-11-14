<template>
  <ul v-if="clients.length > 0" role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
    <li v-for="client in clients" :key="client.id" class="overflow-hidden rounded-xl border border-gray-200">
      <router-link :to="{ name: 'projectSettings', params: { project: client.routeId } }">
        <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
          <img :src="client.imageUrl" :alt="client.name"
            class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
          <div class="text-sm font-medium leading-6 text-gray-900">{{ stringLimit(client.name) }}</div>
          <DropdownMenu class="relative ml-auto">
            <DropdownMenuTrigger class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Open options</span>
              <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <DropdownMenuItem>
                <router-link :to="{ name: 'projectSettings', params: { project: client.routeId } }"
                  class="block px-3 py-1 text-sm leading-6 text-gray-900">View<span class="sr-only">, {{ client.name
                  }}</span>
                </router-link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <router-link
                  :to="{ name: 'delete-project', params: { project: client.routeId }, query: { projectName: client.name } }"
                  class="block px-3 py-1 text-sm leading-6 text-gray-900">Deletar Projeto
                </router-link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </router-link>
      <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div class="flex justify-between gap-x-4 py-3">
          <dt class="text-gray-500">Created At</dt>
          <dd class="text-gray-700">
            <time :datetime="client.created_at">{{ client.created_at }}</time>
          </dd>
        </div>
        <div class="flex justify-between gap-x-4 py-3">
          <dt class="text-gray-500">Integration</dt>
          <dd class="flex items-start gap-x-2">
            <div class="font-medium text-gray-900">Laravel</div>
          </dd>
        </div>
      </dl>
    </li>
  </ul>

  <Modal v-if="clients.length <= 0" ref="modal" />

  <CreateProjectForm v-if="clients.length == 0" />
</template>

<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid'
import CreateProjectForm from '@/components/CreateProjectForm.vue';
import Modal from "@/views/modals/Modal.vue";
import { stringLimit } from '@/services/utils';
import apiRequester from '@/services/requester';
import { ref, useTemplateRef } from 'vue'
import { DateTime } from 'luxon'
import laravelLogoUrl from '@/assets/img/laravel.png'

var clients = ref([])
const modalRef = useTemplateRef('modal')

apiRequester.get(`${import.meta.env.VITE_API_URL}/api/apps`)
  .then(function (response) {
    response.data.data.forEach(app => {
      clients.value.push({
        routeId: app.id,
        id: app.app_id,
        name: app.app_name,
        imageUrl: laravelLogoUrl,
        created_at: DateTime.fromISO(app.created_at).toFormat("yyyy-M-d")
      })
    });
  }).catch(function (error) {
    modalRef.value.apiDownResponse()
  })
</script>