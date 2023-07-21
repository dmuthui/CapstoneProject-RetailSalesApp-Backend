const express = require("express");
const router = express.Router();
const Inventory = require("../models/inventory");
const ShopLocator = require("../models/shopLocator");

// Get all inventory items
router.get("/inventory", async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get a single inventory item by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Inventory.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Create a new inventory item
router.post("/inventory", async (req, res) => {
  const { name, quantity, price, shop } = req.body;

  // Validate stock out
  if (quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  try {
    // Check if the shop exists
    const existingShop = await ShopLocator.findOne({ shopName: shop });
    if (!existingShop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const newItem = new Inventory({
      name,
      quantity,
      price,
      totalPrice: price * quantity, // Calculate totalPrice
      shop: existingShop._id, // Set the shop reference
    });

    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Update an inventory item
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price, shop } = req.body;

  // Validate stock out
  if (quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  try {
    // Check if the shop exists
    const existingShop = await ShopLocator.findOne({ shopName: shop });
    if (!existingShop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      {
        name,
        quantity,
        price,
        totalPrice: price * quantity, // Recalculate totalPrice
        shop: existingShop._id, // Update the shop reference
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Delete an inventory item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Inventory.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
