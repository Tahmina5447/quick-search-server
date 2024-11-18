const Banners = require("../models/bannerModel");

exports.createBannerService = async (data) => {
  const result = await Banners.create(data);
  return result;
};

exports.getBannerService = async (queries) => {

  const result = await Banners.find()
    .sort(queries.sort);
  const total = await Banners.countDocuments();
  const page = Math.ceil(total / queries.limit);
  return { total, page, result };
};

exports.updateBannerByIdService = async (id, data) => {
  const result = await Banners.updateOne({ _id: id }, data);
  return result;
};

exports.deleteBannerService = async (id) => {
  const result = await Banners.deleteOne({ _id: id });
  return result;
};