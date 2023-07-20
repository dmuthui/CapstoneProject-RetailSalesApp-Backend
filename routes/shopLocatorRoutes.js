const express = require('express'); 
const router = express.Router();

// shoplocator Model
const ShopLocator = require('../models/shopLocator');

//Shop Model
//const Shop = require('../models/shopLocator');

// @route GET /shopLocator
// @desc Get shopLocator data
router.get('/', (req, res) => {
    const query = {};
    ShopLocator.findOne(query)
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
    const query = {};
    ShopLocator.findOneAndUpdate(query, req.body, { new: true, upsert: true })
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
  Shop.findOne(query)
    .then(shop => {
      res.json(shop);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving shop from database.' });
    });
});

// @route GET /shops
// @desc Get ALL shops
router.get('/', (req, res) => {
  Shop.find({})
    .then(ShopLocator => {
      res.json(ShopLocator);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving shops from database.' });
    });
});

// @route POST /shops
// @desc Create a shop
router.post('/', (req, res) => {
  const newShop = new ShopLocator({
    shopName: req.body.shopName,
    shopLocation: req.body.shopLocation,
    openinghrs: req.body.openinghrs,
    closinghrs: req.body.closinghrs,
  });

  newShop.save()
    .then(ShopLocator => {
      res.json(ShopLocator);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error creating shop in database.' });
    });
});

// @route PUT /shops/:id
// @desc Update a shop
router.put('/:id', (req, res) => {
  Shop.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true })
    .then(ShopLocator => {
      res.json(ShopLocator);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error updating shop in database.' });
    });
});

module.exports = router;
