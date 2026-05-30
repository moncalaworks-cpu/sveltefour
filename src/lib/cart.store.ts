import { writable, derived } from 'svelte/store';
import type { CartItem, Product } from './types';

const STORAGE_KEY = 'pirate-king-cart';

function createCartStore() {
	const { subscribe, set, update } = writable<CartItem[]>([], (set) => {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				try {
					set(JSON.parse(stored));
				} catch (e) {
					console.error('Failed to parse cart from storage:', e);
					set([]);
				}
			}
		}
		return () => {};
	});

	function saveToStorage(items: CartItem[]) {
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		}
	}

	return {
		subscribe,
		addItem: (productId: string, quantity: number = 1) => {
			update((items) => {
				const existing = items.find((item) => item.productId === productId);
				if (existing) {
					existing.quantity += quantity;
				} else {
					items.push({ productId, quantity, addedAt: new Date() });
				}
				saveToStorage(items);
				return items;
			});
		},
		removeItem: (productId: string) => {
			update((items) => {
				const filtered = items.filter((item) => item.productId !== productId);
				saveToStorage(filtered);
				return filtered;
			});
		},
		updateQuantity: (productId: string, quantity: number) => {
			update((items) => {
				const item = items.find((item) => item.productId === productId);
				if (item) {
					if (quantity <= 0) {
						items = items.filter((item) => item.productId !== productId);
					} else {
						item.quantity = quantity;
					}
				}
				saveToStorage(items);
				return items;
			});
		},
		clear: () => {
			set([]);
			if (typeof window !== 'undefined') {
				localStorage.removeItem(STORAGE_KEY);
			}
		}
	};
}

export const cartItems = createCartStore();

export const cartCount = derived(cartItems, ($items) =>
	$items.reduce((sum, item) => sum + item.quantity, 0)
);

export const cartSubtotal = derived(
	[cartItems],
	([$items]) => {
		return $items.reduce((sum, item) => {
			return sum;
		}, 0);
	}
);

export function calculateCartTotal(
	items: CartItem[],
	products: Map<string, Product>
): {
	subtotal: number;
	total: number;
	itemCount: number;
} {
	let subtotal = 0;
	let itemCount = 0;

	for (const item of items) {
		const product = products.get(item.productId);
		if (product) {
			subtotal += product.price * item.quantity;
			itemCount += item.quantity;
		}
	}

	return {
		subtotal,
		total: subtotal,
		itemCount
	};
}
