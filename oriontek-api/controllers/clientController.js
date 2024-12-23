const Client = require("../models/clientModel");
const Address = require('../models/addressModel');

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find().populate("addresses");
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error });
  }
};

exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    const clients = await Client.find().populate("addresses");
    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json({ message: "Error creating client", error });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("addresses");
    if (!client) return res.status(404).json({ message: "Client not found" });
    const clients = await Client.find().populate("addresses");
    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json({ message: "Error updating client", error });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndDelete(id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    const addresses = await Address.find({ client: id });

    if (addresses.length > 0) {
      await Address.deleteMany({ _id: { $in: client.addresses } });
    }

    res
      .status(200)
      .json({
        message: "Client and associated addresses deleted successfully",
      });
  } catch (error) {
    res.status(500).json({ message: "Error deleting client", error });
  }
};
