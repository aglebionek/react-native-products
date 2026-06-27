## Base
This repository is a product tracking android app created with React Native Expo.

## Rules
To prevent conflicts, every session MUST work in its own git worktree, never in the main checkout.
ALWAYS use grill-me if you're unsure about something.
NEVER start implementing a plan before user approval.
ONLY edit files in the main checkout if asked to.
NEVER commit anything unless asked to.
NEVER delete worktrees until asked to.

## Worktree Setup
1. Run bashscript to create a new worktree for your session (replace placeholders):
./scripts/worktree/createWorktree.sh <branch-name> <model-name> "<one-line-task-description>"

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

## Model resources

### Docs
Obsidian-like distributed docs explaining code elements in `./docs`
`GLOSSARY.md` - This file holds stable terminology for this repo and its workflows.

### Skills
When you want to invoke a skill, read the appropriate skill file.
- `./skills/answer-and-stop/SKILL.md`: Answer the user's question and stop. Use when the user wants a direct answer without further questioning, or types a&s.
- `./skills/caveman/SKILL.md`: Use when user says "caveman mode", "talk like caveman", "use caveman", or invokes /caveman.
- `./skills/create-gh-issue/SKILL.md`: Uses gh cli to create an issue in the repo. Use when asked to create an issue.
- `./skills/grill-me/SKILL.md`: Interview the user relentlessly about a plan or design until reaching shared understanding, resolving each branch of the decision tree. Use when user wants to stress-test a plan, get grilled on their design, or mentions "grill me".
- `./skills/grow-docs/SKILL.md`: Expands documentation. Use when user mentions "grow-docs".
- `./skills/handoff-to-worktree/SKILL.md`: Crystallise the current conversation into a plan, save it to the session workspace, and give the user an exact prompt to paste into a fresh session to implement it. Use when the user wants to hand off a plan to a new session, or says "handoff", "save plan", or "start in new session".
- `./skills/improve-codebase-architecture/SKILL.md`: Identify and present opportunities to deepen the architecture of the codebase for better locality and leverage. Use when user wants to improve codebase architecture, or says "improve architecture", "deepen architecture", "refactor for locality", or "refactor for leverage".
- `./skills/review-intent-and-coverage/SKILL.md`: Use when user asks for a review of current changes, to validate intent, or to check whether tests and coverage are sufficient.
- `./skills/testable-module/SKILL.md`: Guides refactoring code as a testable module with a clear pure-function API. Follows a TDD flow: agree on contract → write tests → implement. Use when user wants to make code testable, extract a module API, says "make testable", "module API", or "rewrite as module".
- `./skills/write-a-skill/SKILL.md`: Create new agent skills with proper structure, progressive disclosure, and bundled resources. Use when user wants to create, write, or build a new skill.

### Scripts
- `./scripts/checkIfAlreadyInWorktree.sh`: Checks if the current directory is already inside a git worktree and exits with an error if so, to prevent nesting worktrees.
- `./scripts/createWorktree.sh <branch-name> <model-name> "<one-line-task-description>"`: Creates a new git worktree for the session, sets up symlinks for shared resources, and saves session metadata.
- `./scripts/list_worktrees.sh`: Lists all existing worktrees with their branch names and paths.
- `./scripts/removeWorktree.sh <path-to-worktree>`: Removes the specified worktree and deletes its branch.

### Tests
All tests related to the repo should live in the `./tests` dir.