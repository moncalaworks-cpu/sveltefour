---
tags: [component, phase-2, about, bio]
status: planned
---

# [[About Section]]

## Purpose
Give visitors a deeper understanding of your background, skills, and what drives you professionally.

## Key Elements

- **Heading** — "About Me" or similar
- **Bio Text** — 2-3 paragraphs (150-300 words total)
- **Key Highlights** — Optional: bullet points of notable achievements
- **Photo** — Optional: professional headshot or avatar
- **Call-to-Action** — Optional: "Let's work together" link

## Content

You'll need to prepare:
- [ ] Professional bio (2-3 paragraphs)
- [ ] Key achievements or highlights
- [ ] Professional photo (optional)
- [ ] Link to resume (optional)

## Design Specifications

### Typography
- **Heading**: h2, text-3xl
- **Body**: text-base, slate-700, leading-relaxed
- **Highlights**: text-sm, slate-600 with subtle borders

### Colors
- Background: White (or light section background)
- Text: Slate 900 (heading), Slate 700 (body), Slate 600 (secondary)
- Accent: Subtle border or background color for highlights

### Layout
- Single column, centered content
- Max-width: 3xl (48rem)
- Generous vertical padding (py-16 to py-24)
- Optional: Image to left or right of text (2-column on desktop)

## Svelte Implementation

### File Structure
```
src/components/
└── About.svelte
```

### Content Strategy
- Store bio content in component or import from markdown
- Use prose styling via @tailwindcss/typography plugin
- Optional: Create src/lib/content/bio.ts for content

## Responsive Design

| Breakpoint | Layout | Notes |
|-----------|--------|-------|
| Mobile | Single column, text centered | Full width |
| Desktop | Two column (photo + text) | Max-width 3xl |

## Status

- [x] **Planned** — Completed
- [x] **In Progress** — Completed
- [x] **Code Review** — Passed
- [x] **Complete** — Deployed on main branch

**Commit**: `919874a` — Feature branch `feature/about-section` merged to main

## Implementation Notes

Built with premium, refined minimalist aesthetic:
- Two-column layout on desktop (image left, text right)
- Stacked single column on mobile
- Professional photo frame with subtle gradient background
- Bio section with elegant left accent bar
- Highlights displayed as premium metric cards with hover animations
- Full TypeScript support with customizable props

## Related Sections

- [[Hero Section]] — Precedes this section
- [[Experience Section]] — Follows this section
- [[Skills Section]] — Can reference skills here

## Notes

- Keep tone professional yet personable
- Highlight unique qualities and motivations
- Consider SEO: include relevant keywords naturally
