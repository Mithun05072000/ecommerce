import express from 'express';
import authRoutes from './routes/auth';
import buyerRoutes from './routes/buyer';
import sellerRoutes from './routes/seller';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/users', (req, res) => {
    res.json([{ id: 1, name: 'John Doe' }]);
  });

app.use('/auth', authRoutes);
app.use('/buyer', buyerRoutes);
app.use('/seller', sellerRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
