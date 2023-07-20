const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quotationSchema = new Schema({
  customerName: { type: String, default: '', required: true },
  product: { type: String, default: '', required: true },
  quantity: { type: Number, default: 0, required: true },
  totalPrice: { type: Number, default: 0, required: true },
  createdAt: { type: Date, default: Date.now },
  agent: { type: String, default: '', required: true },
  shop: { type: String, default: '', required: true },
  companyName: { type: String, default: '', required: true }
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;
