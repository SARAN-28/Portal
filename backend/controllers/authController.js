const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/mailer");
const User = require("../models/user");
const Invite = require("../models/invite");
const OtpCode = require("../models/otpCode");
const EmployeeProfile = require("../models/employeeProfile");

exports.signup = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: "employee"
        });

        res.json({
            message: "User created successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });
    }
};

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({
            where: { email: email }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        if (user.role === "admin") {

            await OtpCode.destroy({
                where: { email: user.email }
            });

            const otp = Math.floor(100000 + Math.random() * 900000);

            const expires_at = new Date(Date.now() + 5 * 60 * 1000);

            await OtpCode.create({
                email: user.email,
                otp: otp,
                expires_at: expires_at
            });

            try {

                await sendEmail(
                    user.email,
                    "Admin Login OTP",
                    `<h1>Your OTP is: ${otp}</h1>
                    <h3>Don't share your OTP with any one.<br>
                    Please use the OTP to complete your login process. OTP is valid for 5 minutes. <br>
                    If you didn't try to login just now, please ignore this email. <br>
                    Feel free to contact us for any assistance by replying to this email.<br><br>
                    Regards,<br>
                    ${email}
                    </h3>`
                );

                return res.json({
                    message: "OTP sent to admin email",
                    role: "admin"
                });

            } catch (error) {

                console.log("Email error:", error);

                return res.status(500).json({
                    message: "Failed to send OTP email"
                });
            }
        }
        else {

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return res.json({
                message: "Employee login successful",
                role: "employee",
                token: token
            });
        }

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });
    }
};

exports.verifyOtp = async (req, res) => {

    const { email, otp } = req.body;

    try {
        const record = await OtpCode.findOne({
            where: {
                email: email,
                otp: otp
            }
        });

        if (!record) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        const now = new Date();

        if (now > record.expires_at) {

            return res.status(400).json({
                message: "OTP expired"
            });

        }

        const user = await User.findOne({
            where: { email: email }
        });

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        await record.destroy();

        return res.json({
            message: "OTP verified successfully",
            token: token,
            role: "admin"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error
        });
    }
};

exports.forgotPassword = async (req, res) => {

    const { email } = req.body;

    try {

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        const expires_at = new Date(Date.now() + 5 * 60 * 1000);

        await OtpCode.destroy({
            where: { email }
        });

        await OtpCode.create({
            email,
            otp,
            expires_at
        });

        await sendEmail(
            email,
            "Password Reset OTP",
            `<h1>Your password reset OTP is: ${otp}</h1>
            <h3>Don't share your OTP with any one.<br>
            Please use the OTP to complete your login process. OTP is valid for 5 minutes. <br>
            If you didn't try to login just now, please ignore this email. <br>
            Feel free to contact us for any assistance by replying to this email.<br><br>
            Regards,<br>
            ${email}</h3>`
        );

        res.json({
            message: "OTP sent to your email"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });
    }
};

exports.verifyResetOtp = async (req, res) => {

    const { email, otp } = req.body;

    try {

        const record = await OtpCode.findOne({
            where: { email, otp }
        });

        if (!record) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (new Date() > record.expires_at) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }

        const tempToken = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        );

        return res.json({
            message: "OTP verified",
            resetToken: tempToken
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

exports.resetPassword = async (req, res) => {

    const { newPassword } = req.body;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "No token"
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const email = decoded.email;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.update(
            { password: hashedPassword },
            { where: { email } }
        );

        await OtpCode.destroy({ where: { email } });

        res.json({
            message: "Password reset successful"
        });

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

exports.acceptInvite = async (req, res) => {

    const { token, password } = req.body;

    try {
        const invite = await Invite.findOne({
            where: { token }
        });

        if (!invite) {
            return res.status(400).json({
                message: "Invalid invite"
            });
        }

        if (new Date() > invite.expires_at) {
            return res.status(400).json({
                message: "Token expired"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: invite.name,
            email: invite.email,
            password: hashedPassword,
            role: invite.role
        });

        await EmployeeProfile.create({
            user_id: newUser.id,
            employee_id: invite.employee_id
        })

        await invite.destroy();

        res.json({
            message: "Account created successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};