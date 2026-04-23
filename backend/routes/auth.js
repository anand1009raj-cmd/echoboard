const router  = require('express').Router();
const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');

// Token banane ka helper
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ── REGISTER (sirf participants ke liye) ──
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: 'Sab fields bharo' });

    // Admin email se register nahi kar sakte
    if (email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase())
      return res.status(400).json({ error: 'Ye email use nahi kar sakte' });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ error: 'Email already registered hai' });

    const user  = await User.create({ name, email, password, role: 'participant' });
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── LOGIN (Admin + Participant dono) ──
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Email aur password daalo' });

    // Admin check
    if (email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase()) {
      if (password !== process.env.ADMIN_PASSWORD)
        return res.status(401).json({ error: 'Wrong password' });

      // Admin user DB mein nahi hai — directly token banao
      const token = jwt.sign(
        { id: 'admin', role: 'admin', name: 'Admin' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.json({
        token,
        user: { id: 'admin', name: 'Admin', email: process.env.ADMIN_EMAIL, role: 'admin' }
      });
    }

    // Participant check
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: 'Email registered nahi hai' });

    const match = await user.matchPassword(password);
    if (!match)
      return res.status(401).json({ error: 'Wrong password' });

    const token = generateToken(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ME (current user info) ──
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token nahi hai' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded);
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;