'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable("employee_profiles", {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "CASCADE"
      },

      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      secondary_email: Sequelize.STRING,

      department: Sequelize.STRING,
      designation: Sequelize.STRING,
      location: Sequelize.STRING,
      date_of_join: Sequelize.DATE,
      current_experience: Sequelize.STRING,
      total_experience: Sequelize.STRING,
      employee_status: Sequelize.STRING,

      reporting_manager: Sequelize.STRING,

      age: Sequelize.INTEGER,
      blood_group: Sequelize.STRING,
      address: Sequelize.TEXT,
      gender: Sequelize.STRING,
      about: Sequelize.TEXT,

      pan: Sequelize.STRING,
      aadhar: Sequelize.STRING,

      phone: Sequelize.STRING,
      work_address: Sequelize.TEXT,
      permanent_address: Sequelize.TEXT,

      institution: Sequelize.STRING,
      specialization: Sequelize.STRING,
      completion_date: Sequelize.DATE,

      is_profile_complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("employee_profiles");
  }
};