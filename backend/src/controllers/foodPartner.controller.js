const foodPartner = require("../models/foodManager.model.js");
const foodmodel = require("../models/food.model.js");
const FoodPartnerById = async (req, res) => {
  try {
    const foodPartnerId = req.params.id;
    const foodPartnerDetail = await foodPartner
      .findById(foodPartnerId)
      .select("fullname address email createdAt");

    if (!foodPartnerDetail) {
      return res.status(404).json({
        message: "food partner not found",
      });
    }

    const fooditem = await foodmodel.find({ food_Partner: foodPartnerId });

    return res.status(200).json({
      message: "FoodPartner fetched successfully",
      foodPartnerDetail: {
        ...foodPartnerDetail.toObject(),
        foodItems: fooditem,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "invalid food partner id",
    });
  }
};

module.exports = { FoodPartnerById };
