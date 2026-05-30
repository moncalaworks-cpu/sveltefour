# Security and Legal Compliance - Pirate King Shopping Cart

**IMPORTANT:** This document covers security best practices and legal requirements for handling payment and customer data. This is NOT a substitute for professional legal and security advice. Consult with legal counsel and security experts before launching.

---

## 🔒 Payment Card Security (PCI DSS 4.0 - 2025)

### Overview

The Payment Card Industry Data Security Standard (PCI DSS) is mandatory for any business accepting credit card payments. As of **April 1, 2025**, the enhanced PCI DSS 4.0 requirements are fully enforceable.

### Key Principles: Never Handle Raw Card Data

**🚨 CRITICAL RULE: Never store, log, or transmit raw credit card numbers, CVV, or expiration dates through your servers.**

Using Stripe's payment infrastructure ensures your PCI DSS scope is minimal because:
- Card data never touches your servers
- Stripe handles tokenization securely
- You only handle token IDs, not card details
- Stripe is PCI Level 1 certified (highest level)

### PCI DSS 4.0 Requirements for Our MVP

#### 1. **Multi-Factor Authentication (MFA)**
- ✅ Required for ALL access to sensitive systems
- ✅ Admin dashboard must require MFA
- ✅ Not optional anymore (was "best practice" in 3.2.1)

**Implementation:**
```typescript
// Example: Admin login should require 2FA
// - Email + password
// - + TOTP app (Google Authenticator, Authy)
// - OR SMS code
```

#### 2. **Authentication & Access Control**
- ✅ 12-character minimum passwords with complexity
  - Uppercase + lowercase + numbers + symbols
- ✅ Password expiration every 90 days
- ✅ Role-based access control (RBAC)
  - Admin: full access
  - Fulfillment: read orders only
  - Viewer: analytics only

#### 3. **Encryption in Transit**
- ✅ HTTPS/TLS 1.2 or higher (Vercel handles this)
- ✅ All API calls use HTTPS
- ✅ No HTTP fallback

#### 4. **Stripe Payment Processing**
- ✅ Use **Stripe Elements** or **Stripe Checkout**
  - Card form renders directly on your page via iframe
  - Card data never reaches your servers
  - Stripe tokenizes and returns a token
- ✅ Never use `card` field directly
- ✅ Always use `PaymentIntent` for payment processing

**Implementation:**
```typescript
// ✅ CORRECT: Use Stripe Elements (card form in iframe)
import { loadStripe } from '@stripe/js';
const stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
const elements = stripe.elements();
const cardElement = elements.create('card');
// Card data never touches your server

// ❌ WRONG: Never do this
const cardNumber = await getCardNumber(); // NEVER!
const response = await stripe.charges.create({
  amount: 1000,
  currency: 'usd',
  source: cardNumber // WRONG - card data on your server!
});
```

#### 5. **Data Protection & Encryption**
- ✅ Personal data (email, address) encrypted at rest
- ✅ Database encryption enabled
- ✅ Environment variables for API keys (no hardcoded keys)
- ✅ Sensitive logs redacted (no credit card details ever logged)

#### 6. **Monitoring & Logging**
- ✅ Quarterly vulnerability scans with Approved Scanning Vendor (ASV)
- ✅ Annual penetration testing
- ✅ Monitor failed login attempts
- ✅ Log all access to sensitive systems
- ✅ Alert on suspicious activity

#### 7. **Incident Response Plan**
- ✅ Document procedures for data breach
- ✅ Have contact list ready (security team, legal, Stripe)
- ✅ Timeline: Notify affected customers within 30 days
- ✅ Notify Stripe immediately if compromise suspected

### PCI DSS 4.0 2025 Changes Affecting Us

| Requirement | Old (3.2.1) | New (4.0) | Impact |
|---|---|---|---|
| MFA | Admin only, optional | All access, mandatory | ✅ Add 2FA to admin |
| Risk Analysis | Annual | Continuous (Targeted) | ✅ Monthly security reviews |
| Web App Security | Annual testing | Continuous testing | ✅ Enable WAF on Vercel |
| Script Controls | Not applicable | Track all JS on payment page | ✅ Audit third-party scripts |
| Password Length | 7 characters | 12 characters | ✅ Enforce in admin |

