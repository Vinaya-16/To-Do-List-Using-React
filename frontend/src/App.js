import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [newtask, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/todos")
    .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = () => {

    if (newtask.trim() === "") {
      alert("Please enter a valid task");
      return;
    }

    // const newTask = {
    //   id: Date.now(),
    //   text: newtask,
    //   completed: false
    // };

    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newtask
      })
    })
    .then(res => res.json())
      .then(data => {
        setTasks([...tasks, data]);
        setTask("");
      });
  };

  const toggleComplete = (id) => {

    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT"
    })
    .then(res => res.json())
      .then(() => {
        setTasks(
          tasks.map(t => 
            t.id === id ? 
              {...t, completed: !t.completed} : t
          )
        );
      });

    // setTasks(tasks.map(t =>
    //   t.id === id ? { ...t, completed: !t.completed } : t
    // ));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id));
      });
  };

  return (
    <div className="container">
      <div className="todo-card">
        <h1>Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter task"
            value={newtask}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="add-btn" onClick={addTask}> Add </button>
        </div>
        <ul className="task-list">
          {tasks.map((item) => (
            <li key={item.id} className="task-item">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(item.id)}
                />
                <span className={`task-text ${item.completed ? 'completed' : ''}`}>{item.text}</span>
              </label>
              <button onClick={() => deleteTask(item.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;