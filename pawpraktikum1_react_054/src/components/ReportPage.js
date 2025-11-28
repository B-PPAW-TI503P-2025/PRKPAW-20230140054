import React, { useState, useEffect } from 'react'; // Tambahkan
import { useNavigate } from 'react-router-dom'; // Tambahkan
import axios from 'axios'; // Tambahkan
import { getToken } from '../utils/auth'; // Tambahkan

function ReportPage() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  // Tambahkan state untuk filter waktu
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState(""); 


  const fetchReports = async (nameQuery, start, end) => { // Terima parameter query
    const token = getToken(); // Gunakan getToken()
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

      // Bangun URL dengan query parameter
      let url = "http://localhost:3001/api/reports/daily";
      const params = [];
            
      if (nameQuery) {
          params.push(`nama=${encodeURIComponent(nameQuery)}`);
      }
      if (start) {
          params.push(`startDate=${encodeURIComponent(start)}`); // Filter tanggal mulai
      }
      if (end) {
          params.push(`endDate=${encodeURIComponent(end)}`); // Filter tanggal selesai
      }

      if (params.length > 0) {
          url += `?${params.join('&')}`;
      }

      const response = await axios.get(url, config); // Lakukan panggilan API

      setReports(response.data.data);
      setError(null);
      
    } catch (err) {
      // Tangani error 403 (Akses ditolak. Hanya untuk admin.)
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
    // Panggil fetchReports saat komponen dimuat
    fetchReports(searchTerm, startDate, endDate); 
  }, [navigate]);
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Panggil ulang dengan nama dan tanggal
    fetchReports(searchTerm, startDate, endDate); 
  };
  
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchReports(searchTerm, startDate, endDate);
  };


  return (
    <div className="max-w-6xl mx-auto p-8">
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
        
        {/* Filter Waktu (Antar Tanggal/Bulan) */}
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

      {/* ... (Tabel Laporan) ... */}
      {!error && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
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
                    colSpan="3"
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
    </div>
  );
}

export default ReportPage;