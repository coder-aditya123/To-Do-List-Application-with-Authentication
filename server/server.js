// server/server.js (Dhyaan se dekho)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // <-- Ensure this is imported
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // <-- Ensure this is imported and paths are correct

dotenv.config();
connectDB();

const app = express();

// --- Middleware ---

// 1. CORS middleware should be among the first
app.use(cors()); // <<< BAHUT ZAROORI HAI YE LINE YAHAN HO

// 2. Body parser for JSON
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Basic test route (optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- Error Handling Middleware (AFTER all routes) ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // <<< Confirm this is 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});