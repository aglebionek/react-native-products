---
name: review-intent-and-coverage
description: Reviews the current code changes, confirms whether they match the intended behavior, and then verifies or expands test coverage. Use when the user asks to inspect current changes, validate intent, or check whether tests and coverage are sufficient.
---

# Review Intent And Coverage

## Workflow

1. Inspect the current changes first.
   Default to staged changes unless the user clearly asks for unstaged or all local changes.

2. Summarize what the changes do.
   Keep the summary concrete and behavioral, not file-by-file unless that adds clarity.

3. Ask the user whether the summary matches the intended change.

4. If the user says yes:
   - Review the relevant tests and current coverage around the changed behavior.
   - Run the smallest relevant test set first.
   - Expand tests when key paths, regressions, or edge cases are not covered.
   - Re-run the relevant tests after changes.

5. If the user says no:
   - Ask what the intended behavior is.
   - Clarify any missing constraints.
   - Continue to plan before implementation.

## Review Focus

- Main behavior introduced or changed by the diff
- Gaps between implementation and stated intention
- Missing positive-path, negative-path, and dry-run or error-path coverage when relevant
- Whether the existing tests prove the intended behavior instead of only exercising mocks

## Constraints

- Do not assume the diff is correct just because it matches the apparent intention.
- Prefer targeted tests over broad suites when verifying the changed behavior.
- If unrelated failures exist, separate them from findings about the current change.
- If the repo has local instructions about planning or approvals, follow them before implementing fixes.
