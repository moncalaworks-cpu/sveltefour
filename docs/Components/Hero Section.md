---
tags: [component, phase-2, hero, landing, responsive]
status: planned
---

# [[Hero Section]]

## Purpose
First impression of the site. Introduces the developer and provides a clear call-to-action to explore projects or contact.

## Key Elements

- **Large Heading** — Value proposition or name + title
- **Subheading/Tagline** — Brief description (one line)
- **CTA Button(s)** — Primary action (view projects) and optional secondary (contact)
- **Background/Visual** — Optional: gradient, pattern, or image
- **Spacing** — Generous vertical padding for impact

## Design Specifications

### Typography
- **Heading**: h1, text-4xl (responsive: text-3xl on mobile)
- **Tagline**: text-lg, slate-600 (secondary text color)
- **Button**: Medium weight, slate-900 text on white background with border

### Colors (via [[DECISIONS]])
- Background: White
- Text: Slate 900 (primary), Slate 600 (secondary)
- Borders: Slate 200 (subtle dividers)
- Hover: Slate 700 transition

### Layout
- Desktop: Two-column (text left, visual right) OR full-width centered
- Mobile: Single column, stacked vertically
- Max-width: 3xl (48rem)

## Svelte Implementation

### File Structure
```
src/components/
└── Hero.svelte        # Main hero component
```

### Component Props
```svelte
<script lang="ts">
  let { 
    heading = "Your Name",
    tagline = "Full-stack developer & designer",
    primaryCta = "View Projects",
    primaryCtaHref = "/projects",
    secondaryCta = "Get in Touch",
    secondaryCtaHref = "#contact"
  } = $props();
</script>
```

### Styling Approach
- Use Tailwind utility classes for layout and spacing
- Consider `@apply` directive for button styles if reused elsewhere
- Ensure mobile responsiveness with `sm:`, `md:` breakpoints

## Responsive Design

| Breakpoint | Layout | Font Size |
|-----------|--------|-----------|
| Mobile (< 640px) | Single column | text-3xl heading |
| Tablet (640px - 1024px) | Single column | text-4xl heading |
| Desktop (> 1024px) | Two column (optional) | text-4xl heading |

## Status

- [x] **Planned** — Completed
- [x] **In Progress** — Completed
- [x] **Code Review** — Passed
- [x] **Complete** — Deployed on main branch
- [x] **Testing** — Mobile & responsive testing passed

## Implementation Checklist

- [x] Create src/components/Hero.svelte
- [x] Design responsive layout (mobile-first)
- [x] Implement Tailwind styling
- [x] Test on mobile, tablet, desktop
- [x] Verify accessibility (heading hierarchy, button labels)
- [x] Add to +page.svelte
- [x] Update [[PROGRESS]] with completion

**Commit**: `2362676` — Feature branch `feature/hero-section` merged to main

## Related Components

- [[About Section]] — Follows hero on page
- [[Projects Section]] — CTA link destination
- [[DECISIONS]] — Color and spacing decisions

## Notes

- Keep design clean and minimal per [[PROJECT]] principles
- Avoid unnecessary animations on load (should feel professional)
- Ensure fast rendering (hero is above the fold)
