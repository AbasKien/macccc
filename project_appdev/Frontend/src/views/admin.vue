<template>
  <div class="product-form-container">
    <h1>Add Product</h1>
    <form @submit.prevent="submitProduct" class="product-form">
      <div class="form-group">
        <label for="name">Product Name:</label>
        <input type="text" v-model="name" required id="name" placeholder="Enter product name" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="description" required id="description" placeholder="Enter product description"></textarea>
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" v-model="price" required id="price" placeholder="Enter product price" />
      </div>
      <div class="form-group">
        <label for="stocks">Stock Quantity:</label>
        <input type="number" v-model="stocks" required id="stocks" placeholder="Enter stock quantity" min="1" />
      </div>
      <div class="form-group">
        <label for="image">Product Image:</label>
        <input type="file" @change="handleFileUpload" accept="image/*" required id="image" />
      </div>
      <button type="submit" class="submit-button">Add Product</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      description: '',
      price: '',
      stocks: 0,
      imageFile: null, // Holds the selected file
    };
  },
  methods: {
    handleFileUpload(event) {
      this.imageFile = event.target.files[0];
    },
    async submitProduct() {
  // Validate stock value
  if (this.stocks <= 0 || isNaN(this.stocks)) {
    alert("Stock quantity must be a positive number.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price);
    formData.append('stocks', this.stocks); // Ensure it's a valid number
    formData.append('image', this.imageFile); // Attach the image file

    const response = await axios.post('http://localhost:5555/add-product', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data.success) {
      alert('Product added successfully!');
      this.$emit('productAdded'); // Notify parent or refresh
    } else {
      alert('Failed to add product');
    }
  } catch (error) {
    console.error('Error adding product:', error);
    alert('There was an error adding the product.');
  }
}

  },
};
</script>

<style scoped>
.product-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #333;
}

.product-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
}

.product-form input,
.product-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
}

.product-form textarea {
  resize: vertical;
  height: 100px;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: center;
}

.submit-button:hover {
  background-color: #45a049;
}

.submit-button:active {
  background-color: #388e3c;
}

.product-form-container .form-group input[type="file"] {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
}
</style>
