const router             = require('express').Router();
const Feedback           = require('../models/Feedback');
const { protect, adminOnly } = require('../middleware/auth');

// GET — sabhi feedback (admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { event, rating } = req.query;
    const filter = {};
    if (event)  filter.event  = event;
    if (rating) filter.rating = parseInt(rating);
    const data = await Feedback.find(filter).sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET — sirf apna feedback (participant)
router.get('/mine', protect, async (req, res) => {
  try {
    const data = await Feedback.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST — naya feedback (sirf logged in user)
router.post('/', protect, async (req, res) => {
  try {
    const fb = await Feedback.create({
      ...req.body,
      userId: req.user.id,
      name:   req.user.name
    });
    res.status(201).json(fb);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET — ek feedback by ID (admin only)
router.get('/:id', protect, adminOnly, async (req, res) => {
  try {
    const fb = await Feedback.findById(req.params.id);
    if (!fb) return res.status(404).json({ error: 'Not found' });
    res.json(fb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE — feedback hatao (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;