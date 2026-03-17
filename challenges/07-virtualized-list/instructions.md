# Virtualized List Challenge

Implement a virtualized (windowed) list that renders 100,000 items without destroying browser performance.

## Requirements

1. Generate a list of **100,000** items (e.g. `"Item 1"` … `"Item 100000"`)
2. The list container must have a **fixed height** (e.g. `500px`) with `overflow-y: scroll`
3. At any given time, render **only the items visible in the viewport** plus a small buffer (e.g. ±5 items)
4. Items must have a **fixed height** (e.g. `40px`) — use this to calculate which items are visible
5. The total scrollable height must match `itemCount × itemHeight` so the scrollbar behaves correctly
6. Display which item range is currently visible (e.g. "Showing items 1 – 20")

## How virtualization works

- Place an outer `div` with the container height and `overflow-y: scroll`
- Inside it, place a `div` with height = `totalItems × itemHeight` (the "spacer")
- Inside the spacer, absolutely position only the visible items at `top = index × itemHeight`
- On `scroll`, read `scrollTop` and recalculate the visible range

## Hints

- Use `useRef` to attach the scroll listener (or `onScroll` on the container div)
- `startIndex = Math.floor(scrollTop / itemHeight)` — apply your buffer here
- `endIndex = startIndex + Math.ceil(containerHeight / itemHeight) + buffer`
- The visible items are a `.slice(startIndex, endIndex)` of your data array
