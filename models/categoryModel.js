const mongoose=require('mongoose')

const categorySchema = mongoose.Schema(
    {
      parent_category: {
        type: String,
        required: true,
      },
      first_child_Category: {
        type: [Object],
        required: false,
      },
      productType: {
        type: String,
        required: false,
      },
      imageURLs: {
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
      status: {
        type: Boolean,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Category = mongoose.model("Category", categorySchema);
  
  module.exports = Category;