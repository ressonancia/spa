<template>
  <DefaultTransition name="slide-fade" appear>
    <div class="space-y-6">
      <!-- Top Controls Bar -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-600">
            Real-time WebSocket connections across
            <span class="font-medium text-gray-900">
              {{ showAllOrganizations ? 'all your organizations' : (currentOrganization?.name || 'your organization') }}
            </span>.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <div
            v-if="hasMultipleOrganizations"
            class="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-xs font-medium"
          >
            <button
              type="button"
              @click="showAllOrganizations = false"
              :class="[
                !showAllOrganizations
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900',
                'rounded-md px-3 py-1.5 transition-colors'
              ]"
            >
              Current Org
            </button>
            <button
              type="button"
              @click="showAllOrganizations = true"
              :class="[
                showAllOrganizations
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900',
                'rounded-md px-3 py-1.5 transition-colors'
              ]"
            >
              All Orgs
            </button>
          </div>

          <button
            type="button"
            @click="toggleAutoRefresh"
            :class="[
              autoRefresh
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
              'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium shadow-sm transition-colors'
            ]"
          >
            <span class="relative flex h-2 w-2">
              <span
                v-if="autoRefresh"
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
              />
              <span
                :class="[
                  autoRefresh ? 'bg-emerald-500' : 'bg-gray-400',
                  'relative inline-flex h-2 w-2 rounded-full'
                ]"
              />
            </span>
            {{ autoRefresh ? 'Live (15s)' : 'Auto-refresh' }}
          </button>

          <button
            type="button"
            @click="fetchMetrics"
            :disabled="isRefreshing"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-60 transition-colors"
          >
            <ArrowPathIcon :class="['h-4 w-4 text-gray-500', isRefreshing ? 'animate-spin' : '']" />
            Refresh
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-500">Applications</span>
            <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
              <CubeIcon class="h-5 w-5" />
            </span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-3xl font-bold tracking-tight text-gray-900">
              {{ isLoading ? '—' : scopedApps.length }}
            </span>
            <span class="text-xs text-gray-500">registered</span>
          </div>
        </div>

        <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-500">Current Connections</span>
            <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <SignalIcon class="h-5 w-5" />
            </span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-3xl font-bold tracking-tight text-gray-900">
              {{ isLoading ? '—' : formatNumber(totalConnections) }}
            </span>
            <span v-if="!isLoading && totalConnections > 0" class="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              live
            </span>
            <span v-else-if="!isLoading" class="text-xs text-gray-500">active now</span>
          </div>
        </div>

        <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-500">Connected Applications</span>
            <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <BoltIcon class="h-5 w-5" />
            </span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-3xl font-bold tracking-tight text-gray-900">
              {{ isLoading ? '—' : connectedAppsCount }}
            </span>
            <span class="text-xs text-gray-500">with active clients</span>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-if="error"
        class="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p class="font-semibold">Unable to load metrics</p>
          <p class="mt-0.5 text-red-600">{{ error }}</p>
        </div>
        <button
          type="button"
          @click="fetchMetrics"
          class="inline-flex items-center justify-center rounded-md bg-red-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-red-500"
        >
          Try again
        </button>
      </div>

      <!-- Applications Table Card -->
      <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div class="flex flex-col gap-3 border-b border-gray-200 bg-gray-50/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-base font-semibold text-gray-900">Applications Breakdown</h2>
            <p v-if="lastUpdated" class="mt-0.5 text-xs text-gray-500">
              Last updated at {{ lastUpdated }}
            </p>
          </div>
          <div class="relative w-full sm:w-72">
            <MagnifyingGlassIcon class="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Filter by app name or ID..."
              class="block w-full rounded-lg border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-gray-900 focus:ring-gray-900"
            />
          </div>
        </div>

        <!-- Loading Skeleton -->
        <div v-if="isLoading" class="divide-y divide-gray-100 p-6">
          <div v-for="n in 3" :key="n" class="flex items-center justify-between py-4 animate-pulse">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-lg bg-gray-200" />
              <div class="space-y-2">
                <div class="h-4 w-36 rounded bg-gray-200" />
                <div class="h-3 w-24 rounded bg-gray-100" />
              </div>
            </div>
            <div class="h-5 w-16 rounded-full bg-gray-200" />
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredApps.length === 0" class="px-6 py-14 text-center">
          <ChartBarIcon class="mx-auto h-10 w-10 text-gray-300" />
          <h3 class="mt-3 text-sm font-semibold text-gray-900">
            {{ scopedApps.length === 0 ? 'No applications yet' : 'No matching applications' }}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ scopedApps.length === 0
              ? 'Create your first project to start monitoring WebSocket connections.'
              : 'Try adjusting your search query.' }}
          </p>
          <div v-if="scopedApps.length === 0" class="mt-6">
            <RouterLink
              :to="{ name: 'create-projects' }"
              class="inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
            >
              Create Project
            </RouterLink>
          </div>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead class="bg-gray-50/70">
              <tr>
                <th scope="col" class="px-6 py-3 font-semibold text-gray-900">Application</th>
                <th scope="col" class="px-6 py-3 font-semibold text-gray-900">App ID</th>
                <th v-if="showAllOrganizations" scope="col" class="px-6 py-3 font-semibold text-gray-900">Organization</th>
                <th scope="col" class="px-6 py-3 font-semibold text-gray-900">Current Connections</th>
                <th scope="col" class="px-6 py-3 text-right font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="app in filteredApps" :key="app.id" class="hover:bg-gray-50/70 transition-colors">
                <td class="whitespace-nowrap px-6 py-4">
                  <div class="flex items-center gap-3">
                    <img
                      :src="app.imageUrl"
                      :alt="`${app.stackLabel} logo`"
                      class="h-10 w-10 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                    />
                    <div>
                      <div class="font-semibold text-gray-900">{{ stringLimit(app.app_name, 36) }}</div>
                      <div class="text-xs text-gray-500">{{ app.stackLabel }}</div>
                    </div>
                  </div>
                </td>

                <td class="whitespace-nowrap px-6 py-4">
                  <div class="inline-flex items-center gap-1.5">
                    <code class="rounded bg-gray-100 px-2 py-1 font-mono text-xs font-medium text-gray-700">
                      {{ app.app_id }}
                    </code>
                    <button
                      type="button"
                      @click="copyAppId(app.app_id)"
                      class="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                      :title="copiedAppId === app.app_id ? 'Copied!' : 'Copy App ID'"
                    >
                      <CheckIcon v-if="copiedAppId === app.app_id" class="h-3.5 w-3.5 text-emerald-600" />
                      <ClipboardDocumentIcon v-else class="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>

                <td v-if="showAllOrganizations" class="whitespace-nowrap px-6 py-4">
                  <span class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                    {{ app.organization_name || 'Organization' }}
                  </span>
                </td>

                <td class="whitespace-nowrap px-6 py-4">
                  <span
                    :class="[
                      app.current_connections > 0
                        ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                        : 'bg-gray-50 text-gray-600 ring-gray-200',
                      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset'
                    ]"
                  >
                    <span
                      :class="[
                        app.current_connections > 0 ? 'bg-emerald-500' : 'bg-gray-400',
                        'h-1.5 w-1.5 rounded-full'
                      ]"
                    />
                    {{ formatNumber(app.current_connections) }}
                  </span>
                </td>

                <td class="whitespace-nowrap px-6 py-4 text-right">
                  <div class="inline-flex items-center justify-end gap-2">
                    <RouterLink
                      :to="{ name: 'project', params: { project: app.id } }"
                      class="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                    >
                      <ChartBarIcon class="h-3.5 w-3.5 text-gray-500" />
                      Stats
                    </RouterLink>
                    <RouterLink
                      v-if="!showAllOrganizations || app.organization_id === currentOrganization?.id"
                      :to="{ name: 'projectSettings', params: { project: app.id } }"
                      class="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                    >
                      <KeyIcon class="h-3.5 w-3.5 text-gray-500" />
                      API Keys
                    </RouterLink>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </DefaultTransition>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { DateTime } from 'luxon'
