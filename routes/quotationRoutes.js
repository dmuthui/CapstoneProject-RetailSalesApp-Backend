const express = require('express');
const router = express.Router();
const Quotation = require('../models/quotation');
const SalesAgent = require('../models/salesAgent');
const Product = require('../models/products');
const Shop = require('../models/shopLocator');
const Inventory = require('../models/inventory');

// POST /quotations
router.post('/quotation', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { agentName, product, shopName, quantity, companyName, customerName } = req.body;

    console.log('Agent Name:', agentName);
    console.log('Product Name:', product);
    console.log('Shop Name:', shopName);

    // Retrieve the agent, product, and shop from the respective schemas
    const agent = await SalesAgent.findOne({name: agentName});
    const productName = await Product.findOne({ name: product });
    const shop = await Shop.findOne({ shopName: shopName });
    const inventoryItem = await Inventory.findOne({ name: product });

    console.log('Agent:', agent);
    console.log('Product:', productName);
    console.log('Shop:', shop);

    // To Check if agent, product, and shop exist in the database
    if (!agent || !productName || !shop) {
      return res.status(404).json({ error: 'Agent, product, or shop not found' });
    }

    // Check if the product is available in the inventory
    if (!inventoryItem || inventoryItem.quantity < quantity) {
      return res.status(400).json({ error: 'Product is out of stock or insufficient quantity in inventory' });
    }

    // Generate createdAt and totalPrice values
    const totalPrice = productName.price * quantity;

    // Create the quotation object
    const quotationData = {
      agentName: agent._id, // Use agent._id instead of agentName
      product: productName._id,
      shopName: shopName, 
      quantity: parseInt(quantity),
      companyName: companyName,
      customerName: customerName,
      totalPrice: parseInt(totalPrice),
    };

    // Save the quotation to the database
    const newQuotation = new Quotation(quotationData);
    const savedQuotation = await newQuotation.save();

    // Deduct the quoted quantity from the inventory
    inventoryItem.quantity -= quantity;
    await inventoryItem.save();

    res.json(savedQuotation);
  } catch (error) {
    console.error('Error creating quotation:', error);
    res.status(500).json({ error: 'Error creating quotation' });
  }
 });



// GET /quotations
router.get('/', async (req, res) => {
  try {
    // Retrieve all quotations from the database
    const quotations = await Quotation.find();

    res.json(quotations);
  } catch (error) {
    console.error('Error retrieving quotations:', error);
    res.status(500).json({ error: 'Error retrieving quotations' });
  }
});

module.exports = router;
