const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/summary', (req, res) => {
  const alumni = db.prepare("SELECT COUNT(*) as c FROM users WHERE role='Alumni'").get().c;
  const students = db.prepare("SELECT COUNT(*) as c FROM users WHERE role='Student'").get().c;
  const mentors = db.prepare('SELECT COUNT(*) as c FROM mentors').get().c;
  const events = db.prepare('SELECT COUNT(*) as c FROM events').get().c;
  const donations = db.prepare('SELECT IFNULL(SUM(amount),0) as total FROM donations').get().total;
  res.json({ alumni, students, mentors, events, donations });
});

module.exports = router;
