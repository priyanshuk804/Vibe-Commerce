import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const router = express.Router();

// GET /api/cart → get cart + total
router.get("/", async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (!cart) {
      cart = await Cart.create({ items: [] });
    }

    const populatedItems = await Promise.all(
      cart.items.map(async (i) => {
        const product = await Product.findById(i.productId);
        return {
          ...i.toObject(),
          name: product?.name,
          price: product?.price,
        };
      })
    );

    const total = populatedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    res.json({ items: populatedItems, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/cart → add { productId, qty }
router.post("/", async (req, res) => {
  try {
    const { productId, qty } = req.body;
    let cart = await Cart.findOne();
    if (!cart) cart = await Cart.create({ items: [] });

    const existing = cart.items.find((i) => i.productId.toString() === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.items.push({ productId, qty });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/cart/:id → remove item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter((i) => i._id.toString() !== id);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/checkout → mock receipt
router.post("/checkout", async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) return res.status(400).json({ error: "Cart is empty" });

    const populatedItems = await Promise.all(
      cart.items.map(async (i) => {
        const product = await Product.findById(i.productId);
        return {
          name: product?.name,
          price: product?.price,
          qty: i.qty,
        };
      })
    );

    const total = populatedItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    // Clear cart after checkout
    cart.items = [];
    await cart.save();

    res.json({
      total,
      items: populatedItems.length,
      timestamp: new Date(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
