<template>
  <div class="homepage">
    <!-- Announcement Bar -->
    <div class="announcement-bar">
      🚚 Enjoy a 3-Day Return or Refund Guarantee for Every Purchase!
    </div>

    <!-- Header -->
    <header class="header">
      <div class="logo">Margatheo Store</div>
      <nav class="nav">
        <router-link to="/home" class="nav-link" :class="{ active: $route.path === '/home' }">Home</router-link>
        <router-link to="/product" class="nav-link" :class="{ active: $route.path === '/product' }">Shop</router-link>
      </nav>
      <div class="user-controls">
        <div class="user-menu">
          <img
            src="https://libapps-au.s3-ap-southeast-2.amazonaws.com/accounts/12227/images/Circle_Librarian.png"
            alt="User Avatar"
            class="user-avatar"
          />
          <div class="dropdown">
            <a href="/profile">Profile</a>
            <a href="/">Log Out</a>
          </div>
        </div>
      </div>
    </header>

    <!-- Banner Section -->
    <section class="banner">
      <div class="content">
        <p class="collection">Back-to-School Essentials</p>
        <h1>Gear Up for the Year Ahead with Premium Supplies</h1>
        <p class="description">
          Find everything you need—from durable backpacks to eco-friendly notebooks—all in one place.
        </p>
        <router-link to="/product" class="cta-button">Shop Now</router-link>
      </div>
      <div class="image">
        <img src="https://m.media-amazon.com/images/I/91qkR4QX71L.jpg" alt="School Supplies" />
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products">
      <h2>Featured Products</h2>
      <div class="product-list">
        <div class="product-card" v-for="n in 4" :key="n">
          <img
            src="https://via.placeholder.com/200"
            alt="Product Image"
            class="product-image"
          />
          <h3 class="product-title">Product Title {{ n }}</h3>
          <p class="product-price">₱20</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-contact">
        <h4>Contact Us</h4>
        <p>Margatheo Store</p>
        <p>5200</p>
        <p>📞 +639150232461</p>
        <p>✉️ margatheostore@gmail.com</p>
      </div>
      <div class="footer-bottom">
        <p>
          &copy; 2024 Margatheo Store. All Rights Reserved. Powered by
          <a href="http://localhost:8080/home" target="_blank">Margatheo&reg;</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
/* Global Styles */
body {
  margin: 0;
  font-family: "Poppins", sans-serif;
  background-color: #f9f9f9;
  color: #333;
}

/* Announcement Bar */
.announcement-bar {
  background-color: #f4511e;
  color: #fff;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 28px;
  font-weight: bold;
  color: #f4511e;
}

.nav {
  display: flex;
  gap: 20px;
  right: 100px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 5px;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover,
.nav-link.active {
  color: #f4511e;
  font-weight: bold;
  right: 1000
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.user-menu .dropdown {
  display: none;
  position: absolute;
  top: 60px;
  right: 10px;
  background: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.user-menu:hover .dropdown {
  display: block;
}

/* Banner Section */
.banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin: 30px auto;
  max-width: 1200px;
}

.content {
  max-width: 50%;
}

.collection {
  color: #f4511e;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 10px;
}

h1 {
  font-size: 40px;
  color: #333;
}

.description {
  margin: 20px 0;
  font-size: 16px;
  color: #666;
}

.cta-button {
  background-color: #f4511e;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s ease-in-out;
}

.cta-button:hover {
  background-color: #d63b10;
}

.image img {
  max-width: 400px;
  height: auto;
  border-radius: 10px;
}

/* Featured Products */
.featured-products {
  text-align: center;
  padding: 50px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin: 30px auto;
  max-width: 1200px;
}

.featured-products h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.product-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.product-price {
  color: #f4511e;
  font-weight: bold;
  margin: 10px 0;
}

.add-to-cart {
  background-color: #f4511e;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.add-to-cart:hover {
  background-color: #d63b10;
}

/* Footer */
.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px 0;
}

.footer a {
  color: #f4511e;
  text-decoration: none;
}
</style>
