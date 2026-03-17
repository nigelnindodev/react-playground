# Accordion Challenge

Build an accordion component where only one panel can be open at a time.

## Requirements

1. Render at least **3 accordion items**, each with a title and body text
2. Clicking a title expands that item's body content
3. Only **one item can be open at a time** — opening one closes any previously open item
4. Clicking an already-open item's title closes it (toggle behaviour)
5. Display a visual indicator (e.g. "▼" / "▲" or "+" / "−") showing open/closed state

## Data shape to use

```ts
const items = [
  { id: 1, title: 'What is React?', body: 'React is a JavaScript library for building UIs.' },
  { id: 2, title: 'What is a Hook?', body: 'Hooks let you use state and other React features in function components.' },
  { id: 3, title: 'What is JSX?', body: 'JSX is a syntax extension that lets you write HTML-like markup in JavaScript.' },
];
```

## Hints

- A single `openId` state (number | null) is all you need — no array of booleans
- `setOpenId(id === openId ? null : id)` handles both open and toggle-close
- Conditionally render the body: `{openId === item.id && <p>{item.body}</p>}`
