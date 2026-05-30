<script lang="ts">
	import { page } from '$app/stores';

	let orderId = $derived($page.params.orderId);
	let orderData = $state<any>(null);
	let loading = $state(true);
	let error = $state('');

	$effect(() => {
		// In a real app, fetch order details from server
		// For now, show the order ID and redirect info
		if (orderId) {
			loading = false;
		}
	});

	function continueShopping() {
		window.location.href = '/products';
	}

	function viewCart() {
		window.location.href = '/cart';
	}
</script>

<svelte:head>
	<title>Order Confirmed - Pirate King</title>
	<meta name="description" content="Your order has been confirmed." />
</svelte:head>

<main class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
	<div class="max-w-2xl mx-auto px-6 lg:px-8">
		{#if loading}
			<div class="text-center py-12">
				<p class="text-slate-600 dark:text-slate-400">Loading order details...</p>
			</div>
		{:else if error}
			<div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-8 text-center border border-red-200 dark:border-red-800">
				<p class="text-red-600 dark:text-red-400 mb-4">{error}</p>
				<button
					onclick={continueShopping}
					class="px-6 py-2 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
				>
					Back to Shopping
				</button>
			</div>
		{:else}
			<!-- Success State -->
			<div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
				<!-- Success Header -->
				<div class="bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800 p-8 text-center">
					<div class="text-6xl mb-4">✓</div>
					<h1 class="text-3xl sm:text-4xl font-bold text-green-900 dark:text-green-400 mb-2">
						Order Confirmed!
					</h1>
					<p class="text-green-700 dark:text-green-300">Thank you for your purchase</p>
				</div>

				<!-- Order Details -->
				<div class="p-8">
					<div class="mb-8">
						<h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Order Details</h2>
						<div class="space-y-3">
							<div class="flex justify-between">
								<span class="text-slate-600 dark:text-slate-400">Order Number:</span>
								<span class="font-mono font-bold text-slate-900 dark:text-slate-50">{orderId}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-slate-600 dark:text-slate-400">Status:</span>
								<span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
									Confirmed
								</span>
							</div>
							<div class="flex justify-between">
								<span class="text-slate-600 dark:text-slate-400">Date & Time:</span>
								<span class="text-slate-900 dark:text-slate-50">{new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</span>
							</div>
						</div>
					</div>

					<!-- Next Steps -->
					<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
						<h3 class="font-semibold text-blue-900 dark:text-blue-400 mb-2">What's Next?</h3>
						<ul class="space-y-2 text-sm text-blue-800 dark:text-blue-300">
							<li>✓ Order confirmation email sent to your inbox</li>
							<li>✓ Pirate King will process your order shortly</li>
							<li>✓ You'll receive a shipping notification with tracking info</li>
							<li>✓ Estimated delivery: 5-7 business days</li>
						</ul>
					</div>

					<!-- Contact Info -->
					<div class="mb-8">
						<h3 class="font-semibold text-slate-900 dark:text-slate-50 mb-4">Questions?</h3>
						<p class="text-slate-600 dark:text-slate-400 mb-2">
							Contact us at support@piratekingcompany.com for assistance with your order.
						</p>
					</div>

					<!-- Action Buttons -->
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<button
							onclick={continueShopping}
							class="px-6 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
						>
							Continue Shopping
						</button>
						<button
							onclick={viewCart}
							class="px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-50 font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
						>
							View Cart
						</button>
					</div>
				</div>

				<!-- Footer Note -->
				<div class="bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-6 text-center text-sm text-slate-600 dark:text-slate-400">
					Order ID: {orderId}
					<br />
					Save this for your records
				</div>
			</div>
		{/if}
	</div>
</main>
