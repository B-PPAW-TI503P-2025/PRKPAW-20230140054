import React from 'react';
import { useNavigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode'; // Tambahkan ini jika ingin mengambil nama dari token

function DashboardPage() {
  const navigate = useNavigate();
  // const token = localStorage.getItem('token');
  // const user = token ? jwtDecode(token) : null; // Decode token jika ada

  // Implementasi Fungsi Logout
  const handleLogout = () => {
    // Menghapus token dari local storage
    localStorage.removeItem('token'); 
    // Mengarahkan pengguna kembali ke halaman /login
    navigate('/login'); 
  };

  return (
    // Styling Dashboard Sederhana dengan Tailwind
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
          🚀 Dashboard Utama
        </h1>

        {/* Jika Anda berhasil mendekode token dan mendapatkan nama */}
        {/* {user && (
            <p className="text-xl text-gray-700 mb-8">Selamat Datang, <span className="font-semibold">{user.name}</span>!</p>
        )} */}
        
        {/* Tampilan default jika tanpa decode nama */}
        <p className="text-xl text-gray-700 mb-8">
          Anda berhasil login dan mengakses halaman ini.
        </p>
        <p className="text-md text-gray-500 mb-8">
          Selamat Datang
        </p>

        {/* Tombol Logout */}
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