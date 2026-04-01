const User = require("./user")
const EmployeeProfile = require("./employeeProfile")
const Attendance = require("./attendance")

User.hasOne(EmployeeProfile, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

EmployeeProfile.belongsTo(User, {
    foreignKey: "user_id"
})

User.hasMany(Attendance, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

Attendance.belongsTo(User, {
    foreignKey: "user_id"
})

module.exports = { User, EmployeeProfile, Attendance }