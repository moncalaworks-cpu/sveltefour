<script lang="ts">
	import { cartItems, calculateCartTotal } from '$lib/cart.store';
	import { generateProducts } from '$lib/products';
	import type { CartItem, Product } from '$lib/types';

	let cartItemsList = $state<CartItem[]>([]);
	let products = $state<Map<string, Product>>(new Map());

	$effect(() => {
		const allProducts = generateProducts();
		products = new Map(allProducts.map((p) => [p.id, p]));
	});

	$effect(() => {
		const unsubscribe = cartItems.subscribe((value) => {
			cartItemsList = value;
		});
		return unsubscribe;
	});

	const totals = $derived.by(() => {
		return calculateCartTotal(cartItemsList, products);
	});

	function updateQuantity(productId: string, quantity: number) {
		const qty = Number(quantity);
		if (qty <= 0) {
			cartItems.removeItem(productId);
		} else {
			cartItems.updateQuantity(productId, qty);
		}
	}

	function removeItem(productId: string) {
		cartItems.removeItem(productId);
	}

	function continueShopping() {
		window.location.href = '/products';
	}

	function checkout() {
		window.location.href = '/checkout';
	}
</script>

<svelte:head>
	<title>Shopping Cart - Pirate King</title>
	<meta name="description" content="Review and manage your shopping cart items." />
</svelte:head>

<main class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
	<div class="max-w-6xl mx-auto px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
				Shopping Cart
			</h1>
			<p class="text-slate-600 dark:text-slate-400">Review your items before checkout</p>
		</div>

		{#if cartItemsList.length === 0}
			<!-- Empty Cart -->
			<div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-12 text-center border border-slate-200 dark:border-slate-800">
				<div class="text-6xl mb-4">🛒</div>
				<h2 class="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">Your cart is empty</h2>
				<p class="text-slate-600 dark:text-slate-400 mb-8">
					Start shopping to add items to your cart!
				</p>
				<button
					onclick={continueShopping}
					class="inline-flex px-8 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
				>
					Continue Shopping
				</button>
			</div>
		{:else}
			<!-- Cart Content -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Cart Items -->
				<div class="lg:col-span-2">
					<div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
						{#each cartItemsList as item (item.productId)}
							{@const product = products.get(item.productId)}
							{#if product}
								<div
									class="p-6 border-b border-slate-200 dark:border-slate-800 last:border-b-0 flex gap-6"
								>
									<!-- Product Image -->
									<div class="w-24 h-24 flex-shrink-0 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden">
										<img
											src={product.imageUrl}
											alt={product.displayName}
											class="w-full h-full object-cover"
										/>
									</div>

									<!-- Product Details -->
									<div class="flex-1">
										<h3 class="font-semibold text-slate-900 dark:text-slate-50 mb-1">
											{product.displayName}
										</h3>
										<p class="text-sm text-slate-600 dark:text-slate-400 mb-3">
											{product.size} • {product.color}
										</p>
										<p class="font-bold text-slate-900 dark:text-slate-50">
											${product.price.toFixed(2)} each
										</p>
									</div>

									<!-- Quantity & Price -->
									<div class="flex flex-col items-end justify-between">
										<div class="flex items-center gap-2 mb-2">
											<button
												onclick={() => updateQuantity(item.productId, item.quantity - 1)}
												class="w-8 h-8 flex items-center justify-center border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
											>
												−
											</button>
											<input
												type="number"
												value={item.quantity}
												onchange={(e) =>
													updateQuantity(
														item.productId,
														parseInt((e.target as HTMLInputElement).value)
													)
												}
												class="w-12 text-center px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50"
												min="1"
											/>
											<button
												onclick={() => updateQuantity(item.productId, item.quantity + 1)}
												class="w-8 h-8 flex items-center justify-center border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
											>
												+
											</button>
										</div>
										<p class="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">
											${(product.price * item.quantity).toFixed(2)}
										</p>
										<button
											onclick={() => removeItem(item.productId)}
											class="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
										>
											Remove
										</button>
									</div>
								</div>
							{/if}
						{/each}
					</div>

					<!-- Continue Shopping -->
					<button
						onclick={continueShopping}
						class="mt-6 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 font-medium transition-colors"
					>
						← Continue Shopping
					</button>
				</div>

				<!-- Order Summary -->
				<div class="lg:col-span-1">
					<div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6 border border-slate-200 dark:border-slate-800 sticky top-20">
						<h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
							Order Summary
						</h2>

						<div class="space-y-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
							<div class="flex justify-between text-slate-600 dark:text-slate-400">
								<span>Items:</span>
								<span>{totals.itemCount}</span>
							</div>
							<div class="flex justify-between text-slate-600 dark:text-slate-400">
								<span>Subtotal:</span>
								<span>${totals.subtotal.toFixed(2)}</span>
							</div>
						</div>

						<div class="flex justify-between items-center mb-6">
							<span class="font-semibold text-slate-900 dark:text-slate-50">Total:</span>
							<span class="text-2xl font-bold text-slate-900 dark:text-slate-50">
								${totals.total.toFixed(2)}
							</span>
						</div>

						<button
							onclick={checkout}
							class="w-full px-6 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors mb-3"
						>
							Proceed to Checkout
						</button>

						<button
							onclick={continueShopping}
							class="w-full px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-50 font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
						>
							Continue Shopping
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</main>
