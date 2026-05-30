export type ClothingType = 'tshirt' | 'polo' | 'hoodie';
export type Gender = 'men' | 'women';
export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type Color = 'black' | 'white' | 'darkblue' | 'khaki' | 'pink';

export interface Product {
	id: string;
	type: ClothingType;
	gender: Gender;
	size: Size;
	color: Color;
	price: number;
	quantity: number;
	imageUrl: string;
	displayName: string;
}

export interface CartItem {
	productId: string;
	quantity: number;
	addedAt: Date;
}

export interface Order {
	id: string;
	customer: {
		name: string;
		email: string;
	};
	shippingAddress: {
		street: string;
		city: string;
		state: string;
		zip: string;
	};
	items: CartItem[];
	subtotal: number;
	total: number;
	paymentStatus: 'pending' | 'succeeded' | 'failed';
	stripePaymentIntentId: string;
	createdAt: Date;
}
