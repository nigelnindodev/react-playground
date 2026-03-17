# Custom Modal Challenge

Build a fully accessible modal dialog using React Portals, Refs, and keyboard/pointer event handling.

## Requirements

1. Render an "Open Modal" button on the page
2. Clicking it opens a modal rendered via `ReactDOM.createPortal` into `document.body`
3. The modal must contain:
   - A visible title (e.g. "Modal Title")
   - Some body text
   - A "Close" button that closes the modal
4. Pressing the **Escape** key closes the modal
5. Clicking the **backdrop** (the area outside the modal box) closes the modal
6. While the modal is open, focus should move into the modal (use a `ref` + `focus()`)

## Hints

- `ReactDOM.createPortal(<Modal />, document.body)` renders outside the normal DOM tree
- Attach a `keydown` listener in a `useEffect` that cleans up on unmount
- The backdrop click check: attach `onClick` to the outer overlay div and check `e.target === e.currentTarget`
- `useRef` + `ref.current.focus()` inside a `useEffect` handles the focus requirement
- The modal overlay should cover the whole viewport (position: fixed, inset: 0)
