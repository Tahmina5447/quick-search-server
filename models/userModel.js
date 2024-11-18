const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      required: [true, "Please provide your email"],
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
    },
    profile_image: String,
    nid_front_image: {type:String,required:[true,"Please add NID front image."]},
    nid_back_image: {type:String,required:[true,"Please add NID back image."]},

    division: {
      type: String,
      required: [true, "Please provide your division."],
    },

    district: {
      type: String,
      required: [true, "Please provide your district."],
    },

    upazila: {
      type: String,
      required: [true, "Please provide your upazilla."],
    },
    password: {
      type: String,
      required: [true, "Please provide password."],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 5,
            minLowercase: 0,
            minNumbers: 0,
            minUppercase: 0,
            minSymbols: 0,
          }),
        message: "Password {VALUE} is not strong enough.",
      },
    },
    // confirm_password: {
    //   type: String,
    //   required: [true, "Please confirm your password"],
    //   validate: {
    //     validator: function (value) {
    //       return value === this.password;
    //     },
    //     message: "The password doesn't match!",
    //   },
    // },
    full_name: {
      type: String,
      required: [true, "Please provide your full name."],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please provide your address."],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is invalid ",
      },
    },
    status: {
      type: String,
      enum: ["active", "blocked", "pending"],
      default: "pending",
    },
    user_role: {
      type: String,
      enum: ["seller", "admin"],
      default: "seller",
    },
    forget_password_token: {
      type: String,
      default: "",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);
  this.password = hashedPassword;
  // this.confirm_password = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
