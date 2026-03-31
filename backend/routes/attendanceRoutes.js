const express = require("express")
const router = express.Router()

const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware")

const { clockIn, clockOut, getMyAttendance } = require("../controllers/attendanceController")


router.post("/clock-in", authMiddleware, roleMiddleware("employee"), clockIn);

router.post("/clock-out", authMiddleware, roleMiddleware("employee"), clockOut);

router.get("/my-attendance", authMiddleware, roleMiddleware("employee"), getMyAttendance)

module.exports = router