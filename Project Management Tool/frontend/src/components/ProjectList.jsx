import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, FolderGit2, Trash2 } from 'lucide-react';
import './ProjectList.css';

const API_URL = 'http://localhost:5000/api/projects';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(API_URL);
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, newProject);
      setProjects([response.data, ...projects]);
      setNewProject({ title: '', description: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleDeleteProject = async (id, e) => {
    e.preventDefault(); // Prevent link navigation
    if (!window.confirm('Are you sure you want to delete this project and all its tasks?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  if (loading) return <div className="loading">Loading projects...</div>;

  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <h1>Your Projects</h1>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          New Project
        </button>
      </div>

      <div className="project-grid">
        {projects.length === 0 ? (
          <div className="empty-state">
            <FolderGit2 size={48} color="var(--text-secondary)" />
            <h2>No projects yet</h2>
            <p>Create your first project to get started.</p>
          </div>
        ) : (
          projects.map(project => (
            <Link to={`/project/${project._id}`} key={project._id} className="project-card glass-panel">
              <div className="project-card-header">
                <h2>{project.title}</h2>
                <button 
                  className="icon-btn delete-btn" 
                  onClick={(e) => handleDeleteProject(project._id, e)}
                  title="Delete Project"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="project-desc">{project.description}</p>
              <div className="project-meta">
                <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleCreateProject}>
              <div>
                <label>Project Title</label>
                <input 
                  type="text" 
                  required 
                  value={newProject.title}
                  onChange={e => setNewProject({...newProject, title: e.target.value})}
                  placeholder="e.g., Website Redesign"
                />
              </div>
              <div>
                <label>Description</label>
                <textarea 
                  rows="4"
                  value={newProject.description}
                  onChange={e => setNewProject({...newProject, description: e.target.value})}
                  placeholder="Briefly describe the project goals..."
                ></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
