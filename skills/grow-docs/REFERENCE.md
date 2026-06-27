# grow-docs — Reference

## Note template

```md
# Concept Title

One-sentence definition. ^concept-definition

## Key facts

- Fact one ^fact-one
- Fact two

## How it connects

- [[Related Concept A|how A relates here]]
- [[Related Concept B#^specific-section|specific point in B]]

## See also

[[Parent Domain Index]]
```

---

## Wikilink style guide

| Intent | Syntax | Example |
|---|---|---|
| Link to a note | `[[Note Title\|display text]]` | `[[JWT Auth\|token validation]]` |
| Link to a block | `[[Note Title#^ref\|display text]]` | `[[Auth Flow#^jwt-middleware\|the middleware]]` |
| Link to a heading | `[[Note Title#Heading\|display text]]` | `[[Editor#State Machine\|state machine]]` |

**Rules:**
- Always use `|display text` — never expose raw note titles mid-sentence.
- Add a `^anchor-id` to any paragraph you expect others to reference.
- Anchor IDs are `kebab-case`, unique within the file.

---

## Folder placement rules

| Concept type | Domain folder | Example path |
|---|---|---|
| UI components, React state, editor, dashboard | `frontend/` | `frontend/editor/state-machine.md` |
| API routes, services, DB models, jobs | `backend/` | `backend/auth/jwt.md` |
| Concepts spanning both (e.g. data-model, error codes) | `shared/` | `shared/data-model/page-schema.md` |
| Docker, CI, deployment, environment config | `infra/` | `infra/docker/dev-setup.md` |

Each concept lives in a **folder** inside the domain, not as a loose file in the domain root.
If a concept folder grows beyond 5 notes, split it into named subfolders.

---

## Index format

Each `_index.md` is a flat list of wikilinks with one-line descriptions:

```md
# Frontend

- [[Editor]] — the visual page editor, state machine, and element selection
- [[Dashboard]] — user project list, settings entry point
- [[Grid System]] — layout engine used inside the editor
```

`_map.md` (root) links to each domain index:

```md
# Instago — Obsidian Map

- [[frontend/_index|Frontend]] — UI, editor, dashboard
- [[backend/_index|Backend]] — API, services, auth, payments
- [[shared/_index|Shared]] — cross-cutting models and concepts
```
