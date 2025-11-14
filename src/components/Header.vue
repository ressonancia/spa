<template>
    <div>
        <nav class="bg-gray-800">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <img class="h-8 w-8" :src="logoUrl" alt="Your Company" />
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <a v-for="item in navigation" :key="item.name" :href="item.href"
                                    :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                                    :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <a v-if="isSelfHosted" href="#" @click="showRessonanceCloud"
                                class="bg-gray-900 text-white rounded-md px-3 py-2 font-medium">Try Ressonance Cloud</a>
                            <!-- Profile dropdown -->
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <button
                                        class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span class="absolute -inset-1.5" />
                                        <span class="sr-only">Open user menu</span>
                                        <img class="h-8 w-8 rounded-full" :src="user.avatar" alt="" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <DropdownMenuItem>
                                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 cursor-default truncate">
                                            <span class="font-bold">Signed in as:</span><br>{{ user.email }}
                                        </a>
                                    </DropdownMenuItem>
                                    <hr class="h-0.5 border-t-0 bg-neutral-100 dark:bg-state/10" />
                                    <DropdownMenuItem v-if="!isSelfHosted">
                                        <RouterLink to="/dashboard/settings"
                                            class="block px-4 py-2 text-sm text-gray-700">Settings</RouterLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="logout">
                                        <a href="#" class="block px-4 py-2 text-sm text-gray-700">Sign Out</a>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <!-- Mobile menu button -->
                        <Collapsible>
                            <CollapsibleTrigger>
                                <button
                                    class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span class="absolute -inset-0.5" />
                                    <span class="sr-only">Open main menu</span>
                                    <Bars3Icon class="block h-6 w-6" aria-hidden="true" />
                                </button>
                            </CollapsibleTrigger>
                            <CollapsibleContent class="md:hidden">
                                <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    <a v-for="item in navigation" :key="item.name" :href="item.href"
                                        :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                                        :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
                                    <a v-if="isSelfHosted" @click="showRessonanceCloud"
                                        class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium">Try
                                        Ressonance Cloud</a>
                                </div>
                                <div class="border-t border-gray-700 pb-3 pt-4">
                                    <div class="flex items-center px-5">
                                        <div class="flex-shrink-0">
                                            <img class="h-10 w-10 rounded-full" :src="user.avatar" alt="" />
                                        </div>
                                        <div class="ml-3">
                                            <div class="text-sm font-medium leading-none text-gray-400">{{ user.email
                                            }}</div>
                                        </div>
                                    </div>
                                    <div class="mt-3 space-y-1 px-2">
                                        <a v-for="item in userNavigation" :key="item.name" :href="item.href"
                                            class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                                            {{ item.name }}</a>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>
            </div>
        </nav>

        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ headerLabel }}</h1>
            </div>
        </header>
        <Modal v-if="isSelfHosted" ref="ressonanceCloud" />
    </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<script setup>
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useGlobalStore } from "@/stores/global";
import { ref, useTemplateRef } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import logoUrl from '@/assets/img/logo.png'
import Modal from "@/views/modals/RessonanceCloudModal.vue";

const router = useRouter()
const route = useRoute()
const globalStore = useGlobalStore()
const headerLabel = ref('')
const isSelfHosted = ref(true)
const user = ref([])
const ressonanceCloudModalRef = useTemplateRef('ressonanceCloud')

globalStore.getUser().then((userData) => {
    user.value = userData
})

headerLabel.value = globalStore.headerLabel
isSelfHosted.value = globalStore.isSelfHosted

globalStore.$onAction((action) => {
    headerLabel.value = action.args[0] ?? 'Project'
})

const getRoutePathByName = (routeName) => {
    return router.getRoutes().find((route) => route.name === routeName).path
}

const logout = () => {
    globalStore.logout()
    router.push({
        name: 'login'
    })
}

const showRessonanceCloud = () => {
  ressonanceCloudModalRef.value.showModal()
}

const navigation = [
  { name: 'Projects', href: getRoutePathByName('projects'), current: route.name == 'projects' },
  { name: 'Create Project', href: getRoutePathByName('create-projects'), current: route.name == 'create-projects' },
//   { name: 'Team', href: '#', current: false }
]

const userNavigation = []
</script>
