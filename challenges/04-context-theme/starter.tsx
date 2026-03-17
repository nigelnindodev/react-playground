import { createContext, useContext, useState } from 'react';

// 1. Create ThemeContext here

// 2. Create ThemeProvider component here

// 3. Create useTheme custom hook here

function ThemedPage() {
  // Use your useTheme hook here
  return (
    <div>
      <p>Current theme: </p>
      <button>Toggle Theme</button>
    </div>
  );
}

function App() {
  // Wrap ThemedPage in ThemeProvider
  return <ThemedPage />;
}

export default App;
