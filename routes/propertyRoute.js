const express = require("express");
const router = express.Router();

const propertyController = require("../controllers/propertyController");
const verifyToken = require("../midlleware/verifyToken");


router.post("/create",verifyToken, propertyController.createProperty);
router.get("/", propertyController.getProperties);
router.route("/:id")
  .get(propertyController.getPropertyById)
  .delete(propertyController.deletePropertyById)
  .patch(propertyController.updatePropertyById);


module.exports = router;