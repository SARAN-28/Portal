const Invite = require("../models/invite");
const Users = require("../models/user")
const EmployeeProfile = require("../models/employeeProfile")
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { log } = require("console");
require("dotenv").config();

exports.sendInvite = async (req, res) => {

    const { name, email, employee_id } = req.body;
    try {

        const token = crypto.randomBytes(32).toString("hex");

        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await Invite.create({
            name,
            email,
            employee_id,
            token,
            expires_at: expires
        });

        const inviteLink =
            `${process.env.FRONTEND_URL}/accept-invite?token=${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            to: email,
            subject: "You're Invited",
            html: `
        <h1>Welcome ${name}</h1>
        <h2>You are invited to join the portal <br>
        <a href="${inviteLink}">Accept Invite</a></h2>
        <h3>Don't share the link to any one. <br>
        <strong>Note: </strong>Invite link is valid for 1 day.</h3> `
        });
        res.json({
            message: "Invitation successfully sent to Employee"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

exports.getAllEmployees = async (req, res) => {

    try {
        const employees = await Users.findAll({
            where: { role: "employee" },
            attributes: ["id", "name", "email"],
            include: [{
                model: EmployeeProfile,
                attributes:
                    [
                        "employee_id", "department", "designation", "location", "date_of_join",
                        "current_experience", "total_experience", "employee_status", "reporting_manager",

                        "first_name", "last_name", "secondary_email", "age", "blood_group",
                        "address", "gender", "about", "pan", "aadhar", "phone", "work_address",
                        "permanent_address", "institution", "specialization", "completion_date"
                    ]
            }]
        })
        res.json({ employees })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

exports.adminUpdateProfile = async (req, res) => {
    try {
        const { userId } = req.params

        const profile = await EmployeeProfile.findOne({
            where: { user_id: userId }
        })

        if (!profile) {
            return res.status(404).json({ message: "Employee not found" });
        }

        await profile.update({
            department: req.body.department,
            designation: req.body.designation,
            location: req.body.location,
            date_of_join: req.body.date_of_join,
            current_experience: req.body.current_experience,
            total_experience: req.body.total_experience,
            employee_status: req.body.employee_status,
            reporting_manager: req.body.reporting_manager
        })

        res.status(200).json({ message: "Employee details updated by admin", data: profile })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })
    }
}