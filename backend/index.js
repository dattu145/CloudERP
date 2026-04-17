import dotenv from 'dotenv';
// ── Load Environment Variables FIRST (before anything that reads process.env) ──
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// ── Route Imports ─────────────────────────────────────────────────
import authRoutes from './routes/authRoutes.js';
import testRoutes from './routes/testRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import supplyRoutes from './routes/supplyRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import hrRoutes from './routes/hrRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

// ── Connect to MongoDB Atlas ──────────────────────────────────────
connectDB();

// ── Initialize Express App ────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// ── Global Middleware ─────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:3000', // Vite frontend
    'http://localhost:5173', // Alternate Vite port
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());           // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ── Routes ────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);  
app.use('/api/test', testRoutes);  
app.use('/api/inventory', inventoryRoutes);
app.use('/api/supply', supplyRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/hr', hrRoutes);
app.use('/api/analytics', analyticsRoutes);

// ── Health Check ──────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '✅ CloudERP API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ── 404 Handler ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ── Global Error Handler ──────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ── Start Server ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 CloudERP server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 API Base: http://localhost:${PORT}/api`);
});
