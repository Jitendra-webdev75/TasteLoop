const express = require("express");
const foodPartnerController = require("../controllers/foodPartner.controller.js");
const router = express.Router();
router.get("/:id", foodPartnerController.FoodPartnerById);
module.exports = router;
