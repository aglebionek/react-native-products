---
name: create-gh-issue
description: Create GitHub issues with the `gh` CLI using repository issue templates from `.github/ISSUE_TEMPLATE/*.yml`. Use when the user wants to open, draft, or convert work into a GitHub issue, especially for bug, feature, refactor, infra, or agent-task requests.
---

# Create GitHub Issue

Create the issue yourself with `gh issue create`. Do not stop at a suggested draft unless the user explicitly asks for draft-only output.

## Workflow

1. Read `.github/ISSUE_TEMPLATE/*.yml` and pick the closest template.
2. Extract every required field from that template in order.
3. If the conversation is missing required information, ask focused follow-up questions one at a time.
4. Build a markdown body whose section headings match the template labels exactly and appear in the same order.
5. Create the issue non-interactively with `gh issue create --title ... --body-file ... --label ...`.
6. Return the created issue number and URL.

## Template selection
- `.github/ISSUE_TEMPLATE/agent-task.md`: Well-bounded task intended for AI-assisted execution.
- `.github/ISSUE_TEMPLATE/bug.md`: Report a defect with clear scope and reproducible behavior.
- `.github/ISSUE_TEMPLATE/config.md`: Define or update a configuration setting, with clear parameters and expected impact.
- `.github/ISSUE_TEMPLATE/feature.md`: Request or define a scoped feature.
- `.github/ISSUE_TEMPLATE/infra.md`: Infrastructure, CI, release, or automation change.
- `.github/ISSUE_TEMPLATE/refactor.md`: Structural/code quality change without intended behavior changes.

## Rules

- Prefer `gh` over browser links or manual issue URLs.
- Match the template's title prefix and default label.
- Keep the body concise, but never omit required sections.
- If a section is intentionally empty, write `None.` instead of leaving it blank.
- If the user gives a plan or conversation and wants an issue, compress it into the template instead of pasting raw notes.
- If the repository is ambiguous, resolve it before creating the issue.
- If `gh` authentication or repo access is missing, surface that blocker plainly.

## Body shape

Render each required field like this:

```md
## Goal
...

## Scope
...
```

Use bullets when they scan better than prose. For dropdowns like risk, write the selected value as plain text in its section.

## Command pattern

Use this shape, filling in the chosen template details:

```bash
gh issue create \
  --repo OWNER/REPO \
  --title "[repo] Type: concise summary" \
  --label "template-label" \
  --body-file /tmp/issue-body.md
```
