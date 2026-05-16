# Project Management System Guide

Your personal PM system is now live. This document explains how everything works together.

---

## 🎯 The 5-Principle System

1. **Capture everything, commit to nothing immediately** — ideas go to inbox first
2. **No story = no start** — write a user story before any code
3. **Time blocking is a commitment** — Calendar blocks are real meetings
4. **Done = story satisfied + demo-able** — not done until acceptance criteria pass
5. **Weekly review closes the loop** — every Monday 9am, triage and plan

---

## 📁 File Structure

```
docs/
├── INBOX.md                    # Raw ideas (one per line, no formatting)
├── stories/                    # Feature stories
│   ├── 2026-05-16-health-check-command.md
│   └── [YYYY-MM-DD]-[slug].md
├── reviews/                    # Weekly review documents
│   ├── TEMPLATE.md             # Copy this each week
│   └── 2026-05-20-weekly-review.md
├── PM-SYSTEM.md               # This file
└── [other docs]
```

---

## 🚀 Workflow: Idea → Story → Shipped

### 1. Idea Arrives (5 seconds)
Drop it in `docs/INBOX.md`:
```markdown
## 2026-05-16 — Feature Name
One sentence description of what you want to build.
```

**Rule**: Never act directly on an inbox idea. It must be promoted to a story first.

---

### 2. Weekly Review (1 hour, Mondays at 9am)
Use the template in `docs/reviews/TEMPLATE.md`. Your ritual:

1. **Triage inbox**: Read `docs/INBOX.md`
   - Promote ideas to stories OR delete them
2. **Review done**: What shipped this week? Show it off.
3. **Check active story**: Is it still the right thing? Are criteria still accurate?
4. **Plan next week**: Pick one top priority story
5. **Schedule blocks**: Make sure you have 3 Dev Blocks on the calendar

**Output**: A filled-in review document like `docs/reviews/2026-05-20-weekly-review.md`

---

### 3. Create Story (10 minutes)
Copy the template from an existing story, or use this:

```markdown
## Story
As a [role], I want [action] so that [outcome].

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Demo
What does "working" look like? What would you show someone?

## Notes
Any technical context, constraints, or dependencies.

## Status
- [ ] Not started
- [ ] In progress
- [ ] Done
```

**Example**: See `docs/stories/2026-05-16-health-check-command.md`

---

### 4. Dev Block (2 hours, Tue/Wed/Thu 10am)
**Before**: Notifications off. Phone away. One story active.

**During**: Work on the story. Only that story.

**After**: Mark acceptance criteria as you complete them.

---

### 5. Story Done
All acceptance criteria are checked ✓ and you can demo it:
- Update story status to "Done"
- Describe the demo in the story file
- The story is now listed in next week's review under "Done"

---

## 📅 Google Calendar Events

You have 3 recurring blocks:

| Block | When | Duration | Purpose |
|-------|------|----------|---------|
| **Dev Block** | Tue/Wed/Thu 10am | 2 hrs | Focused work on one story |
| **Weekly Review** | Monday 9am | 1 hr | Triage, review, plan |
| **Learning Block** | Friday 3pm | 1 hr | Explore, read, experiment |

**Adjust times**: Open Google Calendar and edit the recurring events.

---

## 📧 Google Workspace Integration

### Drive
- Weekly reviews are stored in `docs/reviews/`
- Run `npm run backup:docs` to create zipped backups
- Upload them to Drive > Obsidian Backups folder

### Calendar
- Your 3 recurring blocks are already live
- Each Monday 9am is your review ritual
- Each Dev Block description shows which story you're working on

### Gmail
- Ask Claude Code: "Send me an email notification when the backup completes"
- Or run `npm run backup:notify` to see the notification content

---

## 💾 Scripts & Commands

```bash
# Create a backup of docs/ folder
npm run backup:docs

# Find and show the latest backup
npm run backup:docs:upload

# Show backup email content (manual for now)
npm run backup:notify
```

---

## 🔄 Weekly Rhythm (Your New Reality)

**Monday 9:00 AM** (1 hour)
- Read INBOX.md
- Decide what to work on next week
- Schedule 3 Dev Blocks (Tue/Wed/Thu 10am)
- Write review document

**Tuesday, Wednesday, Thursday 10:00 AM** (2 hours each)
- Work on the active story
- Check off acceptance criteria as you go
- Close email, notifications off

**Friday 3:00 PM** (1 hour)
- No pressure to ship
- Read docs, try new things, explore
- Maybe find your next idea for the inbox

---

## 📊 Metrics to Track

In each weekly review, log:
- **Features completed**: How many stories shipped?
- **Ideas captured**: How many ideas made it to the inbox?
- **Dev hours spent**: Total hours in Dev Blocks
- **Blockers**: What got in the way?

Over time, you'll see patterns. Celebrate wins.

---

## 🎓 Best Practices

### Inbox
- ✅ Keep it messy, that's the point
- ✅ One-liner ideas are enough
- ❌ Don't overthink it
- ❌ Don't act on ideas directly from the inbox

### Stories
- ✅ User story + acceptance criteria
- ✅ Clear "done" criteria (demo section)
- ✅ One story at a time during Dev Blocks
- ❌ Don't wait for perfect criteria, "good enough" works

### Reviews
- ✅ Do it every week, same time
- ✅ Use the template, fill it in honestly
- ✅ Celebrate done work, note blockers
- ❌ Don't skip reviews even if nothing shipped
- ❌ Don't schedule work after reviews, plan first

### Time Blocks
- ✅ Block on the calendar before the work
- ✅ Close email, notifications off during Dev Blocks
- ✅ Reschedule if interrupted, don't just skip
- ❌ Don't use Dev Blocks for email or meetings
- ❌ Don't multitask during focused blocks

---

## 🚨 Getting Unstuck

**Too many ideas piling up?**
→ Do a review. Triage and delete ideas you don't care about.

**Lost motivation?**
→ Pick an easier story. Ship it. Build momentum.

**Calendar blocks keep getting cancelled?**
→ Move them to times when you actually work. Respect your own time.

**Story is too big?**
→ Break it into smaller stories. A story should fit in 1-2 weeks.

**Acceptance criteria unclear?**
→ Ask: "What would I demo?" That's your clarity check.

---

## 🔗 Quick Reference

- **Inbox**: `docs/INBOX.md`
- **Stories**: `docs/stories/`
- **Reviews**: `docs/reviews/`
- **Calendar**: Google Calendar (3 recurring blocks)
- **Backups**: `.backups/` (git-ignored)

---

**Last updated**: 2026-05-16
**Next Monday review**: 2026-05-20 at 9:00 AM
