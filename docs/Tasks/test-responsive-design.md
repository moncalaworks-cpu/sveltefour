---
id: task-005
title: Test Responsive Design & Core Web Vitals
description: Test all sections on mobile/tablet/desktop, run Lighthouse, optimize performance
status: complete
priority: medium
assigned_agent: general-purpose
dependencies: [task-001, task-002, task-003, task-004]
---

# Task 005: Test Responsive Design & Core Web Vitals

## Overview
After all sections are integrated, run comprehensive testing on responsiveness and performance metrics. Optimize if needed to meet resume site standards.

## Requirements
- Test each section on mobile (< 640px), tablet (640-1024px), desktop (> 1024px)
- Verify layout responsiveness and typography readability
- Check all links and CTAs work correctly
- Run Lighthouse audit
- Target scores: 90+ on all metrics
- Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Document any issues found
- Optimize if needed (image optimization, lazy loading, etc.)
- Update PROGRESS.md with test results

## Acceptance Criteria
- [ ] Mobile testing complete (all sections responsive)
- [ ] Tablet testing complete
- [ ] Desktop testing complete
- [ ] Lighthouse audit run
- [ ] Performance score 90+
- [ ] All Core Web Vitals passing
- [ ] Issues documented
- [ ] Optimizations applied (if needed)

## Testing Checklist
- [ ] Hero: Layout, CTA buttons, scroll indicator
- [ ] About: Photo frame, bio text, metric cards, hover effects
- [ ] Experience: Timeline, date display, card readability
- [ ] Projects: Grid layout, card hover, technology tags, links
- [ ] Skills: Category display, skill badges, layout options
- [ ] Overall: Navigation flow, spacing, typography, colors

## Related
- [[PROGRESS]] — Project progress
- [[ROADMAP]] — Feature roadmap

## Notes
This task comes after integration tasks are complete. It ensures the site is production-ready before launch/deployment.
