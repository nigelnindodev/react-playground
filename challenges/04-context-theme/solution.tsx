import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext("light");

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? "dark" : "light");
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>
    {children}
  </ThemeContext.Provider>;
}

const useTheme = () => useContext(ThemeContext);

function ThemedPage() {
  const { theme, toggleTheme } = useTheme();

  const styles = {
    background: theme === 'light' ? '#fafafa' : '#1a1a1a'
  }

  return (
    <div>
      <p style={styles}>Current theme: {theme} </p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

function App() {
  return <ThemeProvider>
    <ThemedPage />
  </ThemeProvider>;
}

export default App;
