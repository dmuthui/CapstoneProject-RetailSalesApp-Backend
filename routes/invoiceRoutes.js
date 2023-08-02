const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const SalesAgent = require('../models/salesAgent');
const Product = require('../models/products');
const Shop = require('../models/shopLocator');

// Generate invoice
router.post('/invoice', async (req, res) => {
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

    // Create the invoice object
    const invoiceData = {
      agent: agent.name,
      product: product.name,
      shop: shop.shopName, 
      quantity,
      companyName,
      customerName,
      date,
      totalPrice
    };

    // Save the invoice to the database
    const newInvoice = new Invoice(invoiceData);
    const savedInvoice = await newInvoice.save();

    res.json(savedInvoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Error creating invoice' });
  }
});

// GET invoice
router.get('/invoice', async (req, res) => {
  try {
    // Retrieve all invoices from the database
    const invoice = await Invoice.find();

    res.json(invoice);
  } catch (error) {
    console.error('Error retrieving invoices:', error);
    res.status(500).json({ error: 'Error retrieving invoices' });
  }
});

module.exports = router;
