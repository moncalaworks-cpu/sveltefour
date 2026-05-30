<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Pirate King - Premium T-Shirts, Polos & Hoodies</title>
	<meta name="description" content="Shop quality apparel from Pirate King Company - premium t-shirts, polos, and hoodies for men and women." />
</svelte:head>

<main class="min-h-screen bg-white dark:bg-slate-950">
	<!-- Hero Section -->
	<section class="min-h-[600px] w-full bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center text-white py-20">
		<div class="max-w-3xl mx-auto px-6 text-center">
			<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">⚓ Pirate King Company</h1>
			<p class="text-lg sm:text-xl text-slate-200 mb-4">Premium T-Shirts, Polos & Hoodies</p>
			<p class="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
				Discover our collection of quality apparel for men and women. Premium fabrics, classic styles, and bold colors.
			</p>
			<div class="flex gap-4 justify-center flex-wrap">
				<a
					href="/products"
					class="inline-flex px-8 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-all"
				>
					Shop Now
				</a>
				<a
					href="#about"
					class="inline-flex px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-slate-900 transition-all"
				>
					Learn More
				</a>
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section id="about" class="py-20 px-6 max-w-4xl mx-auto">
		<div class="text-center mb-12">
			<h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">About Pirate King</h2>
			<p class="text-lg text-slate-600 dark:text-slate-400">
				Quality apparel crafted with care. We offer men's and women's t-shirts, polos, and hoodies in 5 classic colors and all sizes.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="text-center">
				<div class="text-4xl mb-4">👕</div>
				<h3 class="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Quality Materials</h3>
				<p class="text-slate-600 dark:text-slate-400">Premium fabrics designed for comfort and durability</p>
			</div>
			<div class="text-center">
				<div class="text-4xl mb-4">🎨</div>
				<h3 class="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Classic Colors</h3>
				<p class="text-slate-600 dark:text-slate-400">Black, White, Dark Blue, Khaki, and Pink options</p>
			</div>
			<div class="text-center">
				<div class="text-4xl mb-4">📦</div>
				<h3 class="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Fast Shipping</h3>
				<p class="text-slate-600 dark:text-slate-400">Quick order processing and reliable delivery</p>
			</div>
		</div>
	</section>

	<!-- Featured Products Preview -->
	<section id="products" class="py-20 px-6 bg-slate-50 dark:bg-slate-900">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">Our Collection</h2>
				<p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
					Explore our full range of apparel
				</p>
				<a
					href="/products"
					class="inline-flex px-8 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-bold rounded-lg hover:scale-105 transition-transform"
				>
					View All Products
				</a>
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section id="contact" class="py-20 px-6">
		<div class="max-w-2xl mx-auto text-center">
			<h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">Questions?</h2>
			<p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
				Contact us at support@piratekingcompany.com for any inquiries
			</p>
		</div>
	</section>
</main>
