<template>
    <div>
        <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <img class="h-8 w-8" :src="logoUrl"
                                alt="Your Company" />
                        </div>
                        <div v-if="currentOrganization" class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <RouterLink
                                    :to="{ name: 'projects' }"
                                    :class="getDesktopMenuItemClass(['projects'])"
                                    :aria-current="isRouteActive(['projects']) ? 'page' : undefined"
                                >
                                    Projects
                                </RouterLink>
                                <RouterLink
                                    :to="{ name: 'create-projects' }"
                                    :class="getDesktopMenuItemClass(['create-projects'])"
                                    :aria-current="isRouteActive(['create-projects']) ? 'page' : undefined"
                                >
                                    Create Project
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <a  v-if="isSelfHosted"
                                href="#"
                                @click="showRessonanceCloud"
                                class="bg-gray-900 text-white rounded-md px-3 py-2 font-medium">Try Ressonance Cloud</a>
                            <!-- Profile dropdown -->
                            <Menu as="div" class="relative ml-3">
                                <div>
                                    <MenuButton
                                        class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span class="absolute -inset-1.5" />
                                        <span class="sr-only">Open user menu</span>
                                        <img class="h-8 w-8 rounded-full" :src="user.avatar" alt="" />
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems
                                        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem v-if="currentOrganization" as="div" class="relative group/submenu">
                                            <a href="#"
                                                class="flex items-start justify-between gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer">
                                                <span class="truncate">
                                                    <span class="font-bold">Organization:</span>
                                                    <br>{{ currentOrganization.name }}
                                                </span>
                                                <ChevronDoubleRightIcon v-if="otherUserOrganizations.length" class="mt-1 h-4 w-4 shrink-0 text-gray-500"
                                                    aria-hidden="true" />
                                            </a>
                                            <div
                                                class="absolute left-full top-0 z-20 hidden w-56 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 group-hover/submenu:block"
                                                v-if="otherUserOrganizations.length">
                                                <div class="px-4 pb-2 text-sm font-semibold text-gray-900">Choose
                                                    Organization.</div>
                                                <a @click="changeOrganization(organization.id)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" v-for="organization in otherUserOrganizations" :key="organization.id" href="#">{{ organization.name }}</a>
                                            </div>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                            <RouterLink
                                                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                                                :to="{ name: 'oganization-create' }">Add Organization</RouterLink>
                                        </MenuItem>
                                        <MenuItem v-if="!user.isMember() && currentOrganization" v-slot="{ active }">
                                            <RouterLink
                                                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                                                :to="{ name: 'oganization-members' }">Organization Members</RouterLink>
                                        </MenuItem>
										<hr class="h-0.5 border-t-0 bg-neutral-100 dark:bg-state/10" />
                                        <MenuItem v-if="!isSelfHosted && currentOrganization" v-slot="{ active }">
                                            <RouterLink
                                                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                                                :to="{ name: 'settings' }">Settings</RouterLink>
                                        </MenuItem>
                                        <MenuItem @click="logout" v-slot="{ active }">
                                            <a href="#"
                                                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign Out</a>
                                        </MenuItem>
                                        <hr class="h-0.5 border-t-0 bg-neutral-100 dark:bg-state/10" />
                                        <MenuItem>
                                            <a href="#"
                                                class="block px-4 py-2 text-sm text-gray-700 cursor-default truncate">
												<span class="font-bold">Signed in as:</span><br>{{ user.email }}
											</a>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton
                            class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="absolute -inset-0.5" />
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <transition
                enter-active-class="transform-gpu transition duration-200 ease-out"
                enter-from-class="-translate-y-2 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transform-gpu transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="-translate-y-2 opacity-0"
            >
                <DisclosurePanel class="md:hidden">
                    <div v-if="currentOrganization" class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        <RouterLink
                            :to="{ name: 'projects' }"
                            :class="getMobileMenuItemClass(['projects'])"
                            :aria-current="isRouteActive(['projects']) ? 'page' : undefined"
                        >
                            Projects
                        </RouterLink>
                        <RouterLink
                            :to="{ name: 'create-projects' }"
                            :class="getMobileMenuItemClass(['create-projects'])"
                            :aria-current="isRouteActive(['create-projects']) ? 'page' : undefined"
                        >
                            Create Project
                        </RouterLink>
                        <DisclosureButton v-if="isSelfHosted" as="a" @click="showRessonanceCloud"
                            class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium">Try Ressonance Cloud</DisclosureButton>
                    </div>
                    <div class="border-t border-gray-700 pb-3 pt-4">
                        <div class="flex items-center px-5">
                            <div class="flex-shrink-0">
                                <img class="h-10 w-10 rounded-full" :src="user.avatar" alt="" />
                            </div>
                            <div class="ml-3">
                                <!-- <div class="text-base font-medium leading-none text-white">{{ user.name }}</div> -->
                                <div class="text-sm font-medium leading-none text-gray-400">{{ user.email }}</div>
                            </div>
                        </div>
                        <div class="mt-3 space-y-1 px-2">
                            <button
                                v-if="currentOrganization"
                                type="button"
                                @click="isMobileOrganizationMenuOpen = !isMobileOrganizationMenuOpen"
                                class="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                                <span>Organizations</span>
                                <ChevronDownIcon
                                    :class="[
                                        isMobileOrganizationMenuOpen ? 'rotate-180' : '',
                                        'h-5 w-5 text-gray-400 transition-transform duration-200'
                                    ]"
                                />
                            </button>
                            <div v-if="isMobileOrganizationMenuOpen" class="space-y-1 pl-4">
                                <div class="rounded-md px-3 py-2 text-sm font-medium text-gray-500">
                                    Current: {{ currentOrganization.name }}
                                </div>
                                <button
                                    v-for="organization in otherUserOrganizations"
                                    :key="organization.id"
                                    type="button"
                                    @click="changeOrganization(organization.id)"
                                    class="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                >
                                    {{ organization.name }}
                                </button>
                            </div>
                            <RouterLink
                                :to="{ name: 'oganization-create' }"
                                :class="getMobileMenuItemClass(['oganization-create'])"
                            >
                                Add Organization
                            </RouterLink>
                            <RouterLink
                                v-if="!user.isMember() && currentOrganization"
                                :to="{ name: 'oganization-members' }"
                                :class="getMobileMenuItemClass(['oganization-members', 'oganization-invite-member'])"
                            >
                                Organization Members
                            </RouterLink>

                            <div class="border-t border-gray-700 pt-4 space-y-1">
                                <RouterLink
                                    v-if="!isSelfHosted && currentOrganization"
                                    :to="{ name: 'settings' }"
                                    :class="getMobileMenuItemClass(['settings'])"
                                >
                                    Settings
                                </RouterLink>
                                <button
                                    type="button"
                                    @click="logout"
                                    class="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </DisclosurePanel>
            </transition>
        </Disclosure>

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
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, ChevronDoubleRightIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useGlobalStore } from "@/stores/global";
import { ref, useTemplateRef } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import logoUrl from '@/assets/img/logo.png'
import Modal from "@/views/modals/RessonanceCloudModal.vue";
import posthog from 'posthog-js';

