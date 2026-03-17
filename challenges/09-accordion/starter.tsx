import { useState } from 'react';

const items = [
  { id: 1, title: 'What is React?', body: 'React is a JavaScript library for building UIs.' },
  { id: 2, title: 'What is a Hook?', body: 'Hooks let you use state and other React features in function components.' },
  { id: 3, title: 'What is JSX?', body: 'JSX is a syntax extension that lets you write HTML-like markup in JavaScript.' },
];

function App() {
  // TODO: track which item is open

  return (
    <div>
      <h1>Accordion</h1>
      {items.map(item => (
        <div key={item.id}>
          <button onClick={() => {}}>
            {item.title}
          </button>
          {/* TODO: conditionally render item.body */}
        </div>
      ))}
    </div>
  );
}

export default App;
