const express = require("express");

const router = express.Router();

const Inventory = require("../models/inventory");

// Get all inventory items

router.get("/", (req, res) => {
  Inventory.find()

    .then((items) => res.json(items))

    .catch((error) => res.status(400).json({ error }));
});

// Get a single inventory item by ID

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Inventory.findById(id)

    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: "Inventory item not found" });
      }

      res.json(item);
    })

    .catch((error) => res.status(400).json({ error }));
});

// Create a new inventory item

router.post("/", (req, res) => {
  const { name, quantity, price } = req.body;

  const newItem = new Inventory({ name, quantity, price });

  newItem
    .save()

    .then((item) => res.json(item))

    .catch((error) => res.status(400).json({ error }));
});

// Update an inventory item

router.put("/:id", (req, res) => {
  const { id } = req.params;

  const { name, quantity, price } = req.body;

  Inventory.findByIdAndUpdate(id, { name, quantity, price }, { new: true })

    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: "Inventory item not found" });
      }

      res.json(item);
    })

    .catch((error) => res.status(400).json({ error }));
});

// Delete an inventory item

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Inventory.findByIdAndDelete(id)

    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: "Inventory item not found" });
      }

      res.json({ message: "Inventory item deleted successfully" });
    })

    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
