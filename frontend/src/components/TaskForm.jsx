import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const TaskForm = ({ fetchTasks, taskToEdit, setTaskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title cannot be empty!');
      return;
    }
    setError('');

    try {
      if (taskToEdit) {
        await axios.put(`${API_URL}/${taskToEdit._id}`, { title, description, status });
        setTaskToEdit(null);
      } else {
        await axios.post(API_URL, { title, description, status });
      }
      setTitle('');
      setDescription('');
      setStatus('Pending');
      fetchTasks(); // Dynamic refresh
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
      <h3>{taskToEdit ? 'Update Task' : 'Add New Task'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">{taskToEdit ? 'Save Changes' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;