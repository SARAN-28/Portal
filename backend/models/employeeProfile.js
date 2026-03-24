const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const EmployeeProfile = sequelize.define("EmployeeProfile", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    // Basic Info
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    secondary_email: {
        type: DataTypes.STRING
    },

    // Work Info (Admin only edit)
    department: {
        type: DataTypes.STRING
    },
    designation: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    },
    date_of_join: {
        type: DataTypes.DATE
    },
    current_experience: {
        type: DataTypes.STRING
    },
    total_experience: {
        type: DataTypes.STRING
    },
    employee_status: {
        type: DataTypes.STRING
    },

    // Hierarchy
    reporting_manager: {
        type: DataTypes.STRING
    },

    // Personal Info
    age: {
        type: DataTypes.INTEGER
    },
    blood_group: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.TEXT
    },
    gender: {
        type: DataTypes.STRING
    },
    about: {
        type: DataTypes.TEXT
    },

    // Identity
    pan: {
        type: DataTypes.STRING
    },
    aadhar: {
        type: DataTypes.STRING
    },

    // Contact
    phone: {
        type: DataTypes.STRING
    },
    work_address: {
        type: DataTypes.TEXT
    },
    permanent_address: {
        type: DataTypes.TEXT
    },

    // Education
    institution: {
        type: DataTypes.STRING
    },
    specialization: {
        type: DataTypes.STRING
    },
    completion_date: {
        type: DataTypes.DATE
    },

    // Status
    is_profile_complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    tableName: "employee_profiles",
    timestamps: true
});

module.exports = EmployeeProfile;