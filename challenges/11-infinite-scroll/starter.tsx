import { useState, useEffect, useRef, useCallback } from 'react';

const PAGE_SIZE = 20;
const MAX_ITEMS = 200;

function generateItems(start: number, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `Post #${start + i + 1}`);
}

function App() {
  const [items, setItems] = useState<string[]>(() => generateItems(0, PAGE_SIZE));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    // TODO: set loading, simulate 500ms delay, append next page
  }, [isLoading, hasMore, items.length]);

  useEffect(() => {
    // TODO: set up IntersectionObserver on sentinelRef
  }, [loadMore]);

  return (
    <div style={{ maxHeight: '600px', overflowY: 'auto', border: '1px solid #ccc' }}>
      <h1 style={{ padding: '0 1rem' }}>Infinite Scroll</h1>
      <ul>
        {items.map(item => (
          <li key={item} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #eee' }}>
            {item}
          </li>
        ))}
      </ul>
      {isLoading && <p style={{ textAlign: 'center' }}>Loading more...</p>}
      {!hasMore && <p style={{ textAlign: 'center' }}>No more items</p>}
      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}

export default App;