import {
  ArrowPathIcon,
  BoltIcon,
  ChartBarIcon,
  CheckIcon,
  ClipboardDocumentIcon,
  CubeIcon,
  KeyIcon,
  MagnifyingGlassIcon,
  SignalIcon,
} from '@heroicons/vue/24/outline'
import apiRequester from '@/services/requester'
import { useGlobalStore } from '@/stores/global'
import { stringLimit } from '@/services/utils'
import { resolveStack, ressonanceLogoUrl } from '@/services/stacks'
import DefaultTransition from '@/components/Transitions/DefaultTransition.vue'

const globalStore = useGlobalStore()
globalStore.setHeaderLabel('Metrics')

const rawMetrics = ref([])
const currentOrganization = ref(null)
const hasMultipleOrganizations = ref(false)
const showAllOrganizations = ref(false)
const searchQuery = ref('')
const isLoading = ref(true)
const isRefreshing = ref(false)
const error = ref(null)
const lastUpdated = ref('')
const copiedAppId = ref(null)
const autoRefresh = ref(false)

let refreshInterval = null
let copyTimeout = null

const formatNumber = (value) => Number(value || 0).toLocaleString()

const scopedApps = computed(() => {
  const list = showAllOrganizations.value || !currentOrganization.value
    ? rawMetrics.value
    : rawMetrics.value.filter((app) => String(app.organization_id) === String(currentOrganization.value.id))

  return list.map((app) => {
    const stack = resolveStack(app.app_language_choice)
    return {
      ...app,
      imageUrl: stack?.logoUrl ?? ressonanceLogoUrl,
      stackLabel: stack?.label ?? 'Ressonance App',
    }
  })
})

