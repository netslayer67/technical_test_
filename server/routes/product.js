const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Create a product
router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const product = new Product({ ...body });
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    res.status(500).send();
  }
});

// Get a product by code
router.get("/:code", async (req, res) => {
  try {
    const product = await Product.findOne({ code: req.params.code });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (err) {
    res.status(500).send();
  }
});

// Update a product
router.patch("/:code", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description", "price", "uom"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const product = await Product.findOne({ code: req.params.code });

    if (!product) {
      return res.status(404).send();
    }

    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    res.send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a product
router.delete("/:code", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ code: req.params.code });
    if (!product) {
      return res.status(404).send();
    }
    res.send({ success: true, message: "Deleted success", data: product });
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
