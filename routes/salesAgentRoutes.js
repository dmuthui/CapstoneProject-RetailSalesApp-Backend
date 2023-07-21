const express = require('express');
const router = express.Router();
const SalesAgent = require('../models/salesAgent');
const Shop = require('../models/shopLocator');

// Route to get all sales agents
router.get('/salesAgent', async (req, res) => {
  try {
    const salesAgents = await SalesAgent.find();
    res.json(salesAgents);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to add a new sales agent
router.post('/salesAgent', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { shopName, name, StaffNumber, contact } = req.body; 

    console.log('Shop Name:', shopName);
    const shop = await Shop.findOne({ shopName: shopName });
    console.log('Shop:', shop);

    // To Check if shop exists in the database
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    // Create a new SalesAgent instance and set its properties
    const newSalesAgent = new SalesAgent({
      shop: shop.shopName,
      name, // Use the destructured variable
      StaffNumber, // Use the destructured variable
      contact, // Use the destructured variable
    });

    // Save the new sales agent to the database
    await newSalesAgent.save();
    res.status(201).json(newSalesAgent);
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

module.exports = router;