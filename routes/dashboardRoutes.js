const express = require('express');
const router = express.Router();

// Dashboard Model
const Dashboard = require('../models/dashboard');

// @route GET /dashboard
// @desc Get dashboard data
router.get('/:id', (req, res) => {
  // Define query object to fetch the dashboard data
  const query = {_id: req.params.id};

  // Fetch dashboard data from database using a Promise
  Dashboard.find(query)
    .then(dashboard => {
      res.json(dashboard);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Server error');
    });
});

// @route PUT /dashboard
// @desc Update dashboard data
router.get('/:id', (req, res)  => {
  // Define query object to update the dashboard data
  const query = {_id: req.params.id};

  // Update dashboard data in the database using a Promise
  Dashboard.findOneAndUpdate(query, req.body, { new: true, upsert: true })
    .then(dashboard => {
      res.json(dashboard);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Server error');
    });
});

module.exports = router;
