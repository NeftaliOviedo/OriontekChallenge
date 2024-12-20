const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  phone: { type: String, required: true, trim: true },
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }]
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);