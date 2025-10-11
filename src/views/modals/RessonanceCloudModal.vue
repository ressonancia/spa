<template>
    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen pt-10 pb-10 overflow-y-auto">
                <div class="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all">
                            <div class="bg-white dark:bg-gray-900">
                            <main>
                                <!-- Pricing section -->
                                <form class="group/tiers pt-24 sm:pt-32">
                                <div class="mx-auto max-w-7xl px-6 lg:px-8">
                                    <div class="mx-auto max-w-4xl text-center">
                                    <p class="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl dark:text-white">Your business grows a lot.<br> Pricing grows a little.</p>
                                    </div>
                                    <p class="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8 dark:text-gray-400">Try Ressonance Cloud for free or chose an affordable plan.</p>
                                    <div class="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                    <div class="group/tier rounded-3xl p-8 ring-1 ring-gray-200 data-[featured]:ring-2 data-[featured]:ring-indigo-600 xl:p-10 dark:bg-gray-800/50 dark:ring-white/15 dark:data-[featured]:ring-indigo-400">
                                        <div class="flex items-center justify-between gap-x-4">
                                        <p className="font-display text-5xl font-light tracking-tight text-white">$0</p>
                                        <h3 id="tier-freelancer" class="text-lg/8 font-semibold text-gray-900 group-data-[featured]/tier:text-indigo-600 dark:text-white dark:group-data-[featured]/tier:text-indigo-400">Starter</h3>
                                        </div>
                                        <p class="mt-4 text-sm/6 text-gray-600 dark:text-gray-300">Good for anyone who is testing something or even starting a new dream.</p>
                                        <p class="mt-6 flex items-baseline gap-x-1 group-[:not(:has([name=frequency][value=monthly]:checked))]/tiers:hidden">
                                        <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">$19</span>
                                        <span class="text-sm/6 font-semibold text-gray-600 dark:text-gray-400">/month</span>
                                        </p>
                                        <a href="https://app.ressonance.com/create-account" target="_blank" aria-describedby="freelancer" class="mt-6 block w-full rounded-md px-3 py-2 text-center text-sm/6 font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group-data-[featured]/tier:bg-indigo-600 group-data-[featured]/tier:text-white group-data-[featured]/tier:shadow-sm group-data-[featured]/tier:ring-0 group-data-[featured]/tier:hover:bg-indigo-500 dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-inset dark:ring-white/5 dark:hover:bg-white/20 dark:hover:ring-white/5 dark:focus-visible:outline-indigo-500 dark:group-[:not([data-featured])]/tier:focus-visible:outline-white/75 dark:group-data-[featured]/tier:bg-indigo-500 dark:group-data-[featured]/tier:shadow-none dark:group-data-[featured]/tier:hover:bg-indigo-400">Start Now</a>
                                        <ul role="list" class="mt-8 space-y-3 text-sm/6 text-gray-600 xl:mt-10 dark:text-gray-300">
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            200k Messages per day
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            100 concurrent connections
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            No support :(
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            Cancel anytime
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            Unlimited projects
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            Unlimited Users
                                        </li>
                                        </ul>
                                    </div>
                                    <div data-featured="true" class="group/tier rounded-3xl p-8 ring-1 ring-gray-200 data-[featured]:ring-2 data-[featured]:ring-indigo-600 xl:p-10 dark:bg-gray-800/50 dark:ring-white/15 dark:data-[featured]:ring-indigo-400">
                                        <div class="flex items-center justify-between gap-x-4">
                                        <p className="font-display text-5xl font-light tracking-tight text-white">$99</p>
                                        <h3 id="tier-startup" class="text-lg/8 font-semibold text-gray-900 group-data-[featured]/tier:text-indigo-600 dark:text-white dark:group-data-[featured]/tier:text-indigo-400">Small business</h3>
                                        </div>
                                        <p class="mt-4 text-sm/6 text-gray-600 dark:text-gray-300">Perfect for small / medium sized businesses.</p>
                                        <button aria-describedby="startup" class="mt-6 block w-full rounded-md px-3 py-2 text-center text-sm/6 font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group-data-[featured]/tier:bg-indigo-600 group-data-[featured]/tier:text-white group-data-[featured]/tier:shadow-sm group-data-[featured]/tier:ring-0 group-data-[featured]/tier:hover:bg-indigo-500 dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-inset dark:ring-white/5 dark:hover:bg-white/20 dark:hover:ring-white/5 dark:focus-visible:outline-indigo-500 dark:group-[:not([data-featured])]/tier:focus-visible:outline-white/75 dark:group-data-[featured]/tier:bg-indigo-500 dark:group-data-[featured]/tier:shadow-none dark:group-data-[featured]/tier:hover:bg-indigo-400">Buy plan</button>
                                        <ul role="list" class="mt-8 space-y-3 text-sm/6 text-gray-600 xl:mt-10 dark:text-gray-300">
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            10 million Messages per day
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            10.000 concurrent connections
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            Email Support
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            Cancel anytime
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            Unlimited projects
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            Unlimited users
                                        </li>
                                        </ul>
                                    </div>
                                    <div class="group/tier rounded-3xl p-8 ring-1 ring-gray-200 data-[featured]:ring-2 data-[featured]:ring-indigo-600 xl:p-10 dark:bg-gray-800/50 dark:ring-white/15 dark:data-[featured]:ring-indigo-400">
                                        <div class="flex items-center justify-between gap-x-4">
                                        <p className="font-display text-4xl font-light tracking-tight text-white">$ Consult</p>
                                        <h3 id="tier-enterprise" class="text-lg/8 font-semibold text-gray-900 group-data-[featured]/tier:text-indigo-600 dark:text-white dark:group-data-[featured]/tier:text-indigo-400">Enterprise</h3>
                                        <p class="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs/5 font-semibold text-indigo-600 group-[:not([data-featured])]/tier:hidden dark:bg-indigo-500 dark:text-white">Most popular</p>
                                        </div>
                                        <p class="mt-4 text-sm/6 text-gray-600 dark:text-gray-300">Dedicated support and infrastructure for your company.</p>
                                        <button aria-describedby="enterprise" class="mt-6 block w-full rounded-md px-3 py-2 text-center text-sm/6 font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group-data-[featured]/tier:bg-indigo-600 group-data-[featured]/tier:text-white group-data-[featured]/tier:shadow-sm group-data-[featured]/tier:ring-0 group-data-[featured]/tier:hover:bg-indigo-500 dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-inset dark:ring-white/5 dark:hover:bg-white/20 dark:hover:ring-white/5 dark:focus-visible:outline-indigo-500 dark:group-[:not([data-featured])]/tier:focus-visible:outline-white/75 dark:group-data-[featured]/tier:bg-indigo-500 dark:group-data-[featured]/tier:shadow-none dark:group-data-[featured]/tier:hover:bg-indigo-400">Buy plan</button>
                                        <ul role="list" class="mt-8 space-y-3 text-sm/6 text-gray-600 xl:mt-10 dark:text-gray-300">
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            Unlimited messages
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            A Huge amount of connections....
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            Meeting Support
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            Cancel anytime
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            Unlimited projects
                                        </li>
                                        <li class="flex gap-x-3">
                                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400">
                                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                            Unlimited users
                                        </li>
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                                </form>

                                <!-- Testimonial section -->
                                <!-- <div class="mx-auto mt-24 max-w-7xl px-6 sm:mt-56 lg:px-8">
                                <div class="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                                    <div class="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
                                    <img src="https://tailwindcss.com/plus-assets/img/logos/tuple-logo-gray-900.svg" alt="" class="h-12 self-start dark:hidden" />
                                    <img src="https://tailwindcss.com/plus-assets/img/logos/tuple-logo-white.svg" alt="" class="hidden h-12 self-start dark:block" />
                                    <figure class="mt-10 flex flex-auto flex-col justify-between">
                                        <blockquote class="text-lg/8 text-gray-900 dark:text-gray-100">
                                        <p>“Amet amet eget scelerisque tellus sit neque faucibus non eleifend. Integer eu praesent at a. Ornare arcu gravida natoque erat et cursus tortor consequat at. Vulputate gravida sociis enim nullam ultricies habitant malesuada lorem ac. Tincidunt urna dui pellentesque sagittis.”</p>
                                        </blockquote>
                                        <figcaption class="mt-10 flex items-center gap-x-6">
                                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-14 rounded-full bg-gray-50 dark:bg-gray-800" />
                                        <div class="text-base">
                                            <div class="font-semibold text-gray-900 dark:text-white">Judith Black</div>
                                            <div class="mt-1 text-gray-500 dark:text-gray-400">CEO of Tuple</div>
                                        </div>
                                        </figcaption>
                                    </figure>
                                    </div>
                                    <div class="flex flex-col border-t border-gray-900/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20 dark:border-white/10">
                                    <img src="https://tailwindcss.com/plus-assets/img/logos/reform-logo-gray-900.svg" alt="" class="h-12 self-start dark:hidden" />
                                    <img src="https://tailwindcss.com/plus-assets/img/logos/reform-logo-white.svg" alt="" class="hidden h-12 self-start dark:block" />
                                    <figure class="mt-10 flex flex-auto flex-col justify-between">
                                        <blockquote class="text-lg/8 text-gray-900 dark:text-gray-100">
                                        <p>“Excepteur veniam labore ullamco eiusmod. Pariatur consequat proident duis dolore nulla veniam reprehenderit nisi officia voluptate incididunt exercitation exercitation elit. Nostrud veniam sint dolor nisi ullamco.”</p>
                                        </blockquote>
                                        <figcaption class="mt-10 flex items-center gap-x-6">
                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-14 rounded-full bg-gray-50 dark:bg-gray-800" />
                                        <div class="text-base">
                                            <div class="font-semibold text-gray-900 dark:text-white">Joseph Rodriguez</div>
                                            <div class="mt-1 text-gray-500 dark:text-gray-400">CEO of Reform</div>
                                        </div>
                                        </figcaption>
                                    </figure>
                                    </div>
                                </div>
                                </div> -->

                                <!-- FAQ section -->
                                <div class="mx-auto mt-24 max-w-7xl px-6 pb-24 sm:mt-36 lg:px-8">
                                <h2 class="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">Frequently asked questions</h2>
                                <p class="mt-6 max-w-2xl text-base/7 text-gray-600 dark:text-gray-400">Have a different question and can’t find the answer you’re looking for? Reach out to our support team by <a href="mailto:support@ressonance.com" class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">sending us an email</a> and we’ll get back to you as soon as we can.</p>
                                <div class="mt-20">
                                    <dl class="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
                                    <div>
                                        <dt class="text-base/7 font-semibold text-gray-900 dark:text-white">Is it a Laravel Reverb?</dt>
                                        <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-400">It's a cloud implementation of reverb using the power websocket protocol. Stop restarting your server after every deployment. This means you can focus on building your application without worrying about the underlying infrastructure.</dd>
                                    </div>
                                    <div>
                                        <dt class="text-base/7 font-semibold text-gray-900 dark:text-white">What is the advantage compared with self hosted reverb?</dt>
                                        <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-400">To Keep a self hosted reverb you will have an engineer cost to implement and the infrastructure cost. Reverb does not work well in shared hosts too. To simple put reverb keeps the headache away.</dd>
                                    </div>
                                    <div>
                                        <dt class="text-base/7 font-semibold text-gray-900 dark:text-white">Then to use Ressonance i just need the Laravel Reverb Broadcast Driver?</dt>
                                        <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-400">Yes, just follow the Laravel documentation and you are good to go.</dd>
                                    </div>
                                    <div>
                                        <dt class="text-base/7 font-semibold text-gray-900 dark:text-white">How is it compared with Pusher?</dt>
                                        <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-400">Pusher has a ton of features but it is expensive. Most applications just need channels and push notifications. Ressonance can deliver it cheaper.</dd>
                                    </div>
                                    <div>
                                        <dt class="text-base/7 font-semibold text-gray-900 dark:text-white">Is Ressonance only for Laravel applications?</dt>
                                        <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-400">Ressonance is meant for Laravel Applications but Reverb is compatible with Pusher API. Then you can use Ressonance with other stacks.</dd>
                                    </div>
                                    <div>
                                        <dt class="text-base/7 font-semibold text-gray-900 dark:text-white">Can I use pusher libraries to integrate with Ressonance?</dt>
                                        <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-400">Yes but pusher has more features that will not work on Ressonance. Only channels will work.</dd>
                                    </div>
                                    <div>
                                        <dt class="text-base/7 font-semibold text-gray-900 dark:text-white">What about security?</dt>
                                        <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-400">Ressonance does not record your messages for regulation ends. All communication is encrypted.</dd>
                                    </div>
                                    <div>
                                        <dt class="text-base/7 font-semibold text-gray-900 dark:text-white">Ressonance can help with the first steps?</dt>
                                        <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-400">Absolutely. For the paid plans we are open to help you and your team with the first steps even getting the hands dirty.</dd>
                                    </div>
                                    </dl>
                                </div>
                                </div>
                            </main>
                            </div>
                            
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

const open = ref(false)

const showModal = () => {
    open.value = true
}

defineExpose({
    showModal
})
</script>