<template>
  <DefaultTransition name="slide-fade" appear>
    <div v-if="members.length">
      <div class="overflow-x-auto rounded-lg border border-gray-200 mt-5">
        <table class="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 font-semibold text-gray-900">Name</th>
              <th scope="col" class="px-6 py-3 font-semibold text-gray-900">Email</th>
              <th scope="col" class="px-6 py-3 font-semibold text-gray-900">Access</th>
              <th v-if="!user.isMember()" scope="col" class="relative w-0 px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="member in members" :key="member.id">
              <td class="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{{ member.name }}</td>
              <td class="whitespace-nowrap px-6 py-4 text-gray-700">{{ member.email }}</td>
              <td class="whitespace-nowrap px-6 py-4">
                <span :class="getBadgeClass(member.pivot.role)" class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset">
                  {{ member.pivot.role }}
                </span>
              </td>
              <td v-if="!user.isMember()" class="whitespace-nowrap px-6 py-4">
                <div class="flex flex-wrap gap-2">
                  <button
                    type="button"
                    :disabled="member.pivot.role === 'owner'"
                    :class="[
                      member.pivot.role === 'owner'
                        ? 'cursor-not-allowed text-gray-400'
                        : 'text-gray-600 hover:text-gray-900 hover:underline',
                      'inline-flex items-center text-sm font-medium transition-colors'
                    ]"
                  >
                    {{ member.pivot.role === 'admin' ? 'Make member' : 'Make admin' }}
                  </button>
                  <button
                    type="button"
                    :disabled="member.pivot.role === 'owner'"
                    :class="[
                      member.pivot.role === 'owner'
                        ? 'cursor-not-allowed text-gray-400'
                        : 'text-red-600 hover:text-red-800 hover:underline',
                      'inline-flex items-center text-sm font-medium transition-colors'
                    ]"
                  >
                    Remove from organization
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!user.value?.isMember()" class="mt-10 mb-10">
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
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import apiRequester from '@/services/requester'
import { useGlobalStore } from "@/stores/global";
import DefaultTransition from "@/components/Transitions/DefaultTransition.vue";

const globalStore = useGlobalStore()
globalStore.setHeaderLabel('Organization Members')

const members = ref([])
const user = ref({})

const getBadgeClass = (access) => {
  return {
    owner: 'bg-gray-100 text-gray-500 ring-gray-300 opacity-75 cursor-not-allowed',
    admin: 'bg-sky-50 text-sky-700 ring-sky-200',
    member: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  }[access]
}

globalStore.getUser().then(userData => {
  user.value = userData

  apiRequester.get(`/api/organizations/${userData.getCurrentOrganization().id}`).then((response) => {
    members.value = response.data.users
  })
})

</script>
