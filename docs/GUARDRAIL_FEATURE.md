# Draft Post Guardrail System

## Feature Overview

Multi-layer safety system prevents draft blog posts from reaching production.

- **Implemented**: 2026-05-16
- **Status**: ✅ Production-ready
- **Commits**: 4 core commits + 2 publish commits

## Architecture

### Three Independent Layers

#### Layer 1: Git Pre-Push Hook
**File**: `.git/hooks/pre-push`

Checks for `status: draft` before allowing `git push`. Blocks with clear error message and instructions.

```bash
# Hook runs automatically on git push
git push origin main
# ❌ BLOCKED if any .md contains "status: draft"
```

#### Layer 2: Build Verification  
**File**: `scripts/verify-no-drafts.js`

Vercel deployment guard scans `src/posts/` during build process.

```bash
npm run verify:no-drafts      # Standalone check
npm run build                 # Automatic via && chaining
```

Integrated into `package.json`:
```json
"build": "node scripts/verify-no-drafts.js && vite build"
```

#### Layer 3: Status Metadata
**Files**: `scripts/generate-draft.js`, `scripts/publish-drafts.js`

- Generation: Creates YAML frontmatter with `status: draft`
- Publishing: Changes status to `published` and adds `publishedAt` timestamp

## Workflow

### Generate Drafts
```bash
npm run content:draft
```

Creates markdown files in `src/posts/` with:
- `status: draft` (blocks build)
- `isGenerated: true` (marks as auto-generated)
- `generatedAt: "2026-05-16T12:34:11.315Z"` (timestamp)

### Review & Edit
1. Open draft file in `src/posts/`
2. Review content, sources, metadata
3. Edit title, description, tags as needed
4. Keep `status: draft` until ready to publish

### Publish Approved Posts
```bash
npm run content:publish [filename]
# or
npm run content:publish              # All drafts
```

Changes:
- `status: draft` → `status: published`
- Adds `publishedAt: "2026-05-16T12:34:30.632Z"`

### Deploy to Production
```bash
npm run build                        # Passes if no drafts
git push origin main                 # Allowed if no drafts
```

## Verification Results

**Tested 2026-05-16:**

✅ Draft detection with `npm run verify:no-drafts`
✅ Build failure with drafts present
✅ Build success after publishing
✅ Pre-push hook executable and checking
✅ Published posts visible on `/blog`
✅ Publish command adds timestamp correctly

## Testing Scenario

1. Generated 2 test drafts → detected by verify script ✓
2. Published 1 draft → status changed, timestamp added ✓
3. Build failed with remaining draft ✓
4. Published final draft → all 5 posts approved ✓
5. Build succeeded → posts visible on blog ✓

## Commits

```
4853370 blog: Publish curated content — [generated]-ai-qa-2026-05-16.md
9ee3698 blog: Publish curated content — [generated]-qa-testing-2026-05-16.md
01c4340 draft: Auto-generated content for AI in QA & Test Automation (2026-05-16)
ad6d032 draft: Auto-generated content for QA Testing & Automation (2026-05-16)
51e3faf refactor: Make blog system dynamic to load all markdown files
4ae74a3 feat: Add automated content curation system with daily draft generation
```

## Future Enhancements

- Add `.git/hooks/commit-msg` to validate commit format
- Integrate with GitHub PR/branch protection rules
- Dashboard to view draft/published status
- Email notifications when new drafts ready for review
- Scheduled cleanup of very old drafts

## Notes

- All generated posts include proper markdown frontmatter with metadata
- Posts auto-commit to git with descriptive commit messages
- Vercel will automatically run verification during builds
- No manual intervention needed for guardrail enforcement
