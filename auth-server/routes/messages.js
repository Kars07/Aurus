const express = require('express');
const Message = require('../models/Message');
const User = require('../models/User'); // ensure valid receivers
const { authMiddleware } = require('./auth');

const router = express.Router();

router.use(authMiddleware);

// ── GET /api/messages/:otherUserId ───────────────────────────────────────
// Fetch the conversation between the logged-in user and the specified user
router.get('/:otherUserId', async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId }
      ]
    }).sort({ timestamp: 1 }); // Chronological order

    res.json({ messages });
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

// ── POST /api/messages ───────────────────────────────────────────────────
// Send a message to another user
router.post('/', async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, text } = req.body;

    if (!receiverId || !text) {
      return res.status(400).json({ message: 'receiverId and text are required' });
    }

    // Ensure receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    const message = await Message.create({
      senderId,
      receiverId,
      text
    });

    res.status(201).json({ message });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

module.exports = { router };
