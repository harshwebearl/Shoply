// Get cart item by productId, colour, and size
exports.getCartItem = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const userId = req.params.userId;
    const productId = req.params.productId;
    const colour = req.query.colour;
    const size = req.query.size;
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(userId);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }
    const cart = await Cart.findOne({ user: objectId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    const item = cart.items.find(i => i.productId.toString() === productId && i.colour === colour && i.size === size);
    if (!item) return res.status(404).json({ message: 'Product not found in cart' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update cart item by productId, colour, and size
exports.updateCartItemByProduct = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const userId = req.body.userId;
    const productId = req.body.productId;
    const colour = req.body.colour;
    const size = req.body.size;
    const update = req.body.update;
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(userId);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }
    const cart = await Cart.findOne({ user: objectId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    const item = cart.items.find(i => i.productId.toString() === productId && i.colour === colour && i.size === size);
    if (!item) return res.status(404).json({ message: 'Product not found in cart' });
    Object.assign(item, update);
    await cart.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete cart item by productId, colour, and size
exports.deleteCartItemByProduct = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const userId = req.body.userId;
    const productId = req.body.productId;
    const colour = req.body.colour;
    const size = req.body.size;
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(userId);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }
    const cart = await Cart.findOne({ user: objectId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    const itemIndex = cart.items.findIndex(i => i.productId.toString() === productId && i.colour === colour && i.size === size);
    if (itemIndex === -1) return res.status(404).json({ message: 'Product not found in cart' });
    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.json({ message: 'Product removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const mongoose = require('mongoose');
const Cart = require('../models/Cart');

// Create a new cart or add item to existing cart
exports.createOrUpdateCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const item = req.body.item;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [item] });
    } else {
      cart.items.push(item);
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get cart by user ID
exports.getCart = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const userId = req.params.userId;
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(userId);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }
    const carts = await Cart.find({ user: objectId });
    console.log('userId:', userId);
    console.log('carts:', carts);
    if (!carts || carts.length === 0) return res.status(404).json({ message: 'Cart not found' });
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update cart item
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.body.userId;
    const itemId = req.body.itemId;
    const update = req.body.update;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    Object.assign(item, update);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete cart item
exports.deleteCartItem = async (req, res) => {
  try {
    const userId = req.body.userId;
    const itemId = req.body.itemId;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items.id(itemId).remove();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete entire cart
exports.deleteCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    await Cart.findOneAndDelete({ user: userId });
    res.json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

