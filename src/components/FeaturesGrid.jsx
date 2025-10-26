import { Users, MessageSquare, Calendar, Handshake, Shield, Database, Wallet, LineChart } from 'lucide-react';

const features = [
  {
    icon: Database,
    title: 'Centralized Alumni Database',
    desc: 'Import/export CSV, profile verification, smart filters by batch, department, location, and employer.',
  },
  {
    icon: MessageSquare,
    title: 'Communication & Networking',
    desc: 'Announcements, chat, forums, and newsletters with email/SMS integration to keep communities active.',
  },
  {
    icon: Calendar,
    title: 'Event Management',
    desc: 'Create reunions and webinars with RSVP, registration, attendance tracking, and post-event galleries.',
  },
  {
    icon: Handshake,
    title: 'Mentorship & Careers',
    desc: 'Alumni mentors, student requests, internships and jobs, plus mentor-mentee matching flows.',
  },
  {
    icon: Wallet,
    title: 'Donations & Campaigns',
    desc: 'Secure payment gateway integration, campaign goals, receipts, and detailed contribution reports.',
  },
  {
    icon: LineChart,
    title: 'Dashboards & Analytics',
    desc: 'Live insights on engagement, events, donations, career growth, and geo-distribution of alumni.',
  },
  {
    icon: Users,
    title: 'Role-based Access',
    desc: 'Admin, Alumni, Student, and Recruiter portals with granular permissions and data privacy.',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    desc: 'JWT auth, OAuth login, encryption, audit logs, and exportable APIs for mobile integrations.',
  },
];

export default function FeaturesGrid() {
  return (
    <div id="features">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Core capabilities for every team</h2>
      <p className="mt-2 text-slate-300">Everything you need to manage alumni relations at scale.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {features.map((f) => (
          <div key={f.title} className="group rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-900 p-4 hover:border-cyan-400/30 transition-colors">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/20">
              <f.icon size={18} />
            </div>
            <h3 className="mt-3 font-medium">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
