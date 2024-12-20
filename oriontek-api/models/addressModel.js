const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
}, { timestamps: true });
module.exports = mongoose.model('Address', addressSchema);