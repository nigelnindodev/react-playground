# Drag and Drop Challenge

Build a drag-and-drop list where items can be reordered by dragging.

## Requirements

1. Render a list of at least **5 items** that can be dragged to reorder
2. Use the native HTML5 **Drag and Drop API** (no external libraries)
3. As an item is dragged over another, show a visual highlight on the drop target
4. On drop, reorder the list so the dragged item moves to the target position
5. Display the current order as a numbered list (1-based index shown beside each item)

## Drag and Drop API refresher

```ts
<li
  draggable
  onDragStart={() => dragItem.current = index}
  onDragOver={e => { e.preventDefault(); setDragOverIndex(index); }}
  onDrop={() => reorder(dragItem.current, index)}
  onDragLeave={() => setDragOverIndex(null)}
>
```

## Hints

- Store the dragged item's index in a `useRef` (avoids re-renders mid-drag)
- `onDragOver` must call `e.preventDefault()` to allow dropping
- Reordering: splice the dragged item out, then insert it at the target index
- Use `dragOverIndex` state to apply a highlight style to the hovered item
