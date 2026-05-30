# SvelteFour - Pirate King Shopping Cart
**Project Overview for Obsidian**

## 🎯 Project Goal
Build an MVP e-commerce shopping cart for **Pirate King Company**, a t-shirt retailer, enabling customers to browse products, add to cart, and complete guest checkout with credit card payments.

**Launch Date:** 2-3 weeks (ASAP)

---

## 📦 Product Catalog

### Specifications
- **150 SKUs** total inventory
  - 3 clothing types: T-Shirt ($20), Polo ($30), Hoodie ($40)
  - 2 genders: Men's, Women's
  - 5 sizes: S, M, L, XL, XXL
  - 5 colors: Black, White, Dark Blue, Khaki, Pink

### Pricing Model
- Fixed price per clothing type (no size/color premiums)
- No promotional codes, no bulk discounts (MVP)
- No tax calculation (MVP)

### Inventory
- Managed via CSV upload (spreadsheet for now)
- PostgreSQL deferred to v1.1
- Admin can upload `inventory.csv` to update stock levels

---

## 🛒 Core Features

### 1. Product Browsing
- Grid layout with 150 product thumbnails
- Filterable by: Type, Gender, Size, Color
- Responsive (mobile/tablet/desktop)
- Product detail modal with size/color/qty selectors

### 2. Shopping Cart
- Persistent cart (localStorage)
- Add/remove/update quantity
- Real-time cart count in navbar
- Cart summary: items, subtotal, total

### 3. Guest Checkout
- No account creation required
- Customer info: Email, Name, Address
- Order saved for fulfillment
- In-house shipping (Pirate King prints label manually)

### 4. Payment (Stripe)
- Credit Card only (MVP)
- Stripe Elements for secure payment
- No PayPal/Apple Pay yet (v1.1)
- Test mode for MVP, production keys for launch

### 5. Order Confirmation
- Confirmation page with order details
- Confirmation email + payment receipt
- Email sent to customer with items, total, shipping address

### 6. Admin - Inventory
- CSV upload form (`/admin/inventory`)
- Parse and update product quantities
- Display current stock levels

---

## 🏗️ Tech Stack

### Frontend
- **SvelteKit** 2.57.0
- **Svelte** 5.55.2 (runes mode)
- **TypeScript** strict mode
- **Tailwind CSS**

### Backend/Services
- **Stripe API** for payments
- **Nodemailer/SendGrid** for emails (TBD)
- **CSV parsing** (browser-based for MVP)
- **localStorage** for cart persistence

### Testing
- **Vitest** - unit tests
- **Playwright** - E2E tests
- **80%+ coverage target**

### Deployment
- **Vercel** (already configured)
- **Node.js 24 LTS**
- Environment variables for API keys

---

## 📊 Implementation Phases

### Phase 1: Core Setup (Days 1-2)
**Status:** 🟢 IN PROGRESS

Core data structures, product generation, cart store, Stripe integration.

**Deliverables:**
- ✅ Product types (Type, Gender, Size, Color, Price, Quantity)
- ✅ Sample product generation (150 SKUs)
- ✅ Cart store with localStorage persistence
- ✅ Cart add/remove/update operations
- ✅ 27 unit tests passing
- **Next:** ProductGrid component, Stripe keys

**Files Created:**
- `src/lib/types.ts` - Type definitions
- `src/lib/products.ts` - Product data loader & filters
- `src/lib/cart.store.ts` - Svelte cart store
- `src/__tests__/products.test.ts` - 13 tests
- `src/__tests__/cart.store.test.ts` - 14 tests

### Phase 2: Shopping Experience (Days 3-5)
**Status:** 🔴 NOT STARTED

Product browsing UI, cart page, checkout form.

**Deliverables:**
- ProductGrid component with filters
- ProductCard with size/color/qty selectors
- Cart page (`/cart`)
- Checkout form (`/checkout`)
- Cart persists across page refreshes

### Phase 3: Payment & Emails (Days 6-8)
**Status:** 🔴 NOT STARTED

Stripe integration, order creation, email confirmations.

**Deliverables:**
- Stripe payment element
- Payment processing API
- Order creation & validation
- Email service setup
- Confirmation + receipt emails
- Webhook handling

### Phase 4: Admin & Inventory (Days 9-10)
**Status:** 🔴 NOT STARTED

CSV upload, inventory management.

**Deliverables:**
- CSV upload form
- CSV parser
- Stock level display
- Order export

### Phase 5: Testing & Polish (Days 11-14)
**Status:** 🔴 NOT STARTED

