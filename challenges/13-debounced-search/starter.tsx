import { useState, useEffect } from 'react';

// TODO: implement useDebounce<T>(value: T, delay: number): T

// TODO: implement useSearch(query: string): { results, isLoading, error }

function App() {
  const [query, setQuery] = useState('');
  // const { results, isLoading, error } = useSearch(query);

  return (
    <div>
      <h1>Debounced Search</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search posts..."
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      {/* TODO: show "Searching..." while loading */}
      {/* TODO: render result titles in a <ul><li> list */}
    </div>
  );
}

export default App;
