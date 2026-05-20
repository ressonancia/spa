<template>
  <DefaultTransition name="slide-fade" appear>
    <div>
      <div class="overflow-x-auto rounded-lg border border-gray-200 mt-5">
        <table class="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 font-semibold text-gray-900">Name</th>
              <th scope="col" class="px-6 py-3 font-semibold text-gray-900">Email</th>
              <th scope="col" class="px-6 py-3 font-semibold text-gray-900">Access</th>
              <th scope="col" class="relative w-0 px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="user in users" :key="user.handle">
              <td class="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{{ user.name }}</td>
              <td class="whitespace-nowrap px-6 py-4 text-gray-700">{{ user.email }}</td>
              <td class="whitespace-nowrap px-6 py-4 text-gray-500">{{ user.access }}</td>
              <td class="whitespace-nowrap px-6 py-4">
                <Menu as="div" class="relative inline-block text-left">
                  <MenuButton
                    class="inline-flex items-center rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    aria-label="More options"
                  >
                    <EllipsisHorizontalIcon class="h-5 w-5" />
                  </MenuButton>

                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <MenuItem v-slot="{ active }">
                        <button
                          type="button"
                          :class="[active ? 'bg-gray-100' : '', 'block w-full px-4 py-2 text-left text-sm text-gray-700']"
                        >
                          View
                        </button>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <button
                          type="button"
                          :class="[active ? 'bg-gray-100' : '', 'block w-full px-4 py-2 text-left text-sm text-gray-700']"
                        >
                          Edit
                        </button>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <button
                          type="button"
                          :class="[active ? 'bg-gray-100' : '', 'block w-full px-4 py-2 text-left text-sm text-red-600']"
                        >
                          Delete
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-10 mb-10">
        <RouterLink to="/dashboard/organization/invite-member" type="button"
          class="inline-flex items-center gap-x-2 rounded-md bg-gray-800  px-10 py-5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700">
          Invite Member
          <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
        </RouterLink>
      </div>
    </div>
  </DefaultTransition>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/vue/24/solid'
import { useGlobalStore } from "@/stores/global";
import DefaultTransition from "@/components/Transitions/DefaultTransition.vue";

const globalStore = useGlobalStore()
globalStore.setHeaderLabel('Organization Members')

const users = [
  { handle: 'ivy-brooks', name: 'Ivy Brooks', email: 'ivy.brooks@acme.dev', access: 'Owner' },
  { handle: 'liam-carter', name: 'Liam Carter', email: 'liam.carter@acme.dev', access: 'Admin' },
  { handle: 'maya-patel', name: 'Maya Patel', email: 'maya.patel@acme.dev', access: 'Admin' },
  { handle: 'noah-bennett', name: 'Noah Bennett', email: 'noah.bennett@acme.dev', access: 'Member' },
  { handle: 'ava-nguyen', name: 'Ava Nguyen', email: 'ava.nguyen@acme.dev', access: 'Member' },
  { handle: 'ethan-morris', name: 'Ethan Morris', email: 'ethan.morris@acme.dev', access: 'Member' },
  { handle: 'sofia-ruiz', name: 'Sofia Ruiz', email: 'sofia.ruiz@acme.dev', access: 'Member' },
  { handle: 'lucas-kim', name: 'Lucas Kim', email: 'lucas.kim@acme.dev', access: 'Viewer' },
  { handle: 'zoe-foster', name: 'Zoe Foster', email: 'zoe.foster@acme.dev', access: 'Viewer' },
  { handle: 'jackson-reed', name: 'Jackson Reed', email: 'jackson.reed@acme.dev', access: 'Viewer' },
]
</script>