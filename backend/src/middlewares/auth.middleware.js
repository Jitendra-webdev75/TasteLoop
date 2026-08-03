const foodManagerUser = require("../models/foodManager.model.js");
const usermodel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const foodMangaerMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(400).json({
      message: "please login first",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodManager = await foodManagerUser.findById(decoded.id);
    req.foodManager = foodManager;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "invalid token",
    });
  }
};

const userMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(400).json({
      message: "please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usermodel.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "invalid token",
    });
  }
};

module.exports = { foodMangaerMiddleware, userMiddleware };
