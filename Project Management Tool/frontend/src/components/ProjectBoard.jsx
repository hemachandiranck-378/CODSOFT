import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, ArrowLeft, MoreVertical, Calendar } from 'lucide-react';
import './ProjectBoard.css';

const API_URL = 'http://localhost:5000/api';

export default function ProjectBoard() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    deadline: '',
    status: 'To Do',
  });

  useEffect(() => {
    fetchProjectAndTasks();
  }, [id]);

  const fetchProjectAndTasks = async () => {
    try {
      const [projectRes, tasksRes] = await Promise.all([
        axios.get(`${API_URL}/projects/${id}`),
        axios.get(`${API_URL}/tasks/project/${id}`)
      ]);
      setProject(projectRes.data);
      setTasks(tasksRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/tasks`, {
        ...newTask,
        project: id,
      });
      setTasks([response.data, ...tasks]);
      setIsModalOpen(false);
      setNewTask({ title: '', description: '', assignee: '', deadline: '', status: 'To Do' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.patch(`${API_URL}/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) return <div className="loading">Loading project...</div>;
  if (!project) return <div className="loading">Project not found</div>;

  const columns = ['To Do', 'In Progress', 'Done'];

  return (
    <div className="board-container">
      <div className="board-header">
        <div className="board-title-area">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1>{project.title}</h1>
            <p className="project-desc-header">{project.description}</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Add Task
        </button>
      </div>

      <div className="kanban-board">
        {columns.map(status => (
          <div key={status} className="kanban-column glass-panel">
            <div className="column-header">
              <h3>{status}</h3>
              <span className="task-count">
                {tasks.filter(t => t.status === status).length}
              </span>
            </div>
            <div className="task-list">
              {tasks.filter(t => t.status === status).map(task => (
                <div key={task._id} className="task-card">
                  <div className="task-card-header">
                    <h4>{task.title}</h4>
                    <button className="icon-btn delete-btn" onClick={() => deleteTask(task._id)}>
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  {task.description && <p className="task-desc">{task.description}</p>}
                  
                  <div className="task-meta">
                    {task.assignee && (
                      <div className="assignee-badge">
                        {task.assignee.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {task.deadline && (
                      <div className={`deadline ${new Date(task.deadline) < new Date() ? 'overdue' : ''}`}>
                        <Calendar size={14} />
                        {new Date(task.deadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="task-actions">
                    <select 
                      value={task.status} 
                      onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                      className="status-select"
                    >
                      {columns.map(col => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Task</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleCreateTask}>
              <div>
                <label>Task Title</label>
                <input 
                  type="text" 
                  required 
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                  placeholder="e.g., Design Landing Page"
                />
              </div>
              <div>
                <label>Description (Optional)</label>
                <textarea 
                  rows="3"
                  value={newTask.description}
                  onChange={e => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Add details about this task..."
                ></textarea>
              </div>
              <div className="form-row">
                <div style={{flex: 1}}>
                  <label>Assignee (Optional)</label>
                  <input 
                    type="text" 
                    value={newTask.assignee}
                    onChange={e => setNewTask({...newTask, assignee: e.target.value})}
                    placeholder="e.g., John Doe"
                  />
                </div>
                <div style={{flex: 1, marginLeft: '16px'}}>
                  <label>Deadline (Optional)</label>
                  <input 
                    type="date" 
                    value={newTask.deadline}
                    onChange={e => setNewTask({...newTask, deadline: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label>Status</label>
                <select 
                  value={newTask.status}
                  onChange={e => setNewTask({...newTask, status: e.target.value})}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
