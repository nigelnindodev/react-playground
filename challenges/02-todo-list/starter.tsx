import { useState } from 'react';

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input type="text" placeholder="Add a new todo..." />
        <button>Add</button>
      </div>
      <ul>
        {/* Render todos here */}
      </ul>
    </div>
  );
}

export default App;
