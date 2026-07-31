const express = require("express");
const authController = require("../controllers/auth.controller.js");
const router = express.Router();

// user routes
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logOutUser);

// food_manager routes
router.post("/manager/register", authController.registerManager);
router.post("/manager/login", authController.loginManager);
router.get("/manager/logout", authController.logOutManager);

module.exports = router;
