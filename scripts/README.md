# Scripts

Utility scripts for managing the SvelteThree project.

## show-tasks.sh

**Display the task dashboard and see what's being worked on.**

```bash
bash scripts/show-tasks.sh
```

### What It Shows

- **Ready Tasks** — Next in the queue, sorted by priority (auto-picked by monitor every 30 min)
- **Pending Tasks** — Approved but waiting for dependencies or approval
- **In Progress** — Currently being worked on by agents
- **Completed** — Finished tasks

### Output Format

```
[task-001] Task Title
   Status: ▶ ready | Priority: HIGH
```

Status indicators:
- `✓ complete` — Done ✅
- `⟳ in_progress` — Currently working 🔄
- `▶ ready` — Next in queue ⏭️
- `○ pending` — Waiting for approval ⏸️

Priority:
- `HIGH` — Critical path
- `MED` — Important
- `LOW` — Nice to have

### Example Output

```
═══════════════════════════════════════════════════════════════
  SvelteThree Task Dashboard
═══════════════════════════════════════════════════════════════

READY TASKS (Auto-picked next)
───────────────────────────────────────────────────────────────
  [task-001] Integrate Experience Section
     Status: ▶ ready | Priority: HIGH

  [task-002] Integrate Projects Section
     Status: ▶ ready | Priority: HIGH

Summary: 4 ready | 2 pending | 0 in progress | 0 complete
═══════════════════════════════════════════════════════════════
```

### How It Works

- Parses all task files in `docs/Tasks/`
- Extracts: id, title, status, priority, dependencies
- Groups by status
- Displays with color coding for easy scanning
- Updates in real-time from the task files

### Adding to Shell Alias (Optional)

Add to your `.zshrc` or `.bashrc`:

```bash
alias tasks='bash scripts/show-tasks.sh'
```

Then just run: `tasks`

## Task Automation

The task system includes:

1. **Monitor** — Runs every 30 minutes
2. **Auto-invokes agents** — When a "ready" task is found
3. **Auto-commits & updates docs** — When work is done
4. **Marks complete** — When task is finished

See `docs/Tasks/TASKS.md` for more details.
