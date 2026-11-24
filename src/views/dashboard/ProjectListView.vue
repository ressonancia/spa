<template>
  <DefaultTransition name="slide-fade" appear>
    <div v-if="clients.length > 0" class="space-y-8">
      <!-- Live Organization Summary Strip -->
      <div class="space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <span v-if="lastUpdated">Metrics updated at {{ lastUpdated }}</span>
            <span v-else-if="isLoadingMetrics">Loading live metrics...</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="loadMetrics"
              :disabled="isLoadingMetrics"
              class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-60 transition-colors"
            >
              <ArrowPathIcon :class="['h-3.5 w-3.5 text-gray-500', isLoadingMetrics ? 'animate-spin' : '']" />
              Refresh Metrics
            </button>
            <RouterLink
              :to="{ name: 'metrics' }"
              class="inline-flex items-center gap-1.5 rounded-lg bg-gray-800 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-gray-700 transition-colors"
            >
              <ChartBarIcon class="h-3.5 w-3.5" />
              Full Metrics
            </RouterLink>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-500">Active Projects</span>
              <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                <CubeIcon class="h-4 w-4" />
              </span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl font-bold tracking-tight text-gray-900">{{ clients.length }}</span>
              <span class="text-xs text-gray-500">in current organization</span>
            </div>
          </div>

          <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-500">Current Connections</span>
              <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <SignalIcon class="h-4 w-4" />
              </span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl font-bold tracking-tight text-gray-900">
                {{ formatNumber(totalConnections) }}
              </span>
              <span v-if="totalConnections > 0" class="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                live
              </span>
              <span v-else class="text-xs text-gray-500">active now</span>
            </div>
          </div>

          <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-500">Connected Apps</span>
              <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <BoltIcon class="h-4 w-4" />
              </span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl font-bold tracking-tight text-gray-900">
                {{ connectedAppsCount }}
              </span>
              <span class="text-xs text-gray-500">with active clients</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Cards Grid -->
      <ul role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        <li v-for="client in clients" :key="client.id" class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:border-gray-300 transition-colors">
          <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <router-link
              :to="{ name: 'projectSettings', params: { project: client.routeId } }"
              class="flex min-w-0 flex-1 items-center gap-x-4"
            >
              <img
                v-if="client.imageUrl"
                :src="client.imageUrl"
                :alt="`${client.stackLabel} logo`"
                class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
              />
              <div class="truncate text-sm font-medium leading-6 text-gray-900 hover:underline">
                {{ stringLimit(client.name) }}
              </div>
            </router-link>
            <Menu as="div" class="relative ml-auto">
              <MenuButton class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                <span class="sr-only">Open options</span>
                <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
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
                  class="absolute right-0 z-10 mt-0.5 w-36 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                >
                  <MenuItem v-slot="{ active }">
                    <router-link
                      :to="{ name: 'projectSettings', params: { project: client.routeId } }"
                      :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"
                    >
                      API Keys<span class="sr-only">, {{ client.name }}</span>
                    </router-link>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <router-link
                      :to="{ name: 'project', params: { project: client.routeId } }"
                      :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"
                    >
                      View Stats<span class="sr-only">, {{ client.name }}</span>
                    </router-link>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <router-link
                      :to="{ name: 'delete-project', params: { project: client.routeId }, query: { projectName: client.name } }"
                      :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-red-600']"
                    >
                      Delete Project
                    </router-link>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div class="flex justify-between gap-x-4 py-3">
              <dt class="text-gray-500">Current Connections</dt>
              <dd class="flex items-center gap-1.5 font-medium text-gray-900">
                <span
                  :class="[
                    getClientMetric(client.id).current_connections > 0 ? 'bg-emerald-500' : 'bg-gray-300',
                    'h-2 w-2 rounded-full'
                  ]"
                />
                {{ formatNumber(getClientMetric(client.id).current_connections) }}
              </dd>
            </div>
            <div class="flex justify-between gap-x-4 py-3">
              <dt class="text-gray-500">Created At</dt>
              <dd class="text-gray-700">
                <time :datetime="client.created_at">{{ client.created_at }}</time>
              </dd>
            </div>
            <div class="flex justify-between gap-x-4 py-3">
              <dt class="text-gray-500">Stack</dt>
              <dd class="flex items-start gap-x-2">
                <div class="font-medium text-gray-900">{{ client.stackLabel }}</div>
              </dd>
            </div>
          </dl>
        </li>
      </ul>
    </div>
  </DefaultTransition>

  <Modal v-if="!isLoadingProjects && clients.length <= 0" ref="modal" />

  <CreateProjectForm v-if="!isLoadingProjects && clients.length == 0" />
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid'
import {
  ArrowPathIcon,
  BoltIcon,
  ChartBarIcon,
  CubeIcon,
  SignalIcon,
} from '@heroicons/vue/24/outline'
import CreateProjectForm from '@/components/CreateProjectForm.vue'
import Modal from '@/views/modals/Modal.vue'
import { stringLimit } from '@/services/utils'
import { resolveStack, ressonanceLogoUrl } from '@/services/stacks'
import apiRequester from '@/services/requester'
import { computed, ref, useTemplateRef } from 'vue'
import { DateTime } from 'luxon'
import { useGlobalStore } from '@/stores/global'
import DefaultTransition from '@/components/Transitions/DefaultTransition.vue'

