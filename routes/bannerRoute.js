const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/bannerController");
const adminVerify = require("../midlleware/adminVerify");

router.post("/create",adminVerify, bannerController.createBanner);
router.get("/", bannerController.getBanner);
router.patch("/:id", bannerController.updateBannerById);
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;
