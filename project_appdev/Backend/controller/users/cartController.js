const Cart = require('../../model/cartModel'); // Import the Cart model

// Add product to cart
exports.addToCart = (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: 'User ID, product ID, and quantity are required' });
  }

  // Call the Cart model to add/update product in the cart
  Cart.addToCart(userId, productId, quantity, (err, message) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json({ message });
  });
};

// Get all products in the cart for a user
exports.getCart = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  // Call the Cart model to fetch the cart items
  Cart.getCartItems(userId, (err, cartItems) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (cartItems.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' });
    }
    return res.status(200).json({ cartItems });
  });
};

// Remove a product from the cart
exports.removeFromCart = (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'User ID and product ID are required' });
  }

  // Call the Cart model to remove product from the cart
  Cart.removeFromCart(userId, productId, (err, message) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json({ message });
  });
};
