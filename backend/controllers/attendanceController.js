const Attendance = require("../models")

const getTodayDate = () => {
    return new Date().toISOString().split("T")[0]
}

exports.clockIn = async (req, res) => {
    try {
        const userId = req.user.id
        const today = getTodayDate();

        const lastRecord = await Attendance.findOne({
            where: { user_id: userId, date: today },
            order:[["createdAt","DESC"]]
        })
        if (lastRecord && !lastRecord.clock_out) {
            return res.status(400).json({
                message: "Already Clocked-in Please Clock-Out"
            })
        }

        const attendance = await Attendance.create({
            user_id: userId,
            clock_in: new Date(),
            date: today
        })
        res.status(201).json({
            message: "Clocked-in Successfully",
            data: attendance
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.clockOut = async (req, res) => {
    try {
        const userId = req.user.id
        const today = getTodayDate();

        const attendance = await Attendance.findOne({
            where: { user_id: userId, date: today },
            order:[["createdAt", "DESC"]]
        })
        if (!attendance) {
            return res.status(400).json({
                message: "No Clock-in found for Today"
            })
        }
        if (attendance.clock_out) {
            return res.status(400).json({
                message: "Already Clocked-Out Please Clock-In again"
            });
        }

        console.log("USER:", req.user);

        const clockInTime = new Date(attendance.clock_in)
        const clockOutTime = new Date();

        const breakTime = 1

        const diff = clockOutTime - clockInTime

        const totalHours = (diff / (1000 * 60 * 60)).toFixed(2);

        const effectiveHours = totalHours - breakTime

        await attendance.update({
            clock_out: clockOutTime,
            effective_hours: effectiveHours,
            total_hours: totalHours
        })
        res.status(200).json({
            message: "Clocked-Out Successfully",
            data: attendance
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}

exports.getMyAttendance = async (req, res) => {
    try {
        const userId = req.user.id

        const records = await Attendance.findAll({
            where: { user_id: userId },
            order: [["date", "DESC"]]
        })
        res.status(200).json({
            attendance: records
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
};