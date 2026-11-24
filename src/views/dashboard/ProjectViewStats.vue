<template>
  <DefaultTransition name="slide-fade" appear>
    <div class="space-y-6">
      <!-- Top Action Bar -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <RouterLink
            :to="{ name: 'projects' }"
            class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ArrowLeftIcon class="h-4 w-4 text-gray-500" />
            Projects
          </RouterLink>

          <div v-if="project" class="flex items-center gap-2.5">
            <img
              :src="project.imageUrl"
              :alt="`${project.stackLabel} logo`"
              class="h-8 w-8 rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
            />
            <div class="flex items-center gap-2">
              <code class="rounded bg-gray-100 px-2 py-1 font-mono text-xs font-medium text-gray-700">
                App ID: {{ project.app_id }}
              </code>
              <button
                type="button"
                @click="copyAppId"
                class="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                :title="copied ? 'Copied!' : 'Copy App ID'"
              >
                <CheckIcon v-if="copied" class="h-4 w-4 text-emerald-600" />
                <ClipboardDocumentIcon v-else class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <RouterLink
            v-if="project"
            :to="{ name: 'projectSettings', params: { project: project.id } }"
            class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <KeyIcon class="h-4 w-4 text-gray-500" />
            API Keys & Docs
          </RouterLink>

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
            @click="fetchStats"
            :disabled="isRefreshing"
            class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-60 transition-colors"
          >
            <ArrowPathIcon :class="['h-4 w-4 text-gray-500', isRefreshing ? 'animate-spin' : '']" />
            Refresh
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div v-for="n in 3" :key="n" class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
          <div class="h-4 w-28 rounded bg-gray-200" />
          <div class="mt-4 h-8 w-20 rounded bg-gray-200" />
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p class="font-semibold">Failed to load project statistics</p>
          <p class="mt-1 text-red-600">{{ error }}</p>
        </div>
        <button
          type="button"
          @click="fetchStats"
          class="inline-flex items-center justify-center rounded-md bg-red-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-red-500"
        >
          Try again
        </button>
      </div>

      <!-- Not Found State -->
      <div v-else-if="!project" class="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
        <ChartBarIcon class="mx-auto h-10 w-10 text-gray-300" />
        <h2 class="mt-3 text-base font-semibold text-gray-900">Project not found</h2>
        <p class="mt-1 text-sm text-gray-500">
          We couldn't find metrics for this project in your account.
        </p>
        <div class="mt-6">
          <RouterLink
            :to="{ name: 'metrics' }"
            class="inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
          >
            View All Metrics
          </RouterLink>
        </div>
      </div>

      <!-- Stats Content -->
      <template v-else>
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-500">Current Connections</span>
              <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <SignalIcon class="h-5 w-5" />
              </span>
            </div>
            <div class="mt-3 flex items-baseline gap-2">
              <span class="text-3xl font-bold tracking-tight text-gray-900">
                {{ formatNumber(project.current_connections) }}
              </span>
              <span v-if="project.current_connections > 0" class="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                live
              </span>
              <span v-else class="text-xs text-gray-500">connected now</span>
            </div>
          </div>

          <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-500">Session Peak</span>
              <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                <ArrowTrendingUpIcon class="h-5 w-5" />
              </span>
            </div>
            <div class="mt-3 flex items-baseline gap-2">
              <span class="text-3xl font-bold tracking-tight text-gray-900">
                {{ formatNumber(peakConnections) }}
              </span>
              <span class="text-xs text-gray-500">max observed</span>
            </div>
          </div>

          <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-500">Organization</span>
              <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                <BuildingOfficeIcon class="h-5 w-5" />
              </span>
            </div>
            <div class="mt-3">
              <span class="block truncate text-xl font-bold tracking-tight text-gray-900">
                {{ project.organization_name || 'Organization' }}
              </span>
              <span class="text-xs text-gray-500">{{ project.stackLabel }}</span>
            </div>
          </div>
        </div>

        <!-- Connections Chart -->
        <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Live Connections</h2>
              <p class="text-xs text-gray-500">
                Real-time connection snapshots sampled on refresh or every 15s when Live mode is enabled.
              </p>
            </div>
            <span v-if="lastUpdated" class="text-xs text-gray-500">
              Updated at {{ lastUpdated }}
            </span>
          </div>
          <div class="mt-4 h-72">
            <apexchart
              height="100%"
              width="100%"
              type="area"
              :options="connectionsChartOptions"
              :series="connectionsSeries"
            />
          </div>
        </div>
      </template>
    </div>
  </DefaultTransition>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { DateTime } from 'luxon'
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CheckIcon,
  ClipboardDocumentIcon,
  KeyIcon,
  SignalIcon,
} from '@heroicons/vue/24/outline'
import apiRequester from '@/services/requester'
import { useGlobalStore } from '@/stores/global'
import { stringLimit } from '@/services/utils'
import { resolveStack, ressonanceLogoUrl } from '@/services/stacks'
import DefaultTransition from '@/components/Transitions/DefaultTransition.vue'

