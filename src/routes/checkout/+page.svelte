<script lang="ts">
	import { cartItems } from '$lib/cart.store';
	import type { CartItem } from '$lib/types';

	let cartItemsList = $state<CartItem[]>([]);
	let email = $state('');
	let name = $state('');
	let street = $state('');
	let city = $state('');
	let stateCode = $state('');
	let zip = $state('');
	let isSubmitting = $state(false);
	let formError = $state('');

	$effect(() => {
		const unsubscribe = cartItems.subscribe((value) => {
			cartItemsList = value;
		});
		return unsubscribe;
	});

	function validateForm() {
		if (!email.trim()) return 'Email is required';
		if (!email.includes('@')) return 'Please enter a valid email';
		if (!name.trim()) return 'Name is required';
		if (!street.trim()) return 'Street address is required';
		if (!city.trim()) return 'City is required';
		if (!stateCode.trim()) return 'State is required';
		if (!zip.trim()) return 'ZIP code is required';
		if (!zip.match(/^\d{5}(-\d{4})?$/)) return 'Please enter a valid ZIP code';
		if (cartItemsList.length === 0) return 'Cart is empty';
		return '';
	}

	async function handleSubmit() {
		formError = '';
		const error = validateForm();
		if (error) {
			formError = error;
			return;
		}

		isSubmitting = true;

		try {
			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					name,
					street,
					city,
					state: stateCode,
					zip,
					items: cartItemsList
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				formError = errorData.message || 'Checkout failed. Please try again.';
				isSubmitting = false;
				return;
			}

			const data = await response.json();
			if (data.success && data.orderId) {
				// Redirect to payment page with order details
				const params = new URLSearchParams({
					amount: data.amount.toString(),
					name: name,
					email: email
				});
				window.location.href = `/payment/${data.orderId}?${params.toString()}`;
			} else {
				formError = 'Failed to create order. Please try again.';
				isSubmitting = false;
			}
		} catch (error) {
			formError = 'An error occurred. Please try again.';
			console.error('Checkout error:', error);
			isSubmitting = false;
		}
	}

	function backToCart() {
		window.location.href = '/cart';
	}
</script>

<svelte:head>
	<title>Checkout - Pirate King</title>
	<meta name="description" content="Complete your purchase at Pirate King." />
</svelte:head>

<main class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-8">
			<button
				onclick={backToCart}
				class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 font-medium mb-4 transition-colors"
			>
				← Back to Cart
			</button>
			<h1 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50">Checkout</h1>
			<p class="text-slate-600 dark:text-slate-400 mt-2">Complete your purchase information</p>
		</div>

		{#if cartItemsList.length === 0}
			<div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-8 text-center border border-slate-200 dark:border-slate-800">
				<p class="text-lg text-slate-600 dark:text-slate-400 mb-4">Your cart is empty</p>
				<button
					onclick={() => (window.location.href = '/products')}
					class="px-6 py-2 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
				>
					Continue Shopping
				</button>
			</div>
		{:else}
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Checkout Form -->
				<div class="lg:col-span-2">
					<div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-8 border border-slate-200 dark:border-slate-800">
						<form onsubmit={(e) => e.preventDefault()}>
							{#if formError}
								<div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
									<p class="text-red-600 dark:text-red-400">{formError}</p>
								</div>
							{/if}

							<!-- Email -->
							<div class="mb-6">
								<label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									Email Address
								</label>
								<input
									type="email"
									id="email"
									bind:value={email}
									placeholder="you@example.com"
									class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
									required
								/>
							</div>

							<!-- Name -->
							<div class="mb-6">
								<label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									Full Name
								</label>
								<input
									type="text"
									id="name"
									bind:value={name}
									placeholder="John Doe"
									class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
									required
								/>
							</div>

							<!-- Shipping Address -->
							<h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Shipping Address</h3>

							<div class="mb-6">
								<label
									for="street"
									class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
								>
									Street Address
								</label>
								<input
									type="text"
									id="street"
									bind:value={street}
									placeholder="123 Main St"
									class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
									required
								/>
							</div>

							<div class="grid grid-cols-2 gap-6 mb-6">
								<div>
									<label for="city" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
										City
									</label>
									<input
										type="text"
										id="city"
										bind:value={city}
										placeholder="New York"
										class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
										required
									/>
								</div>
								<div>
									<label for="stateCode" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
										State
									</label>
									<input
										type="text"
										id="stateCode"
										bind:value={stateCode}
										placeholder="NY"
										class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
										required
									/>
								</div>
							</div>

							<div class="mb-8">
								<label for="zip" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									ZIP Code
								</label>
								<input
									type="text"
									id="zip"
									bind:value={zip}
									placeholder="10001"
									class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
									required
								/>
							</div>

							<button
								type="button"
								onclick={handleSubmit}
								disabled={isSubmitting}
								class="w-full px-6 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{#if isSubmitting}
									Processing...
								{:else}
									Continue to Payment
								{/if}
							</button>
						</form>
					</div>
				</div>

				<!-- Order Summary -->
				<div class="lg:col-span-1">
					<div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6 border border-slate-200 dark:border-slate-800 sticky top-20">
						<h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Order Summary</h2>

						<div class="space-y-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
							<p class="text-sm text-slate-600 dark:text-slate-400">
								{cartItemsList.length} {cartItemsList.length === 1 ? 'item' : 'items'}
							</p>
						</div>

						<div class="space-y-3">
							<div class="flex justify-between text-slate-600 dark:text-slate-400">
								<span>Subtotal:</span>
								<span>$0.00</span>
							</div>
							<div class="flex justify-between text-slate-600 dark:text-slate-400">
								<span>Shipping:</span>
								<span>FREE</span>
							</div>
							<div class="flex justify-between font-semibold text-slate-900 dark:text-slate-50 pt-3 border-t border-slate-200 dark:border-slate-800">
								<span>Total:</span>
								<span>$0.00</span>
							</div>
						</div>

						<p class="text-xs text-slate-500 dark:text-slate-400 mt-6">
							You will be charged after reviewing your payment information.
						</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
</main>
