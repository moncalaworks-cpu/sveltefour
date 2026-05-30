<script lang="ts">
	import { cartItems } from '$lib/cart.store';
	import { generateProducts, filterProducts } from '$lib/products';
	import type { ClothingType, Gender, Size, Color, Product } from '$lib/types';

	const products = generateProducts();

	let selectedType = $state<ClothingType | ''>('');
	let selectedGender = $state<Gender | ''>('');
	let selectedSize = $state<Size | ''>('');
	let selectedColor = $state<Color | ''>('');
	let showAddedNotification = $state(false);
	let selectedProductId = $state<string | null>(null);

	const typeOptions: ClothingType[] = ['tshirt', 'polo', 'hoodie'];
	const genderOptions: Gender[] = ['men', 'women'];
	const sizeOptions: Size[] = ['S', 'M', 'L', 'XL', 'XXL'];
	const colorOptions: Color[] = ['black', 'white', 'darkblue', 'khaki', 'pink'];

	const filteredProducts = $derived.by(() => {
		const filters: Partial<{
			type: ClothingType;
			gender: Gender;
			size: Size;
			color: Color;
		}> = {};

		if (selectedType) filters.type = selectedType;
		if (selectedGender) filters.gender = selectedGender;
		if (selectedSize) filters.size = selectedSize;
		if (selectedColor) filters.color = selectedColor;

		return filterProducts(products, filters);
	});

	function addToCart(product: Product) {
		cartItems.addItem(product.id);
		selectedProductId = product.id;
		showAddedNotification = true;
		setTimeout(() => {
			showAddedNotification = false;
			selectedProductId = null;
		}, 2000);
	}

	function clearFilters() {
		selectedType = '';
		selectedGender = '';
		selectedSize = '';
		selectedColor = '';
	}
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-12">
			<h1 class="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">Shop Our Collection</h1>
			<p class="text-lg text-slate-600 dark:text-slate-400">
				Explore {filteredProducts.length} of {products.length} products
			</p>
		</div>

		<!-- Filters -->
		<div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6 mb-8 border border-slate-200 dark:border-slate-800">
			<div class="flex items-center justify-between mb-6">
				<h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">Filters</h2>
				<button
					onclick={clearFilters}
					class="px-3 py-1 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
				>
					Clear All
				</button>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<!-- Type Filter -->
				<div>
					<label for="type" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
						>Clothing Type</label
					>
					<select
						id="type"
						bind:value={selectedType}
						class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
					>
						<option value="">All Types</option>
						{#each typeOptions as type}
							<option value={type}>
								{type.charAt(0).toUpperCase() + type.slice(1)}
							</option>
						{/each}
					</select>
				</div>

				<!-- Gender Filter -->
				<div>
					<label for="gender" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
						>Gender</label
					>
					<select
						id="gender"
						bind:value={selectedGender}
						class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
					>
						<option value="">All Genders</option>
						{#each genderOptions as gender}
							<option value={gender}>
								{gender.charAt(0).toUpperCase() + gender.slice(1)}'s
							</option>
						{/each}
					</select>
				</div>

				<!-- Size Filter -->
				<div>
					<label for="size" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Size</label>
					<select
						id="size"
						bind:value={selectedSize}
						class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
					>
						<option value="">All Sizes</option>
						{#each sizeOptions as size}
							<option value={size}>{size}</option>
						{/each}
					</select>
				</div>

				<!-- Color Filter -->
				<div>
					<label for="color" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
						>Color</label
					>
					<select
						id="color"
						bind:value={selectedColor}
						class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
					>
						<option value="">All Colors</option>
						{#each colorOptions as color}
							<option value={color}>
								{color.charAt(0).toUpperCase() + color.slice(1)}
							</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<!-- Product Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each filteredProducts as product (product.id)}
				<div
					class="bg-white dark:bg-slate-900 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-800 overflow-hidden"
				>
					<!-- Product Image -->
					<div class="aspect-square bg-slate-200 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
						<img
							src={product.imageUrl}
							alt={product.displayName}
							class="w-full h-full object-cover"
						/>
						{#if product.quantity === 0}
							<div class="absolute inset-0 bg-black/50 flex items-center justify-center">
								<p class="text-white font-semibold">Out of Stock</p>
							</div>
						{/if}
					</div>

					<!-- Product Info -->
					<div class="p-4">
						<h3 class="font-semibold text-slate-900 dark:text-slate-50 mb-1 text-sm">
							{product.displayName}
						</h3>
						<p class="text-xs text-slate-600 dark:text-slate-400 mb-2">
							{product.size} • {product.color}
						</p>
						<div class="flex items-center justify-between mb-4">
							<p class="text-lg font-bold text-slate-900 dark:text-slate-50">
								${product.price.toFixed(2)}
							</p>
							<p class="text-xs text-slate-500 dark:text-slate-400">
								{product.quantity} in stock
							</p>
						</div>

						<button
							onclick={() => addToCart(product)}
							disabled={product.quantity === 0}
							class="w-full px-4 py-2 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
						>
							{#if selectedProductId === product.id && showAddedNotification}
								✓ Added!
							{:else}
								Add to Cart
							{/if}
						</button>
					</div>
				</div>
			{/each}
		</div>

		<!-- No Results -->
		{#if filteredProducts.length === 0}
			<div class="text-center py-12">
				<p class="text-lg text-slate-600 dark:text-slate-400">No products found. Try adjusting your filters.</p>
			</div>
		{/if}
	</div>
</div>
