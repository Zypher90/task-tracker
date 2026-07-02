import TaskItem from './TaskItem.jsx';

const TaskList = ({ tasks, fetchTasks, setTaskToEdit }) => {
  return (
    <div>
      <h3>Your Tasks ({tasks.length})</h3>
      {tasks.length === 0 ? (
        <p>No tasks found. Add one above!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} setTaskToEdit={setTaskToEdit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;