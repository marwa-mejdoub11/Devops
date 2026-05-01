import { useState, useEffect } from 'react';
import './App.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/todos`)
      .then(r => r.json())
      .then(data => { setTodos(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    const res = await fetch(`${API}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const todo = await res.json();
    setTodos([...todos, todo]);
    setTitle('');
  };

  const toggleTodo = async (id) => {
    const res = await fetch(`${API}/api/todos/${id}`, { method: 'PUT' });
    const updated = await res.json();
    setTodos(todos.map(t => t.id === id ? updated : t));
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="App">
      <h1>📝 Todo App — DevOps Project</h1>
      <div className="input-row">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Nouvelle tâche..."
        />
        <button onClick={addTodo}>Ajouter</button>
      </div>
      {loading && <p>Chargement...</p>}
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}>🗑</button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && !loading && <p className="empty">Aucune tâche pour le moment !</p>}
    </div>
  );
}

export default App;
