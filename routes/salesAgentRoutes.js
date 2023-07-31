const express = require('express');
const router = express.Router();
const SalesAgent = require('../models/salesAgent');
const Shop = require('../models/shopLocator');

// salesAgent route to get all sales agents
router.get('/salesAgent', async (req, res) => {
  try {
    const salesAgents = await SalesAgent.find().populate('shop');
    res.json(salesAgents);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to add a new sales agent
router.post('/salesAgent', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { shopName, name, staffNumber, contact } = req.body; 

    console.log('Shop Name:', shopName);
    const shop = await Shop.findOne({ shopName: shopName }); // Use shopName instead of shopId
    console.log('Shop:', shop);

    // To Check if shop exists in the database
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    // Create a new SalesAgent instance and set its properties
    const newSalesAgent = new SalesAgent({
      shop: shop._id, // Use shop._id instead of shopName
      name:name,
      staffNumber:staffNumber,
      contact:contact,
    });

    // Save the new sales agent to the database
    await newSalesAgent.save();
    res.status(201).json(newSalesAgent);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Bad Request' });
  }
});


module.exports = router;
