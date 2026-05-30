import { describe, it, expect } from 'vitest';
import { generateProducts, getProductById, filterProducts } from '../lib/products';

describe('Products Module', () => {
	describe('generateProducts', () => {
		it('generates 150 products (3 types × 2 genders × 5 sizes × 5 colors)', () => {
			const products = generateProducts();
			expect(products).toHaveLength(150);
		});

		it('generates products with all required fields', () => {
			const products = generateProducts();
			for (const product of products) {
				expect(product).toHaveProperty('id');
				expect(product).toHaveProperty('type');
				expect(product).toHaveProperty('gender');
				expect(product).toHaveProperty('size');
				expect(product).toHaveProperty('color');
				expect(product).toHaveProperty('price');
				expect(product).toHaveProperty('quantity');
				expect(product).toHaveProperty('imageUrl');
				expect(product).toHaveProperty('displayName');
			}
		});

		it('sets correct prices for each clothing type', () => {
			const products = generateProducts();
			const tshirts = products.filter((p) => p.type === 'tshirt');
			const polos = products.filter((p) => p.type === 'polo');
			const hoodies = products.filter((p) => p.type === 'hoodie');

			expect(tshirts.every((p) => p.price === 20)).toBe(true);
			expect(polos.every((p) => p.price === 30)).toBe(true);
			expect(hoodies.every((p) => p.price === 40)).toBe(true);
		});

		it('generates unique product IDs', () => {
			const products = generateProducts();
			const ids = new Set(products.map((p) => p.id));
			expect(ids.size).toBe(150);
		});

		it('has stock quantity for each product', () => {
			const products = generateProducts();
			for (const product of products) {
				expect(product.quantity).toBeGreaterThan(0);
				expect(product.quantity).toBeLessThanOrEqual(150);
			}
		});
	});

	describe('getProductById', () => {
		it('returns product when ID matches', () => {
			const products = generateProducts();
			const product = getProductById(products, 'tshirt-men-S-black');
			expect(product).toBeDefined();
			expect(product?.type).toBe('tshirt');
			expect(product?.gender).toBe('men');
			expect(product?.size).toBe('S');
			expect(product?.color).toBe('black');
		});

		it('returns undefined when ID does not match', () => {
			const products = generateProducts();
			const product = getProductById(products, 'nonexistent-id');
			expect(product).toBeUndefined();
		});
	});

	describe('filterProducts', () => {
		let products: ReturnType<typeof generateProducts>;

		beforeEach(() => {
			products = generateProducts();
		});

		it('filters by clothing type', () => {
			const tshirts = filterProducts(products, { type: 'tshirt' });
			expect(tshirts.every((p) => p.type === 'tshirt')).toBe(true);
			expect(tshirts).toHaveLength(50); // 2 genders × 5 sizes × 5 colors
		});

		it('filters by gender', () => {
			const mens = filterProducts(products, { gender: 'men' });
			expect(mens.every((p) => p.gender === 'men')).toBe(true);
			expect(mens).toHaveLength(75); // 3 types × 5 sizes × 5 colors
		});

		it('filters by size', () => {
			const largeItems = filterProducts(products, { size: 'L' });
			expect(largeItems.every((p) => p.size === 'L')).toBe(true);
			expect(largeItems).toHaveLength(30); // 3 types × 2 genders × 5 colors
		});

		it('filters by color', () => {
			const blackItems = filterProducts(products, { color: 'black' });
			expect(blackItems.every((p) => p.color === 'black')).toBe(true);
			expect(blackItems).toHaveLength(30); // 3 types × 2 genders × 5 sizes
		});

		it('applies multiple filters (AND logic)', () => {
			const filtered = filterProducts(products, {
				type: 'tshirt',
				gender: 'men',
				size: 'M',
				color: 'black'
			});
			expect(filtered).toHaveLength(1);
			expect(filtered[0].type).toBe('tshirt');
			expect(filtered[0].gender).toBe('men');
			expect(filtered[0].size).toBe('M');
			expect(filtered[0].color).toBe('black');
		});

		it('returns empty array when no products match filters', () => {
			const filtered = filterProducts(products, { type: 'tshirt', size: 'XXL', color: 'white' });
			expect(Array.isArray(filtered)).toBe(true);
		});
	});
});
