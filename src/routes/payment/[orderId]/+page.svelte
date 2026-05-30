<script lang="ts">
	import { page } from '$app/stores';
	import StripePaymentForm from '../../../components/StripePaymentForm.svelte';

	let orderId = $state($page.params.orderId || '');
	let orderAmount = $state(Number($page.url.searchParams.get('amount')) || 0);
	let customerName = $state($page.url.searchParams.get('name') || '');
	let customerEmail = $state($page.url.searchParams.get('email') || '');

	let isProcessing = $state(false);
	let error = $state('');

	function handlePaymentSuccess(paymentIntentId: string) {
		isProcessing = true;
		window.location.href = `/confirmation/${orderId}`;
	}

	function handlePaymentError(errorMessage: string) {
		error = errorMessage;
	}

	function backToCheckout() {
		window.history.back();
	}
</script>

<svelte:head>
	<title>Payment - Pirate King</title>
	<meta name="description" content="Secure payment processing." />
</svelte:head>

<main class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
	<div class="max-w-2xl mx-auto px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-8">
			<button
				onclick={backToCheckout}
				class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 font-medium mb-4 transition-colors"
			>
				← Back
			</button>
			<h1 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50">Secure Payment</h1>
			<p class="text-slate-600 dark:text-slate-400 mt-2">Complete your purchase</p>
		</div>

		<!-- Payment Content -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Payment Form -->
			<div class="lg:col-span-2">
				<div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-8 border border-slate-200 dark:border-slate-800">
					{#if error}
						<div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
							<p class="text-red-600 dark:text-red-400">{error}</p>
						</div>
					{/if}

					<StripePaymentForm
						{orderId}
						amount={orderAmount}
						{customerEmail}
						{customerName}
						onSuccess={handlePaymentSuccess}
						onError={handlePaymentError}
					/>
				</div>
			</div>

			<!-- Order Summary -->
			<div class="lg:col-span-1">
				<div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6 border border-slate-200 dark:border-slate-800 sticky top-20">
					<h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Order Summary</h2>

					<div class="space-y-3">
						<div class="flex justify-between text-sm">
							<span class="text-slate-600 dark:text-slate-400">Order ID:</span>
							<span class="font-mono font-bold text-slate-900 dark:text-slate-50">{orderId}</span>
						</div>
						<div class="flex justify-between text-sm">
							<span class="text-slate-600 dark:text-slate-400">Customer:</span>
							<span class="text-slate-900 dark:text-slate-50">{customerName || 'N/A'}</span>
						</div>
						<div class="flex justify-between text-sm">
							<span class="text-slate-600 dark:text-slate-400">Email:</span>
							<span class="text-slate-900 dark:text-slate-50 truncate">{customerEmail || 'N/A'}</span>
						</div>
					</div>

					<div class="border-t border-slate-200 dark:border-slate-800 mt-4 pt-4">
						<div class="flex justify-between items-center">
							<span class="font-semibold text-slate-900 dark:text-slate-50">Total:</span>
							<span class="text-2xl font-bold text-slate-900 dark:text-slate-50">
								${(orderAmount / 100).toFixed(2)}
							</span>
						</div>
					</div>

					<div class="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-400">
						<p class="font-semibold mb-2">Processing Information:</p>
						<ul class="space-y-1">
							<li>✓ Secure SSL encryption</li>
							<li>✓ Powered by Stripe</li>
							<li>✓ PCI DSS compliant</li>
							<li>✓ No card details stored</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
