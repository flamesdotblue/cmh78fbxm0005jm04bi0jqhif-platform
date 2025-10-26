const express = require('express');
const router = express.Router();
const db = require('../db');
const { auth, allowRoles } = require('../middleware/auth');

// Create event (Admin or Alumni)
router.post('/', auth, allowRoles('Admin', 'Alumni'), (req, res) => {
  const { title, date, location, mode, description } = req.body;
  const info = db.prepare('INSERT INTO events (title, date, location, mode, description, created_by) VALUES (?,?,?,?,?,?)')
    .run(title, date, location, mode, description, req.user.id);
  res.json({ id: info.lastInsertRowid });
});

// List events
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT e.*, u.name as creator_name FROM events e LEFT JOIN users u ON u.id = e.created_by ORDER BY date DESC').all();
  res.json(rows);
});

// RSVP
router.post('/:id/rsvp', auth, (req, res) => {
  const { status = 'going' } = req.body;
  try {
    db.prepare('INSERT OR REPLACE INTO rsvps (event_id, user_id, status) VALUES (?,?,?)')
      .run(req.params.id, req.user.id, status);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to RSVP' });
  }
});

module.exports = router;