const clients = ref([])
const metricsByAppId = ref({})
const isLoadingProjects = ref(true)
const isLoadingMetrics = ref(false)
const lastUpdated = ref('')
const globalStore = useGlobalStore()
const modalRef = useTemplateRef('modal')

const formatNumber = (value) => Number(value || 0).toLocaleString()

const getClientMetric = (appId) => {
  return metricsByAppId.value[String(appId)] || { current_connections: 0 }
}

const totalConnections = computed(() =>
  clients.value.reduce((sum, client) => sum + Number(getClientMetric(client.id).current_connections || 0), 0)
)

const connectedAppsCount = computed(() =>
  clients.value.filter((client) => Number(getClientMetric(client.id).current_connections || 0) > 0).length
)

const loadMetrics = async () => {
  isLoadingMetrics.value = true
  try {
    const response = await apiRequester.get('/api/metrics')
    const list = Array.isArray(response.data) ? response.data : (response.data?.data || [])
    const map = {}
    list.forEach((item) => {
      map[String(item.app_id)] = item
    })
    metricsByAppId.value = map
    lastUpdated.value = DateTime.now().toFormat('HH:mm:ss')
  } catch {
    // Keep project list usable even if metrics endpoint fails temporarily
  } finally {
    isLoadingMetrics.value = false
  }
}

const loadProjects = async () => {
  isLoadingProjects.value = true
  try {
    const user = await globalStore.getUser()
    const organization = user?.getCurrentOrganization()
    if (!organization) {
      return
    }

    const [appsResponse] = await Promise.all([
      apiRequester.get(`/api/organizations/${organization.id}/apps`),
      loadMetrics(),
    ])

    if (appsResponse.data.data.length === 0) {
      globalStore.setHeaderLabel('Create Project')
    } else {
      globalStore.setHeaderLabel('Project List')
    }

    clients.value = appsResponse.data.data.map((app) => {
      const stack = resolveStack(app.app_language_choice)

      return {
        routeId: app.id,
        id: app.app_id,
        name: app.app_name,
        imageUrl: stack?.logoUrl ?? ressonanceLogoUrl,
        stackLabel: stack?.label ?? 'Ressonance App',
        created_at: DateTime.fromISO(app.created_at).toFormat('yyyy-M-d'),
      }
    })
  } catch {
    modalRef.value?.apiDownResponse()
  } finally {
    isLoadingProjects.value = false
  }
}

loadProjects()
</script>
