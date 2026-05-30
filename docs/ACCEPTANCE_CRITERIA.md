# Pirate King Company Shopping Cart - Acceptance Criteria

## MVP Overview
A functional e-commerce shopping cart for Pirate King Company t-shirts, polos, and hoodies. Guest checkout with Stripe credit card payments, order confirmation emails, and CSV-based inventory management.

---

## Feature 1: Product Browsing

### Acceptance Criteria
- [ ] **Browse Products**: Display all 150 SKUs in a grid layout
  - 3 clothing types (t-shirts, polos, hoodies)
  - 2 genders (men's, women's)
  - 5 sizes (S, M, L, XL, XXL)
  - 5 colors (black, white, dark blue, khaki, pink)

- [ ] **Responsive Design**: Works on mobile, tablet, desktop
  - Mobile: 1-2 columns
  - Tablet: 2-3 columns
  - Desktop: 3-4 columns

- [ ] **Filters**: User can filter by:
  - Clothing type (t-shirt, polo, hoodie)
  - Gender (men's, women's)
  - Size (S, M, L, XL, XXL)
  - Color (black, white, dark blue, khaki, pink)

- [ ] **Product Card Display**:
  - Product image (placeholder or real)
  - Product name (type + gender + size)
  - Price
  - Stock status (in stock / out of stock)
  - "Add to Cart" button

- [ ] **Product Detail**:
  - Larger image
  - Size selector (disabled if out of stock)
  - Color selector (disabled if out of stock)
  - Quantity input (1-50)
  - Price display
  - "Add to Cart" button with toast confirmation

---

## Feature 2: Shopping Cart

### Acceptance Criteria
- [ ] **Cart Persistence**: Cart saved to localStorage, survives page refresh
  - Cart retained across browser sessions
  - Cart cleared only on checkout success or manual clear

- [ ] **View Cart**: Dedicated cart page at `/cart` shows:
  - List of items (product image, name, size, color, quantity)
  - Unit price per item
  - Subtotal per item
  - Total price
  - "Update Quantity" buttons (±, input)
  - "Remove" button per item
  - "Proceed to Checkout" button
  - "Continue Shopping" button

- [ ] **Cart Icon**: Navbar shows item count (e.g., "🛒 3 items")
  - Updates in real-time as items added/removed
  - Clickable → navigates to `/cart`

- [ ] **Add to Cart**:
  - Toast notification "Added X to cart"
  - Cart icon updates immediately
  - User can add same product in different sizes/colors as separate items

- [ ] **Empty Cart**: Message "Your cart is empty" with "Continue Shopping" link

---

## Feature 3: Guest Checkout (No Account)

### Acceptance Criteria
- [ ] **Checkout Page** (`/checkout`):
  - Email input (required, valid email format)
  - Name input (required)
  - Shipping address:
    - Street (required)
    - City (required)
    - State (required, US states dropdown)
    - ZIP code (required, 5 digits)
  - Billing address:
    - Checkbox "Same as shipping"
    - Full address form if checked "Different billing"
  - Order summary (items, subtotal, total)

- [ ] **Form Validation**:
  - Required fields marked with *
  - Error messages for invalid inputs
  - Email format validated
  - ZIP code format validated

- [ ] **No Account Creation**:
  - User is NOT asked to create password/login
  - No account confirmation email
  - Order confirmation email sent directly

---

## Feature 4: Payment Processing (Stripe)

### Acceptance Criteria
- [ ] **Stripe Integration**:
  - Payment form accepts credit cards (Visa, Mastercard, Amex)
  - Secure card element (no card details touch server)
  - Real-time card validation
  - Displays "Processing..." during payment

- [ ] **Payment Success**:
  - Order created with unique order number (e.g., PKC-20260530-001)
  - Customer charged correct amount
  - Redirect to confirmation page
  - Order confirmation email sent

- [ ] **Payment Failure**:
  - Error message displayed ("Payment declined", etc.)
  - Cart retained (not cleared)
  - User can retry payment

