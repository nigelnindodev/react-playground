# Memoized Fibonacci Challenge

Optimize an expensive Fibonacci calculation using `useMemo` and stabilize a callback with `useCallback`.

## Requirements

1. Render a number input (starting at `10`) that controls which Fibonacci number to compute
2. Compute `fibonacci(n)` using a **recursive** implementation (intentionally expensive for large n)
3. Wrap the computation in `useMemo` so it only recalculates when `n` changes
4. Add a separate, unrelated counter (increment button + display) to prove re-renders don't re-run the expensive calc
5. Create a `handleChange` function with `useCallback` that updates `n` from the input's value
6. Display the result as: `fibonacci(N) = RESULT`

## The fibonacci function to use (do not optimise it internally)

```ts
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

## Hints

- `useMemo(() => fibonacci(n), [n])` will only recompute when `n` changes
- `useCallback((e) => setN(Number(e.target.value)), [])` gives a stable function reference
- Keep `n` reasonable (≤ 40) to avoid genuinely freezing the browser
- The counter state change should NOT re-trigger the fibonacci computation
