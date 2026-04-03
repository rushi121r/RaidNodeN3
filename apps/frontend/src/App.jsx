import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './layouts/AppShell';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import TournamentPage from './pages/TournamentPage';
import GameEntryPage from './pages/GameEntryPage';
import AdminPanelPage from './pages/AdminPanelPage';
import { useAuth } from './hooks/useAuth';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppShell />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="tournaments" element={<TournamentPage />} />
        <Route path="games/new" element={<GameEntryPage />} />
        <Route path="admin" element={<AdminPanelPage />} />
      </Route>
    </Routes>
  );
}
