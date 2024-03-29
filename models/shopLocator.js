const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopLocatorSchema = new Schema({
  shopId: {
    type: Number,
    unique: true,
    required: true,
  },
  shopName: {
    type: String,
    enum: ['Hub', 'Galleria', 'Digo', 'Westgate', 'Sarit', 'Eldoret', 'Busia'],
    required: true,
  },
  shopLocation: {
    type: String,
    enum: ['Karen', 'Bomas', 'Mombasa', 'Nairobi', 'Eldoret', 'Busia'],
    required: true,
  },
  openinghrs: {
    type: String,
    default: "",
    required: true,
  },
  closinghrs: {
    type: String,
    default: "",
    required: true,
  },
});

const ShopLocator = mongoose.model('ShopLocator', shopLocatorSchema);

module.exports = ShopLocator;
