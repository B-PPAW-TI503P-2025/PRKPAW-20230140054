// reportController.js
const { Presensi, User } = require("../models"); 
const { Op } = require("sequelize");

exports.getDailyReport = async (req, res) => {
 try {
  const { nama, startDate, endDate } = req.query;

  let whereCondition = {};
  
  let userInclude = {
    model: User,
    as: 'user', 
    attributes: ['id', 'nama', 'role'], 
    where: {}
  };

  if (nama) {
   userInclude.where.nama = {
    [Op.iLike]: `%${nama}%`, 
   };
  }

  if (startDate && endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

   whereCondition.checkIn = { 
    [Op.between]: [new Date(startDate), end],
   };
  }
  
  const records = await Presensi.findAll({
      where: whereCondition,
      include: [userInclude], 
      order: [['checkIn', 'DESC']]
  });
  
  const filteredRecords = records.filter(record => record.user !== null);
  
  res.json({
   message: "Laporan presensi berhasil diambil.",
   data: filteredRecords,
  });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Gagal mengambil laporan", error: error.message });
 }
};