# Health Check Command

## Story
As a developer, I want a single command to verify the dev environment is healthy so that I can quickly catch build, type, and test failures before committing.

## Acceptance Criteria
- [ ] `npm run health` command exists and runs successfully
- [ ] Command runs: `npm run check` (type checking)
- [ ] Command runs: `npm run test` (unit tests, fails if tests fail)
- [ ] Command runs: `npm run build` (build validation)
- [ ] Output clearly shows: PASS ✓ or FAIL ✗ for each check
- [ ] Exit code is 0 if all pass, 1 if any fail
- [ ] Command completes in under 30 seconds

## Demo
```bash
$ npm run health

🏥 Health Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Type Check     [0.5s]
✅ Tests          [2.1s]
✅ Build          [5.3s]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Environment healthy
```

## Notes
- This is a convenience script, not required for shipping
- Can be run before committing or as part of pre-commit hooks later
- Helpful for catching issues locally before CI runs

## Status
- [x] Not started
- [ ] In progress
- [ ] Done
