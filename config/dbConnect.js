
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.set("strictQuery", false);

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

module.exports = dbConnect;