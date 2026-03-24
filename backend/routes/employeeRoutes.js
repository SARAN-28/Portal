const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { getProfile, upsertProfile } = require("../controllers/profileController");

router.get("/employee-dashboard",authMiddleware,roleMiddleware("employee"),(req, res) => {
    res.json({
      message: "Welcome Employee",
      user: req.user
    });
  }
);

router.get("/profile", authMiddleware, roleMiddleware("employee"), getProfile);

router.post("/profile", authMiddleware, roleMiddleware("employee"), upsertProfile);

module.exports = router 