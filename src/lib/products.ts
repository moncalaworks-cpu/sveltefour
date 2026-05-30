import type { Product, ClothingType, Gender, Size, Color } from './types';

const CLOTHING_TYPES: { type: ClothingType; name: string; basePrice: number }[] = [
	{ type: 'tshirt', name: 'T-Shirt', basePrice: 20 },
	{ type: 'polo', name: 'Polo', basePrice: 30 },
	{ type: 'hoodie', name: 'Hoodie', basePrice: 40 }
];

const GENDERS: Gender[] = ['men', 'women'];
const SIZES: Size[] = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS: Color[] = ['black', 'white', 'darkblue', 'khaki', 'pink'];

export function generateProducts(): Product[] {
	const products: Product[] = [];
	let id = 1;

	for (const { type, name, basePrice } of CLOTHING_TYPES) {
		for (const gender of GENDERS) {
			for (const size of SIZES) {
				for (const color of COLORS) {
					const productId = `${type}-${gender}-${size}-${color}`;
					products.push({
						id: productId,
						type,
						gender,
						size,
						color,
						price: basePrice,
						quantity: 50 + Math.floor(Math.random() * 100),
						imageUrl: `/placeholder-${size}-${color}.jpg`,
						displayName: `${name} - ${gender.charAt(0).toUpperCase() + gender.slice(1)} - Size ${size}`
					});
					id++;
				}
			}
		}
	}

	return products;
}

export function getProductById(products: Product[], id: string): Product | undefined {
	return products.find((p) => p.id === id);
}

export function filterProducts(
	products: Product[],
	filters: {
		type?: ClothingType;
		gender?: Gender;
		size?: Size;
		color?: Color;
	}
): Product[] {
	return products.filter((product) => {
		if (filters.type && product.type !== filters.type) return false;
		if (filters.gender && product.gender !== filters.gender) return false;
		if (filters.size && product.size !== filters.size) return false;
		if (filters.color && product.color !== filters.color) return false;
		return true;
	});
}

export function getUniqueValues(products: Product[], field: keyof Product): (string | number)[] {
	const values = new Set<string | number>();
	for (const product of products) {
		values.add(product[field] as string | number);
	}
	return Array.from(values).sort();
}
