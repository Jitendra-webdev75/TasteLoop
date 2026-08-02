const user_model = require("../models/user.model.js");
const Manager_model = require("../models/foodManager.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  const isUSerExist = await user_model.findOne({
    email,
  });
  if (isUSerExist) {
    return res.status(400).json({
      message: "User already exist ",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await user_model.create({
    fullname,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  return res.status(201).json({
    mesage: "User register successfully!",
    user,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await user_model.findOne({
    email,
  });

  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "invalid credentials",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  return res.status(200).json({
    message: "USer login successfully",
    user,
  });
};

const logOutUser = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "User logout successfully",
  });
};

const registerManager = async (req, res) => {
  const { fullname, address, email, password } = req.body;
  const isUSerExist = await Manager_model.findOne({
    email,
  });
  if (isUSerExist) {
    return res.status(400).json({
      message: "User already exist ",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const manager = await Manager_model.create({
    fullname,
    address,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: manager._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  return res.status(201).json({
    mesage: "Manager register successfully!",
    manager,
  });
};

const loginManager = async (req, res) => {
  const { email, password } = req.body;

  const manager = await Manager_model.findOne({
    email,
  });

  if (!manager) {
    return res.status(400).json({
      message: "invalid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, manager.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "invalid credentials",
    });
  }

  const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  return res.status(200).json({
    message: "manager login successfully",
    manager,
  });
};

const logOutManager = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "manager logout successfully",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logOutUser,
  registerManager,
  loginManager,
  logOutManager,
};
