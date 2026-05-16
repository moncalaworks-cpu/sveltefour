<script lang="ts">
	interface Props {
		animation?: 'fade' | 'slide-left' | 'slide-right' | 'slide-up' | 'scale';
		delay?: number;
		children?: any;
		class?: string;
	}

	let {
		animation = 'fade',
		delay = 0,
		children,
		class: className = ''
	}: Props = $props();

	let isVisible = $state(false);
	let element: HTMLDivElement | undefined;

	$effect(() => {
		const animationValue = animation;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
					observer.unobserve(entry.target);
				}
			},
			{
				threshold: 0.1
			}
		);

		if (element) {
			observer.observe(element);
		}

		return () => {
			observer.disconnect();
		};
	});

	const animationMap: Record<string, string> = {
		fade: 'animate-fade-in',
		'slide-left': 'animate-slide-in-left',
		'slide-right': 'animate-slide-in-right',
		'slide-up': 'animate-slide-up',
		scale: 'animate-scale-up'
	};

	const animationClass = $derived(animationMap[animation] || 'animate-fade-in');
</script>

<div
	bind:this={element}
	class="{isVisible ? animationClass : 'opacity-0'} {className}"
	style={delay ? `--animation-delay: ${delay}ms;` : ''}
>
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	@media (prefers-reduced-motion: reduce) {
		div {
			animation: none !important;
			opacity: 1 !important;
		}
	}
</style>
