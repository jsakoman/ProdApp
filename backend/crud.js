// crud.js
const generateCrudRoutes = (app, pool, tableName) => {
    app.get(`/api/${tableName}`, async (req, res) => {
      try {
        const [rows] = await pool.query(`SELECT * FROM ${tableName}`);
        res.json(rows);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    app.get(`/api/${tableName}/:id`, async (req, res) => {
      const { id } = req.params;
      try {
        const [rows] = await pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
        res.json(rows[0]);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    app.post(`/api/${tableName}`, async (req, res) => {
      const fields = Object.keys(req.body);
      const values = Object.values(req.body);
      const placeholders = fields.map(() => '?').join(',');
      try {
        const [result] = await pool.query(
          `INSERT INTO ${tableName} (${fields.join(',')}) VALUES (${placeholders})`,
          values
        );
        res.json({ id: result.insertId, ...req.body });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    app.put(`/api/${tableName}/:id`, async (req, res) => {
      const { id } = req.params;
      const fields = Object.keys(req.body);
      const values = Object.values(req.body);
      const updates = fields.map((field) => `${field} = ?`).join(',');
      try {
        const [result] = await pool.query(
          `UPDATE ${tableName} SET ${updates} WHERE id = ?`,
          [...values, id]
        );
        res.json({ affectedRows: result.affectedRows });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    app.delete(`/api/${tableName}/:id`, async (req, res) => {
      const { id } = req.params;
      try {
        const [result] = await pool.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
        res.json({ affectedRows: result.affectedRows });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  };
  
  export default generateCrudRoutes;