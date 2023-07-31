const express = require('express');
const router = express.Router();
const ShopLocator = require('../models/shopLocator');

// @route GET /shopLocator
// @desc Get shopLocator data
router.get('/', (req, res) => {
  ShopLocator.findOne({})
    .then(shopLocator => {
      res.json(shopLocator);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Server error');
    });
});

// @route PUT /shopLocator
// @desc Update shopLocator data
router.put('/', (req, res) => {
  ShopLocator.findOneAndUpdate({}, req.body, { new: true, upsert: true })
    .then(updatedShopLocator => {
      res.json(updatedShopLocator);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Server error');
    });
});

// @route GET /shops/:id
// @desc Get shop by ID
router.get('/:id', (req, res) => {
  const query = { _id: req.params.id };
  ShopLocator.findOne(query)
    .then(shop => {
      res.json(shop);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving shop from the database.' });
    });
});

// @route GET /shops
// @desc Get ALL shops
router.get('/', (req, res) => {
  ShopLocator.find({})
    .then(shopLocators => {
      res.json(shopLocators);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving shops from the database.' });
    });
});

// @route POST /shops
// @desc Create a shop
router.post('/', (req, res) => {
  const newShopLocator = new ShopLocator({
    shopName: req.body.shopName,
    shopLocation: req.body.shopLocation,
    openinghrs: req.body.openinghrs,
    closinghrs: req.body.closinghrs,
  });

  newShopLocator.save()
    .then(shopLocator => {
      res.json(shopLocator);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error creating shop in the database.' });
    });
});

// @route PUT /shops/:id
// @desc Update a shop
router.put('/:id', (req, res) => {
  ShopLocator.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true })
    .then(updatedShopLocator => {
      res.json(updatedShopLocator);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error updating shop in the database.' });
    });
});

module.exports = router;