const router = useRouter()
const route = useRoute()
const globalStore = useGlobalStore()
const headerLabel = ref('')
const isSelfHosted = ref(true)
const isMobileOrganizationMenuOpen = ref(false)
const user = ref([])
const otherUserOrganizations = ref([])
const ressonanceCloudModalRef = useTemplateRef('ressonanceCloud')
const currentOrganization = ref({})

globalStore.getUser().then((userData) => {
    user.value = userData
    currentOrganization.value = userData.getCurrentOrganization()
    otherUserOrganizations.value = userData.organizations.filter(
        org => org.id !== userData.getCurrentOrganization().id
    )
})

headerLabel.value = globalStore.headerLabel
isSelfHosted.value = globalStore.isSelfHosted

globalStore.$onAction((action) => {
    if (action.name === 'setHeaderLabel') {
        headerLabel.value = action.args[0] ?? 'Project'
    }
})

const isRouteActive = (routeNames = []) => {
    return routeNames.includes(route.name)
}

const getDesktopMenuItemClass = (routeNames = []) => {
    return [
        isRouteActive(routeNames) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        'rounded-md px-3 py-2 text-sm font-medium'
    ]
}

const getMobileMenuItemClass = (routeNames = []) => {
    return [
        isRouteActive(routeNames) ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white',
        'block rounded-md px-3 py-2 text-base font-medium'
    ]
}

const logout = () => {
    globalStore.logout()
    posthog.reset()
    router.push({
        name: 'login'
    })
}

const showRessonanceCloud = () => {
  ressonanceCloudModalRef.value.showModal()
}

const changeOrganization = async (organizationId) => {
    globalStore.setCurrentOrganizationId(organizationId)

    var ProjectListRoute = router.resolve({
        name: 'projects',
    }).href

    window.location = ProjectListRoute
}
</script>
