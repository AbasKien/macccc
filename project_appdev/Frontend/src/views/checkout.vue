<template>
  <div class="checkout-container">
    <h1 class="checkout-title">Checkout</h1>

    <form @submit.prevent="checkout" class="checkout-form">
      <!-- Personal Info Section -->
      <div class="section">
        <h2 class="section-title">Personal Information</h2>
        <div class="form-group">
          <label for="Contact Number">Contact Number</label>
          <input
            type="text"
            v-model="form.contact_number"
            required
            placeholder="Enter number"
            @input="validateContactNumber"
            maxlength="11"
          />
        </div>
        <div class="form-group">
          <label for="address">Shipping Address</label>
          <textarea v-model="form.address" required placeholder="Enter your shipping address"></textarea>
        </div>
      </div>

      <!-- Payment Section -->
      <div class="section">
        <h2 class="section-title">Payment Information</h2>
        <div class="form-group">
          <label for="payment">Payment Method</label>
          <select v-model="form.payment" required>
            <option value="check_payment">Check Payment</option>
            <option value="cod">Cash on Delivery (COD)</option>
          </select>
        </div>
      </div>

      <!-- Order Summary Section -->
      <div class="section summary-section">
        <h2 class="section-title">Order Summary</h2>
        <div class="order-summary">
          <div class="order-item">
            <span>Total Items:</span>
            <span>{{ totalItems }}</span>
          </div>
          <div class="order-item">
            <span>Total Price:</span>
            <span>₱{{ totalPrice }}</span>
          </div>
          <div class="order-item">
            <span>Shipping:</span>
            <span>₱58.00</span>
          </div>
          <div class="order-total">
            <span><strong>Total Amount:</strong></span>
            <span><strong>₱{{ (parseFloat(totalPrice) + 58).toFixed(2) }}</strong></span>
          </div>
        </div>
      </div>

      <!-- Checkout Button -->
      <div class="button-container">
        <button type="submit" class="place-order-button">Place Order</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        contact_number: "",
        address: "",
        payment: "",
      },
    };
  },
  computed: {
    totalItems() {
      const cart = JSON.parse(localStorage.getItem("cartItems")) || []; // Correct reference
      return cart.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalPrice() {
      const cart = JSON.parse(localStorage.getItem("cartItems")) || []; // Correct reference
      return cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2); // Correct price calculation
    },
  },
  methods: {
    validateContactNumber() {
      // Restrict input to only numbers
      this.form.contact_number = this.form.contact_number.replace(/[^0-9]/g, "");
    },
    async checkout() {
      try {
        const response = await axios.post("http://localhost:5555/orders", {
          contact_number: this.form.contact_number,
          address: this.form.address,
          payment: this.form.payment,
          total_price: (parseFloat(this.totalPrice) + 58).toFixed(2), // Add shipping cost
        });

        alert(response.data.message);  // Success message
        this.$router.push("/thank-you"); // Redirect to the thank-you page
      } catch (error) {
        console.error("Failed to checkout:", error);
        alert("There was an error placing your order. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

h1.checkout-title {
  font-size: 2.4rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.section {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 8px;
}

input,
textarea,
select {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-top: 8px;
  transition: all 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #4caf50;
  outline: none;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.order-summary {
  font-size: 1.2rem;
  color: #333;
  margin-top: 20px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.order-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
}

.place-order-button {
  width: 100%;
  padding: 15px;
  background-color: #4caf50;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
}

.place-order-button:hover {
  background-color: #45a049;
}

.place-order-button:active {
  background-color: #388e3c;
}

.place-order-button:disabled {
  background-color: #d1e7d1;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .checkout-container {
    padding: 20px;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .place-order-button {
    font-size: 1rem;
  }
}
</style>
