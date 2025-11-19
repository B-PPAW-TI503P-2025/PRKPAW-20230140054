import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  // 1. Definisikan state untuk semua field input dan error
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mahasiswa'); // Default role
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error sebelum mencoba request baru

    try {
      // 2. Kirim data ke endpoint POST /api/auth/register
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        nama: name,
        email: email,
        password: password,
        role: role, // Kirim role yang dipilih
      });

      // Anda dapat menampilkan pesan sukses dari response, tapi tugas meminta langsung navigasi
      alert('Registrasi berhasil! Silakan Login.');
      
      // 3. Setelah berhasil register, arahkan pengguna ke halaman /login
      navigate('/login'); 
      
    } catch (err) {
      // Tangani error dari server (misal: email sudah terdaftar)
      setError(err.response ? err.response.data.message : 'Registrasi gagal. Coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Daftar Akun Baru
        </h2>
        
        {/* Formulir Registrasi */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Input Nama */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Input Email (sama seperti LoginPage) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Input Password (sama seperti LoginPage) */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Input Role (Dropdown/Select) */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Tombol Register */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700"
          >
            Register
          </button>
        </form>

        {/* Tampilan Error */}
        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
        )}
        
        {/* Link kembali ke Login */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Sudah punya akun? <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Login di sini</Link>
        </p>

      </div>
    </div>
  );
}

export default RegisterPage;