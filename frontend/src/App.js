import { useState } from 'react';
import './App.css';

function App() {

  const [newtask, setTask] = useState("");
  const [tasks, setTasks] = useState([
    // { id: 1, text: "Finish project proposal", completed: false },
    // { id: 2, text: "Buy groceries", completed: false },
    // { id: 3, text: "Go for a run", completed: false }
  ]);

  const addTask = () => {

    if (newtask.trim() === "") {
      alert("Please enter a valid task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: newtask,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleComplete = (idToToggle) => {
    setTasks(tasks.map(t =>
      t.id === idToToggle ? { ...t, completed: !t.completed } : t
    ));
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;