const express = require('express');
const cors = require('cors');
const db = require('./db');
const { auth, allowRoles } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/alumni', require('./routes/alumni'));
app.use('/events', require('./routes/events'));
app.use('/analytics', require('./routes/analytics'));

// Simple seed route (dev use only)
app.post('/seed', (req, res) => {
  try {
    const u = db.prepare('INSERT INTO users (name, email, role, password_hash) VALUES (?,?,?,?)');
    const bcrypt = require('bcryptjs');
    const hash = (p) => bcrypt.hashSync(p, 10);
    u.run('Admin User', 'admin@example.com', 'Admin', hash('admin123'));
    u.run('Alice Alumni', 'alice@alumni.com', 'Alumni', hash('password'));
    u.run('Sam Student', 'sam@student.com', 'Student', hash('password'));
    u.run('Rita Recruiter', 'rita@corp.com', 'Recruiter', hash('password'));

    const e = db.prepare('INSERT INTO events (title, date, location, mode, description, created_by) VALUES (?,?,?,?,?,?)');
    e.run('Alumni Meet 2025', '2025-06-14', 'San Francisco', 'In-person', 'Annual alumni meet', 1);

    const c = db.prepare('INSERT INTO donation_campaigns (name, goal, description) VALUES (?,?,?)');
    c.run('Scholarship Fund', 50000, 'Support student scholarships');

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'seed failed' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log('API listening on ' + PORT));
