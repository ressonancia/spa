<template>
  <ul v-if="clients.length > 0" role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
    <li v-for="client in clients" :key="client.id" class="overflow-hidden rounded-xl border border-gray-200">
      <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <img :src="client.imageUrl" :alt="client.name"
          class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
        <div class="text-sm font-medium leading-6 text-gray-900">{{ client.name }}</div>
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
              <a href="#"
                :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">View<span
                  class="sr-only">, {{ client.name }}</span></a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
              <a href="#"
                :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">Edit<span
                  class="sr-only">, {{ client.name }}</span></a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div class="flex justify-between gap-x-4 py-3">
          <dt class="text-gray-500">Created At</dt>
          <dd class="text-gray-700">
            <time :datetime="client.lastInvoice.dateTime">{{ client.lastInvoice.date }}</time>
          </dd>
        </div>
        <div class="flex justify-between gap-x-4 py-3">
          <dt class="text-gray-500">Integration</dt>
          <dd class="flex items-start gap-x-2">
            <div class="font-medium text-gray-900">PHP</div>
          </dd>
        </div>
      </dl>
    </li>
  </ul>

  <div v-if="clients.length == 0">
    <div class="max-w-2xl mt-20">
      <p for="name" class="block text-sm font-medium leading-6 text-gray-900 text-left">Project Name</p>
      <div class="mt-2">
        <input
          type="text"
          v-model="appName"
          name="appName"
          id="appName"
          :class="{
            'ring-gray-300': valid,
            'ring-orange-500': !valid
          }"
          class="block w-full rounded-md border-0 py-5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Name your next big dream" />
      </div>
    </div>

    <div class="mt-20">
      <ul role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        <li @click="chosenLanguage=integration.name" v-for="integration in integrations" :key="integration.id"
          :class="{
            'border-orange-500': chosenLanguage == integration.name
          }"
          class="overflow-hidden rounded-xl border border-gray-200 hover:border-orange-500 cursor-pointer">
          <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <img :src="integration.imageUrl" :alt="integration.name"
              class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
            <div class="text-sm font-medium leading-6 text-gray-900">{{ integration.name }}</div>
          </div>
        </li>
      </ul>
    </div>

    <div class="mt-20">
      <button 
        @click="createProject"
        type="button"
        class="inline-flex items-center gap-x-2 rounded-md bg-gray-800  px-10 py-5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700">
        Create Project
        <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
      </button>
    </div>

  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisHorizontalIcon, InboxArrowDownIcon } from '@heroicons/vue/20/solid'
import { PlusIcon } from '@heroicons/vue/20/solid'
import axios from 'axios';
import { ref } from 'vue'
import { useRouter } from "vue-router";

let router = useRouter()

// let clients = [
//   {
//     id: 1,
//     name: 'Tuple',
//     imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
//     lastInvoice: { date: 'December 13, 2022', dateTime: '2022-12-13', amount: '$2,000.00', status: 'Overdue' },
//   },
//   {
//     id: 2,
//     name: 'SavvyCal',
//     imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
//     lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$14,000.00', status: 'Paid' },
//   },
//   {
//     id: 3,
//     name: 'Reform',
//     imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
//     lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid' },
//   },
//   {
//     id: 4,
//     name: 'Tuple',
//     imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
//     lastInvoice: { date: 'December 13, 2022', dateTime: '2022-12-13', amount: '$2,000.00', status: 'Overdue' },
//   },
//   {
//     id: 5,
//     name: 'SavvyCal',
//     imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
//     lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$14,000.00', status: 'Paid' },
//   },
//   {
//     id: 6,
//     name: 'Reform',
//     imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
//     lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid' },
//   },
//   {
//     id: 7,
//     name: 'Tuple',
//     imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
//     lastInvoice: { date: 'December 13, 2022', dateTime: '2022-12-13', amount: '$2,000.00', status: 'Overdue' },
//   },
//   {
//     id: 8,
//     name: 'SavvyCal',
//     imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
//     lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$14,000.00', status: 'Paid' },
//   },
//   {
//     id: 9,
//     name: 'Reform',
//     imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
//     lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid' },
//   },
// ]

let clients = [];

let integrations = [
  {
    id: 1,
    name: 'PHP',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
  },
  {
    id: 2,
    name: 'JavaScript',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
  },
  {
    id: 3,
    name: 'Python',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
  },
  {
    id: 4,
    name: 'Java',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
  },
  {
    id: 5,
    name: 'Swift',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
  },
  {
    id: 6,
    name: 'Laravel',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
  }
]

const chosenLanguage = ref('')
const appName = ref('')
const valid = ref(true)

const createProject = async () => {
  try {

        if (!appName.value) {
          valid.value = false
          return false
        } else {
          valid.value = true
        }

        let response;

        response = await axios.post(`${import.meta.env.VITE_API_URL}/api/apps`, {
          app_name: appName.value,
          app_language_choice: chosenLanguage.value ?? ''
        });

        appName.value = ''
        chosenLanguage.value = ''
        router.push({
            name: "projectSettings",
            params: {
              project: response.data.id
            }
        });

      } catch (error) {
        window.alert(error)
      }
}

</script>