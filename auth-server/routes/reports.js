const express = require('express');
const Report = require('../models/Report');
const { authMiddleware } = require('./auth');

const router = express.Router();

// All report routes require authentication
router.use(authMiddleware);

// ── GET /api/reports ──────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    if (req.user.role === 'patient') {
      // Patients can only see their own reports, sorted newest first
      const reports = await Report.find({ userId: req.user.id }).sort({ timestamp: -1 });
      return res.json({ reports });
      
    } else if (req.user.role === 'doctor') {
      // Doctors can see 'snapshot' reports from all patients.
      // We populate the userId field to get the patient's name, bioData, avatar, etc.
      const reports = await Report.find({ type: 'snapshot' })
        .populate({
          path: 'userId',
          select: 'name email role bioData createdAt'
        })
        .sort({ timestamp: -1 });
        
      return res.json({ reports });
    }
    
    return res.status(403).json({ message: 'Forbidden role type' });
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
});

// ── POST /api/reports ─────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    // Only patients generate their own telemetry/journal reports for now
    if (req.user.role !== 'patient') {
      return res.status(403).json({ message: 'Only patients can save reports' });
    }

    const { type, data } = req.body;
    
    if (!type || !data) {
      return res.status(400).json({ message: 'Missing type or data' });
    }

    const report = await Report.create({
      userId: req.user.id,
      type,
      data
    });

    res.status(201).json({ report });
  } catch (err) {
    console.error('Error saving report:', err);
    res.status(500).json({ message: 'Failed to save report' });
  }
});

module.exports = { router };
