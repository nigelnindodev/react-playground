import { useState, useRef } from 'react';

const initialItems = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'];

function App() {
  const [items, setItems] = useState(initialItems);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    // TODO
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    // TODO
  };

  const handleDrop = (targetIndex: number) => {
    // TODO: reorder items
  };

  const handleDragLeave = () => {
    // TODO
  };

  return (
    <div>
      <h1>Drag and Drop</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item, index) => (
          <li
            key={item}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={e => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            onDragLeave={handleDragLeave}
            style={{
              padding: '0.75rem',
              marginBottom: '0.5rem',
              border: '1px solid #ccc',
              cursor: 'grab',
              background: dragOverIndex === index ? '#e0f0ff' : '#fff',
            }}
          >
            {index + 1}. {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
