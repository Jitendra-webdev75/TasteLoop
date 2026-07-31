const foodmodel = require("../models/food.model.js");
const serviceFile = require("../services/imagekit.service.js");
const { v4: uuid } = require("uuid");
const createFood = async (req, res) => {
  console.log(req.foodManager);
  console.log(req.body);
  console.log(req.file);

  const uploadFileResult = await serviceFile.uploadFile(
    req.file.buffer,
    uuid(),
  );

  const foodItem = await foodmodel.create({
    title: req.body.title,
    desc: req.body.desc,
    video: uploadFileResult.url,
    food_Partner: req.foodManager._id,
  });

  return res.status(201).json({
    message: "food item created successfully",
  });
};

const getFoodItems = async (req, res) => {
  try {
    const foodItem = await foodmodel.find({});

    return res.status(200).json({
      message: " food items fetched successfully",
      foodItem,
    });
  } catch (error) {
    return res.status(400).json({
      mesaage: "catch an errorr",
    });
  }
};

module.exports = { createFood, getFoodItems };
