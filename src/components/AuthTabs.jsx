import { useMemo, useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Shield, Users, GraduationCap, Briefcase } from 'lucide-react';

const ROLES = [
  { key: 'Admin', label: 'Admin', icon: Shield, color: 'bg-rose-500/15 text-rose-300 ring-rose-500/20' },
  { key: 'Alumni', label: 'Alumni', icon: Users, color: 'bg-cyan-500/15 text-cyan-300 ring-cyan-500/20' },
  { key: 'Student', label: 'Student', icon: GraduationCap, color: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/20' },
  { key: 'Recruiter', label: 'Recruiter', icon: Briefcase, color: 'bg-indigo-500/15 text-indigo-300 ring-indigo-500/20' },
];

export default function AuthTabs({ user, setUser }) {
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('Alumni');

  const activeRole = useMemo(() => ROLES.find((r) => r.key === role), [role]);

  return (
    <div id="auth">
      <div className="flex items-start justify-between flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${activeRole.color}`}>
              <activeRole.icon size={18} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{mode === 'login' ? 'Sign in' : 'Create account'}</h2>
              <p className="mt-1 text-slate-300 text-sm">Choose your role to get the right permissions and experience.</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`rounded-lg px-3 py-2 text-sm transition-colors border ${
                  role === r.key ? 'bg-white text-slate-900 border-white' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="inline-flex items-center gap-2">
                  <r.icon size={16} /> {r.label}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 inline-flex rounded-lg bg-white/5 border border-white/10 p-1">
            <button
              onClick={() => setMode('login')}
              className={`px-4 py-2 rounded-md text-sm ${mode === 'login' ? 'bg-white text-slate-900' : 'text-white hover:bg-white/10'}`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`px-4 py-2 rounded-md text-sm ${mode === 'register' ? 'bg-white text-slate-900' : 'text-white hover:bg-white/10'}`}
            >
              Register
            </button>
          </div>

          <div className="mt-6">
            {mode === 'login' ? (
              <LoginForm role={role} onAuth={(payload) => setUserAndPersist(payload, setUser)} />
            ) : (
              <RegisterForm role={role} onAuth={(payload) => setUserAndPersist(payload, setUser)} />
            )}
          </div>
        </div>

        <div className="w-full lg:w-[420px] rounded-xl border border-white/10 bg-slate-900/60 p-5">
          <h3 className="font-medium">What you get</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {role === 'Admin' && (
              <>
                <li>• Full control over alumni data and verification</li>
                <li>• Event creation, announcements, and analytics</li>
                <li>• Donation campaigns and receipts</li>
              </>
            )}
            {role === 'Alumni' && (
              <>
                <li>• Update profile and career milestones</li>
                <li>• Join events, mentor students, post jobs</li>
                <li>• Donate to causes and view contributions</li>
              </>
            )}
            {role === 'Student' && (
              <>
                <li>• Find mentors by skills and location</li>
                <li>• Apply to internships and jobs</li>
                <li>• Track mentorship sessions</li>
              </>
            )}
            {role === 'Recruiter' && (
              <>
                <li>• Post roles and internships</li>
                <li>• Search alumni by skills/experience</li>
                <li>• Coordinate with Admins for drives</li>
              </>
            )}
          </ul>

          <div className="mt-5 rounded-lg bg-slate-800/80 border border-white/10 p-4 text-xs text-slate-300">
            <p>
              Tip: Use the same email to create role-specific access for piloting. Admin users should be created by an existing Admin or via seed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function setUserAndPersist(payload, setUser) {
  const { user, token } = payload;
  if (token) localStorage.setItem('auth:token', token);
  if (user) localStorage.setItem('auth:user', JSON.stringify(user));
  setUser(user);
}
