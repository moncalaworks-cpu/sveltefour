---
id: task-setup-testing
title: Set Up Vitest & Playwright Testing Frameworks
description: Configure Vitest for unit tests and Playwright for e2e tests
status: complete
priority: high
assigned_agent: general-purpose
dependencies: []
---

# Task Setup: Set Up Vitest & Playwright Testing Frameworks

## Overview
Set up comprehensive testing infrastructure with Vitest for unit/component tests and Playwright for end-to-end browser tests. This establishes testing best practices for the resume site.

## Requirements

### Vitest Setup
- Install Vitest, @vitest/ui, jsdom
- Install @testing-library/svelte, @testing-library/user-event
- Create vitest.config.ts configuration
- Configure coverage reporting
- Set up test scripts in package.json:
  - `npm run test` — Run tests
  - `npm run test:ui` — Interactive UI mode
  - `npm run test:coverage` — Coverage report

### Playwright Setup
- Install @playwright/test
- Create playwright.config.ts
- Configure for all browsers (chromium, firefox, webkit)
- Add test scripts in package.json:
  - `npm run test:e2e` — Run e2e tests
  - `npm run test:e2e:ui` — Playwright UI mode

### Initial Test Structure
- Create `src/__tests__/` directory for unit tests
- Create `e2e/` directory for end-to-end tests
- Add .gitignore entries for test artifacts (.test-results, .playwright)

### Documentation
- Create `TESTING.md` documenting testing setup and patterns
- Add examples of component unit tests
- Add examples of e2e tests

## Acceptance Criteria
- [x] Vitest installed and configured
- [x] Playwright installed and configured
- [x] Test scripts working (`npm run test`, `npm run test:e2e`)
- [x] Sample unit test passes (8 tests pass)
- [x] Sample e2e test passes (15 tests pass across 3 browsers)
- [x] .gitignore updated
- [x] TESTING.md created with examples
- [x] Changes committed to git

## Technical Details

**Vitest Config**:
- jsdom environment (DOM simulation)
- Coverage: 80% target (configurable)
- TypeScript support
- Svelte 5 support via @testing-library/svelte

**Playwright Config**:
- Base URL: http://localhost:5173 (dev server)
- Browsers: chromium, firefox, webkit
- Screenshots/videos on failure
- Headed mode for debugging

**Test Structure**:
```
src/
├── components/
│   ├── Hero.svelte
│   └── __tests__/
│       └── Hero.test.ts
├── __tests__/
│   └── setup.ts

e2e/
├── hero.spec.ts
├── about.spec.ts
└── navigation.spec.ts
```

## Implementation Notes

### Vitest Features to Configure
- Test environment: jsdom
- Globals: true (no need to import test, expect)
- Coverage: v8 provider
- CSS modules: false (Svelte handles CSS)

### Playwright Features to Configure
- Base URL (localhost:5173)
- Timeout: 30s
- Retries: 2 (for CI)
- Screenshot: on failure
- Video: on failure

### Sample Tests to Create
1. **Hero.test.ts**: Component renders with props
2. **About.test.ts**: Photo conditional rendering
3. **e2e/hero.spec.ts**: Hero section loads and CTAs work

## Related
- [[PROGRESS]] — Development progress
- [[ROADMAP]] — Feature roadmap
- Task dependencies: Required before [[test-responsive-design]]

## Notes
- Testing is important for portfolio quality code
- Unit tests validate components in isolation
- E2E tests validate user flows across the site
- This task should complete before integration tasks to ensure testability
- Consider running tests in CI/CD pipeline (future enhancement)
