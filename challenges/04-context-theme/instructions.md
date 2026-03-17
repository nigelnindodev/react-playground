# Context + Theme Hook Challenge

Implement a light/dark theme system using the React Context API and a custom `useTheme` hook.

## Requirements

1. Create a `ThemeContext` using `React.createContext`
2. Create a `ThemeProvider` component that:
   - Holds `theme` state (`'light'` or `'dark'`), starting on `'light'`
   - Provides `{ theme, toggleTheme }` via context
3. Create a custom `useTheme` hook that consumes `ThemeContext`
4. Wrap your `App` in `ThemeProvider`
5. Display the current theme value (e.g. "Current theme: light")
6. Add a "Toggle Theme" button that switches between light and dark
7. Apply a visible style change based on the theme (e.g. background or text color)

## Hints

- `useContext(ThemeContext)` is the primitive; wrap it in `useTheme` for ergonomics
- The `ThemeProvider` should accept `children` as a prop
- You can apply theme styles directly to a wrapper `<div>` using inline styles or a `className`
