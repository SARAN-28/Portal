const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OtpCode = sequelize.define("OtpCode", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    otp: {
        type: DataTypes.STRING,
        allowNull: false
    },

    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    }

}, {
    tableName: "otp_codes",
    timestamps: false
});

module.exports = OtpCode;