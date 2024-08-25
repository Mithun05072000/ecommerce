// backend/src/routes/buyer.ts

import express from 'express';
import pool from '../config/db';

const router = express.Router();

// Fetch Products
router.get('/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
