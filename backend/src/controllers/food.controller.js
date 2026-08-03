const foodmodel = require("../models/food.model.js");
const likemodel = require("../models/like.model.js");
const savemodel = require("../models/save.model.js");
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

const likeFood = async (req, res) => {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLike = await likemodel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLike) {
    await likemodel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodmodel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });
    return res.status(200).json({
      message: "user unliked the video",
      createLike: false,
    });
  }

  const createLike = await likemodel.create({
    user: user._id,
    food: foodId,
  });

  await foodmodel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });
  return res.status(201).json({
    message: "user liked the video",
    createLike: true,
  });
};

const saveFood = async (req, res) => {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySave = await savemodel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadySave) {
    await savemodel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodmodel.findByIdAndUpdate(foodId, {
      $inc: { saveCount: -1 },
    });

    return res.status(200).json({
      message: "already saved",
      createSave: false,
    });
  }

  const save = await savemodel.create({
    user: user._id,
    food: foodId,
  });

  await foodmodel.findByIdAndUpdate(foodId, {
    $inc: { saveCount: 1 },
  });
  return res.status(201).json({
    message: "saved successfully",
    createSave: true,
  });
};

const getSaveVideo = async (req, res) => {
  const user = req.user;

  const savevideo = await savemodel.findById(user._id).populate(food);

  if (!saveFood || savevideo.length == 0) {
    return res.status(400).json({
      message: "no save food is here",
    });
  }

  return res.status(200).json({
    message: "saved video is here",
    savevideo,
  });
};
module.exports = { createFood, getFoodItems, likeFood, saveFood, getSaveVideo };
