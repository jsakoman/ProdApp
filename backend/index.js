import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// MySQL konekcija
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Villigen5234',
  database: 'prodDev'
})

// ✅ CRUD operacije za tablicu "materials"

// Dohvati sve materijale
app.get('/api/materials', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM materials')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Dohvati jedan materijal
app.get('/api/materials/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [rows] = await pool.query('SELECT * FROM materials WHERE id = ?', [id])
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Dodaj novi materijal
app.post('/api/materials', async (req, res) => {
  const { name } = req.body
  try {
    const [result] = await pool.query('INSERT INTO materials (name) VALUES (?)', [name])
    res.json({ id: result.insertId, name })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Ažuriraj materijal
app.put('/api/materials/:id', async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    const [result] = await pool.query('UPDATE materials SET name = ? WHERE id = ?', [name, id])
    res.json({ affectedRows: result.affectedRows })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Obriši materijal
app.delete('/api/materials/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [result] = await pool.query('DELETE FROM materials WHERE id = ?', [id])
    res.json({ affectedRows: result.affectedRows })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Pokretanje servera
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`)
})