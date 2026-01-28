import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { DataProvider, useData } from './context/DataContext';

// Sahifalar
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { Groups } from './pages/Groups';
// 🔥 YANGI IMPORT
import { GroupDetails } from './pages/GroupDetails'; 
import { Finance } from './pages/Finance';
import { Attendance } from './pages/Attendance';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { LeaderboardTV } from './pages/LeaderboardTV';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useData();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppContent() {
  const location = useLocation();
  const { currentUser } = useData();
  const isFullScreen = location.pathname === '/login' || location.pathname === '/leaderboard';

  return (
    <div className="flex h-screen bg-milk-50 dark:bg-slate-900 transition-colors duration-300">
      {currentUser && !isFullScreen && <Sidebar />}
      
      <div className={`flex-1 overflow-auto ${!isFullScreen && currentUser ? 'p-0' : ''}`}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
          <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
          
          {/* 🔥 YANGI ROUTE (Guruh ichiga kirish uchun) */}
          <Route path="/groups/:id" element={<ProtectedRoute><GroupDetails /></ProtectedRoute>} />
          
          <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardTV /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <Router>
        <AppContent />
      </Router>
    </DataProvider>
  );
}