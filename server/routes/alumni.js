const express = require('express');
const router = express.Router();
const db = require('../db');
const { auth, allowRoles } = require('../middleware/auth');

// Create or update own alumni profile
router.post('/me', auth, (req, res) => {
  const { batch, degree, department, phone, location, company, designation } = req.body;
  const exists = db.prepare('SELECT * FROM alumni WHERE user_id = ?').get(req.user.id);
  if (exists) {
    db.prepare(`UPDATE alumni SET batch=?, degree=?, department=?, phone=?, location=?, company=?, designation=? WHERE user_id=?`)
      .run(batch, degree, department, phone, location, company, designation, req.user.id);
  } else {
    db.prepare(`INSERT INTO alumni (user_id, batch, degree, department, phone, location, company, designation) VALUES (?,?,?,?,?,?,?,?)`)
      .run(req.user.id, batch, degree, department, phone, location, company, designation);
  }
  res.json({ ok: true });
});

// Admin verifies alumni profile
router.post('/:userId/verify', auth, allowRoles('Admin'), (req, res) => {
  db.prepare('UPDATE alumni SET verified = 1 WHERE user_id = ?').run(req.params.userId);
  res.json({ ok: true });
});

// Search/filter
router.get('/', auth, (req, res) => {
  const { q = '', batch, department, location, company } = req.query;
  let sql = `SELECT u.id, u.name, u.email, a.* FROM users u LEFT JOIN alumni a ON a.user_id = u.id WHERE u.role = 'Alumni'`;
  const params = [];
  if (q) { sql += ` AND (u.name LIKE ? OR u.email LIKE ? OR a.company LIKE ?)`; params.push(`%${q}%`, `%${q}%`, `%${q}%`); }
  if (batch) { sql += ` AND a.batch = ?`; params.push(batch); }
  if (department) { sql += ` AND a.department = ?`; params.push(department); }
  if (location) { sql += ` AND a.location = ?`; params.push(location); }
  if (company) { sql += ` AND a.company = ?`; params.push(company); }
  const rows = db.prepare(sql).all(...params);
  res.json(rows);
});

module.exports = router;
