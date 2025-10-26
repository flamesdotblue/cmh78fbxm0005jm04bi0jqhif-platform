import { useState } from 'react';
import { Shield, Users, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

const ROLE_CONTENT = {
  Admin: {
    icon: Shield,
    color: 'from-rose-500/20 to-rose-500/5',
    bullets: [
      'Manage alumni profiles, events, and announcements',
      'Approve mentorships and verify updates',
      'Set campaign goals and track donations in real-time',
      'Export data and monitor analytics dashboards',
    ],
    cta: 'Open Admin Dashboard',
  },
  Alumni: {
    icon: Users,
    color: 'from-cyan-500/20 to-cyan-500/5',
    bullets: [
      'Update your profile and career milestones',
      'Join events and community groups',
      'Become a mentor and post jobs or internships',
      'Donate to funds that matter to you',
    ],
    cta: 'Enter Alumni Portal',
  },
  Student: {
    icon: GraduationCap,
    color: 'from-emerald-500/20 to-emerald-500/5',
    bullets: [
      'Find mentors by industry, skills, or location',
      'Apply to internships and projects posted by alumni',
      'Build your network with verified alumni',
      'Track sessions and outcomes in your dashboard',
    ],
    cta: 'Explore Student Portal',
  },
  Recruiter: {
    icon: Briefcase,
    color: 'from-indigo-500/20 to-indigo-500/5',
    bullets: [
      'Post roles and reach relevant alumni quickly',
      'Search by skills, experience, and location',
      'Coordinate with admins for campus-hire drives',
      'Receive candidate recommendations',
    ],
    cta: 'Open Recruiter Space',
  },
};

export default function RoleTabs({ openRole: controlledRole, setOpenRole }) {
  const isControlled = controlledRole !== undefined && setOpenRole;
  const [uncontrolledRole, setUncontrolledRole] = useState('Admin');
  const openRole = isControlled ? controlledRole : uncontrolledRole;

  const setRole = (r) => {
    if (isControlled) setOpenRole(r);
    else setUncontrolledRole(r);
  };

  const tabs = Object.keys(ROLE_CONTENT);
  const ActiveIcon = ROLE_CONTENT[openRole].icon;

  return (
    <div id="roles" className="relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Built for every role</h2>
          <p className="mt-2 text-slate-300">Focused portals with the right controls and context.</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setRole(t)}
            className={`rounded-lg px-4 py-2 text-sm transition-colors border ${
              openRole === t
                ? 'bg-white text-slate-900 border-white'
                : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={`mt-6 rounded-2xl border border-white/10 bg-gradient-to-br ${ROLE_CONTENT[openRole].color} p-6`}>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-900">
            <ActiveIcon size={22} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {ROLE_CONTENT[openRole].bullets.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/70" />
                <p className="text-slate-100">{b}</p>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-auto">
            <a href="#" className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-900 font-medium px-5 py-3 hover:bg-white/90 transition-colors">
              {ROLE_CONTENT[openRole].cta}
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      <div id="events" className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Alumni Meet 2025" subtitle="June 14, 2025 · San Francisco" label="Registration open" />
        <Card title="Career Webinar: FinTech" subtitle="July 02, 2025 · Online" label="RSVP" />
        <Card title="Global Reunion" subtitle="Aug 20, 2025 · Hybrid" label="Save the date" />
      </div>

      <div id="donate" className="mt-8 rounded-xl border border-white/10 p-6 bg-slate-900/60">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Support scholarships and research</h3>
            <p className="text-slate-300 text-sm">Transparent campaigns with live progress and auto-generated receipts.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none rounded-lg bg-cyan-500 text-slate-950 font-medium px-5 py-3 hover:bg-cyan-400 transition-colors">Donate now</button>
            <button className="flex-1 md:flex-none rounded-lg border border-white/10 text-white px-5 py-3 hover:bg-white/10 transition-colors">View campaigns</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, subtitle, label }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
      <div className="text-xs text-emerald-300 mb-2">{label}</div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-slate-300 text-sm">{subtitle}</p>
      <div className="mt-4 flex gap-2">
        <button className="rounded-lg bg-white text-slate-900 text-sm font-medium px-3 py-2 hover:bg-white/90 transition-colors">Details</button>
        <button className="rounded-lg border border-white/10 text-white text-sm px-3 py-2 hover:bg-white/10 transition-colors">RSVP</button>
      </div>
    </div>
  );
}
