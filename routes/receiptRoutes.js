const express = require('express'); 
const router = express.Router();
const Receipt = require('../models/receipt');

// Generate receipt
router.get('/receipt', async (req, res) => {
  try {
    const receipts = await Receipt.find();

    if (receipts.length === 0) {
      return res.status(404).json({ message: 'No receipts found' });
    }

    res.json({ receipts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add receipt
router.post('/receipt', async (req, res) => {
  const { items, totalAmount, date } = req.body;

  try {
    const receipt = new Receipt({
      items,
      totalAmount,
      date: date || new Date(),
    });

    await receipt.save();

    res.json({ message: 'Receipt added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
