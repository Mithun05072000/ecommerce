// backend/src/routes/seller.ts

import express from 'express';
import pool from '../config/db';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// Add Product
router.post('/products', authMiddleware, async (req, res) => {
  const { name, category, description, price, discount } = req.body;
  const sellerId = req.user?.userId;

  if (!sellerId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await pool.query(
      'INSERT INTO products (name, category, description, price, discount, seller_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, category, description, price, discount, sellerId]
    );
    res.json({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Products
router.get('/products', authMiddleware, async (req, res) => {
  const sellerId = req.user?.userId;

  if (!sellerId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const result = await pool.query('SELECT * FROM products WHERE seller_id = $1', [sellerId]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit Product
router.put('/products/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, category, description, price, discount } = req.body;
  const sellerId = req.user?.userId;

  if (!sellerId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await pool.query(
      'UPDATE products SET name = $1, category = $2, description = $3, price = $4, discount = $5 WHERE id = $6 AND seller_id = $7',
      [name, category, description, price, discount, id, sellerId]
    );
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Product
router.delete('/products/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const sellerId = req.user?.userId;

  if (!sellerId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await pool.query('DELETE FROM products WHERE id = $1 AND seller_id = $2', [id, sellerId]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
