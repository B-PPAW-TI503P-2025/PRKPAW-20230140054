import React from 'react';
// Tambahkan Navigate dan Outlet di sini
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'; 
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
import Navbar from './components/Navbar'; 
import PresensiPage from './components/PresensiPage'; 
import ReportPage from './components/ReportPage';
import SensorPage from './components/SensorPage';
import { isAuthenticated, getUserData } from './utils/auth';

const MainLayout = () => {
    if (!isAuthenticated()) {
        // Redirect ke login jika tidak ada token
        return <Navigate to="/login" replace />; 
    }
    return (
        <>
            <Navbar /> {/* Navbar di sini agar hanya muncul setelah login */}
            <div className="pt-4">
                <Outlet /> {/* Merender komponen anak (Dashboard, Presensi, etc) */}
            </div>
        </>
    );
};

const AdminRoute = () => {
    const user = getUserData();
    
    // Memastikan user sudah login dan role-nya adalah 'admin'
    if (!user || user.role !== 'admin') { 
        return <Navigate to="/" replace />; 
    }
    return <Outlet />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} /> 
            <Route path="/presensi" element={<PresensiPage />} /> 
            
            <Route element={<AdminRoute />}>
                <Route path="/reports" element={<ReportPage />} /> 
            </Route>
            <Route path="/monitoring" element={<SensorPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
