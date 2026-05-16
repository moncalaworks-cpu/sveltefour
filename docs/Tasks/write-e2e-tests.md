---
id: task-write-e2e-tests
title: Write End-to-End Tests with Playwright
description: Create Playwright tests for user journeys across the site
status: complete
priority: medium
assigned_agent: general-purpose
dependencies: [task-setup-testing, task-001, task-002, task-003, task-004]
---

# Task: Write End-to-End Tests with Playwright

## Overview
After all sections are integrated, write end-to-end tests using Playwright to validate user journeys and complete site flows.

## Requirements

### E2E Tests to Write
- **Navigation Tests**:
  - Page loads and title is correct
  - All internal anchors work (#projects, #about, #contact)
  - Scroll-to behavior works correctly

- **Hero Section**:
  - Hero is visible on load
  - Primary CTA navigates to projects
  - Secondary CTA navigates to contact
  - Scroll indicator is visible

- **Responsive Tests**:
  - Mobile viewport (375px) - all text readable
  - Tablet viewport (768px) - layout correct
  - Desktop viewport (1440px) - full width layout

- **Form/Contact Tests** (if form is included):
  - Contact form is visible
  - Can fill in fields
  - Submit button is clickable
  - Form validation works

- **Full Page Journey**:
  - Load home page
  - Scroll through all sections
  - Verify all sections are visible
  - Check responsive behavior

### Test Configuration
- Base URL: http://localhost:5173 (dev server)
- Browsers: chromium (can add firefox, webkit)
- Headed mode available for debugging
- Screenshots on failure
- Videos on failure

## Acceptance Criteria
- [ ] All major user journeys tested
- [ ] Tests pass locally (`npm run test:e2e`)
- [ ] Navigation and CTA links verified
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Tests are maintainable and clear
- [ ] Tests committed to e2e/

## Testing Approach

### User Journeys to Cover
1. **First Visit**: Load page → See hero → See CTA
2. **Explore**: Scroll → See all sections → Interactive elements work
3. **Contact**: Navigate to contact → See contact info → Social links work
4. **Mobile**: All above on mobile device (375px)

### Debugging
- Use `headed: true` to watch tests
- Use `--debug` flag to step through
- Screenshots/videos help diagnose failures

## Related
- [[setup-testing-frameworks]] — Testing framework setup (prerequisite)
- [[test-responsive-design]] — Manual responsive testing (precedes this)
- [[PROGRESS]] — Development progress

## Notes
- E2E tests are slower (5-10s per test)
- They validate real user behavior
- Good for catching integration issues
- Run before production deployment
