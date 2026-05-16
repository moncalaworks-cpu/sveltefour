# Architecture & Design Decisions

## Technology Choices

### SvelteKit + Svelte 5 (Runes Mode)
**Decision**: Build with SvelteKit 2.x and Svelte 5 in runes mode.

**Why**:
- Svelte 5 runes offer modern, reactive state management without the boilerplate of older lifecycle APIs
- SvelteKit provides file-based routing, excellent TypeScript support, and seamless Vercel deployment
- Smaller JS bundle than React/Vue alternatives (benefits site performance)
- Great developer experience with HMR and type safety

**Trade-offs**: Svelte 5 is relatively new; ecosystem is smaller than React but growing rapidly.

---

### Tailwind CSS for Styling
**Decision**: Use Tailwind CSS utility-first approach instead of component libraries or custom CSS.

**Why**:
- Rapid development with pre-built utility classes
- Minimalist theme (white, slate grays) is easy to implement with Tailwind's default palette
- @tailwindcss/typography plugin handles rich text content beautifully
- Small final bundle when optimized for production
- Encourages consistent spacing, colors, and typography

**Trade-offs**: Utility-first CSS requires learning Tailwind's class names; larger HTML class attributes.

---

### Vercel Deployment (Adapter-Auto)
**Decision**: Deploy exclusively to Vercel using SvelteKit's adapter-auto.

**Why**:
- Vercel is built for SvelteKit projects; zero configuration needed
- Automatic preview deployments for testing
- Built-in CDN and edge caching for fast global delivery
- Free tier suitable for a portfolio site
- Seamless GitHub integration for automated deployments

**Trade-offs**: Vendor lock-in to Vercel; not deployable elsewhere without changing adapter.

---

### TypeScript Strict Mode
**Decision**: Enable TypeScript strict mode with all checks enabled.

**Why**:
- Portfolio code should demonstrate best practices
- Strict mode catches errors at compile time, not runtime
- Shows competency with type-safe development
- Easier maintenance and refactoring long-term

---

### File-Based Routing (SvelteKit Standard)
**Decision**: Use SvelteKit's file-based routing instead of programmatic routing.

**Why**:
- Routing structure mirrors directory structure; intuitive and discoverable
- Built-in support for layouts, error pages, and page-specific data loading
- SvelteKit standard; less configuration and boilerplate

---

## Styling Architecture

### Minimalist White Theme
**Decision**: White background with slate gray typography; minimal decoration.

**Why**:
- Professional and modern aesthetic
- Focuses attention on content (resume, projects) rather than design flourishes
- Easy on eyes; good contrast and readability
- Reflects "refined simplicity" ideal for a professional site

**Color Palette**:
- Background: White (#ffffff)
- Primary Text: Slate 900 (#0f172a) — dark but not pure black
- Secondary Text: Slate 600 (#475569) — muted gray
- Borders: Slate 200 (#e2e8f0) — subtle dividers

---

## Content Structure

### Static Content (No Database)
**Decision**: Keep all content static; no backend database or CMS.

**Why**:
- Simpler deployment and maintenance
- Faster performance (no API calls)
- Resume site content changes infrequently
- Easy to version control all content in git

**Implementation**: Content lives in Svelte components or markdown files.

---

## Development Practices

### Git as Audit Trail
**Decision**: Use git commit history as the project audit log; no separate change tracking.

**Why**:
- Git already provides perfect audit trail with timestamps, authors, messages, and diffs
- Every change is documented and reversible
- `git log` and `git blame` provide full context

---

## Future Considerations

- **Dark Mode**: Could be added via Tailwind's `dark:` prefix if needed
- **Blog Section**: Could add a blog using Markdown files + dynamic routing
- **Analytics**: Could integrate Vercel Analytics or similar for traffic insights
- **Internationalization**: Not currently needed; could add if desired later

---

## Related Documents

- [[PROJECT.md]] — Project overview and goals
- [[ROADMAP.md]] — Planned features and sections
