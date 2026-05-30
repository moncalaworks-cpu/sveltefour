import { describe, it, expect, beforeEach, vi } from 'vitest';
import { cartItems, cartCount, calculateCartTotal } from '../lib/cart.store';
import type { Product } from '../lib/types';

describe('Cart Store', () => {
	beforeEach(() => {
		cartItems.clear();
		localStorage.clear();
	});

	describe('addItem', () => {
		it('adds a new item to the cart', () => {
			let items: any = [];
			const unsubscribe = cartItems.subscribe((value) => {
				items = value;
			});

			cartItems.addItem('tshirt-men-S-black');
			expect(items).toHaveLength(1);
			expect(items[0].productId).toBe('tshirt-men-S-black');
			expect(items[0].quantity).toBe(1);
			unsubscribe();
		});

		it('increases quantity if item already exists', () => {
			let items: any = [];
			const unsubscribe = cartItems.subscribe((value) => {
				items = value;
			});

			cartItems.addItem('tshirt-men-S-black');
			cartItems.addItem('tshirt-men-S-black', 2);

			expect(items).toHaveLength(1);
			expect(items[0].quantity).toBe(3);
			unsubscribe();
		});

		it('saves to localStorage', () => {
			const unsubscribe = cartItems.subscribe(() => {});
			cartItems.addItem('tshirt-men-S-black');
			const stored = localStorage.getItem('pirate-king-cart');
			expect(stored).toBeTruthy();
			const parsed = JSON.parse(stored!);
			expect(parsed).toHaveLength(1);
			expect(parsed[0].productId).toBe('tshirt-men-S-black');
			unsubscribe();
		});
	});

	describe('removeItem', () => {
		it('removes item from cart', () => {
			let items: any = [];
			const unsubscribe = cartItems.subscribe((value) => {
				items = value;
			});

			cartItems.addItem('tshirt-men-S-black');
			cartItems.addItem('polo-women-M-white');
			expect(items).toHaveLength(2);

			cartItems.removeItem('tshirt-men-S-black');
			expect(items).toHaveLength(1);
			expect(items[0].productId).toBe('polo-women-M-white');
			unsubscribe();
		});

		it('saves to localStorage after removal', () => {
			const unsubscribe = cartItems.subscribe(() => {});
			cartItems.addItem('tshirt-men-S-black');
			cartItems.addItem('polo-women-M-white');
			cartItems.removeItem('tshirt-men-S-black');

			const stored = JSON.parse(localStorage.getItem('pirate-king-cart')!);
			expect(stored).toHaveLength(1);
			unsubscribe();
		});
	});

	describe('updateQuantity', () => {
		it('updates quantity of existing item', () => {
			let items: any = [];
			const unsubscribe = cartItems.subscribe((value) => {
				items = value;
			});

			cartItems.addItem('tshirt-men-S-black', 2);
			cartItems.updateQuantity('tshirt-men-S-black', 5);

			expect(items[0].quantity).toBe(5);
			unsubscribe();
		});

		it('removes item if quantity is 0', () => {
			let items: any = [];
			const unsubscribe = cartItems.subscribe((value) => {
				items = value;
			});

			cartItems.addItem('tshirt-men-S-black');
			cartItems.updateQuantity('tshirt-men-S-black', 0);

			expect(items).toHaveLength(0);
			unsubscribe();
		});

		it('removes item if quantity is negative', () => {
			let items: any = [];
			const unsubscribe = cartItems.subscribe((value) => {
				items = value;
			});

			cartItems.addItem('tshirt-men-S-black');
			cartItems.updateQuantity('tshirt-men-S-black', -1);

			expect(items).toHaveLength(0);
			unsubscribe();
		});
	});

	describe('clear', () => {
		it('empties the cart', () => {
			let items: any = [];
			const unsubscribe = cartItems.subscribe((value) => {
				items = value;
			});

			cartItems.addItem('tshirt-men-S-black');
			cartItems.addItem('polo-women-M-white');
			expect(items).toHaveLength(2);

			cartItems.clear();
			expect(items).toHaveLength(0);
			unsubscribe();
		});

		it('clears localStorage', () => {
			const unsubscribe = cartItems.subscribe(() => {});
			cartItems.addItem('tshirt-men-S-black');
			cartItems.clear();

			const stored = localStorage.getItem('pirate-king-cart');
			expect(stored).toBeNull();
			unsubscribe();
		});
	});

	describe('cartCount derived store', () => {
		it('calculates total item count', () => {
			let count: number = 0;
			const countUnsub = cartCount.subscribe((value) => {
				count = value;
			});
			const itemsUnsub = cartItems.subscribe(() => {});

			cartItems.addItem('tshirt-men-S-black', 2);
			expect(count).toBe(2);

			cartItems.addItem('polo-women-M-white', 3);
			expect(count).toBe(5);

			cartItems.removeItem('tshirt-men-S-black');
			expect(count).toBe(3);

			countUnsub();
			itemsUnsub();
		});
	});

	describe('calculateCartTotal', () => {
		it('calculates subtotal and item count', () => {
			const products = new Map<string, any>([
				['tshirt-men-S-black', { price: 20, quantity: 50 }],
				['polo-women-M-white', { price: 30, quantity: 40 }]
			]);

			const items = [
				{ productId: 'tshirt-men-S-black', quantity: 2, addedAt: new Date() },
				{ productId: 'polo-women-M-white', quantity: 1, addedAt: new Date() }
			];

			const total = calculateCartTotal(items, products);
			expect(total.subtotal).toBe(70); // (20 * 2) + (30 * 1)
			expect(total.total).toBe(70); // No tax for MVP
			expect(total.itemCount).toBe(3);
		});

		it('handles missing products gracefully', () => {
			const products = new Map<string, any>([
				['tshirt-men-S-black', { price: 20, quantity: 50 }]
			]);

			const items = [
				{ productId: 'tshirt-men-S-black', quantity: 2, addedAt: new Date() },
				{ productId: 'nonexistent', quantity: 5, addedAt: new Date() } // Not in products map
			];

			const total = calculateCartTotal(items, products);
			expect(total.subtotal).toBe(40); // Only counts existing product
			expect(total.itemCount).toBe(2); // Counts all items
		});

		it('returns zero totals for empty cart', () => {
			const products = new Map<string, any>();
			const items: any[] = [];

			const total = calculateCartTotal(items, products);
			expect(total.subtotal).toBe(0);
			expect(total.total).toBe(0);
			expect(total.itemCount).toBe(0);
		});
	});
});
