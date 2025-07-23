const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hashedPassword = bcrypt.hashSync("admin123", 10);
  await User.create({ username: "thiyo", password: hashedPassword });
  console.log("✅ Admin created");
  process.exit();
});
