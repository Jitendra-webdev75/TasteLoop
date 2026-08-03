const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "food",
    },
  },
  { timestamps: true },
);

const Savemodel = mongoose.model("Savemodel", saveSchema);

module.exports = Savemodel;
