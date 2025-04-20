<template>
    <div>
      <h2>Main Lager</h2>
  
      <!-- Form to add or update an item -->
      <form @submit.prevent="submitForm">
        <div>
          <label for="material_id">Material:</label>
          <select v-model="newItem.material_id" required>
            <option v-for="material in materials" :key="material.id" :value="material.id">
              {{ material.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="quantity">Quantity:</label>
          <input type="number" v-model="newItem.quantity" required />
        </div>
        <button type="submit">{{ isEditMode ? 'Update' : 'Add' }}</button>
      </form>
  
      <!-- List of items in main_lager -->
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.material_id }} - {{ item.quantity }}
          <button @click="editItem(item)">Edit</button>
          <button @click="deleteItem(item.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: 'Main Lager',
        items: [],
        newItem: {
          material_id: '',
          quantity: ''
        },
        materials: [], // List of materials for the dropdown
        isEditMode: false,
        currentItemId: null
      };
    },
    methods: {
      async fetchItems() {
        try {
          const response = await axios.get('http://localhost:3000/api/main_lager');
          this.items = response.data;
        } catch (err) {
          console.error(err);
        }
      },
      
      async fetchMaterials() {
        try {
          const response = await axios.get('http://localhost:3000/api/materials');
          this.materials = response.data;
        } catch (err) {
          console.error(err);
        }
      },
  
      async submitForm() {
        if (this.isEditMode) {
          await this.updateItem();
        } else {
          await this.addItem();
        }
      },
  
      async addItem() {
        try {
          const response = await axios.post('http://localhost:3000/api/main_lager', this.newItem);
          this.items.push(response.data);
          this.resetForm();
        } catch (err) {
          console.error(err);
        }
      },
  
      async updateItem() {
        try {
          const response = await axios.put(`http://localhost:3000/api/main_lager/${this.currentItemId}`, this.newItem);
          const index = this.items.findIndex(item => item.id === this.currentItemId);
          this.items[index] = { ...this.newItem, id: this.currentItemId };
          this.resetForm();
        } catch (err) {
          console.error(err);
        }
      },
  
      async deleteItem(id) {
        try {
          await axios.delete(`http://localhost:3000/api/main_lager/${id}`);
          this.items = this.items.filter(item => item.id !== id);
        } catch (err) {
          console.error(err);
        }
      },
  
      editItem(item) {
        this.newItem.material_id = item.material_id;
        this.newItem.quantity = item.quantity;
        this.isEditMode = true;
        this.currentItemId = item.id;
      },
  
      resetForm() {
        this.newItem.material_id = '';
        this.newItem.quantity = '';
        this.isEditMode = false;
        this.currentItemId = null;
      }
    },
    created() {
      this.fetchItems();      // Fetch all items from main_lager
      this.fetchMaterials();  // Fetch materials for the dropdown
    }
  };
  </script>
  
  <style scoped>
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  input {
    padding: 10px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  </style>