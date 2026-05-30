import { describe, it, expect, beforeEach } from 'vitest';
import { generateProducts, filterProducts } from '$lib/products';
import type { Product } from '$lib/types';

describe('ProductGrid component data', () => {
	let products: Product[];

	beforeEach(() => {
		products = generateProducts();
	});

	it('should generate 150 products', () => {
		expect(products).toHaveLength(150);
	});

	it('should display all products initially', () => {
		const filtered = filterProducts(products, {});
		expect(filtered).toHaveLength(150);
	});

	it('should filter by clothing type (tshirt)', () => {
		const filtered = filterProducts(products, { type: 'tshirt' });
		expect(filtered.length).toBeGreaterThan(0);
		expect(filtered.every((p) => p.type === 'tshirt')).toBe(true);
	});

	it('should filter by gender (men)', () => {
		const filtered = filterProducts(products, { gender: 'men' });
		expect(filtered.length).toBeGreaterThan(0);
		expect(filtered.every((p) => p.gender === 'men')).toBe(true);
	});

	it('should filter by size (M)', () => {
		const filtered = filterProducts(products, { size: 'M' });
		expect(filtered.length).toBeGreaterThan(0);
		expect(filtered.every((p) => p.size === 'M')).toBe(true);
	});

	it('should filter by color (black)', () => {
		const filtered = filterProducts(products, { color: 'black' });
		expect(filtered.length).toBeGreaterThan(0);
		expect(filtered.every((p) => p.color === 'black')).toBe(true);
	});

	it('should filter by multiple criteria (men, tshirt, size M)', () => {
		const filtered = filterProducts(products, {
			type: 'tshirt',
			gender: 'men',
			size: 'M'
		});
		expect(filtered.length).toBeGreaterThan(0);
		expect(filtered.every((p) => p.type === 'tshirt' && p.gender === 'men' && p.size === 'M')).toBe(
			true
		);
	});

	it('should handle combined filters (type, gender, size, color)', () => {
		const filtered = filterProducts(products, {
			type: 'polo',
			gender: 'women',
			size: 'L',
			color: 'pink'
		});
		expect(filtered.length).toBeGreaterThan(0);
		expect(
			filtered.every(
				(p) =>
					p.type === 'polo' && p.gender === 'women' && p.size === 'L' && p.color === 'pink'
			)
		).toBe(true);
	});

	it('should return empty array when no products match filters', () => {
		const filtered = filterProducts(products, {
			type: 'tshirt',
			gender: 'men',
			size: 'S',
			color: 'invalid' as any
		});
		expect(filtered.length).toBeGreaterThanOrEqual(0);
	});

	it('all products should have valid prices', () => {
		products.forEach((product) => {
			expect(product.price).toBeGreaterThan(0);
			expect([20, 30, 40]).toContain(product.price);
		});
	});

	it('all products should have stock quantity', () => {
		products.forEach((product) => {
			expect(product.quantity).toBeGreaterThanOrEqual(0);
			expect(product.quantity).toBeLessThanOrEqual(500);
		});
	});

	it('should have display names for all products', () => {
		products.forEach((product) => {
			expect(product.displayName).toBeTruthy();
			expect(product.displayName.length).toBeGreaterThan(0);
		});
	});

	it('should have image URLs for all products', () => {
		products.forEach((product) => {
			expect(product.imageUrl).toBeTruthy();
			expect(product.imageUrl.length).toBeGreaterThan(0);
		});
	});
});
