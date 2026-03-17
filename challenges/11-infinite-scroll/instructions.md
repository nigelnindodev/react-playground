# Infinite Scroll Challenge

Load more items automatically as the user scrolls to the bottom of a list.

## Requirements

1. Start with an initial page of **20 items** (e.g. `"Post #1"` … `"Post #20"`)
2. When the user scrolls near the bottom, automatically load the **next 20 items**
3. Show a `"Loading more..."` indicator while new items are being fetched
4. Simulate a network delay of **500ms** for each page load using `setTimeout`
5. Stop loading when you reach **200 items** total, and show `"No more items"` at the bottom
6. Use the **Intersection Observer API** to detect when the sentinel element is visible

## Hints

- Place an empty `<div ref={sentinelRef}>` at the bottom of your list
- In a `useEffect`, create an `IntersectionObserver` that calls `loadMore` when `isIntersecting`
- Disconnect and re-observe in the effect cleanup / dependency change
- Use a `useRef` for the observer instance to avoid re-creating it unnecessarily
- Guard against concurrent loads with an `isLoading` ref or state check
