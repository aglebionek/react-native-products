---
name: testable-module
description: Guides refactoring code as a testable module with a clear pure-function API. Follows a TDD flow: agree on contract → write tests → implement. Use when user wants to make code testable, extract a module API, says "make testable", "module API", or "rewrite as module".
---

# Testable Module

A **module** is any unit of code (functions, classes, files, helpers) that can be expressed as a clear public API: defined input → defined output. The internal implementation doesn't matter; only the contract does. This makes tests trivial to write and the code easy to document and hand off.

## Quick Start

The output type should always be **data** (plain objects / typed configs), never UI components or side effects. This keeps the pure function free of framework dependencies and makes it directly unit-testable.

## Workflow

### Phase 1 — Discover the API

If the user has an API in mind, confirm it. Otherwise, analyze the code:
- What is the single "question" this code answers?
- What is the minimal input needed to answer it?
- What is the output shape that fully describes the answer?

If anything is ambiguous, [grill the user](../grill-me/SKILL.md) until you have a clear API contract.

Propose a pure function signature. Example for a popup:
```ts
getPopupOptions(target: HTMLElement, context: ProjectContext): PopupOption[]
```
Ask the user to confirm or adjust before proceeding.

### Phase 2 — Identify Fixtures

List what realistic input examples are needed to cover the important cases. For DOM-heavy code, these become `.html` fixture files in the project's shared fixtures folder (e.g. `test/fixtures/`). For other code, they become inline data objects in the test file.

Ask the user to confirm the fixture list before writing them.

### Phase 3 — Write Tests (TDD)

Using the existing test setup (do not introduce a new test runner):
1. Write tests that import the pure function and call it with fixtures
2. Cover the main cases and edge cases identified in Phase 2
3. Do **not** run the tests yet — they should fail (function doesn't exist)

### Phase 4 — Implement

Write the pure function that makes all tests pass:
- Extract the conditional logic from the existing messy code
- Zero side effects, zero UI imports
- All dependencies injected as arguments

Run the tests. Iterate until all pass.

### Phase 5 — Check docs

Before summarising, grep `docs/obsidian/` for any notes that reference the module or file being rewritten:

```bash
grep -rl '<module-name>\|<file-name>' docs/obsidian/
```

For each note found, check if the rewrite changed anything the note describes (file path, function signature, behaviour, API shape). If so, update the note inline. Report which notes were touched (or "no docs to update" if none found).

### Phase 6 — Summarize

Write a brief summary to the user containing:
- The agreed API signature(s)
- The test cases covered
- A one-paragraph description of the module's contract

This summary can be pasted into a new agent session as a seed for a full refactoring plan (wiring the new module back into the original component).

## Examples

See [EXAMPLES.md](EXAMPLES.md) for the Popup module walkthrough.
