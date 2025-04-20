const mainLagerRoutes = (app, pool) => {
    // Get all items from main_lager
    app.get('/api/main_lager', async (req, res) => {
      try {
        const [rows] = await pool.query(`
          SELECT main_lager.id, main_lager.material_id, materials.name AS material_name, main_lager.quantity
          FROM main_lager
          JOIN materials ON main_lager.material_id = materials.id
        `);
        res.json(rows);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    // Get a specific item from main_lager by ID
    app.get('/api/main_lager/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const [rows] = await pool.query(`
          SELECT main_lager.id, main_lager.material_id, materials.name AS material_name, main_lager.quantity
          FROM main_lager
          JOIN materials ON main_lager.material_id = materials.id
          WHERE main_lager.id = ?
        `, [id]);
        res.json(rows[0]);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    // Insert a new item into main_lager
    app.post('/api/main_lager', async (req, res) => {
      const { material_id, quantity } = req.body;
      try {
        const [result] = await pool.query(
          `INSERT INTO main_lager (material_id, quantity) VALUES (?, ?)`,
          [material_id, quantity]
        );
        res.json({ id: result.insertId, material_id, quantity });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    // Update an existing item in main_lager
    app.put('/api/main_lager/:id', async (req, res) => {
      const { id } = req.params;
      const { material_id, quantity } = req.body;
      try {
        const [result] = await pool.query(
          `UPDATE main_lager SET material_id = ?, quantity = ? WHERE id = ?`,
          [material_id, quantity, id]
        );
        res.json({ affectedRows: result.affectedRows });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    // Delete an item from main_lager
    app.delete('/api/main_lager/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const [result] = await pool.query(`DELETE FROM main_lager WHERE id = ?`, [id]);
        res.json({ affectedRows: result.affectedRows });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  };
  
  export default mainLagerRoutes;