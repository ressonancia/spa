<template>
    <div class="mt-20">
        <h1 class="mt-10 text-3xl tracking-tight text-gray-900 sm:text-4xl">Frontend Integration</h1>
        <p class="mt-6 text-xl leading-8">Simple frontend integration using Echo library.</p>
        <div class="my-8">
            <CodeSnippet :code="frontendSnippet" filename="index.html" />
        </div>
    </div>
    <div class="mt-10">
        <h1 class="mt-10 text-3xl tracking-tight text-gray-900 sm:text-4xl">Backend Integration</h1>
        <p class="mt-6 text-xl leading-8">Backend public channel simple example.</p>
        <p class="text-xl leading-8">You know where to put this better than us:</p>
        <div class="my-8">
            <CodeSnippet :code="backendSnippet" filename="NewProductOnSaleReleased.php" />
        </div>
        <p class="text-xl leading-8">Simple route to dispatch the event:</p>
        <div class="my-8">
            <CodeSnippet :code="dispatchSnippet" filename="routes/web.php" />
        </div>
    </div>
    <div class="mt-10 mb-20">
        <p class="mt-6 text-xl leading-8">For a full example take a look at <a target="_blank" class="text-orange-600 hover:text-orange-900" href="https://docs.ressonance.com/using-ressonance/integrate-with-laravel-app">Ressonance documentation</a>.</p>
    </div>
</template>

<script setup>

import CodeSnippet from '@/components/CodeSnippet.vue';

defineProps({
    app: {
        type: Object,
        default: () => ({}),
    },
});

const frontendSnippet = `
document.addEventListener("DOMContentLoaded", () => {
    Echo.channel('product.on.sale')
        .listen('NewProductOnSaleReleased', (e) => {
            alert('New Product On Sale!!!' + e.productName);
    });
});
`

const backendSnippet = `
<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewProductOnSaleReleased implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $productName;

    /**
     * Create a new event instance.
     */
    public function __construct(string $productName)
    {
        $this->productName = $productName;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('product.on.sale'),
        ];
    }
}
`

const dispatchSnippet = `
<?php

use App\\Events\\NewProductOnSaleReleased;

Route::get('/dispatch-event', function () {
    event(new NewProductOnSaleReleased('hello world'));

    return response()->json(['dispatched' => true]);
});
`
</script>
