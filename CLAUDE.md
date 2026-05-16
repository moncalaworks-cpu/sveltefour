# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SvelteThree** is a SvelteKit application using Svelte 5 with TypeScript.

- **Framework**: SvelteKit 2.57.0 with Svelte 5.55.2
- **Language**: TypeScript 6.0.2 (strict mode)
- **Build Tool**: Vite 8.0.7
- **Runtime**: Node.js (Node.js 24 LTS recommended on Vercel)

## Common Commands

```bash
# Development server (runs on http://localhost:5173 by default)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking and Svelte validation
npm check

# Type checking in watch mode (useful during development)
npm run check:watch
```

## Code Architecture

### File Structure

```
src/
├── routes/          # SvelteKit file-based routing
│   ├── +page.svelte       # Home page component
│   └── +layout.svelte      # Root layout wrapping all pages
├── lib/             # Reusable library code
│   ├── index.ts           # Library exports
│   └── assets/            # Static assets (favicon, etc.)
├── app.html         # HTML shell for the application
└── app.d.ts         # Global type definitions
```

### Svelte 5 Runes Mode

This project uses **Svelte 5's runes mode** exclusively (enabled via `svelte.config.js`). Key patterns:

- **State**: Use `$state()` rune for reactive state
- **Props**: Use `let { prop } = $props()` syntax (not `export let`)
- **Rendering**: Use `{@render snippet()}` instead of `<svelte:fragment>`
- **Effects**: Use `$effect()` for side effects instead of lifecycle hooks

Example from `+layout.svelte`:
```svelte
<script lang="ts">
  let { children } = $props();
</script>

{@render children()}
```

### Routing

SvelteKit uses file-based routing. Files in `src/routes/` determine URL structure:
- `src/routes/+page.svelte` → `/`
- `src/routes/about/+page.svelte` → `/about`
- `src/routes/+layout.svelte` → Root layout applied to all routes

### Type Safety

TypeScript strict mode is enabled. Configuration in `tsconfig.json`:
- `strict: true`
- `noImplicitAny`, `strictNullChecks` all enabled
- `rewriteRelativeImportExtensions: true` (handles .js/.ts in imports)

Use `$lib` alias to import from `src/lib/`: `import { something } from '$lib'`

## Development Notes

- **HMR Works Out of Box**: Vite provides instant reload when you save files
- **Type Checking**: Run `npm run check:watch` in a terminal while developing to catch errors early
- **SvelteKit Sync**: The `prepare` script runs `svelte-kit sync` to generate types; this happens automatically before type checking
- **No Tests Configured Yet**: Add testing framework (Vitest, SvelteKit testing library) as needed

## Styling

**Tailwind CSS** is configured for utility-first styling with a minimalist white theme.

- **Config**: `tailwind.config.js` extends the default theme with custom slate colors
- **Global Styles**: `src/app.css` contains Tailwind directives and base layer styles
- **Typography**: `@tailwindcss/typography` plugin included for rich text content
- **Color Palette**: White background, slate grays for text, clean and minimal aesthetic

Use Tailwind classes directly in templates: `<div class="max-w-3xl mx-auto px-6 py-20">`

## Testing & Code Quality

**All features require tests before commit.**

### Test Commands
```bash
npm run test              # Run Vitest unit tests
npm run test:ui          # Vitest interactive UI
npm run test:coverage    # Coverage report

npm run test:e2e         # Playwright e2e tests
npm run test:e2e:ui      # Playwright inspector
```

### Pre-Commit Checklist
Every feature (component, utility, fix) must pass:

1. ✅ **Write test cases** — Unit tests (Vitest) or e2e tests (Playwright)
2. ✅ **Type validation** — `npm run check` passes
3. ✅ **Build validation** — `npm run build` succeeds
4. ✅ **Test validation** — `npm run test` or `npm run test:e2e` passes
5. ✅ **Code review** — Review for quality, best practices, security
6. ✅ **Commit** — Only after all checks pass

### Testing Framework
- **Vitest** — Unit and component tests (@testing-library/svelte)
- **Playwright** — End-to-end browser tests (all browsers: chromium, firefox, webkit)
- **Coverage Target** — 80%+ for components

### Example Workflow
```bash
# 1. Create component with tests
npm run test              # Tests pass ✓

# 2. Validate types and build
npm run check            # No errors ✓
npm run build            # Builds successfully ✓

# 3. Create feature branch
git checkout -b feature/component-name

# 4. Self-review or peer review
# Check: readability, best practices, accessibility

# 5. Commit (only after all above pass)
git commit -m "Add: Component description"

# 6. Merge to main
git checkout main
git merge feature/component-name
```

## Deployment

This project uses `adapter-auto`, which automatically detects the deployment environment. For Vercel deployment:
- No additional configuration needed; Vercel recognizes SvelteKit projects automatically
- Ensure Node.js 24 LTS or higher is specified in deployment environment
