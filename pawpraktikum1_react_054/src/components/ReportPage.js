import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../utils/auth';

function ReportPage() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // --- STATE BARU UNTUK MODAL FOTO ---
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchReports = async (nameQuery, start, end) => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let url = "http://localhost:3001/api/reports/daily";
      const params = [];

      if (nameQuery) {
        params.push(`nama=${encodeURIComponent(nameQuery)}`);
      }
      if (start) {
        params.push(`startDate=${encodeURIComponent(start)}`);
      }
      if (end) {
        params.push(`endDate=${encodeURIComponent(end)}`);
      }

      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }

      const response = await axios.get(url, config);
      setReports(response.data.data);
      setError(null);

    } catch (err) {
      const errorMessage = err.response
        ? err.response.status === 403
          ? "Akses ditolak. Anda tidak memiliki izin Admin."
          : err.response.data.message
        : "Gagal mengambil data laporan.";

      setError(errorMessage);
      setReports([]);
    }
  };

  useEffect(() => {
    fetchReports(searchTerm, startDate, endDate);
  }, [navigate]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchReports(searchTerm, startDate, endDate);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchReports(searchTerm, startDate, endDate);
  };

  // --- FUNGSI HELPER URL GAMBAR ---
  // Pastikan field 'imagePath' sesuai dengan response JSON dari backend Anda
const getImageUrl = (path) => {
  if (!path) return null;
  // Tambahkan / setelah 3001 dan ganti \ menjadi /
  const cleanPath = path.replace(/\\/g, '/');
  return path.startsWith('http') ? path : `http://localhost:3001/${cleanPath}`;
};

  return (
    <div className="max-w-6xl mx-auto p-8 relative">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Laporan Presensi Harian
      </h1>

      <form onSubmit={handleSearchSubmit} className="mb-6 space-y-4">
        {/* Pencarian Nama */}
        <div className='flex space-x-2'>
          <input
            type="text"
            placeholder="Cari berdasarkan nama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
          >
            Cari
          </button>
        </div>

        {/* Filter Waktu */}
        <div className='flex space-x-2 items-center'>
          <label className='text-gray-600'>Dari:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <label className='text-gray-600'>Sampai:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button onClick={handleFilterSubmit} className='py-2 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700'>
            Filter
          </button>
        </div>
      </form>

      {error && (
        <p className="text-red-600 bg-red-100 p-4 rounded-md mb-4">{error}</p>
      )}

      {/* Tabel Laporan */}
      {!error && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                {/* --- KOLOM BARU --- */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bukti Foto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-Out
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.length > 0 ? (
                reports.map((presensi) => (
                  <tr key={presensi.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {presensi.user ? presensi.user.nama : "N/A"}
                    </td>

                    {/* --- ISI KOLOM FOTO --- */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {presensi.buktiFoto ? ( 
                        <img 
                          src={getImageUrl(presensi.buktiFoto)}
                          alt="Bukti"
                          className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80 border"
                          onClick={() => setSelectedImage(getImageUrl(presensi.buktiFoto))}
                        />
                      ) : (
                        <span className="text-gray-400 italic">No Photo</span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(presensi.checkIn).toLocaleString("id-ID", {
                        timeZone: "Asia/Jakarta",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {presensi.checkOut
                        ? new Date(presensi.checkOut).toLocaleString("id-ID", {
                          timeZone: "Asia/Jakarta",
                        })
                        : "Belum Check-Out"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Tidak ada data yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* --- MODAL POPUP IMAGE --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => setSelectedImage(null)} // Tutup jika klik background
        >
          <div className="relative bg-white p-2 rounded-lg max-w-3xl max-h-full overflow-auto">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 font-bold"
            >
              &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Bukti Full" 
              className="max-w-full max-h-[80vh] object-contain rounded"
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default ReportPage;