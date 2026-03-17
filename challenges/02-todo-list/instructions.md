# Todo List Challenge

Build a todo list app where users can add and remove tasks.

## Requirements

1. Render a list of todo items (start with an empty list)
2. Display a text input and an "Add" button to add new todos
3. Each todo item must have a "Delete" button that removes it
4. Pressing Enter inside the input should also add the todo
5. Do not add empty or whitespace-only todos
6. After adding a todo, clear the input field

## Hints

- Use `useState` for both the list of todos and the current input value
- Each todo needs a unique key — consider using `Date.now()` or a counter ref
- The input should be a controlled component (`value` + `onChange`)
- For Enter key handling, use `onKeyDown` and check `e.key === 'Enter'`
