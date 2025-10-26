const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

router.post('/register', (req, res) => {
  const { name, email, password, role = 'Alumni' } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const hash = bcrypt.hashSync(password, 10);
    const stmt = db.prepare('INSERT INTO users (name, email, role, password_hash) VALUES (?, ?, ?, ?)');
    const info = stmt.run(name, email.toLowerCase(), role, hash);
    const user = { id: info.lastInsertRowid, name, email: email.toLowerCase(), role };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '2d' });
    res.json({ user, token });
  } catch (e) {
    if (String(e).includes('UNIQUE')) return res.status(409).json({ error: 'Email already registered' });
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get((email || '').toLowerCase());
  if (!row) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = bcrypt.compareSync(password || '', row.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const user = { id: row.id, name: row.name, email: row.email, role: row.role };
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '2d' });
  res.json({ user, token });
});

// Role-specific login endpoints for clarity
function roleLogin(role) {
  return (req, res) => {
    const { email, password } = req.body;
    const row = db.prepare('SELECT * FROM users WHERE email = ? AND role = ?').get((email || '').toLowerCase(), role);
    if (!row) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = bcrypt.compareSync(password || '', row.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const user = { id: row.id, name: row.name, email: row.email, role: row.role };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '2d' });
    res.json({ user, token });
  };
}

router.post('/admin/login', roleLogin('Admin'));
router.post('/alumni/login', roleLogin('Alumni'));
router.post('/student/login', roleLogin('Student'));
router.post('/recruiter/login', roleLogin('Recruiter'));

// Authenticated user info
router.get('/me', (req, res) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    res.json({ user: payload });
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
