import type { Order } from './types';

interface EmailOptions {
	to: string;
	subject: string;
	html: string;
	text?: string;
}

// Mock email service for MVP
// In production, replace with Nodemailer or SendGrid
async function sendEmail(options: EmailOptions): Promise<boolean> {
	try {
		console.log(`📧 Email sent to ${options.to}`);
		console.log(`Subject: ${options.subject}`);
		console.log('---');
		console.log(options.html);
		console.log('---');

		// In production:
		// const nodemailer = require('nodemailer');
		// const transporter = nodemailer.createTransport({...});
		// await transporter.sendMail({
		//   from: process.env.EMAIL_FROM,
		//   to: options.to,
		//   subject: options.subject,
		//   html: options.html,
		//   text: options.text
		// });

		return true;
	} catch (error) {
		console.error('Failed to send email:', error);
		return false;
	}
}

function generateOrderConfirmationEmail(order: Order): { subject: string; html: string } {
	const itemsHtml = order.items
		.map(
			(item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        ${item.productId}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
        ${item.quantity}
      </td>
    </tr>
  `
		)
		.join('');

	const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; }
          .order-details { margin: 20px 0; }
          .order-details h3 { color: #1f2937; margin-top: 0; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          table th { background: #f3f4f6; padding: 12px; text-align: left; border: 1px solid #e5e7eb; }
          table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
          .total { text-align: right; font-weight: bold; font-size: 18px; margin-top: 20px; }
          .footer { background: #f3f4f6; padding: 20px; text-align: center; color: #666; font-size: 12px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #1f2937; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⚓ Pirate King Company</h1>
            <p>Order Confirmation</p>
          </div>

          <div class="content">
            <p>Hi ${order.customer.name},</p>

            <p>Thank you for your order! Your purchase has been confirmed and we're processing it now.</p>

            <div class="order-details">
              <h3>Order Details</h3>
              <p><strong>Order Number:</strong> ${order.id}</p>
              <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Status:</strong> <span style="color: #16a34a;">✓ Confirmed</span></p>
            </div>

            <div class="order-details">
              <h3>Items Ordered</h3>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </div>

            <div class="order-details">
              <h3>Shipping Address</h3>
              <p>
                ${order.shippingAddress.street}<br />
                ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}
              </p>
            </div>

            <div class="total">
              Total Paid: $${order.total.toFixed(2)}
            </div>

            <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-left: 4px solid #3b82f6; border-radius: 4px;">
              <p><strong>What's Next?</strong></p>
              <ul>
                <li>We'll process your order shortly</li>
                <li>You'll receive a shipping notification with tracking info</li>
                <li>Estimated delivery: 5-7 business days</li>
              </ul>
            </div>

            <p style="margin-top: 20px; color: #666;">
              Questions? Contact us at support@piratekingcompany.com
            </p>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} Pirate King Company. All rights reserved.</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

	return {
		subject: `Order Confirmation - ${order.id}`,
		html
	};
}

function generatePaymentReceiptEmail(order: Order): { subject: string; html: string } {
	const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #16a34a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; }
          .receipt-details { margin: 20px 0; background: white; padding: 15px; border-radius: 4px; }
          .total { text-align: right; font-weight: bold; font-size: 24px; margin: 20px 0; color: #16a34a; }
          .footer { background: #f3f4f6; padding: 20px; text-align: center; color: #666; font-size: 12px; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Received</h1>
            <p>✓ Payment Confirmed</p>
          </div>

          <div class="content">
            <p>Hi ${order.customer.name},</p>

            <p>Your payment has been received and processed successfully.</p>

            <div class="receipt-details">
              <h3>Payment Receipt</h3>
              <p><strong>Order ID:</strong> ${order.id}</p>
              <p><strong>Amount Paid:</strong> $${order.total.toFixed(2)}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Status:</strong> <span style="color: #16a34a;">✓ Completed</span></p>
            </div>

            <div class="total">
              $${order.total.toFixed(2)}
            </div>

            <p style="margin-top: 20px; color: #666; background: #f0fdf4; padding: 15px; border-radius: 4px;">
              Your order is now being prepared for shipment. You'll receive tracking information within 24 hours.
            </p>

            <p style="margin-top: 20px; color: #666;">
              Thank you for shopping with Pirate King Company!
            </p>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} Pirate King Company. All rights reserved.</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

	return {
		subject: `Payment Receipt - ${order.id}`,
		html
	};
}

export async function sendOrderConfirmationEmail(order: Order): Promise<boolean> {
	const { subject, html } = generateOrderConfirmationEmail(order);
	return sendEmail({
		to: order.customer.email,
		subject,
		html,
		text: `Order ${order.id} confirmed. Total: $${order.total.toFixed(2)}`
	});
}

export async function sendPaymentReceiptEmail(order: Order): Promise<boolean> {
	const { subject, html } = generatePaymentReceiptEmail(order);
	return sendEmail({
		to: order.customer.email,
		subject,
		html,
		text: `Payment received for order ${order.id}. Amount: $${order.total.toFixed(2)}`
	});
}
