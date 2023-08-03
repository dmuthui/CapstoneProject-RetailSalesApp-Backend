const express = require('express'); 
const router = express.Router();
const Receipt = require('../models/receipt');
const SalesAgent = require('../models/salesAgent');
const Product = require('../models/products');
const Shop = require('../models/shopLocator');

//Generate Receipt
router.post('/receipt', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { agentName, productName, shopName, quantity, companyName, customerName } = req.body;

    console.log('Agent Name:', agentName);
    console.log('Product Name:', productName);
    console.log('Shop Name:', shopName);

    // Retrieve the agent, product, and shop from the respective schemas
    const agent = await SalesAgent.findOne({ name: agentName });
    const product = await Product.findOne({ name: productName });
    const shop = await Shop.findOne({ shopName: shopName });

    console.log('Agent:', agent);
    console.log('Product:', product);
    console.log('Shop:', shop);

    // To Check if agent, product, and shop exist in the database
    if (!agent || !product || !shop) {
      return res.status(404).json({ error: 'Agent, product, or shop not found' });
    }

    // Generate date and totalPrice values
    const date = new Date();
    const totalPrice = product.price * quantity;

    // Create the receipt object
    const receiptData = {
      agent: agent.name,
      product: product.name,
      shop: shop.shopName, 
      quantity,
      companyName,
      customerName,
      date,
      totalPrice
    };

    // Save the quotation to the database
    const newReceipt = new Receipt(receiptData);
    const savedReceipt = await newReceipt.save();

    res.json(savedReceipt);
  } catch (error) {
    console.error('Error creating Receipt:', error);
    res.status(500).json({ error: 'Error creating receipt' });
  }
});

// GET Receipt
router.get('/receipt/:invoiceId', async (req, res) => {
  try {
    const invoiceId = req.params.invoiceId;
    // Retrieve receipt data based on the invoiceId from the database
    const receipt = await Receipt.findOne({ _id: invoiceId });

    if (!receipt) {
      return res.status(404).json({ error: 'Receipt not found' });
    }

    res.json(receipt);
  } catch (error) {
    console.error('Error retrieving receipt:', error);
    res.status(500).json({ error: 'Error retrieving receipt' });
  }
});

module.exports = router;
