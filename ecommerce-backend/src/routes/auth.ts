import express from 'express';
import pool from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Sign up
router.post('/signup', async (req, res) => {
  const { name, email, password, userType } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (name, email, password, userType) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, hashedPassword, userType]
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

  const validPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.rows[0].id, userType: user.rows[0].userType }, 'secretkey');
  res.json({ token });
});

export default router;
