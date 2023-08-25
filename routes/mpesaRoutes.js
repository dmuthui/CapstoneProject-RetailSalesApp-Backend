// mpesaRoutes.js
const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');

// POST /api/mpesa-payment
router.post('/mpesa-payment', async (req, res) => {
  try {
    const { invoiceId } = req.body;

    // Retrieve the invoice from the database using the invoiceId
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Replace the following with the actual logic to initiate M-Pesa payment
    // For example, you can use the Daraja API from Safaricom to create the payment URL

    // In this example, I'm using a placeholder payment URL for demonstration purposes
    const paymentURL = 'https://example.com/mpesa-payment'; // Replace with the actual payment URL

    res.json({ paymentURL });
  } catch (error) {
    console.error('Error fetching payment URL:', error);
    res.status(500).json({ error: 'Error fetching payment URL' });
  }
});

module.exports = router;




