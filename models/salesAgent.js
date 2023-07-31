const mongoose = require('mongoose');

const salesAgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  staffNumber: {
    type: String,
    required: true,
    unique: true,
  },
  shop: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopLocator',
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

const SalesAgent = mongoose.model('SalesAgent', salesAgentSchema);

module.exports = SalesAgent;
