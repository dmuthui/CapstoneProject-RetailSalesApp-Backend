const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  customerName: { type: String, default: '', required: true },
  product: { type: String, default: '', required: true },
  quantity: { type: Number, default: 0, required: true },
  totalPrice: { type: Number, default: 0, required: true },
  date: { type: Date, default: Date.now },
  agent: { type: String, default: '', required: true },
  shop: { type: String, default: '', required: true },
  companyName: { type: String, default: '', required: true }
})
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
