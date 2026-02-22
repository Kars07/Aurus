require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { router: authRouter } = require('./routes/auth');

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'] }));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRouter);
app.use('/api/reports', require('./routes/reports').router);
app.use('/api/messages', require('./routes/messages').router);

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'Auris Auth Server' }));

// ── Connect to MongoDB & Start ────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auris';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`✅ Connected to MongoDB at ${MONGO_URI}`);
    app.listen(PORT, () => console.log(`🚀 Auris Auth Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
