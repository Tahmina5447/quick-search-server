const mongoose = require("mongoose");
const bannerSchema = mongoose.Schema(
  {
    position: {
      type: Number,
      required: [true, "Please add banner position."],
      default: 0,
    },
    image: { type: String, required: [true, "Please add banner image."] },
    status: {
      type: String,
      enum: ["active", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Banners", bannerSchema);
module.exports = User;
