const mongoose = require("mongoose");
const validator = require("validator");

const propertySchema = mongoose.Schema(
  {
    property_name: {
      type: String,
      required: [true, "Please provide property name."],
    },
    property_details: {
      type: String,
      required: [true, "Please provide property details."],
    },
    property_purpose: {
      type: String,
      required: [true, "Please select property purpose."],
      enum: {
        values: ["rent", "sell"],
        message: "{VALUE} is invalid ",
      },
    },
    property_type: {
      type: String,
      required: [true, "Please select property type."],
      enum: {
        values: ["residential", "commercial", "land"],
        message: "{VALUE} is invalid",
      },
    },
    residential_type: {
      type: String,
      enum: {
        values: [
          "apartment",
          "house",
          "plot",
          "sublet",
          "duplex",
          "penthouse",
          "studio",
          "room",
          "hostel",
          "garage",
          "farmhouse",
          "condo",
          "bungalow",
          "building",
          "villa",
          "plaza",
          "other",
        ],
        message: "{VALUE} is invalid",
      },
    },
    commercial_type: {
      type: String,
      enum: {
        values: [
          "office",
          "shop",
          "showroom",
          "restaurant",
          "warehouse",
          "factory",
          "land",
          "building",
          "apartment",
          "floor",
          "duplex",
          "plaza",
          "other",
        ],
        message: "{VALUE} is invalid",
      },
    },
    property_images: {
      type: [String],
      validate: {
        validator: (value) => {
          if (!value || !Array.isArray(value)) {
            return false;
          }
          let allOk = true;
          value.forEach((v) => {
            console.log(validator.isURL(v));
            if (!validator.isURL(v)) {
              allOk = false;
            }
          });
          return allOk;
        },
        message: "Provide a valid image URL",
      },
    },
    video: String,
    map: String,
    address: {
      location: {
        type: String,
        required: [true, "Please add property location."],
      },
      property_division: {
        type: String,
        required: [true, "Please add property division."],
      },
      property_district: {
        type: String,
        required: [true, "Please add property district."],
      },
      property_upazilla: {
        type: String,
        required: [true, "Please add property upazilla."],
      },
    },

    property_status: {
      type: String,
      enum: ["active", "sold", "pending"],
      default: "pending",
    },
    features: {
      sqr_fit: Number,
      floor_no: Number,
      bed_room: Number,
      bathroom: Number,
      belcony: Number,
      lift: {
        type: Boolean,
      },
    },

    contact_info: {
      wp_nmbr: {
        type: String,
        unique: true,
        trim: true,
      },

      phone: {
        type: String,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        validate: [validator.isEmail, "Please provide a valid email"],
        required: [true, "Please provide your email"],
      },
    },

    completion_status: {
      type: String,
      enum: {
        values: ["ready", "construction"],
        message: "{VALUE} is invalid ",
      },
    },
    price: {
      type: Number,
      required: [true, "Please add saleprice."],
    },
    user_info: {
      user_type: {
        type: String,
        enum: {
          values: ["seller", "admin"],
          message: "{VALUE} is invalid ",
        },
        required: [true, "Must add user type."],
      },
      user_id: {
        type: String,
        required: [true, "Must add user id."],
      },
    },
  },

  {
    timestamps: true,
  }
);

const Properties = mongoose.model("properties", propertySchema);

module.exports = Properties;
