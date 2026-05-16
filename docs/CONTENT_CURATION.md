# Automated Content Curation System

## Overview

This system automatically discovers relevant YouTube videos, articles, and podcasts on topics you care about, generates blog post drafts with curated sources, and publishes them to your portfolio blog.

**How it works:**
1. **Daily at 6 AM EST** — Vercel Cron searches the web for content
2. **Drafts are created** in the `content/drafts` branch
3. **You review** the generated posts
4. **You publish** with a single command
5. **New posts appear** on your blog

---

## Setup

### 1. Create the `content/drafts` Branch

```bash
# First time setup
git checkout -b content/drafts
git push -u origin content/drafts

# Or use existing branch
git checkout content/drafts
git pull origin content/drafts
```

### 2. Configure Topics

Edit `src/lib/config/content-sources.json` to customize topics and keywords:

```json
{
  "topics": [
    {
      "id": "qa-testing",
      "name": "QA Testing & Automation",
      "keywords": ["test automation", "selenium", "playwright"],
      "enabled": true
    },
    {
      "id": "ai-qa",
      "name": "AI in QA & Test Automation",
      "keywords": ["AI testing", "machine learning QA"],
      "enabled": true
    }
  ]
}
```

### 3. Set Environment Variables (for Vercel Cron)

In your Vercel project settings, add:

```
CRON_SECRET=your-secret-key-here
```

---

## Daily Workflow

### Step 1: Check for New Drafts

Each day at 6 AM EST, drafts are automatically created in the `content/drafts` branch.

Check for new drafts:

```bash
git checkout content/drafts
git pull origin content/drafts
git log --oneline -5
```

You'll see auto-commits like:
```
draft: Auto-generated content for QA Testing & Automation (2026-05-16)
```

### Step 2: Review Draft Files

Draft files are stored in `src/posts/` with naming pattern: `[generated]-{topic-id}-{date}.md`

Examples:
- `[generated]-qa-testing-2026-05-16.md`
- `[generated]-ai-qa-2026-05-16.md`

**Review criteria:**
- Are the sources relevant and high-quality?
- Is the summary accurate and helpful?
- Are citations complete and formatted correctly?
- Would this content help your audience?

### Step 3: Edit if Needed (Optional)

You can edit drafts directly:

```bash
# Edit the markdown file
vim src/posts/[generated]-qa-testing-2026-05-16.md

# Stage and commit your changes
git add src/posts/[generated]-qa-testing-2026-05-16.md
git commit -m "refine: Improve summary for QA Testing draft"
```

### Step 4: Publish Approved Drafts

When a draft is approved, publish it:

```bash
# Publish all drafts
npm run content:publish

# Or publish specific draft
npm run content:publish "[generated]-qa-testing-2026-05-16.md"
```

This will:
1. Move the draft to main branch
2. Add `publishedAt` timestamp
3. Auto-commit with message: `blog: Publish curated content — [filename]`
4. Post appears on your blog

---

## Manual Draft Generation

Generate drafts on-demand (not waiting for daily cron):

```bash
# Generate drafts for all enabled topics
npm run content:draft

# Generate draft for specific topic
npm run content:draft qa-testing
```

Output:
```
✅ Created draft: [generated]-qa-testing-2026-05-16.md
✅ Committed: draft: Auto-generated content for QA Testing & Automation (2026-05-16)

📋 Next Steps:
   1. git checkout content/drafts
   2. Review the draft files in src/posts/
   3. Edit as needed
   4. npm run content:publish (to publish)
```

---

## Post Format

All generated posts follow this structure:

```markdown
---
title: "[Curated] QA Testing & Automation — 2026-05-16"
slug: "[generated]-qa-testing-2026-05-16"
date: "2026-05-16"
description: "Curated collection of the latest resources on QA Testing..."
tags: ["test automation", "qa engineering", "selenium"]
author: "Ken Shinzato"
isGenerated: true
generatedAt: "2026-05-16T06:00:00Z"
---

# [Curated] QA Testing & Automation — 2026-05-16

## Overview
[Auto-generated summary]

## Resources
1. 📹 [Video Title](url) — YouTube, 45 min, 12K views
2. 📄 [Article Title](url) — Dev.to, May 15
3. 🎙️ [Podcast Episode](url) — Podcast Name
...

## How to Use These Resources
[Standard guidance about resource types]
```

