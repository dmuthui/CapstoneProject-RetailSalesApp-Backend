const mongoose = require('mongoose');

// Defines the SalesAgent schema
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
    type: String,
    default: '',
    required: true },
  contact: {
    type: String,
    required: true,
  },
});

// Creates the SalesAgent model
const SalesAgent = mongoose.model('SalesAgent', salesAgentSchema);

module.exports = SalesAgent;
