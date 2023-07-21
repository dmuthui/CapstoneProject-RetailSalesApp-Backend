const mongoose = require('mongoose');
const receiptSchema = new mongoose.Schema({
  customerName: { type: String, default: '', required: true },
  product: { type: String, default: '', required: true },
  quantity: { type: Number, default: 0, required: true },
  totalPrice: { type: Number, default: 0, required: true },
  date: { type: Date, default: Date.now },
  agent: { type: String, default: '', required: true },
  shop: { type: String, default: '', required: true },
  companyName: { type: String, default: '', required: true }
})
const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;

