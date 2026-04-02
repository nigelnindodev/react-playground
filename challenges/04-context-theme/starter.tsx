import { createContext, useContext, useState } from 'react';

function ThemedPage() {
  return (
    <div>
      <p>Current theme: </p>
      <button>Toggle Theme</button>
    </div>
  );
}

function App() {
  return <ThemedPage />;
}

export default App;
