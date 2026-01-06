'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presensi extends Model {
    static associate(models) {
      // Implementasi relasi Presensi.belongsTo(User) 
      Presensi.belongsTo(models.User, { 
          foreignKey: 'userId', 
          as: 'user' 
      }); 
    }
  }
  Presensi.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: true, // Boleh null
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: false,
    },
    buktiFoto: {
    type: DataTypes.STRING,
    allowNull: true,
},
  }, {
    sequelize,
    modelName: 'Presensi',
  });
  return Presensi;
};
