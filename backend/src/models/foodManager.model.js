const mongoose = require("mongoose");
const managerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
      lowercase: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const FoodManager = mongoose.model("FoodManager", managerSchema);

module.exports = FoodManager;
