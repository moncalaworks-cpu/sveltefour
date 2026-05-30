# Phase Completion Checklist

When completing each phase, follow this checklist to ensure proper documentation and GitHub tracking.

---

## For Each Completed Phase

### 1. Testing ✅
- [ ] All tests passing (`npm run test`)
- [ ] Type checking passes (`npm run check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Code coverage documented

### 2. Code Commit ✅
- [ ] Commit with detailed message
- [ ] Commit message includes:
  - Phase name and status (COMPLETE ✅)
  - List of deliverables
  - Test results
  - Files created/modified
  - Co-authored-by line
- [ ] Push to GitHub

### 3. GitHub Issue Update ✅
- [ ] Add comment with:
  - ✅ Deliverables completed
  - Test results
  - Test coverage
  - Key accomplishments
- [ ] Add comment with security/architecture notes if applicable
- [ ] **Close the issue** with `gh issue close`

### 4. Documentation Update ✅
- [ ] Update `docs/PROJECT_OVERVIEW.md`:
  - Change phase status from 🔴 to 🟢/✅
  - Update completion date
  - Update test count
- [ ] Commit documentation updates

### 5. Task Tracking ✅
- [ ] Mark task as completed in Claude Code
- [ ] Note what was accomplished

---

## Example: Phase 1 Completion

### ✅ Testing
```bash
npm run test
# Result: 82/82 tests passing
npm run check
# Result: 0 errors
npm run build
# Result: Build successful
```

### ✅ Code Commit
```bash
git add -A
git commit -m "Phase 1: Core Setup - Product types, cart store, unit tests

PHASE 1 COMPLETE ✅

Deliverables:
- Product types & 150 SKU generation
- Cart store with localStorage
- 27 unit tests (all passing)
- Documentation: PROJECT_OVERVIEW.md, ACCEPTANCE_CRITERIA.md

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"

git push
```

### ✅ GitHub Issue Comment
```bash
gh issue comment 1 -R moncalaworks-cpu/sveltefour --body "## Phase 1 Complete ✅

### Deliverables
- ✅ Product types defined
- ✅ Cart store with localStorage
- ✅ 27 unit tests passing
- ✅ Documentation created

Test Results:
- npm run test: 82/82 passing
- Coverage: On track for 80%+
"
```

### ✅ GitHub Issue Close
```bash
gh issue close 1 -R moncalaworks-cpu/sveltefour --comment "Phase 1 completed! Moving to Phase 2"
```

### ✅ Documentation Update
Update `docs/PROJECT_OVERVIEW.md`:
```markdown
### Phase 1: Core Setup (Days 1-2)
**Status:** ✅ COMPLETED (2026-05-30)
...
```

### ✅ Task Update
```bash
# Mark task as completed in Claude Code
TaskUpdate taskId=1 status=completed
```

---

## Phase Completion Template

Use this template for each phase:

```markdown
## Phase [N]: [Name] Complete ✅

### Deliverables
- ✅ [Item 1]
- ✅ [Item 2]
- ✅ [Item 3]

### Testing
- npm run test: [X] tests passing
- npm run check: 0 errors
- npm run build: success
- Coverage: [X%]

### Files Created
- [file1]
- [file2]

### Key Accomplishments
- [Achievement 1]
- [Achievement 2]

### Commit
- Commit: [hash]
- Push: ✅ Completed

### Next Phase
Ready for Phase [N+1]: [Name]
```

---

## GitHub Issue Workflow

1. **Open**: Issue created for each phase
2. **In Progress**: Work on phase, commit regularly
3. **Completed**: Add final comment, close issue
4. **Tracking**: GitHub project board shows progress

---

## Security & Legal Checklist

For each phase, ensure:
- [ ] No sensitive data in logs
- [ ] No API keys hardcoded
- [ ] Environment variables for secrets
- [ ] HTTPS used for all connections
- [ ] Input validation on forms
- [ ] No SQL injection vulnerabilities
- [ ] CORS properly configured

See `docs/SECURITY_AND_LEGAL.md` for detailed requirements.

---

**Last Updated:** 2026-05-30  
**Example:** Phase 1 completion (see above)
