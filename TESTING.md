# Testing Guide

This project uses **Vitest** for unit and component tests, and **Playwright** for end-to-end tests. All features require tests before being committed.

## Unit Tests (Vitest)

Unit and component tests verify individual component behavior and utility functions.

### Running Tests

```bash
npm run test              # Watch mode (re-run on file changes)
npm run test:ui          # Interactive UI for test runner
npm run test:coverage    # Generate coverage report
```

### Writing Unit Tests

Use `@testing-library/svelte` to render and test Svelte components:

```typescript
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MyComponent from '../components/MyComponent.svelte';

describe('MyComponent', () => {
  it('renders with default props', () => {
    render(MyComponent);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('accepts custom props', () => {
    render(MyComponent, {
      props: { title: 'Custom Title' },
    });
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });
});
```

### Test Structure

```
src/__tests__/
  setup.ts              # Test utilities and global setup
  Hero.test.ts          # Hero component tests
  About.test.ts         # About component tests
  [ComponentName].test.ts
```

## End-to-End Tests (Playwright)

E2E tests verify user interactions across the entire application in a real browser.

### Running E2E Tests

```bash
npm run test:e2e         # Run all tests (headless mode)
npm run test:e2e:ui      # Interactive Playwright test explorer
npx playwright test --headed  # See tests run in the browser
```

### Writing E2E Tests

Use Playwright's API to test user workflows:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays hero heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toContainText('Your Name');
  });

  test('CTA buttons are clickable', async ({ page }) => {
    const ctaButton = page.locator('a:has-text("View Projects")');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute('href', '#projects');
  });
});
```

### Test Structure

```
e2e/
  hero.spec.ts          # Hero section tests
  navigation.spec.ts    # Navigation tests
  [feature].spec.ts
```

## Coverage Goals

Target **80%+ coverage** for components. View the coverage report:

```bash
npm run test:coverage
open coverage/index.html  # macOS
```

Coverage includes:
- **Statements**: Code lines executed
- **Branches**: Conditional paths tested
- **Functions**: All functions called
- **Lines**: All lines executed

## Testing Best Practices

### 1. Test User Behavior, Not Implementation

Good: Test what the user sees and does
```typescript
it('shows error when form is submitted empty', () => {
  render(ContactForm);
  fireEvent.click(screen.getByText('Submit'));
  expect(screen.getByText('Name is required')).toBeInTheDocument();
});
```

Bad: Test internal implementation
```typescript
// Don't test private variables or internal state
it('sets isSubmitting to true', () => {
  // ...
});
```

### 2. Use Semantic Queries

Prefer accessible selectors:
```typescript
// Good
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText('Email')
screen.getByText('Welcome')

// Avoid
screen.getByTestId('btn-submit')
page.locator('.submit-button')
```

### 3. Keep Tests Simple and Focused

Each test should verify one behavior:
```typescript
it('renders hero heading', () => {
  render(Hero);
  expect(screen.getByText('Your Name')).toBeInTheDocument();
});

it('hero heading has correct styling', () => {
  render(Hero);
  expect(screen.getByRole('heading', { level: 1 })).toHaveClass('text-5xl');
});
```

### 4. Test Accessibility

Verify components are accessible:
```typescript
it('heading is semantic h1', () => {
  render(Hero);
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});
```

## Pre-Commit Testing Checklist

Before committing any changes:

1. ✅ **Write tests** — Create unit or e2e tests for your changes
2. ✅ **Pass type checking** — `npm run check`
3. ✅ **Pass all tests** — `npm run test` and `npm run test:e2e`
4. ✅ **Build successfully** — `npm run build`
5. ✅ **Verify coverage** — Run `npm run test:coverage`

Example workflow:
```bash
# 1. Create or update component
# ... edit Hero.svelte ...

# 2. Create corresponding test
# ... create Hero.test.ts ...

# 3. Run tests in watch mode
npm run test

# 4. Type checking and build
npm run check
npm run build

# 5. Run e2e tests
npm run test:e2e

# 6. Verify coverage
npm run test:coverage

# 7. Commit only after all pass
git add .
git commit -m "Add: Hero component with tests"
```

## CI/CD Integration

Tests run automatically in CI/CD pipelines:
- All tests must pass before merge
- Coverage reports are generated
- Failed tests block deployment

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/svelte)
- [Playwright Documentation](https://playwright.dev/)
- [SvelteKit Testing Guide](https://kit.svelte.dev/docs/testing)
