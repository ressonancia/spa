<template>
    <div class="mt-20">
        <h1 class="mt-10 text-3xl tracking-tight text-gray-900 sm:text-4xl">Frontend Integration</h1>
        <p class="mt-6 text-xl leading-8">Simple frontend integration using Pusher open source library.</p>
        <p class="text-xl leading-8">Put this code at the end of the body:</p>
        <div class="my-8">
            <CodeSnippet :code="frontendSnippet" filename="index.html" />
        </div>
    </div>
    <div class="mt-10">
        <h1 class="mt-10 text-3xl tracking-tight text-gray-900 sm:text-4xl">Backend Integration</h1>
        <p class="mt-6 text-xl leading-8">Backend public channel simple example.</p>
        <p class="text-xl leading-8">You know where to put this better than us:</p>
        <div class="my-8">
            <CodeSnippet :code="backendSnippet" :copy-code="backendSnippetCopy" filename="main.py" />
        </div>
    </div>
    <div class="mt-10 mb-20">
        <p class="mt-6 text-xl leading-8">For a full example take a look at <a target="_blank" class="text-orange-600 hover:text-orange-900" href="https://docs.ressonance.com/using-ressonance/django/public-channels">Ressonance documentation</a>.</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import CodeSnippet from '@/components/CodeSnippet.vue';

const props = defineProps({
    app: {
        type: Object,
        default: () => ({}),
    },
});

const appId = computed(() => props.app?.app_id || 'RESSONANCE_APP_ID');
const appKey = computed(() => props.app?.app_key || 'RESSONANCE_APP_KEY');
const appSecret = computed(() => props.app?.app_secret || 'RESSONANCE_APP_SECRET');

const frontendSnippetTemplate = `
<script src="https://js.pusher.com/8.3.0/pusher.min.js"><\/script>
<script>
document.addEventListener('DOMContentLoaded', function () {
  const pusher = new Pusher('RESSONANCE_APP_KEY', {
    cluster: 'default',
    wsHost: 'websocket.ressonance.com',
    wsPort: 443,
    wssPort: 443,
    forceTLS: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss']
  });

  const channel = pusher.subscribe('public-channel');

  channel.bind('new-release', function (data) {
    console.log('New release', data.release);
  });
});
<\/script>
`
const backendSnippetTemplate = `
# pip install pusher

from django.http import JsonResponse
from pusher import Pusher

pusher = Pusher(
    app_id='RESSONANCE_APP_ID',
    key='RESSONANCE_APP_KEY',
    secret='RESSONANCE_APP_SECRET',
    host='websocket.ressonance.com',
    port=443,
    ssl=True
)

def send_public_event(request):
    pusher.trigger('public-channel', 'new-release', {'release': 'hello world'})
    return JsonResponse({'sent': True})
`

const replaceCredentials = (snippet, secretValue = '********') =>
    snippet
        .replaceAll('RESSONANCE_APP_ID', appId.value)
        .replaceAll('RESSONANCE_APP_KEY', appKey.value)
        .replaceAll('RESSONANCE_APP_SECRET', secretValue);

const frontendSnippet = computed(() => replaceCredentials(frontendSnippetTemplate, appSecret.value));
const backendSnippet = computed(() => replaceCredentials(backendSnippetTemplate));
const backendSnippetCopy = computed(() => replaceCredentials(backendSnippetTemplate, appSecret.value));
</script>
