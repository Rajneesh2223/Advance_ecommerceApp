import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './config/db.js';
import userRoutes from './routes/userRoutes.js'




dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); 


app.use('/api', userRoutes);


async function checkDatabaseConnection() {
    try {
      const [rows] = await pool.query('SELECT 1');
      console.log('Database connected:', rows);
    } catch (error) {
      console.error('Database connection error:', error.message);
    }
  }
  checkDatabaseConnection();
  

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});