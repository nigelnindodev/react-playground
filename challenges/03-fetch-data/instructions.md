# Fetch Data Challenge

Fetch and display a list of users from a public API, handling loading and error states.

## Requirements

1. On mount, fetch users from `https://jsonplaceholder.typicode.com/users`
2. While fetching, display a loading indicator with the text "Loading..."
3. If the fetch fails, display an error message containing the word "Error"
4. On success, render each user's `name` in a `<li>` element inside a `<ul>`
5. Add a "Retry" button that re-triggers the fetch (useful when in an error state)

## Hints

- Use `useEffect` to trigger the fetch on mount
- Track three pieces of state: `data`, `loading`, and `error`
- `fetch` returns a Promise — remember to check `response.ok` before parsing JSON
- To test the error state, temporarily change the URL to something invalid
- The "Retry" button can work by incrementing a counter state that `useEffect` depends on
