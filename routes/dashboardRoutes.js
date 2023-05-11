const express = require('express');
const router = express.Router();

// Dashboard Model
const Dashboard = require('../models/dashboard');

router.get('/:id', (req, res) => {
  // Fetch product from database by ID
  const query = { _id: req.params.id };
  Dashboard.find(query)
    .then(dashboard => {
      res.json(dashboard);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving product from database.' });
    });
});

// @route GET /products
// @desc Get ALL products
router.get('/', (req, res) => {
  // Fetch all products from database
  Dashboard.find({})
    .then(dashboard => {
      res.json(dashboard);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving products from database.' });
    });
});


// @route PUT api/products/:id
// @desc Update a product
router.put('/:id', (req, res) => {
  // Update a product in the database
  Dashboard.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true })
    .then(dashboard => {
      res.json(dashboard);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error updating product in database.' });
    });
});


module.exports = router;
