<template>
	<div>
		<h1 class="mt-10 text-3xl tracking-tight text-gray-900 sm:text-4xl">API Key</h1>
		<p class="mt-6 text-xl leading-8">Use this API Key to authenticate and sent messages to Ressonance at the server side.
			<br> For more instructions follow the <a target="_blank" class="text-orange-600 hover:text-orange-900" href="https://laravel.com/docs/11.x/broadcasting#client-reverb">Laravel Documentation.</a></p>

		<div class="mt-10">
			<CopyField :value="websocketHost">Websocket Host</CopyField>
		</div>

		<div class="mt-10">
			<CopyField :value="app.app_id">App ID</CopyField>
		</div>

		<div class="mt-10">
			<CopyField :value="app.app_key">App Key</CopyField>
		</div>

		<div class="mt-10">
			<CopyField hide="true" :value="app.app_secret">App Secret</CopyField>
		</div>

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
				<CodeSnippet :code="BackendSnippet" filename="public-event.php" />
			</div>
		</div>

		<Modal ref="modal" />
	</div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, useTemplateRef } from 'vue'
import apiRequester from '@/services/requester';
import CopyField from '@/components/CopyField.vue';
import Modal from "@/views/modals/Modal.vue";
import { useGlobalStore } from "@/stores/global";
import { stringLimit } from '@/services/utils';
import CodeSnippet from '@/components/CodeSnippet.vue';
import DefaultTransition from "@/components/Transitions/DefaultTransition.vue";


const globalStore = useGlobalStore();
const modalRef = useTemplateRef('modal')

const websocketHost = import.meta.env.VITE_WEBSOCKET_HOST;
const frontendSnippet = `
<script src="https://js.pusher.com/8.3.0/pusher.min.js"><\/script>
<script>
document.addEventListener('DOMContentLoaded', function() {
	const pusher = new Pusher('RESSONANCE_APP_ID', {
		cluster: 'default',
		wsHost: 'websocket.ressonance.com',
		wsPort: 443,
		wssPort: 443,
		forceTLS: true,
		disableStats: true,
		enabledTransports: ['ws', 'wss']
	});

	const channel = pusher.subscribe('public-channel');

	channel.bind('new-release', (data) => {
		alert('New release', data.release);
	});
});
<\/script>`;
const BackendSnippet = `
&lt;?php

require __DIR__ . '/vendor/autoload.php';

$pusher = new Pusher\Pusher(
    'RESSONANCE_APP_KEY',
    'RESSONANCE_APP_SECRET',
    'RESSONANCE_APP_ID',
    [
        'host' => 'websocket.ressonance.com',
        'port' => 443,
        'scheme' => 'https',
        'useTLS' => true,
    ]
);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/send-public-event') {
    $pusher->trigger('public-channel', 'new-release', ['release' => 'hello world']);
    echo 'Event sent!';
    exit;
}

http_response_code(404);
echo 'Not found.';`

let app = ref({})
const route = useRoute();
const projectName = route.params.project;

apiRequester.get(`${import.meta.env.VITE_API_URL}/api/apps/${projectName}`).then(function (response) {
	app.value = response.data
	globalStore.setHeaderLabel(stringLimit(app.value.app_name.toLowerCase(), 50))
})
.catch(function () {
	modalRef.value.apiDownResponse()
});
</script>
