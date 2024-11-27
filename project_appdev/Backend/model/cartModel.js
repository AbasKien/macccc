const db = require('../config/db'); // Database connection

// Add or update a product in the cart
const addToCart = (userId, productId, quantity, callback) => {
  // Check if the product is already in the cart
  db.query(
    'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
    [userId, productId],
    (err, results) => {
      if (err) {
        return callback(err);
      }

      if (results.length > 0) {
        // If the product exists, update the quantity
        const newQuantity = results[0].quantity + quantity;
        db.query(
          'UPDATE cart SET quantity = ?, updated_at = NOW() WHERE user_id = ? AND product_id = ?',
          [newQuantity, userId, productId],
          (err, updateResult) => {
            if (err) {
              return callback(err);
            }
            return callback(null, 'Product quantity updated');
          }
        );
      } else {
        // If the product is not in the cart, add it
        db.query(
          'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
          [userId, productId, quantity],
          (err, insertResult) => {
            if (err) {
              return callback(err);
            }
            return callback(null, 'Product added to cart');
          }
        );
      }
    }
  );
};

// Get all items in the user's cart
const getCartItems = (userId, callback) => {
  db.query(
    'SELECT cart.id, cart.user_id, cart.product_id, cart.quantity, products.name, products.price, products.image_url FROM cart JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?',
    [userId],
    (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    }
  );
};

// Remove a product from the cart
const removeFromCart = (userId, productId, callback) => {
  db.query(
    'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
    [userId, productId],
    (err, result) => {
      if (err) {
        return callback(err);
      }
      if (result.affectedRows === 0) {
        return callback(null, 'Product not found in cart');
      }
      return callback(null, 'Product removed from cart');
    }
  );
};

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart
};
