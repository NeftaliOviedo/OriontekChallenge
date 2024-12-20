const Address = require('../models/addressModel');

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ client: req.params.clientId });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching addresses', error });
  }
};

exports.createAddress = async (req, res) => {
  try {
    const address = new Address({ ...req.body, client: req.params.clientId });
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ message: 'Error creating address', error });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, client: req.params.clientId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!address) {
      return res.status(404).json({ message: 'Address not found for this client' });
    }
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({ message: 'Error updating address', error });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting address', error });
  }
};