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
const allowedOrigins = [
  "http://localhost:5173",
  "https://taste-loop-pi.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS policy"));
      }
    },
    credentials: true,
  }),
);
app.use("/api/auth", authRoute);
app.use("/api/food", foodRoute);
app.use("/api/food-partner", foodPartnerRoute);

module.exports = app;
