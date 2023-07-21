const express = require('express');
const router = express.Router();
const ShoppingCart = require('../models/shoppingCart');

// Route to get shopping cart by user ID
router.get('/shoppingCart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await ShoppingCart.findOne({ userId }).populate('items.productId');
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving shopping cart.' });
  }
});

// Route to add item to the shopping cart
router.post('/shoppingCart/:userId/add', async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    // Check if the shopping cart exists for the user
    let cart = await ShoppingCart.findOne({ userId });

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new ShoppingCart({ userId, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      // If the item exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the item doesn't exist, add it to the cart
      cart.items.push({ productId, quantity });
    }

    // Save the updated cart to the database
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding item to shopping cart.' });
  }
});

// Route to remove item from the shopping cart
router.post('/shoppingCart/:userId/remove', async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    // Check if the shopping cart exists for the user
    const cart = await ShoppingCart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Shopping cart not found.' });
    }

    // Find the item in the cart
    const cartItem = cart.items.find(item => item.productId.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ error: 'Item not found in shopping cart.' });
    }

    // Update the quantity or remove the item from the cart
    if (quantity && quantity < cartItem.quantity) {
      cartItem.quantity -= quantity;
    } else {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    }

    // Save the updated cart to the database
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error removing item from shopping cart.' });
  }
});

module.exports = router;