const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopLocator',
    required: true,
  },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
