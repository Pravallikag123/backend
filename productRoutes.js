const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Create a new product
router.post("/add", async (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    const product = new Product({ name, quantity, price });
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update product
router.put("/:id", async (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, quantity, price }, { new: true });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
