const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Invite = sequelize.define("Invite", {

    employee_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    token: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
        type: DataTypes.STRING,
        defaultValue: "employee"
    },

    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    }

});

module.exports = Invite;