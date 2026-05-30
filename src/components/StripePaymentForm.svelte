<script lang="ts">
	import { onMount } from 'svelte';

	let { orderId, amount, customerEmail, customerName, onSuccess, onError } = $props<{
		orderId: string;
		amount: number;
		customerEmail: string;
		customerName: string;
		onSuccess: (paymentIntentId: string) => void;
		onError: (error: string) => void;
	}>();

	let isLoading = $state(false);
	let stripePromise: Promise<any> | null = null;
	let cardElement: HTMLElement | null = null;
	let stripe: any = null;
	let elements: any = null;

	onMount(() => {
		// Initialize Stripe
		// This will be implemented when Stripe keys are available
		console.log('StripePaymentForm mounted');
		console.log(`Order: ${orderId}, Amount: $${(amount / 100).toFixed(2)}`);
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!stripe || !elements) {
			onError('Payment system not initialized');
			return;
		}

		isLoading = true;

		try {
			// In production, this will:
			// 1. Create a payment intent on the server
			// 2. Confirm the payment with Stripe
			// 3. Handle 3D Secure if needed
			// 4. Return success or error

			// For MVP, just simulate success after 2 seconds
			await new Promise((resolve) => setTimeout(resolve, 2000));

			onSuccess('pi_test_' + Math.random().toString(36).substring(7));
		} catch (error: any) {
			onError(error.message || 'Payment failed');
		} finally {
			isLoading = false;
		}
	}
</script>

<form onsubmit={handleSubmit} class="space-y-6">
	<!-- Card Details Section -->
	<div>
		<h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Payment Method</h3>

		<!-- Card Element Placeholder -->
		<div
			bind:this={cardElement}
			class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-slate-500 focus:border-transparent min-h-12"
		>
			<div class="text-slate-500 dark:text-slate-400 text-sm">
				💳 Card Number • MM/YY • CVC
				<span class="text-xs ml-2">(Stripe integration coming soon)</span>
			</div>
		</div>
	</div>

	<!-- Order Summary -->
	<div class="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
		<div class="space-y-2 text-sm">
			<div class="flex justify-between">
				<span class="text-slate-600 dark:text-slate-400">Order ID:</span>
				<span class="font-mono text-slate-900 dark:text-slate-50">{orderId}</span>
			</div>
			<div class="flex justify-between">
				<span class="text-slate-600 dark:text-slate-400">Amount:</span>
				<span class="font-bold text-slate-900 dark:text-slate-50">${(amount / 100).toFixed(2)}</span>
			</div>
			<div class="flex justify-between">
				<span class="text-slate-600 dark:text-slate-400">Customer:</span>
				<span class="text-slate-900 dark:text-slate-50">{customerName}</span>
			</div>
		</div>
	</div>

	<!-- Security Notice -->
	<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
		<p class="text-sm text-blue-800 dark:text-blue-300">
			🔒 Your payment information is encrypted and processed securely by Stripe. We never store your card details.
		</p>
	</div>

	<!-- Submit Button -->
	<button
		type="submit"
		disabled={isLoading}
		class="w-full px-6 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
	>
		{#if isLoading}
			Processing Payment...
		{:else}
			Pay ${(amount / 100).toFixed(2)}
		{/if}
	</button>

	<!-- Test Card Info -->
	<div class="text-xs text-slate-500 dark:text-slate-400 text-center">
		Test Mode • Use card 4242 4242 4242 4242 • Any future date • Any CVC
	</div>
</form>
