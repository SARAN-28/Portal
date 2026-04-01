const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./models/association")
const sequelize = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes")
const employeeRoutes = require("./routes/employeeRoutes")
const attendanceRoutes = require("./routes/attendanceRoutes")
const seedAdmin = require("./seeders/adminSeeders")

const app = express();

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => {
    res.send("Server Running Successfully");
});

sequelize.authenticate().then(async () => {

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log("DB Sync Error", err);
})