Comprehensive testing, documentation.

**Deliverables:**
- Unit tests (80%+ coverage)
- E2E tests (full checkout flow)
- Manual testing
- Admin documentation
- Fulfillment guide

---

## 📁 Directory Structure

```
src/
├── lib/
│   ├── types.ts              # Type definitions
│   ├── products.ts           # Product data & filters
│   ├── cart.store.ts         # Cart state management
│   ├── stripe.server.ts      # (upcoming) Stripe API
│   ├── email.server.ts       # (upcoming) Email templates
│   └── order.ts              # (upcoming) Order types
│
├── routes/
│   ├── products/
│   │   ├── +page.svelte      # (upcoming) Product grid
│   │   └── [productId]/+page.svelte
│   ├── cart/
│   │   └── +page.svelte      # (upcoming) Cart page
│   ├── checkout/
│   │   ├── +page.svelte      # (upcoming) Checkout form
│   │   └── +server.ts        # (upcoming) Payment endpoint
│   └── confirmation/
│       └── +page.svelte      # (upcoming) Order confirmation
│
├── components/
│   ├── ProductGrid.svelte    # (upcoming)
│   ├── ProductCard.svelte    # (upcoming)
│   └── StripePaymentElement.svelte # (upcoming)
│
└── __tests__/
    ├── products.test.ts      # 13 tests ✅
    ├── cart.store.test.ts    # 14 tests ✅
    └── (more tests to come)
```

---

## 🧪 Testing Status

### Unit Tests
- ✅ **Products Module**: 13 tests
  - Product generation (150 SKUs)
  - Filtering (type, gender, size, color)
  - Unique IDs, pricing, stock levels

- ✅ **Cart Store**: 14 tests
  - Add/remove/update items
  - localStorage persistence
  - Cart count calculations
  - Empty cart handling

**Total:** 27 tests passing, 0 failing

### E2E Tests
- 🔴 Not started (planned for Phase 5)

### Coverage Target
- 80%+ (per CLAUDE.md)

---

## 🚀 GitHub Project Board

**Project:** [SvelteFour - Pirate King Shopping Cart](https://github.com/orgs/moncalaworks-cpu/projects/7)

**Issues:**
1. [Phase 1: Core Setup](https://github.com/moncalaworks-cpu/sveltefour/issues/1)
2. [Phase 2: Shopping Experience](https://github.com/moncalaworks-cpu/sveltefour/issues/2)
3. [Phase 3: Payment & Emails](https://github.com/moncalaworks-cpu/sveltefour/issues/3)
4. [Phase 4: Admin & Inventory](https://github.com/moncalaworks-cpu/sveltefour/issues/4)
5. [Phase 5: Testing & Polish](https://github.com/moncalaworks-cpu/sveltefour/issues/5)

---

## ❓ Open Questions / TBD

- **Email Service**: Nodemailer (SMTP) or SendGrid API?
  - Customer needs to provide credentials
- **Product Images**: Placeholder dimensions/format TBD
  - Real images provided by Pirate King
- **Order Export**: Auto-export to CSV or manual?
- **Shipping Cost**: Free, fixed fee, or calculated?
- **Currency**: USD only for MVP?

---

## 📅 Timeline

| Phase | Days | Status | Deadline |
|-------|------|--------|----------|
| 1. Core Setup | 1-2 | 🟢 IN PROGRESS | June 1 |
| 2. Shopping UI | 3-5 | 🔴 Upcoming | June 4 |
| 3. Payment & Email | 6-8 | 🔴 Upcoming | June 7 |
| 4. Admin & Inventory | 9-10 | 🔴 Upcoming | June 9 |
| 5. Testing & Docs | 11-14 | 🔴 Upcoming | June 13 |

---

## ✅ Success Criteria

MVP launches when:
- [ ] All 6 features complete
- [ ] 80%+ test coverage
- [ ] E2E tests passing
- [ ] Type checking passes
- [ ] Manual testing complete
- [ ] Admin documentation written
- [ ] Fulfillment guide created

---

## 🔗 Related Documents

- **[Acceptance Criteria](./ACCEPTANCE_CRITERIA.md)** - Detailed AC for each feature
- **[Implementation Plan](../plans/generic-puzzling-squirrel.md)** - Full architecture & design
- **[CLAUDE.md](../CLAUDE.md)** - Project instructions for Claude Code

---

**Last Updated:** 2026-05-30  
**Owner:** KenS  
**GitHub Repo:** https://github.com/moncalaworks-cpu/sveltefour
