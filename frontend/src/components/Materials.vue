<!-- src/components/Materials.vue -->

<template>
    <div>
      <h1>Materijali</h1>
  
      <!-- Forma za unos novog materijala -->
      <input v-model="newMaterialName" placeholder="Ime materijala" />
      <button @click="addMaterial">Dodaj Materijal</button>
  
      <!-- Prikaz liste materijala -->
      <ul>
        <li v-for="mat in materials" :key="mat.id">
          <input v-model="mat.name" @blur="updateMaterial(mat)" />
          <button @click="deleteMaterial(mat.id)">Obriši</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const materials = ref([])
  const newMaterialName = ref('')
  
  // Dohvati sve materijale na početku
  onMounted(async () => {
    await fetchMaterials()
  })
  
  // Funkcija za dohvat svih materijala
  const fetchMaterials = async () => {
    const res = await axios.get('http://localhost:3000/api/materials')
    materials.value = res.data
  }
  
  // Funkcija za dodavanje novog materijala
  const addMaterial = async () => {
    if (newMaterialName.value) {
      try {
        const res = await axios.post('http://localhost:3000/api/materials', {
          name: newMaterialName.value
        })
        newMaterialName.value = ''
        await fetchMaterials()
      } catch (error) {
        console.error("Greška prilikom dodavanja materijala:", error)
      }
    } else {
      console.log("Ime materijala nije uneseno.")
    }
  }
  
  // Funkcija za ažuriranje postojećeg materijala
  const updateMaterial = async (material) => {
    if (material.name) {
      try {
        await axios.put(`http://localhost:3000/api/materials/${material.id}`, {
          name: material.name
        })
      } catch (error) {
        console.error("Greška prilikom ažuriranja materijala:", error)
      }
    }
  }
  
  // Funkcija za brisanje materijala
  const deleteMaterial = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/materials/${id}`)
      await fetchMaterials()
    } catch (error) {
      console.error("Greška prilikom brisanja materijala:", error)
    }
  }
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