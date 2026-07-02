import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'https://task-tracker-api-jiw6.onrender.com';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Fetch all tasks dynamically
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <TaskForm fetchTasks={fetchTasks} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
        <TaskList tasks={tasks} fetchTasks={fetchTasks} setTaskToEdit={setTaskToEdit} />
      </main>
    </div>
  );
}

export default App;