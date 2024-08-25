import express from 'express';
import pool from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Sign up
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, hashedPassword, role]
  );
  res.json(result.rows[0]);
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (!user.rows.length) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  
  console.log("User from DB:", user.rows[0]); // Check user data from DB


  const validPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.rows[0].id, role: user.rows[0].role }, 'secretkey');

  
  res.json({ token, role: user.rows[0].role });
});

export default router;