- [ ] **Test Mode**:
  - MVP uses Stripe test mode
  - Stripe test card: 4242 4242 4242 4242
  - Expiry: any future date
  - CVC: any 3 digits

---

## Feature 5: Order Confirmation & Email

### Acceptance Criteria
- [ ] **Confirmation Page** (`/confirmation`):
  - "Order Confirmed" heading
  - Order number
  - Order date/time
  - Items ordered (product name, size, color, qty, price per unit, subtotal)
  - Subtotal
  - Total paid
  - Shipping address
  - Estimated delivery (optional for MVP)
  - "Back to Shop" button

- [ ] **Confirmation Email**:
  - Sent to customer email
  - Contains all above information
  - Professional formatting
  - From address: orders@piratekingcompany.com (or specified)

- [ ] **Receipt Email**:
  - Confirms payment received
  - Amount charged
  - Card last 4 digits
  - Transaction/receipt number
  - Customer service contact info

---

## Feature 6: Admin - Inventory Management

### Acceptance Criteria
- [ ] **CSV Upload** (`/admin/inventory`):
  - Upload form accepts `.csv` files
  - CSV format: Type, Gender, Size, Color, Quantity
  - Example:
    ```
    tshirt,men,S,black,50
    tshirt,men,S,white,30
    polo,women,M,khaki,25
    ```

- [ ] **CSV Parsing**:
  - Validates CSV format
  - Error message if invalid rows
  - Skips header row
  - Updates product quantities

- [ ] **Upload Confirmation**:
  - "Inventory updated successfully"
  - Shows number of products updated
  - Displays before/after quantity for each SKU

- [ ] **Inventory Levels**:
  - Display current stock for all 150 SKUs
  - Searchable by product type/name
  - Shows: Type, Gender, Size, Color, Current Qty

- [ ] **Out of Stock**:
  - Products with qty 0 marked "Out of Stock"
  - Size/color unavailable in product browsing
  - "Notify Me" button (optional for MVP)

---

## Technical Acceptance Criteria

### Performance
- [ ] Page load time < 3 seconds (mobile 4G)
- [ ] Cart operations instant (< 100ms)
- [ ] Checkout form interactive (no lag on input)
- [ ] Stripe payment form loads < 2 seconds

### Code Quality
- [ ] TypeScript strict mode enabled
- [ ] No TypeScript errors (`npm run check` passes)
- [ ] 80%+ test coverage
- [ ] All unit tests pass (`npm run test`)
- [ ] E2E tests cover happy path (`npm run test:e2e`)

### Security
- [ ] No card details stored or logged
- [ ] Stripe Elements for secure payment
- [ ] HTTPS enforced (Vercel default)
- [ ] Environment variables for API keys (no hardcoded keys)
- [ ] Form inputs sanitized

### Browser Support
- [ ] Chrome/Edge (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Mobile browsers (iOS Safari, Android Chrome)

### Accessibility
- [ ] Form labels associated with inputs
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation functional
- [ ] Error messages clear and visible

---

## Launch Checklist

### Before Production
- [ ] All acceptance criteria met
- [ ] Stripe keys switched from test to production
- [ ] Email service configured and tested
- [ ] CSV template created and documented
- [ ] Admin documentation written (how to upload CSV, process orders)
- [ ] Fulfillment guide created (how to access orders, print labels)
- [ ] Analytics configured (Vercel Analytics enabled)
- [ ] Domain HTTPS verified
- [ ] Manual testing completed (all browsers/devices)

### Post-Launch Support
- [ ] Monitor Stripe webhook health
- [ ] Monitor email delivery
- [ ] Track order volume
- [ ] Gather customer feedback
- [ ] Plan v1.1 (PayPal, Apple Pay, etc.)

---

## Success Metrics

✅ MVP is "done" when:
1. All 6 features complete
2. 80%+ test coverage
3. E2E tests pass
4. Type checking passes
5. Build succeeds
6. Manual testing confirms all flows work
7. Documentation ready for operations team
