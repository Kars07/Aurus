require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { router: authRouter } = require('./routes/auth');

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: '*' })); // Allow all for hackathon prototype/production
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRouter);
app.use('/api/reports', require('./routes/reports').router);
app.use('/api/messages', require('./routes/messages').router);

app.get('/', (_, res) => res.json({ status: 'live', service: 'Auris Auth API' }));
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'Auris Auth Server' }));

// ── AI Proxy (Bypasses Browser CORS) ─────────────────────────────────────────
app.post('/api/ai/chat/completions', async (req, res) => {
  try {
    const aiRes = await fetch('https://auris-1-82up.onrender.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await aiRes.json();
    return res.status(aiRes.status).json(data);
  } catch (err) {
    console.error('AI Proxy Error:', err);
    return res.status(500).json({ error: 'Failed to proxy request to NAT Agent' });
  }
});

// ── Connect to MongoDB & Start ────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auris';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`✅ Connected to MongoDB at ${MONGO_URI}`);
    app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Auris Auth Server running on http://0.0.0.0:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    // Removed process.exit(1) so Render can still host the health loop and display error logs
  });
