const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    video: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      require: true,
    },

    food_Partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodManager",
    },
  },
  { timestamps: true },
);

const food = mongoose.model("food", foodSchema);

module.exports = food;
