const mongoose = require('mongoose');
const { Schema } = mongoose;

const quotationSchema = new Schema({
  agentName: { type: Schema.Types.ObjectId, ref: 'SalesAgent', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  shopName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  companyName: { type: String, required: true },
  customerName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;