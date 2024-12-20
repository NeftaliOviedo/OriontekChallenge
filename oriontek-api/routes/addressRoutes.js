const express = require('express');
const { getAddresses, createAddress, updateAddress, deleteAddress } = require('../controllers/addressController');
const router = express.Router();

router.route('/:clientId')
  .get(getAddresses)
  .post(createAddress);

router.route('/:id')
  .put(updateAddress)
  .delete(deleteAddress);

module.exports = router;