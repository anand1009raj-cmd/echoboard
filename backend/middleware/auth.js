const jwt = require('jsonwebtoken');

// Login check
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token)
    return res.status(401).json({ error: 'Login karo pehle' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token invalid hai' });
  }
};

// Admin only check
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin')
    return res.status(403).json({ error: 'Sirf admin access kar sakta hai' });
  next();
};

module.exports = { protect, adminOnly };