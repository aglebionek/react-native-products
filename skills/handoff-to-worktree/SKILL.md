---
name: handoff-to-worktree
description: Crystallise the current conversation into a plan, save it to the session workspace, and give the user an exact prompt to paste into a fresh session to implement it. Use when the user wants to hand off a plan to a new session, or says "handoff", "save plan", or "start in new session".
---

# Handoff to Worktree

You are closing out a planning conversation and handing it off to a fresh implementation session.

## Steps

### 1. Synthesise the problem from the conversation, or use a plan directly if one was already created.

From the conversation so far, extract:

- **Problem** — one paragraph: what is broken or missing, and why it matters
- **Approach** — the chosen solution strategy (not alternatives)
- **Provider / module tree** — if architectural, show the nesting/dependency order
- **Interfaces** — the new public interfaces (hooks, functions, types) with their fields
- **Files to create/modify** — exhaustive list with one-line descriptions
- **Key decisions** — decisions already made that must NOT be re-litigated (record the reason too)
- **Migration strategy** — if applicable, how existing consumers/callers are handled
- **Branch name** — suggest a kebab-case branch name (e.g. `refactor/project-context-split`)

Be exhaustive. The fresh session will have no memory of this conversation.

### 2. Save the plan

Save to: the session plan file (the agent knows its own session plan path from `<session_context>`).

Use the `create` tool (not `edit`) since the plan file may not exist yet. If it already exists (as in this conversation), use `edit` to overwrite its content.

Make sure the plan includes the [testable-module](../testable-module/SKILL.md) strategy in the implementation steps, so the implementer knows to follow those as well.

### 3. Print the handoff block

Print this exact block at the end of your response, filled in:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 HANDOFF READY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Read <PLAN_FILE_PATH> and implement it.
  Branch: <BRANCH_NAME>
  Model: claude-sonnet-4.6
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Replace `<PLAN_FILE_PATH>` with the actual absolute path to the saved plan file.
Replace `<BRANCH_NAME>` with the suggested branch name.

### 4. Stop

Do not ask follow-up questions. Do not start implementing. Stop after printing the handoff block.
