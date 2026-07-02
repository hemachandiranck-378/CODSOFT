import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import ProjectList from './components/ProjectList';
import ProjectBoard from './components/ProjectBoard';
import './index.css';

function App() {
  return (
    <Router>
      <header className="header">
        <Link to="/" className="header-logo">
          <Briefcase size={28} />
          ProTrack
        </Link>
        <nav>
          <Link to="/" className="btn-secondary" style={{ marginRight: '10px' }}>Dashboard</Link>
        </nav>
      </header>
      <main className="layout-container">
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/project/:id" element={<ProjectBoard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