**References:**
- [PCI DSS 4.0 Facts and Compliance Insights 2025](https://www.clearlypayments.com/blog/pci-dss-4-0-facts-and-compliance-insights-in-2025/)
- [PCI DSS Quick Reference Guide](https://www.pcisecuritystandards.org/documents/PCIDSS_QRGv3_1.pdf)
- [Stripe's PCI DSS Compliance Guide](https://stripe.com/guides/pci-compliance)

---

## 🛡️ Stripe-Specific Security Best Practices

### 1. Never Store Raw Card Data
```typescript
// ❌ NEVER do this:
const order = {
  customer: 'John Doe',
  cardNumber: '4242 4242 4242 4242', // WRONG!
  cvv: '123',
  email: 'john@example.com'
};
await db.orders.save(order);

// ✅ CORRECT: Use Stripe tokenization
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  payment_method: stripeToken, // Token from Stripe Elements
  receipt_email: 'john@example.com'
});

const order = {
  customer: 'John Doe',
  stripePaymentIntentId: paymentIntent.id, // Store ID, not card data
  email: 'john@example.com'
};
await db.orders.save(order);
```

### 2. Handle Sensitive Data with Care
```typescript
// ✅ Safe logging: redact sensitive fields
function sanitizeOrderForLogging(order: Order) {
  return {
    ...order,
    stripePaymentIntentId: order.stripePaymentIntentId.substring(0, 10) + '...',
    customer: {
      ...order.customer,
      email: order.customer.email.replace(/(.{2})(.*)(.{2})@/, '$1***$3@') // email@*** format
    }
  };
}
console.log('Order created:', sanitizeOrderForLogging(order));

// ❌ NEVER log this:
console.log('Card token:', cardToken); // If it contains raw card data
```

### 3. Webhooks for Payment Events
```typescript
// ✅ Listen to Stripe webhooks, not client events
// POST /api/webhooks/stripe
import { stripe } from '$lib/stripe.server';

export async function POST({ request }) {
  const signature = request.headers.get('stripe-signature');
  
  const event = stripe.webhooks.constructEvent(
    await request.text(),
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    // Verify payment in database
    const order = await db.orders.findByPaymentIntentId(paymentIntent.id);
    if (order) {
      order.paymentStatus = 'succeeded';
      await db.orders.update(order);
      await sendConfirmationEmail(order);
    }
  }

  return new Response('OK', { status: 200 });
}
```

### 4. Environment Variables for API Keys
```bash
# .env (NEVER commit this)
STRIPE_PUBLIC_KEY=pk_test_... # Safe to expose (test mode)
STRIPE_SECRET_KEY=sk_test_... # SECRET - server-side only
STRIPE_WEBHOOK_SECRET=whsec_... # SECRET - server-side only

# .env.example (commit this, no values)
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

**References:**
- [Stripe Security Documentation](https://docs.stripe.com/security)
- [Stripe Integration Security Guide](https://docs.stripe.com/security/guide)
- [Demystifying PCI Compliance for Stripe](https://moldstud.com/articles/p-demystifying-pci-compliance-for-stripe-expert-tips-and-advice-to-ensure-security)

---

## 📋 Data Privacy & GDPR Compliance (2025)

### GDPR Scope

**If you collect personal data from EU customers, GDPR applies.**

Personal data includes:
- Name, email, phone
- Shipping & billing address
- IP address
- Cookies & tracking data
- Payment method (processed by Stripe, but you see the token)

### Key GDPR Requirements

#### 1. **Privacy Policy (Required)**
Must clearly state:
- What data you collect
- Why you collect it (legal basis)
- How long you keep it
- Who can access it
- What rights customers have

**Your Privacy Policy must include:**
```markdown
## Data Collection
We collect: Name, Email, Shipping Address, Billing Address

## Legal Basis
- Contract: To fulfill your order
- Legitimate interest: To prevent fraud

## Data Retention
- Order data: 7 years (legal requirement for taxes)
- Email contact: Until customer requests deletion

## Customer Rights
- Right to access: Download your data
- Right to deletion: Request account deletion
- Right to rectification: Correct your information
- Right to data portability: Export your data

## Contact
For privacy inquiries: privacy@piratekingcompany.com
```

#### 2. **Consent for Cookies**
- ✅ Required for non-essential cookies
- ✅ NOT required for essential cookies (shopping cart, session)
- ✅ Consent banner must come BEFORE setting cookies
- ✅ Must allow "Decline" (not just "Accept All")

**Cookie Categories:**
- Essential: Shopping cart, session, login → No consent needed
- Functional: Remembering preferences → Consent needed
- Analytics: Google Analytics, Segment → Consent needed
- Marketing: Retargeting ads → Consent needed

#### 3. **Data Processing Agreement (if applicable)**
- ✅ Stripe processes payment data → Stripe has DPA in place
- ✅ Email service (SendGrid, etc) → Get their DPA
- ✅ Analytics → Google Analytics has DPA

#### 4. **Data Breach Notification**
- ✅ If breach occurs, notify customers within 30 days
- ✅ Describe what data was exposed
- ✅ Explain steps taken to prevent recurrence
- ✅ Provide customer support contact

### GDPR Penalties

❌ **Non-compliance fines:**
- Up to €20 million OR
- 4% of global annual revenue (whichever is higher)

**Real Example:** CNIL (French data authority) fined SHEIN €150 million in 2025 for placing trackers without consent.

**References:**
- [GDPR Compliance in E-Commerce Guide](https://www.iubenda.com/en/blog/gdpr-compliance-in-e-commerce/)
- [GDPR Compliance Checklist 2025](https://www.bitsight.com/learn/compliance/gdpr-compliance-checklist)
- [Global Data Privacy Laws Guide 2025](https://usercentrics.com/guides/data-privacy/data-privacy-laws/)

---

## 📄 Legal Boilerplate & Required Policies

### 1. Terms & Conditions

**Minimum sections:**

```markdown
# Terms & Conditions - Pirate King Company

## 1. Acceptance of Terms
By placing an order, you agree to these terms.

## 2. Products & Pricing
- All prices in USD
- Pirate King reserves right to modify prices without notice
- Inventory not guaranteed until order confirmed

## 3. Order Confirmation
- Order receipt is confirmation of receipt, not acceptance
- Pirate King reserves right to accept/decline orders
- Orders may be cancelled within 24 hours for full refund

## 4. Payment
- Accepted payment: Credit cards via Stripe
- Payment processed by Stripe (PCI DSS Level 1)
- Refunds processed to original payment method within 5-10 business days

## 5. Shipping
- Estimated delivery: 5-7 business days (not guaranteed)
- Risk of loss transfers to customer upon delivery
- Pirate King not responsible for lost/damaged packages (recommend insurance)

## 6. Returns & Refunds
- 30-day return window from delivery
- Must be unused, unwashed, with tags attached
- Return shipping cost paid by customer
- Refund issued within 5-10 business days of return receipt

## 7. Intellectual Property
- All content on site is Pirate King property
- Customers may not reproduce or redistribute

## 8. Limitation of Liability
- Pirate King not liable for indirect/incidental/special damages
- Maximum liability: value of order
- Some jurisdictions don't allow liability limits

## 9. Dispute Resolution
- Disputes resolved under [State/Country] law
- Venue: [City, State/Country]
- Binding arbitration clause (if applicable)

## 10. Modifications
- Pirate King reserves right to modify terms at any time
- Changes effective upon posting
- Continued use = acceptance of new terms
```

### 2. Privacy Policy

```markdown
# Privacy Policy - Pirate King Company

## Data We Collect
- Name, email, phone
- Shipping & billing address
- IP address & device info
- Browsing behavior (via cookies)

## Why We Collect It
- Fulfill orders (contract)
- Prevent fraud (legitimate interest)
- Improve website (consent-based analytics)
- Marketing emails (consent)

## How Long We Keep It
- Order data: 7 years (tax law)
- Account data: Until deletion requested
- Marketing consent: Until withdrawn
- Cookies: Per cookie policy (30 days to 2 years)

## Who Has Access
- Pirate King employees (order fulfillment)
- Stripe (payment processing)
- Email service (SendGrid, etc)
- Analytics provider (Google Analytics)
- Law enforcement (if legally required)

## Your Rights (GDPR/CCPA)
1. **Right to Access**: Request download of your data
2. **Right to Deletion**: Request deletion ("right to be forgotten")
3. **Right to Rectification**: Correct inaccurate data
4. **Right to Portability**: Export data in standard format
5. **Right to Withdraw Consent**: Stop marketing emails anytime
6. **Right to Object**: Opt-out of processing

## Cookies & Tracking
- Essential cookies (no consent): session, login, cart
- Functional cookies (consent required): preferences, language
- Analytics cookies (consent required): Google Analytics
- Marketing cookies (consent required): retargeting ads

## Third Parties
- Stripe: Payment processing (see Stripe privacy policy)
- SendGrid/Mailgun: Email delivery
- Google Analytics: Website traffic analysis
- [Other services]: [Describe]

## Data Breach
If we discover unauthorized access to personal data, we will:
1. Notify you within 30 days
2. Describe what data was exposed
3. Provide steps to protect yourself
4. Offer credit monitoring (if applicable)

## Contact
- Privacy Officer: privacy@piratekingcompany.com
- Address: [Your business address]
- Phone: [Your phone number]
```

### 3. Return & Refund Policy

```markdown
# Return & Refund Policy - Pirate King Company

## Return Window
- 30 days from delivery date
- Must be unused, unwashed, with original tags attached
- Original packaging preferred but not required

## How to Return
1. Email orders@piratekingcompany.com with order number
2. Receive return shipping label
3. Ship item back at your expense
4. Items received within 14 days qualify for refund

## Refund Processing
- Refunds issued 5-10 business days after receipt
- Refunded to original payment method
- Shipping costs non-refundable
- Return shipping cost paid by customer

## Non-Returnable Items
- Damaged by customer (not manufacturing defect)
- Washed, altered, or worn
- Tags removed (except if defective)
- Items purchased > 30 days ago

## Exchanges
- Same as returns (30-day window)
- Exchange shipping cost paid by customer
- Shipping to you is free for defective items

## Defective Items
- Manufacturing defects covered for 1 year
- Contact us with photos
- Pirate King pays return shipping for defects
- Replacement or refund at our discretion

## Contact
- Returns: support@piratekingcompany.com
- Return address: [Your address]
```

**References:**
- [E-Commerce Terms of Service Template](https://termly.io/resources/templates/ecommerce-terms-and-conditions/)
- [E-Commerce Privacy Policy Template](https://termly.io/resources/templates/ecommerce-privacy-policy/)
- [E-Commerce Legal Documents Guide](https://www.iubenda.com/en/blog/a-sample-terms-and-conditions-document-for-your-online-store-2/)

---

## 🔐 Implementation Checklist for MVP

### Pre-Launch Security
- [ ] **HTTPS**: Vercel auto-enables (verify with green lock)
- [ ] **Stripe Elements**: Card form in secure iframe (not your server)
- [ ] **Environment Variables**: API keys in `.env` (never in code)
- [ ] **Logging**: Sanitize sensitive data (no card tokens logged)
- [ ] **Webhooks**: Stripe webhook signature validation
- [ ] **2FA**: Implement for admin dashboard (TOTP-based)
- [ ] **CORS**: Restrict cross-origin requests to trusted domains
- [ ] **Input Validation**: Sanitize email, address inputs

### Pre-Launch Legal
- [ ] **Terms & Conditions**: Published on website
- [ ] **Privacy Policy**: Published on website
- [ ] **Return/Refund Policy**: Published on website
- [ ] **Cookie Banner**: For non-essential cookies
- [ ] **Terms Acceptance**: Checkbox on checkout form
- [ ] **Contact Info**: Privacy & support emails defined
- [ ] **Compliance**: Legal review by attorney

### After Launch
- [ ] **Monitoring**: Quarterly vulnerability scans
- [ ] **Penetration Testing**: Annual security test
- [ ] **Incident Response**: Plan in place, contact list ready
- [ ] **Data Retention**: Delete old customer data per policy
- [ ] **Stripe Compliance**: Stay current with Stripe advisories

---

## 📞 Legal Disclaimers

**⚠️ IMPORTANT LEGAL NOTICES:**

1. **This is NOT legal advice.** Consult with a licensed attorney specializing in e-commerce and data privacy law in your jurisdiction.

2. **GDPR scope depends on your location and customer base.** If you have EU customers, GDPR likely applies. If you have California customers, CCPA may apply.

3. **PCI DSS is mandatory.** Using Stripe minimizes your scope, but you still must comply with all applicable requirements.

4. **Regulations change constantly.** Review this document quarterly and update your policies accordingly.

5. **Professional help is recommended.** Consider working with:
   - E-commerce lawyer (for T&C, privacy policy, returns)
   - Security consultant (for PCI DSS compliance audit)
   - Compliance professional (for GDPR/CCPA)

---

## 🔗 Key Resources

**PCI DSS & Payment Security:**
- [PCI Security Standards Council](https://www.pcisecuritystandards.org/)
- [Stripe Security Guide](https://docs.stripe.com/security)
- [Stripe PCI Compliance Guide](https://stripe.com/guides/pci-compliance)

**GDPR & Data Privacy:**
- [Official GDPR Text (EUR-Lex)](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [GDPR for E-Commerce (iubenda)](https://www.iubenda.com/en/blog/gdpr-compliance-in-e-commerce/)
- [Data Privacy Laws 2025 Guide](https://usercentrics.com/guides/data-privacy/data-privacy-laws/)

**Legal Templates:**
- [TermsFeed E-Commerce Templates](https://termly.io/resources/templates/ecommerce-terms-and-conditions/)
- [iubenda Legal Templates](https://www.iubenda.com/)
- [The Contracts Market](https://www.thecontractsmarket.com/)

**Stripe Compliance:**
- [Stripe PCI DSS Checklist](https://stripe.com/resources/more/pci-dss-checklist-for-businesses)
- [Stripe Integration Security](https://docs.stripe.com/security/guide)

---

**Last Updated:** 2026-05-30  
**Status:** For MVP planning (not final legal document)  
**Next Step:** Have attorney review before launch
