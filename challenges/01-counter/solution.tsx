import { useState } from 'react';

function App() {

  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter </h1>
      <p> Count: {count} </p>
      <button onClick={() => setCount(prevCount => Math.max(0, prevCount - 1))
      }> -</button>
      < button onClick={() => setCount(prevCount => prevCount + 1)}> +</button>
    </div>
  );
}

export default App;
