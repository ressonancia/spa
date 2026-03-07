<template>
  <DefaultTransition name="slide-fade" appear>
    <ul v-if="clients.length > 0" role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      <li v-for="client in clients" :key="client.id" class="overflow-hidden rounded-xl border border-gray-200">
        
        <router-link :to="{name:'projectSettings', params: {project: client.routeId}}">
          <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <img v-if="client.imageUrl" :src="client.imageUrl" :alt="`${client.stackLabel} logo`"
              class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
            <div class="text-sm font-medium leading-6 text-gray-900">{{ stringLimit(client.name) }}</div>
            <Menu as="div" class="relative ml-auto">
              <MenuButton class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                <span class="sr-only">Open options</span>
                <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <MenuItem v-slot="{ active }">
                    <router-link
                      :to="{name:'projectSettings',params: {project:client.routeId }}"
                      :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">View<span
                        class="sr-only">, {{ client.name }}</span>
                    </router-link>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <router-link
                      :to="{name:'delete-project',params: {project:client.routeId }, query: {projectName: client.name}}"
                      :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">Delete Project
                    </router-link>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </router-link>
        <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div class="flex justify-between gap-x-4 py-3">
            <dt class="text-gray-500">Created At</dt>
            <dd class="text-gray-700">
              <time :datetime="client.created_at">{{ client.created_at }}</time>
            </dd>
          </div>
          <div class="flex justify-between gap-x-4 pb-3">
            <dt class="text-gray-500">Stack</dt>
            <dd class="flex items-start gap-x-2">
              <div class="font-medium text-gray-900">{{ client.stackLabel }}</div>
            </dd>
          </div>
        </dl>
      </li>

    </ul>
  </DefaultTransition>

  <Modal v-if="clients.length <= 0" ref="modal" />

  <CreateProjectForm  v-if="clients.length == 0" />
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid'
import CreateProjectForm from '@/components/CreateProjectForm.vue';
import Modal from "@/views/modals/Modal.vue";
import { stringLimit } from '@/services/utils';
import apiRequester from '@/services/requester';
import { ref, useTemplateRef } from 'vue'
import { DateTime } from 'luxon'
import djangoLogoUrl from '@/assets/img/django.png'
import dotNetLogoUrl from '@/assets/img/dot-net.png'
import flaskLogoUrl from '@/assets/img/flask.png'
import golangLogoUrl from '@/assets/img/golang.png'
import javaLogoUrl from '@/assets/img/java.png'
import laravelLogoUrl from '@/assets/img/laravel.png'
import nodeLogoUrl from '@/assets/img/node.png'
import phpLogoUrl from '@/assets/img/php.png'
import pythonLogoUrl from '@/assets/img/python.png'
import symfonyLogoUrl from '@/assets/img/symfony.png'
import wordpressLogoUrl from '@/assets/img/wordpress.png'
import ressonanceLogoUrl from '@/assets/img/logo.png'
import DefaultTransition from "@/components/Transitions/DefaultTransition.vue";

var clients = ref([])
const modalRef = useTemplateRef('modal')
const stackOptions = [
  { value: 'django', label: 'Django', logoUrl: djangoLogoUrl },
  { value: 'dotnet', label: 'Dot NET', logoUrl: dotNetLogoUrl },
  { value: 'flask', label: 'Flask', logoUrl: flaskLogoUrl },
  { value: 'golang', label: 'Golang', logoUrl: golangLogoUrl },
  { value: 'java', label: 'Java', logoUrl: javaLogoUrl },
  { value: 'laravel', label: 'Laravel', logoUrl: laravelLogoUrl },
  { value: 'node', label: 'Node', logoUrl: nodeLogoUrl },
  { value: 'php', label: 'PHP', logoUrl: phpLogoUrl },
  { value: 'python', label: 'Python', logoUrl: pythonLogoUrl },
  { value: 'symfony', label: 'Symfony', logoUrl: symfonyLogoUrl },
  { value: 'wordpress', label: 'Wordpress', logoUrl: wordpressLogoUrl }
]
const stackByValue = Object.fromEntries(stackOptions.map((stack) => [stack.value, stack]))

const resolveStack = (stackValue) => {
  const normalizedStack = (stackValue ?? '').toLowerCase().trim()
  return stackByValue[normalizedStack] ?? null
}

apiRequester.get(`${import.meta.env.VITE_API_URL}/api/apps`)
  .then(function (response) {
    response.data.data.forEach(app => {
      const stack = resolveStack(app.app_language_choice)

      clients.value.push({
        routeId: app.id,
        id: app.app_id,
        name: app.app_name,
        imageUrl: stack?.logoUrl ?? ressonanceLogoUrl,
        stackLabel: stack?.label ?? 'Ressonance App',
        created_at: DateTime.fromISO(app.created_at).toFormat("yyyy-M-d")
      })
    });    
  }).catch(function (error) {
    modalRef.value.apiDownResponse()
  })
</script>
