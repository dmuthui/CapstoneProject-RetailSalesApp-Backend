const express = require('express'); 
const router = express.Router();
const SalesAgent = require('../models/salesAgent'); 

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
    const newSalesAgent = new SalesAgent(req.body);
    await newSalesAgent.save();
    res.status(201).json(newSalesAgent);
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

module.exports = router;



