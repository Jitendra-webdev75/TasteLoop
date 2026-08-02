const express = require("express");
const authRoute = require("./routes/auth.route.js");
const foodRoute = require("./routes/food.route.js");
const foodPartnerRoute = require("./routes/food-partner.js");
const app = express();
const connectDB = require("./db/db.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/auth", authRoute);
app.use("/api/food", foodRoute);
app.use("/api/food-partner", foodPartnerRoute);

module.exports = app;
