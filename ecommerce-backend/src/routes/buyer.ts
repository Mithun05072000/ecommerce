// backend/src/routes/buyer.ts

import express from 'express';
import pool from '../config/db';
import authMiddleware from '../middleware/authMiddleware';

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


// Add to cart
router.post('/cart', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await pool.query(
      'INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3)',
      [userId, productId, quantity]
    );
    res.json({ message: 'Add to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch Products
router.get('/cart',authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const { rows } = await pool.query(`SELECT p.name, c.id, c.quantity from public.carts as c inner join products as p on p.id = c.product_id
where c.user_id = ${userId}`);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching cart details:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete Product
router.delete('/cart/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const user_id = req.user?.userId;

  if (!user_id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await pool.query('DELETE FROM carts WHERE id = $1 AND user_id = $2', [id, user_id]);
    res.json({ message: 'Cart Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;
