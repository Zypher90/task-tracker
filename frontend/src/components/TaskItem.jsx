import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const TaskItem = ({ task, fetchTasks, setTaskToEdit }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${task._id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <span style={{ fontSize: '0.85rem', padding: '0.2rem 0.5rem', borderRadius: '3px', background: task.status === 'Completed' ? '#d4edda' : '#fff3cd' }}>
          {task.status}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setTaskToEdit(task)}>Edit</button>
        <button onClick={handleDelete} style={{ background: '#f8d7da', color: '#721c24' }}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;