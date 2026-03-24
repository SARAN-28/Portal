const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { sendInvite } = require("../controllers/adminController");

router.get("/admin-dashboard", authMiddleware, roleMiddleware("admin"), (req, res) => {
    res.json({
        message: "Welcome Admin"
    });
}
);

router.post("/send-invite", authMiddleware, roleMiddleware("admin"),sendInvite);

module.exports = router;