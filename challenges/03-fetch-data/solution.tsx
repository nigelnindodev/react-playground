import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    setError(false);

    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) {
      setLoading(false);
      setError(true);
      return;
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    setData(jsonResponse.map(item => ({ id: item.id, name: item.name })));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button onClick={() => fetchData()}>Retry</button>

      {error ?? <div>An error occurred while fetching data. Please retry</div>}

      {loading ? <div>Loading</div> : <ul>{data.map(item => <li key={item.id}>{item.name}</li>)}</ul>}

    </div>
  );
}

export default App;
