---
name: worktree
description: A set of instructions and scripts for creating and managing git worktrees for this repository. Use when user wants to create a worktree for agent sessions/code changes/plan implementation.
---

## Worktree Setup
1. Run bashscript to create a new worktree for your session (replace placeholders):
./scripts/createWorktree.sh <branch-name> <model-name> "<one-line-task-description>"

2. Save your plan and all .md files related to the worktree in repo root under ./.codex/<branch-name>/*

3. Show me worktree info at the very start of your first response, before doing anything else:
```
📂 Worktree: ../worktrees/<branch-name>
🌿 Branch: <branch-name>
🤖 Model: <model-name>
```

## Parameters
- branch-name: A unique name for the worktree branch (e.g., `feature/avatar-upload`). This is the name of the git branch that will be created for this session's worktree.
- path-to-worktree: The directory path where the worktree will be created (e.g., `/home/user/project/worktrees/feature-avatar-upload`). This should be outside the main checkout to avoid confusion.
- model-name: The AI model you used for this session (e.g., `claude-sonnet-4.6`).
- task: A one-line description of the task for this session (e.g., "Add user avatar upload feature").

## Scripts
- `./scripts/checkIfAlreadyInWorktree.sh`: Checks if the current directory is already inside a git worktree and exits with an error if so, to prevent nesting worktrees.
- `./scripts/createWorktree.sh <branch-name> <model-name> "<one-line-task-description>"`: Creates a new git worktree for the session, sets up symlinks for shared resources, and saves session metadata.
- `./scripts/list_worktrees.sh`: Lists all existing worktrees with their branch names and paths.
- `./scripts/removeWorktree.sh <path-to-worktree>`: Removes the specified worktree and deletes its branch.
