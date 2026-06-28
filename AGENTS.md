## Base
This repository is a product tracking android app created with React Native Expo.

## Rules
ALWAYS use grill-me if you're unsure about something.
NEVER start implementing a plan before user approval.
NEVER commit anything unless asked to.
NEVER delete worktrees until asked to.

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
- `./skills/worktree/SKILL.md`: A set of instructions and scripts for creating and managing git worktrees for this repository. Use when user wants to create a worktree for agent sessions/code changes/plan implementation.
- `./skills/write-a-skill/SKILL.md`: Create new agent skills with proper structure, progressive disclosure, and bundled resources. Use when user wants to create, write, or build a new skill.

### Tests
All tests related to the repo should live in the `./tests` dir.