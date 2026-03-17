import { useState, useRef, useCallback } from 'react';

const ITEM_COUNT = 100_000;
const ITEM_HEIGHT = 40; // px
const CONTAINER_HEIGHT = 500; // px
const BUFFER = 5;

const items = Array.from({ length: ITEM_COUNT }, (_, i) => `Item ${i + 1}`);

function App() {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // TODO: calculate startIndex, endIndex, and visibleItems from scrollTop

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  return (
    <div>
      <h1>Virtualized List</h1>
      <p>Showing items: </p>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{ height: CONTAINER_HEIGHT, overflowY: 'scroll', position: 'relative', border: '1px solid #ccc' }}
      >
        {/* TODO: inner spacer div with total height */}
        {/* TODO: absolutely positioned visible items */}
      </div>
    </div>
  );
}

export default App;
