import { json, error } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import type { RequestHandler } from '@sveltejs/kit';
import type { CartItem, Order } from '$lib/types';
import { generateProducts } from '$lib/products';
import { sendOrderConfirmationEmail } from '$lib/email.server';

// Store orders in memory (for MVP - replace with database in production)
const orders = new Map<string, Order>();

interface CheckoutRequest {
	email: string;
	name: string;
	street: string;
	city: string;
	state: string;
	zip: string;
	items: CartItem[];
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body: CheckoutRequest = await request.json();

		// Validate input
		if (!body.email || !body.name || !body.street || !body.city || !body.state || !body.zip) {
			return error(400, { message: 'Missing required fields' });
		}

		if (!body.items || body.items.length === 0) {
			return error(400, { message: 'Cart is empty' });
		}

		// Generate products to get pricing
		const allProducts = generateProducts();
		const productMap = new Map(allProducts.map((p) => [p.id, p]));

		// Calculate totals
		let subtotal = 0;
		for (const item of body.items) {
			const product = productMap.get(item.productId);
			if (product) {
				subtotal += product.price * item.quantity;
			}
		}

		// For MVP: No shipping or taxes
		const total = subtotal;

		// Create order
		const orderId = `PKC-${Date.now()}-${uuidv4().substring(0, 8).toUpperCase()}`;

		const order: Order = {
			id: orderId,
			customer: {
				email: body.email,
				name: body.name
			},
			shippingAddress: {
				street: body.street,
				city: body.city,
				state: body.state,
				zip: body.zip
			},
			items: body.items,
			subtotal,
			total,
			paymentStatus: 'pending',
			stripePaymentIntentId: '', // Will be set after Stripe integration
			createdAt: new Date()
		};

		// Store order
		orders.set(orderId, order);

		// Send confirmation email (async, don't wait for it)
		sendOrderConfirmationEmail(order).catch((err) => {
			console.error('Failed to send confirmation email:', err);
		});

		// For now, return the order ID and amounts
		// In Phase 3, we'll create a Stripe PaymentIntent here
		return json({
			success: true,
			orderId,
			amount: Math.round(total * 100), // Stripe uses cents
			customer: {
				name: body.name,
				email: body.email
			}
		});
	} catch (err) {
		console.error('Checkout error:', err);
		return error(500, { message: 'Checkout failed' });
	}
}
