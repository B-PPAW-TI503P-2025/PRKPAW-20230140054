import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth'; // Import removeToken

function DashboardPage() {
  const navigate = useNavigate();

  // Implementasi Fungsi Logout menggunakan removeToken
  const handleLogout = () => {
    removeToken(); // Menggunakan fungsi helper
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
          🚀 Dashboard Utama
        </h1>
        
        <p className="text-xl text-gray-700 mb-8">
          Anda berhasil login dan mengakses halaman ini.
        </p>
        <p className="text-md text-gray-500 mb-8">
          Selamat Datang
        </p>

        <button
          onClick={handleLogout}
          className="py-3 px-8 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;