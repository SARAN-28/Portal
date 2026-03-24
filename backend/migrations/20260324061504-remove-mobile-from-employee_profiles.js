'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('employee_profiles', 'mobile');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('employee_profiles', 'mobile', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};