<template>
    <div>
      <h1>{{ title }}</h1>
  
      <!-- Forma za unos novog entiteta -->
      <input v-model="newEntityName" :placeholder="`Unesite ${title}`" />
      <button @click="addEntity">Dodaj</button>
  
      <!-- Prikaz liste entiteta -->
      <ul>
        <li v-for="entity in entities" :key="entity.id">
          <input v-model="entity.name" @blur="updateEntity(entity)" />
          <button @click="deleteEntity(entity.id)">Obriši</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineProps } from 'vue'
  import axios from 'axios'
  
  // Definiramo props za naziv entiteta i URL
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    apiUrl: {
      type: String,
      required: true
    }
  })
  
  const entities = ref([])
  const newEntityName = ref('')
  
  // Funkcija za dohvat svih entiteta
  const fetchEntities = async () => {
    try {
      const res = await axios.get(props.apiUrl)
      entities.value = res.data
    } catch (error) {
      console.error("Greška prilikom dohvaćanja entiteta:", error)
    }
  }
  
  // Funkcija za dodavanje novog entiteta
  const addEntity = async () => {
    if (newEntityName.value) {
      try {
        const res = await axios.post(props.apiUrl, {
          name: newEntityName.value
        })
        newEntityName.value = ''
        await fetchEntities()
      } catch (error) {
        console.error("Greška prilikom dodavanja entiteta:", error)
      }
    } else {
      console.log("Ime entiteta nije uneseno.")
    }
  }
  
  // Funkcija za ažuriranje entiteta
  const updateEntity = async (entity) => {
    if (entity.name) {
      try {
        await axios.put(`${props.apiUrl}/${entity.id}`, {
          name: entity.name
        })
      } catch (error) {
        console.error("Greška prilikom ažuriranja entiteta:", error)
      }
    }
  }
  
  // Funkcija za brisanje entiteta
  const deleteEntity = async (id) => {
    try {
      await axios.delete(`${props.apiUrl}/${id}`)
      await fetchEntities()
    } catch (error) {
      console.error("Greška prilikom brisanja entiteta:", error)
    }
  }
  
  // Dohvati entitete pri montaži komponente
  onMounted(async () => {
    await fetchEntities()
  })
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