const User = require("./user")
const EmployeeProfile = require("./employeeProfile")

User.hasOne(EmployeeProfile ,{
    foreignKey : "user_id",
    onDelete : "CASCADE"
})

EmployeeProfile.belongsTo(User,{
    foreignKey : "user_id"
})

module.exports = {User,EmployeeProfile}