const express = require("express");
const router = express.Router();

const { signup, login, verifyOtp, forgotPassword, verifyResetOtp, resetPassword, acceptInvite } = require("../controllers/authController");


router.post("/signup", signup);

router.post("/login", login);

router.post("/verify-otp", verifyOtp);

router.post("/forgot-password", forgotPassword);

router.post("/verify-reset-otp", verifyResetOtp);

router.post("/reset-password", resetPassword);

router.post("/accept-invite", acceptInvite)

module.exports = router; 