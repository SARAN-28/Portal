const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const { sendInvite, getAllEmployees, adminUpdateProfile } = require("../controllers/adminController");

router.get("/admin-dashboard", authMiddleware, roleMiddleware("admin"), (req, res) => {
    res.json({
        message: "Welcome Admin"
    });
}
);

router.post("/send-invite", authMiddleware, roleMiddleware("admin"),sendInvite);

router.get("/all-employees", authMiddleware,roleMiddleware("admin"),getAllEmployees);

router.put("/update-employee/:userId", authMiddleware,roleMiddleware("admin"),adminUpdateProfile);

module.exports = router;