const { Presensi } = require("../models");
const { Op } = require("sequelize");

exports.getDailyReport = async (req, res) => {
 try {
  // 1. Ambil semua query parameters
  const { nama, tanggalMulai, tanggalSelesai } = req.query;
  let options = { where: {} };

  // 2. Filter berdasarkan nama (jika ada)
  if (nama) {
   options.where.nama = {
    [Op.like]: `%${nama}%`,
   };
  }

  // 3. Filter berdasarkan rentang tanggal (jika ada)
  if (tanggalMulai && tanggalSelesai) {
   // PENTING: Ganti 'createdAt' dengan nama kolom tanggal di model Presensi kamu
   // (misalnya: 'tanggal', 'waktu_presensi', atau lainnya)

      // Mengatur tanggalSelesai ke akhir hari (23:59:59)
      // agar data di tanggal itu ikut terambil
      const endDate = new Date(tanggalSelesai);
      endDate.setHours(23, 59, 59, 999);

   options.where.createdAt = { // <-- Ganti 'createdAt' ini jika perlu
    [Op.between]: [new Date(tanggalMulai), endDate],
   };
  }

  // 4. Ambil data dengan filter yang sudah digabung
  const records = await Presensi.findAll(options);

  res.json({
   reportDate: new Date().toLocaleDateString(),
   data: records,
  });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Gagal mengambil laporan", error: error.message });
 }
};