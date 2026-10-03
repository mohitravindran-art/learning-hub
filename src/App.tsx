import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LearningHubPage from './pages/LearningHubPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/learning-hub" replace />} />
        <Route path="/learning-hub" element={<LearningHubPage />} />
        {/* Placeholder for lesson route */}
        <Route path="/learning-hub/lesson/:levelId" element={<div style={{padding: 20}}><h2>Lesson Route Placeholder</h2><a href="/learning-hub" style={{color: 'blue'}}>Back to Map</a></div>} />
      </Routes>
    </Router>
  );
}

export default App;
