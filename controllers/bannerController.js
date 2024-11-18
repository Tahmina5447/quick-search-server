const {
  createBannerService,
  getBannerService,
  deleteBannerService,
} = require("../services/bannerServices");

exports.createBanner = async (req, res, next) => {
  try {
    const banner = await createBannerService(req.body);
    console.log("..........", banner);
    const { ...others } = banner.toObject();
    res.status(200).json({
      status: "success",
      message: "Successfully Banner Added.",
      data: { banner_data: others },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map((el) => el.message);
      res.status(400).json({
        status: "fail",
        error: `User validation failed: ${errorMessages.join(", ")}`,
        message: errorMessages[0],
      });
    }
  }
};

exports.getBanner = async (req, res) => {
  try {
    let filters = { ...req.query };
    const excludesFields = ["limit", "page", "sort", "fields", "search"];

    excludesFields.forEach((field) => {
      delete filters[field];
    });

    // pagination---------------
    let queries = {};
    if (req.query.limit || req.query.page) {
      const { page = 1, limit = 5 } = req.query;
      const skipBanner = (page - 1) * +limit;
      queries.skip = skipBanner;
      queries.limit = +limit;
    }

     // single with multi sorting
     if (req.query.sort) {
      let sortBanner = req.query.sort;
      sortBanner = sortBanner.split(",").join(" ");
      queries.sort = sortBanner;
    }

    const result = await getBannerService(queries);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.updateBannerById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateBanner = await updateBannerByIdService(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Banner updated successfully",
      data: updateBanner,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteBannerService(id);

    res.status(200).json({
      status: "success",
      message: "Deleted Successfully",
      data: result,
    });
   
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the Banner.",
      error: error.message,
    });
  }
};
