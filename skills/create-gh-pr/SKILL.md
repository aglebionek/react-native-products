---
name: create-gh-pr
description: Create GitHub pull requests with the `gh` CLI using the repository pull request template from `.github/PULL_REQUEST_TEMPLATE.md`. Use when the user wants to open, draft, or convert completed work into a pull request, especially when the PR body must match the repository template.
---

# Create GitHub Pull Request

Create the pull request yourself with `gh pr create`. Do not stop at a suggested draft unless the user explicitly asks for draft-only output.

## Workflow

1. Read `.github/PULL_REQUEST_TEMPLATE.md`.
2. Gather the branch, base branch, title, and every required template section.
3. If the conversation is missing required information, ask focused follow-up questions one at a time.
4. Build a markdown body that follows the template structure and remove sections the template marks as optional when they are not needed.
5. Create the PR non-interactively with `gh pr create --base ... --head ... --title ... --body-file ...`.
6. Return the created PR number and URL.

## Rules

- Prefer `gh` over browser links or manual compare URLs.
- Match the repository template structure closely.
- Remove placeholder text, empty bullets, and empty optional sections.
- Keep the body concise, but do not omit required decisions such as risk level.
- If the user gives a plan, branch diff, or issue, compress it into the PR template instead of pasting raw notes.
- If the repository, head branch, or base branch is ambiguous, resolve it before creating the PR.
- If the branch has not been pushed yet, surface that blocker plainly.
- If `gh` authentication or repo access is missing, surface that blocker plainly.

## Body shape

Render the sections in template order and preserve checklist semantics where present.

```md
## Summary
- Briefly explain what changed and why.
```

For single-choice checklist sections such as risk level, mark exactly one option.

## Command pattern

Use this shape, filling in the chosen branch details:

```bash
gh pr create \
  --repo OWNER/REPO \
  --base BASE_BRANCH \
  --head HEAD_BRANCH \
  --title "concise PR title" \
  --body-file /tmp/pr-body.md
```