const route = useRoute()
const globalStore = useGlobalStore()

const project = ref(null)
const isLoading = ref(true)
const isRefreshing = ref(false)
const error = ref(null)
const lastUpdated = ref('')
const autoRefresh = ref(false)
const copied = ref(false)

const snapshots = ref([])
const MAX_SNAPSHOTS = 20

let refreshInterval = null
let copyTimeout = null

const formatNumber = (value) => Number(value || 0).toLocaleString()

const peakConnections = computed(() =>
  snapshots.value.reduce((max, point) => Math.max(max, point.connections), 0)
)

const connectionsSeries = computed(() => [
  {
    name: 'Current Connections',
    data: snapshots.value.map((point) => point.connections),
  },
])

const connectionsChartOptions = computed(() => ({
  chart: {
    toolbar: { show: false },
    animations: { enabled: true, speed: 300 },
    fontFamily: 'Inter var, Inter, system-ui, sans-serif',
  },
  xaxis: {
    categories: snapshots.value.map((point) => point.time),
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: { colors: '#6B7280', fontSize: '12px' },
    },
  },
  yaxis: {
    min: 0,
    forceNiceScale: true,
    labels: {
      formatter: (val) => Math.round(val).toLocaleString(),
      style: { colors: '#6B7280', fontSize: '12px' },
    },
  },
  grid: {
    borderColor: '#F3F4F6',
    strokeDashArray: 4,
  },
  dataLabels: { enabled: false },
  tooltip: {
    theme: 'light',
  },
  colors: ['#1F2937'],
  stroke: { curve: 'smooth', width: 2.5 },
  markers: { size: 4, strokeWidth: 0 },
  fill: {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      shadeIntensity: 1,
      opacityFrom: 0.35,
      opacityTo: 0.05,
    },
  },
}))

const fetchStats = async () => {
  isRefreshing.value = true
  error.value = null

  try {
    const response = await apiRequester.get('/api/metrics')
    const metricsList = Array.isArray(response.data) ? response.data : (response.data?.data || [])
    const param = String(route.params.project)

    const matched = metricsList.find(
      (item) => String(item.id) === param || String(item.app_id) === param
    )

    if (!matched) {
      project.value = null
      globalStore.setHeaderLabel('Project Stats')
      return
    }

    const stack = resolveStack(matched.app_language_choice)
    project.value = {
      ...matched,
      imageUrl: stack?.logoUrl ?? ressonanceLogoUrl,
      stackLabel: stack?.label ?? 'Ressonance App',
    }

    globalStore.setHeaderLabel(`${stringLimit(matched.app_name, 40)} — Stats`)

    const timestamp = DateTime.now().toFormat('HH:mm:ss')
    lastUpdated.value = timestamp

    snapshots.value = [
      ...snapshots.value,
      {
        time: timestamp,
        connections: Number(matched.current_connections || 0),
      },
    ].slice(-MAX_SNAPSHOTS)
  } catch (err) {
    error.value = err?.response?.data?.message || err?.message || 'Unable to fetch project metrics.'
  } finally {
    isLoading.value = false
    isRefreshing.value = false
  }
}

const toggleAutoRefresh = () => {
  autoRefresh.value = !autoRefresh.value

  if (autoRefresh.value) {
    refreshInterval = setInterval(fetchStats, 15000)
  } else if (refreshInterval) {
    clearInterval(refreshInterval)
    refreshInterval = null
  }
}

const copyAppId = async () => {
  if (!project.value?.app_id) return
  try {
    await navigator.clipboard.writeText(String(project.value.app_id))
    copied.value = true
    if (copyTimeout) clearTimeout(copyTimeout)
    copyTimeout = setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    // Ignore clipboard errors
  }
}

onMounted(() => {
  globalStore.setHeaderLabel('Project Stats')
  fetchStats()
})

onUnmounted(() => {
  if (refreshInterval) clearInterval(refreshInterval)
  if (copyTimeout) clearTimeout(copyTimeout)
})
</script>
