import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './database/connect.js';
import authRoutes from './route/auth.js';

dotenv.config();

connectToDatabase();const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
connectToDatabase();

app.get('/', (req, res) => {
  res.send('192.987.988.009');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
