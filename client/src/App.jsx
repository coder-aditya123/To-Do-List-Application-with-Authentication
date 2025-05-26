// client/src/App.jsx (relevant parts)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute'; // <--- यहां PrivateRoute को इम्पोर्ट करें

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* DashboardPage को PrivateRoute से रैप करें */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;