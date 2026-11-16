import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Motors from './pages/Motors';
import MotorDetail from './pages/MotorDetail';
import Leaderboard from './pages/Leaderboard';
import ResultDetail from './pages/ResultDetail';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Daftar route aplikasi; semua halaman dibungkus Layout (bottom nav)
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/motors" element={<Motors />} />
        <Route path="/motors/:id" element={<MotorDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/results/:id" element={<ResultDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
