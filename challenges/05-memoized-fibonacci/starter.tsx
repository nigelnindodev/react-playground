import { useState, useMemo, useCallback } from 'react';

// Do not optimise this function internally — the point is to memoize it externally
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function App() {
  const [n, setN] = useState(10);
  const [count, setCount] = useState(0);

  // TODO: wrap fibonacci(n) in useMemo

  // TODO: wrap the input change handler in useCallback

  return (
    <div>
      <h1>Memoized Fibonacci</h1>
      <div>
        <label>
          N: <input type="number" value={n} min={0} max={40} onChange={() => {}} />
        </label>
      </div>
      <p>fibonacci({n}) = </p>
      <hr />
      <p>Unrelated counter: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment Counter</button>
    </div>
  );
}

export default App;
