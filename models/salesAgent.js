const mongoose = require('mongoose');

const salesAgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  StaffNumber: {
    type: String,
    required: true,
    unique: true,
  },
  shop: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

const SalesAgent = mongoose.model('SalesAgent', salesAgentSchema);

module.exports = SalesAgent;
