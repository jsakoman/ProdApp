// index.js
import express from 'express';
import cors from 'cors';
import generateCrudRoutes from './crud.js';
import pool from './db.js';
import mainLagerRoutes from './mainLagerRoutes.js'; 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Generate CRUD routes for tables
generateCrudRoutes(app, pool, 'materials');
generateCrudRoutes(app, pool, 'workplace');
generateCrudRoutes(app, pool, 'main_lager');

mainLagerRoutes(app, pool);


// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});