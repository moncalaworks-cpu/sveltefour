---
tags: [component, phase-2, projects, showcase, grid]
status: planned
---

# [[Projects Section]]

## Purpose
Showcase your best work and demonstrate technical skills through real projects.

## Key Elements

- **Heading** — "Projects" or "Featured Work"
- **Project Cards** — Grid of 3-5 notable projects
- **Card Content**:
  - Project title
  - Short description (1-2 sentences)
  - Technologies used
  - Links (GitHub, live demo, case study)
- **Optional**: Filter by category or skill

## Project Card Design

Each card should display:
- **Title**: Project name or "Project: Name"
- **Description**: 1-2 sentences about what it does
- **Tech Stack**: Tags or labels (e.g., SvelteKit, Tailwind, Node.js)
- **Links**: GitHub repo, live demo, or blog post

## Design Specifications

### Typography
- **Heading**: h2, text-3xl
- **Project Title**: h3, text-xl
- **Description**: text-base, slate-700
- **Tech Tags**: text-sm, slate-600

### Colors
- Card Background: White with subtle border (slate-200)
- Hover: Subtle shadow or border color change
- Text: Slate 900 (titles), Slate 700 (description)
- Links: Slate 900 with underline, hover to slate-700

### Layout
- Grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Card spacing: gap-6 or gap-8
- Padding: p-6 per card
- Max-width: Full container

## Svelte Implementation

### File Structure
```
src/components/
├── Projects.svelte        # Main projects section
└── ProjectCard.svelte     # Individual project card component
src/lib/
└── projects.ts            # Project data (title, description, links)
```

### Content Storage
```typescript
// src/lib/projects.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
    blog?: string;
  };
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project Name",
    description: "Brief description of what it does",
    technologies: ["SvelteKit", "Tailwind", "TypeScript"],
    links: {
      github: "https://github.com/user/repo",
      demo: "https://demo.example.com"
    },
    featured: true
  }
  // ...more projects
];
```

## Projects to Include

Prepare information for your best 3-5 projects:
- [ ] Project 1: Title, description, tech stack, links
- [ ] Project 2: Title, description, tech stack, links
- [ ] Project 3: Title, description, tech stack, links
- [ ] Project 4: Title, description, tech stack, links (optional)
- [ ] Project 5: Title, description, tech stack, links (optional)

## Responsive Design

| Breakpoint | Columns | Notes |
|-----------|---------|-------|
| Mobile | 1 | Full width cards |
| Tablet | 2 | Two columns |
| Desktop | 3 | Three columns |

## Status

- [ ] **Planned** — Current phase
- [ ] **In Progress** — Being built
- [ ] **Code Review** — Ready for review
- [ ] **Complete** — Deployed and tested

## Related Sections

- [[Skills Section]] — Technologies referenced in projects
- [[Experience Section]] — May reference projects from work

## Notes

- Keep descriptions focused on impact, not technical details
- Show variety: web, backend, design, tools
- Include at least one recent or in-progress project
- Consider adding images/screenshots for visual appeal
