const mongoose = require('mongoose');
const invoiceSchema = new mongoose.Schema({
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },  
  agent: { type: mongoose.Schema.Types.ObjectId,
    ref: 'SalesAgent', default: '', required: true },
  shop: { type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopLoator', default: '', required: true },
  companyName: { type: String, default: '', required: true },
  customerName: { type: String, default: '', required: true }
});
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;

// module.exports = mongoose.model('Invoice', invoiceSchema);
