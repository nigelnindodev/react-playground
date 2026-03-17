# Debounced Search Challenge

Build a search input that debounces the query and fetches results, implemented via a reusable custom hook.

## Requirements

1. Create a custom hook `useDebounce<T>(value: T, delay: number): T` that returns the debounced value
2. Create a custom hook `useSearch(query: string)` that:
   - Uses `useDebounce` internally with a **400ms** delay
   - Fetches from `https://jsonplaceholder.typicode.com/posts?q=<debouncedQuery>` when the debounced query changes
   - Returns `{ results, isLoading, error }`
3. The search should **not** fire on every keystroke — only after typing stops for 400ms
4. Show a `"Searching..."` indicator while fetching
5. Display the `title` of each result in a `<li>`
6. If the query is empty, show no results and do not fetch

## Hints

- `useDebounce` uses `useState` + `useEffect` with a `setTimeout` cleanup:
  ```ts
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  ```
- In `useSearch`, the `useEffect` dependency is the **debounced** query, not the raw input value
- An AbortController inside the effect prevents stale responses (bonus if you include it)
