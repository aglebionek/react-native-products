---
name: grow-docs
description: Writes and expands an Obsidian knowledge vault at docs/obsidian/ for this repo. Creates clusters of brief, wikilinked notes from codebase exploration, then audits the vault for broken wikilinks and surfaces gaps. Use when user wants to document, expand, or map the codebase in Obsidian, or says "grow docs", "document X", "add obsidian docs", or "expand the vault".
---

# grow-docs

## Workflow

1. **Check the concept** — does it have a coherent identity an engineer would look up? (`auth`, `payments`, `grid` ✓ — `hooks`, `utils`, `helpers` ✗ — those belong inside the concepts they serve)
2. **Explore** — grep/glob the code area; read `docs/obsidian/` for existing notes to link to; check `.aglebionek/docs/` for reference material
3. **Write a cluster** — 2–5 brief notes (≤40 lines each); see [REFERENCE.md](REFERENCE.md) for note format and link style
4. **Update indexes** — add wikilinks to the new notes in the relevant `_<concept>.md`
5. **Audit gaps** — run the script below; surface results as "Gaps to fill next"
6. **Report** — notes created + gaps list

**Link pass** (run after several clusters land, or on request — "link pass", "enrich links"): scan notes for plain text that names an existing concept but isn't yet a wikilink; upgrade first occurrence per paragraph to `[[basename|text]]`; max 2–3 new links per note; skip code blocks and already-linked text; report each file touched.

---

## Vault layout

```
docs/obsidian/
├── _map.md                   ← root index
├── frontend/  (= client/)    ├── backend/  (= server/)
├── shared/    (cross-cutting) └── infra/   (Docker, CI, env)
    └── <concept>/
            ├── _<concept>.md     ← concept index (e.g. _editor.md, _auth.md)
            └── <note>.md         (subfolder if concept > 5 notes)
```

Never put notes directly in a domain root. New domain → add to `_map.md`.

---

## Gap audit

```bash
grep -roh '\[\[[^]]*\]\]' docs/obsidian/ \
  | sed 's/^\[\[//;s/\]\]$//' | sed 's/|.*//' | sed 's/#.*//' | grep -v '^$' \
  | sed 's|\.\./||g' | sort -u > /tmp/linked.txt
find docs/obsidian/ -name '*.md' | sed 's|^docs/obsidian/||;s|\.md$||' | sort -u > /tmp/existing_paths.txt
find docs/obsidian/ -name '*.md' | sed 's|.*/||;s|\.md$||' | sort -u > /tmp/existing_names.txt

# path-qualified gaps
comm -23 /tmp/linked.txt /tmp/existing_paths.txt | grep '/' | while read path; do
  base=$(echo "$path" | sed 's|.*/||')
  if [[ "$base" == _* ]] || ! grep -qx "$base" /tmp/existing_names.txt; then echo "$path"; fi
done

# short-name gaps
comm -23 /tmp/linked.txt /tmp/existing_paths.txt | grep -v '/' | while read name; do
  grep -qx "$name" /tmp/existing_names.txt || echo "$name"
done
```

