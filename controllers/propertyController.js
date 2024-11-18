const {
  createProperyService,
  getPropertiesService,
  getPropertyByIdService,
  updatePropertyByIdService,
  deletePropertyByIdService
} = require("../services/propertyServices");

const Properties=require("../models/propertyModel")

exports.createProperty = async (req, res) => {
  try {
    const newPrpperty = await createProperyService(req.body);
    const { ...others } = newPrpperty.toObject();
    res.status(200).json({
      status: "success",
      message: "Property added successfully!",
      data: others,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      // Get all validation error messages
      const errorMessages = Object.values(err.errors).map((el) => el.message);
      res.status(400).json({
        status: "fail",
        error: `Property validation failed: ${errorMessages.join(", ")}`,
        message: errorMessages[0],
      });
    }
  }
};

exports.getProperties = async (req, res) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["limit", "page", "sort", "fields"];
    excludeFields.forEach((field) => delete filters[field]);

    // Search functionality
    if (req.query.search) {
      const searchRegex = { $regex: req.query.search, $options: "i" };
      filters.$or = [
        { name: searchRegex },
        { tags: searchRegex },
        { category: searchRegex },
      ];
    }

    // // first child category filtering
    // if (req.query.first_child_category) {
    //   filters.first_child_category = { $in: req.query.first_child_category };
    // }

    // // Second child category filtering
    // if (req.query.second_child_category) {
    //   filters.second_child_category = { $in: req.query.second_child_category };
    // }

    // Query operators for range filtering
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|lt|gte|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString);

    // Query options
    const queries = {};

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 6;
    const skip = (page - 1) * limit;
    queries.skip = skip;
    queries.limit = limit;

    // Sorting
    if (req.query.sort) {
      queries.sort = req.query.sort.split(",").join(" ");
    }

    // Field selection
    if (req.query.fields) {
      queries.fields = req.query.fields.split(",").join(" ");
    }

    // Fetch products
    const result = await getPropertiesService(filters, queries);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "An error occurred while retrieving the data",
      error: error.message,
    });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await getPropertyByIdService(id);

    res.status(200).json({
      status: "success",
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.updatePropertyById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const property = await Properties.findById(id);
    if (!property) {
      return res.status(404).json({
        status: "fail",
        error: "Property not found",
      });
    }

    const updateProperty = await updatePropertyByIdService(id, body);

    res.status(200).json({
      status: "success",
      data: updateProperty,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "filad to update product",
      error: error.message,
    });
  }
};

exports.deletePropertyById = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await deletePropertyByIdService(id);

    res.status(200).json({
      status: "success",
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "filad to property delete",
      error: error.message,
    });
  }
};


