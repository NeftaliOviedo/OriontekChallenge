const express = require("express");
const {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");
const router = express.Router();

router.route("/:clientId").get(getAddresses);
router.route("/:clientId/create").post(createAddress);

router.route("/:id/update").put(updateAddress);
router.route("/:clientId/delete").delete(deleteAddress);

module.exports = router;
