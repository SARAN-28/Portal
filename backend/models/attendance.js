const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Attendance = sequelize.define("Attendance", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    clock_in: {
        type: DataTypes.DATE,
        allowNull: true
    },

    clock_out: {
        type: DataTypes.DATE,
        allowNull: true
    },

    effective_hours: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    total_hours: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

}, {
    tableName: "attendances",
    timestamps: true
})

module.exports = Attendance;