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
      type: Number,
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
});
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;

// module.exports = mongoose.model('Invoice', invoiceSchema);
