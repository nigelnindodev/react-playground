import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleNewTodo = () => {
    setTodos(prevTodos => [{ id: crypto.randomUUID(), value: input }, ...prevTodos]);
    setInput("");
  };

  const handleDeleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input type="text" onKeyDown={e => {
          if (e.key === 'Enter') {
            handleNewTodo();
          }
        }} onChange={e => setInput(e.target.value)} value={input} placeholder="Add a new todo..." />
        <button onClick={() => handleNewTodo()}>Add</button>
      </div>
      <ul>
        {todos.map(todo => <li>{todo.value} <button onClick={() => handleDeleteTodo(todo.id)}>Delete Me</button> </li>)}
      </ul>
    </div>
  );
}

export default App;
