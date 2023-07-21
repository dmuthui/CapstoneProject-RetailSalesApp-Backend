const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const Inventory = require('../models/inventory');

// @route GET /products/:id
// @desc Get product by ID
router.get('/:id', (req, res) => {
  // Fetch product from database by ID
  const query = { _id: req.params.id };
  Product.findById(req.params.id)
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving product from database.' });
    });
});

// @route GET /products
// @desc Get ALL products
router.get('/products', (req, res) => {
  // Fetch all products from database
  Product.find({})
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving products from database.' });
    });
});

// @route POST /products
// @desc Create a product
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, quantity, image } = req.body;

    // Check if the product quantity is available in the inventory
    const inventoryItem = await Inventory.findOne({ name: name });
    if (!inventoryItem || inventoryItem.quantity < quantity) {
      return res.status(400).json({ error: 'Product is out of stock.' });
    }

    // Create a product item
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      image
    });

    await newProduct.save();

    // Deduct the quantity from the inventory
    inventoryItem.quantity -= quantity;
    await inventoryItem.save();

    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating product in database.' });
  }
});

// @route PUT api/products/:id
// @desc Update a product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, image } = req.body;

    // Check if the product quantity is available in the inventory
    const inventoryItem = await Inventory.findOne({ name: name });
    if (!inventoryItem || inventoryItem.quantity < quantity) {
      return res.status(400).json({ error: 'Product is out of stock.' });
    }

    // Update a product in the database
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { name, description, price, quantity, image },
      { new: true, upsert: true }
    );

    // Deduct the updated quantity from the inventory
    inventoryItem.quantity -= quantity;
    await inventoryItem.save();

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating product in database.' });
  }
});

module.exports = router;
