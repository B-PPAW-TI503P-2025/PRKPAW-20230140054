'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('sensorlogs', 'motion', {
      type: Sequelize.INTEGER, // atau Sequelize.BOOLEAN
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('sensorlogs', 'motion');
  }
};
