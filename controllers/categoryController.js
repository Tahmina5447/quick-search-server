const Category = require("../models/categoryModel");
const {
  getCategoryService,
} = require("../services/categoryServices");


exports.getCategory = async (req, res) => {
    await getCategoryService(req, res);
  };