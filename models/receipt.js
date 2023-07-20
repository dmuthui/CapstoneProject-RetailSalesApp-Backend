const mongoose = require('mongoose');
const receiptSchema = new mongoose.Schema({
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
const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;

// module.exports = mongoose.model('Receipt', receiptSchema);
