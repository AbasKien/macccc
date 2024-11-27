// router.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/users/userController');
const productController = require('../controller/admin/productController');
const adminproductController = require('../controller/admin/adminproductController');
const orderController = require('../controller/users/orderController');
const cartController = require('../controller/users/cartController');
const upload = require('../config/upload');  // Import the upload middleware
const authenticate = require('../middleware/authenticate');  // Import the upload middleware

// Define routes
router.get('/verify-email', userController.verifyEmail);
router.post('/register', userController.registrationHandler); // Handle registration
router.post('/login', userController.loginHandler); // Handle login


// Route to fetch all products
router.post('/adminproducts', adminproductController.addProduct);


// Route to add a product with image upload
router.post('/add-product', upload.single('image'), productController.addProduct);

// Route to fetch all products
router.get('/products', productController.getAllProducts);

// Route to reduce stock after an order is placed
router.post('/admin/reduce-stock', productController.reduceStock);

// Route to add product to cart
router.post('/cart', cartController.addToCart);

// Route to fetch user's cart items
router.get('/cart/:userId', cartController.getCart);

// Route to remove product from cart
router.delete('/cart', cartController.removeFromCart);

router.post('/orders', orderController.placeOrder);  // Route to handle order placement



module.exports = router; // Export the router for use in app.js