---

## Configuration Reference

### Topics (`src/lib/config/content-sources.json`)

```json
{
  "topics": [
    {
      "id": "unique-id",                    // Slug for file naming
      "name": "Display Name",               // Shows in blog post title
      "keywords": ["key1", "key2"],         // Search terms
      "enabled": true                       // Enable/disable this topic
    }
  ],
  "searchSettings": {
    "maxResultsPerTopic": 5,                // Max sources per draft
    "includeYouTube": true,                 // Search videos
    "includeArticles": true,                // Search articles
    "includePodcasts": true,                // Search podcasts
    "minPublicationAge": "1 week",          // Minimum age of content
    "maxPublicationAge": "3 months"         // Maximum age of content
  },
  "draftSettings": {
    "summaryLength": 250,                   // Summary word count
    "maxSources": 5,                        // Max citations per post
    "author": "Your Name",                  // Post author
    "draftBranch": "content/drafts"         // Git branch for drafts
  }
}
```

---

## Git Workflow Diagram

```
daily at 6 AM EST
        ↓
    [Cron Search]
        ↓
   create draft
        ↓
content/drafts branch (auto-committed)
        ↓
    [You Review]
        ↓
  [You Edit?]
        ↓
npm run content:publish
        ↓
    main branch
        ↓
  Blog posts live
```

---

## Tips & Best Practices

### ✅ Do This

- **Review sources** before publishing — ensure they're relevant and high-quality
- **Edit summaries** if needed — customize to your voice and perspective
- **Batch publish** — combine multiple drafts into one action: `npm run content:publish`
- **Keep topics focused** — specific keywords get better search results
- **Update config regularly** — add new keywords, adjust topic names

### ❌ Don't Do This

- **Publish automatically** — always review first
- **Publish low-quality content** — your portfolio reflects your taste and judgment
- **Ignore old drafts** — delete or edit stale ones
- **Use too many keywords** — keep 5-7 focused keywords per topic

---

## Troubleshooting

### Draft Not Being Created

**Problem**: Script runs but no draft file appears

**Solution**:
```bash
# Make sure you're on drafts branch
git checkout content/drafts

# Run script with verbose output
npm run content:draft qa-testing

# Check if file was created
ls -la src/posts/[generated]*
```

### Can't Publish Draft

**Problem**: `npm run content:publish` fails

**Solution**:
```bash
# Verify you're on main branch
git checkout main

# Pull latest changes
git pull origin main

# Try publishing again
npm run content:publish
```

### Cron Not Running

**Problem**: No drafts appear at 6 AM EST

**Solution**:
1. Check Vercel dashboard → Cron Jobs
2. Verify `CRON_SECRET` environment variable is set
3. Check function logs: `api/cron/generate-content.ts`
4. Manually trigger: `npm run content:draft` to test

### Sources Not Found

**Problem**: Draft created but sources are placeholder data

**Solution**: This is the current behavior (mock data). To integrate real search:

1. Get API keys:
   - YouTube Data API (Google Cloud Console)
   - Dev.to API (dev.to/api/docs)
   - Hashnode API (hashnode.com/api)

2. Update `scripts/generate-draft.js`:
   - Replace `searchContent()` function
   - Call real APIs instead of returning mock data

3. Parse results and extract:
   - Title, URL, source, publication date, view counts

---

## Future Enhancements

Potential improvements (not yet implemented):

- [ ] **Real API integration** — Replace mock data with actual YouTube/Dev.to/Hashnode APIs
- [ ] **AI Summaries** — Use Claude API to generate intelligent summaries
- [ ] **Smart Filtering** — Filter sources by relevance score or engagement
- [ ] **Email notifications** — Notify you when new drafts are ready
- [ ] **Category-based scheduling** — Different topics on different days
- [ ] **Dashboard UI** — Review and approve drafts via web interface
- [ ] **Collaboration** — Share drafts with co-authors

---

## Related Documents

- [[PROJECT.md]] — Project overview
- [[PROGRESS.md]] — Development timeline
- [[DECISIONS.md]] — Architecture decisions
- [[CLAUDE.md]] — Development guidelines
