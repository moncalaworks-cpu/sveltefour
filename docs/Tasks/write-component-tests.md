---
id: task-write-component-tests
title: Write Unit Tests for Components
description: Create Vitest tests for Hero, About, Experience, Projects, Skills components
status: complete
priority: high
assigned_agent: general-purpose
dependencies: [task-setup-testing, task-001, task-002, task-003]
---

# Task: Write Unit Tests for Components

## Overview
After testing framework is set up and all components are integrated, write comprehensive unit tests for each major component using Vitest and @testing-library/svelte.

## Requirements

### Unit Tests to Write
- **Hero.test.ts**: 
  - Renders with default props
  - Renders with custom heading/tagline
  - CTA buttons are clickable
  - Links are correct

- **About.test.ts**:
  - Renders bio text
  - Renders highlights with correct values
  - Conditional photo rendering
  - Hover effects on highlights

- **Experience.test.ts**:
  - Timeline renders with experience entries
  - Correct company/title display
  - Date formatting
  - Achievement bullets render

- **Projects.test.ts**:
  - Grid layout renders
  - Project cards display correctly
  - Technology tags render
  - Links work

- **Skills.test.ts**:
  - Skill categories render
  - Skills display with proficiency
  - Layout options work (categories vs grid)

### Coverage Goals
- Target: 80%+ coverage across components
- Focus on: Props, conditional rendering, event handlers
- Generate coverage report: `npm run test:coverage`

### Test Patterns
- Use @testing-library/svelte for rendering
- Test behavior, not implementation
- Use user events (@testing-library/user-event)
- Mock external data where needed

## Acceptance Criteria
- [ ] All components have unit tests
- [ ] Tests pass locally (`npm run test`)
- [ ] Coverage report shows 80%+ across components
- [ ] Tests validate: rendering, props, interactions
- [ ] Tests are clear and maintainable
- [ ] Tests committed to src/__tests__/

## Related
- [[setup-testing-frameworks]] — Testing framework setup (prerequisite)
- [[PROGRESS]] — Development progress

## Notes
- Unit tests run fast (< 1s per component)
- Tests are great for catching regressions
- Component tests are simpler than e2e tests
- Aim for clarity over high numbers
