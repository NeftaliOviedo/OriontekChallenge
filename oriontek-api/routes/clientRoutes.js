const express = require("express");
const {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");
const router = express.Router();

router.route("/").get(getClients);
router.route("/create").post(createClient);

router.route("/:id/update").put(updateClient);
router.route("/:id/delete").delete(deleteClient);

module.exports = router;
