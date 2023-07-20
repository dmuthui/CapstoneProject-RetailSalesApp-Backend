const express = require('express'); 
const router = express.Router();
const Invoice = require('../models/invoice');

// Generate invoice
router.get('/invoice', async (req, res) => {
  try {
    const invoices = await Invoice.find();

    if (invoices.length === 0) {
      return res.status(404).json({ message: 'No invoices found' });
    }

    res.json({ invoices });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add invoice
router.post('/invoice', async (req, res) => {
  const { items, totalAmount, date } = req.body;

  try {
    const invoice = new Invoice({
      items,
      totalAmount,
      date: date || new Date(),
    });

    await invoice.save();

    res.json({ message: 'Invoice added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
