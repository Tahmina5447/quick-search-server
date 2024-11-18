const Category = require("../models/categoryModel");

exports.getCategoryService = async (req, res) => {
    try {
      const categoryList = await Category.find();
      if (!categoryList) {
        return res.status(404).json({
          status: "Fail",
          message: "Categories not found!",
        });
      }
      res.status(200).json({
        status: "Success",
        data: categoryList,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Error",
        message: "Server error. Could not retrieve categories.",
        error: error.message,
      });
    }
  };
  
