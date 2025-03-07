
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PropsPage from './PropsPage'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [dueDateInput, setDueDateInput] = useState('');
  const [priorityInput, setPriorityInput] = useState('low');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput && dueDateInput) {
      const newTask = { taskText: taskInput, dueDate: dueDateInput, priority: priorityInput };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      setDueDateInput('');
      setPriorityInput('low');
    } else {
      alert('Please fill in both the task and the due date.');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App container mt-4">
      <header className="mb-4">
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'crimson' }}>
          <a className="navbar-brand text-white" href="#">WC</a>
          <div className="navbar-nav">
            <a className="nav-item nav-link text-white" href="#home">Home</a>
            <a className="nav-item nav-link text-white" href="#about">About</a>
            <a className="nav-item nav-link text-white" href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <section id="home" className="text-center">
        <h1>Hi, it's <span>Warren</span></h1>
        <h2>BSIT 32A3</h2>
        <p>"My academic interest is in pursuing a Bachelor of Science in Information Technology (BSIT) with the goal of becoming a full-stack software engineer."</p>
      </section>

      <section id="todo" className="todo-list mt-5">
        <h2 className="text-center">To-Do List</h2>
        <div className="card p-4">
          <div className="input-group mb-3">
            <input type="text" className="form-control" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} placeholder="Add a new task" />
            <input type="date" className="form-control" value={dueDateInput} onChange={(e) => setDueDateInput(e.target.value)} />
            <select className="form-control" value={priorityInput} onChange={(e) => setPriorityInput(e.target.value)}>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button className="btn btn-primary" onClick={addTask}>Add Task</button>
          </div>
          <ul className="list-group">
            {tasks.map((task, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{task.taskText} (Due: {task.dueDate})</span>
                <span className={`badge ${task.priority === 'high' ? 'badge-danger' : task.priority === 'medium' ? 'badge-warning' : 'badge-success'}`}>{task.priority.toUpperCase()}</span>
                <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Use PropsPage here */}
      <PropsPage message="Hello World!" />

      <section id="contact" className="mt-5 text-center">
        <h2>Contact</h2>
        <p>Vince Warren S. Carino</p>
        <p>Email: warrencarino@gmail.com</p>
      </section>

      <footer className="text-center mt-4">
        <p>&copy; 2025 Vince Warren Carino. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
