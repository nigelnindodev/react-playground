import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const addTodo = () => {
    const sanitizedInput = input.trim();
    if (sanitizedInput !== '') {
      setTodos(prevTodos => [{ id: crypto.randomUUID(), text: sanitizedInput }, ...prevTodos]);
      setInput('');
    }
  };

  const removeTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(item => item.id !== id));
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input type="text" placeholder="Add a new todo..." value={input} onChange={handleChange} onKeyDown={event => { if (event.key === 'Enter') addTodo() }} />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => {
          return <li key={todo.id}>{todo.text} <button onClick={() => removeTodo(todo.id)}>Delete</button></li>
        })}
      </ul>
    </div>
  );
}

export default App;