const filteredApps = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) {
    return scopedApps.value
  }

  return scopedApps.value.filter(
    (app) =>
      (app.app_name || '').toLowerCase().includes(query) ||
      String(app.app_id || '').toLowerCase().includes(query) ||
      (app.organization_name || '').toLowerCase().includes(query)
  )
})

const totalConnections = computed(() =>
  scopedApps.value.reduce((sum, app) => sum + Number(app.current_connections || 0), 0)
)

const connectedAppsCount = computed(() =>
  scopedApps.value.filter((app) => Number(app.current_connections || 0) > 0).length
)

const fetchMetrics = async () => {
  isRefreshing.value = true
  error.value = null

  try {
    const response = await apiRequester.get('/api/metrics')
    rawMetrics.value = Array.isArray(response.data) ? response.data : (response.data?.data || [])
    lastUpdated.value = DateTime.now().toFormat('HH:mm:ss')
  } catch (err) {
    error.value = err?.response?.data?.message || err?.message || 'An unexpected error occurred while fetching metrics.'
  } finally {
    isLoading.value = false
    isRefreshing.value = false
  }
}

const toggleAutoRefresh = () => {
  autoRefresh.value = !autoRefresh.value

  if (autoRefresh.value) {
    refreshInterval = setInterval(fetchMetrics, 15000)
  } else if (refreshInterval) {
    clearInterval(refreshInterval)
    refreshInterval = null
  }
}

const copyAppId = async (appId) => {
  try {
    await navigator.clipboard.writeText(String(appId))
    copiedAppId.value = appId
    if (copyTimeout) clearTimeout(copyTimeout)
    copyTimeout = setTimeout(() => {
      copiedAppId.value = null
    }, 1800)
  } catch {
    // Ignore clipboard permission errors
  }
}

onMounted(async () => {
  const user = await globalStore.getUser()
  if (user) {
    currentOrganization.value = user.getCurrentOrganization()
    hasMultipleOrganizations.value = (user.organizations?.length || 0) > 1
  }
  await fetchMetrics()
})

onUnmounted(() => {
  if (refreshInterval) clearInterval(refreshInterval)
  if (copyTimeout) clearTimeout(copyTimeout)
})
</script>
