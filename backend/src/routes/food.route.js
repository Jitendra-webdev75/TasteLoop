const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  Storage: multer.memoryStorage(),
});
router.post(
  "/",
  authMiddleware.foodMangaerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

router.get("/", authMiddleware.userMiddleware, foodController.getFoodItems);
module.exports = router;
