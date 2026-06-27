# Testable Module — Examples

## Popup.jsx walkthrough

### Phase 1 — Discover

**Existing code**: `Popup.jsx` — 394-line React component. Takes `currentTarget` from context and renders different sub-popups based on dozens of conditions about the target element.

**Single question**: "Given an element the user clicked, what popup options are available?"

**Proposed API**:
```ts
type PopupOption =
  | { type: 'editableText';  target: HTMLElement }
  | { type: 'image';         target: HTMLElement; fromBg: boolean }
  | { type: 'navigation';    target: HTMLElement }
  | { type: 'visibility';    target: HTMLElement }
  | { type: 'addToChat' }
  | { type: 'delete' }
  | { type: 'close' }
  // ... etc

function getPopupOptions(target: HTMLElement): PopupOption[]
```

### Phase 2 — Identify Fixtures

Cases that need HTML fixtures in `test/fixtures/popup/`:
- `text-node.html` — a `<p>` element with text
- `inside-header.html` — an element inside `<header>`
- `hero-section.html` — a section with the hero image structure
- `grid-container.html` — an element with `grid-inner-container` class
- `list-item.html` — an `<li>` with a child `<span>`
- `button-primary.html` — an `<a>` inside a primary button wrapper

### Phase 3 — Tests (sketch)

```js
import { getPopupOptions } from '../getPopupOptions';
import { JSDOM } from 'jsdom'; // or whatever the test env provides

test('text node gets editableText option', () => {
  const dom = new JSDOM(fs.readFileSync('test/fixtures/popup/text-node.html'));
  const target = dom.window.document.querySelector('p');
  const options = getPopupOptions(target);
  expect(options.some(o => o.type === 'editableText')).toBe(true);
});

test('element inside header does not get addToChat option', () => {
  const dom = new JSDOM(fs.readFileSync('test/fixtures/popup/inside-header.html'));
  const target = dom.window.document.querySelector('[data-test-target]');
  const options = getPopupOptions(target);
  expect(options.some(o => o.type === 'addToChat')).toBe(false);
});
```

### Phase 4 — Implementation sketch

```js
// getPopupOptions.js
export function getPopupOptions(target) {
  const options = [];
  const tag = target.tagName.toLowerCase();

  if (!isInsideHeader(target)) {
    options.push({ type: 'addToChat' });
  }

  if (TEXT_NODES.includes(tag)) {
    const textTarget = getTextEditTarget(target);
    if (textTarget) options.push({ type: 'editableText', target: textTarget });
  }

  // ... all the other conditions, migrated from Popup.jsx

  options.push({ type: 'close' });
  return options;
}
```

### Phase 5 — Summary (example output)

> **Module**: `getPopupOptions`
> **Signature**: `getPopupOptions(target: HTMLElement) => PopupOption[]`
> **Contract**: Given a DOM element that the user clicked in the editor, returns the ordered list of popup actions available for that element. All branching logic (inside header, text node, hero section, etc.) is encapsulated here. The caller is responsible only for rendering the returned options.
> **Tests cover**: text node, inside-header, hero section image, grid container, list item, primary button.
>
> *Next step for a refactoring session*: wire `Popup.jsx` to call `getPopupOptions(currentTarget)` and map the result to `<PopupButton>` / sub-popup components.
