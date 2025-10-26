import { GraduationCap, LogOut, User } from 'lucide-react';

export default function Navbar({ user, onSignOut }) {
  return (
    <header className="relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/70 backdrop-blur-xl px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500 text-slate-950">
              <GraduationCap size={20} />
            </div>
            <div>
              <span className="block font-semibold tracking-tight">AlmaConnect</span>
              <span className="block text-xs text-slate-400 -mt-1">Alumni Data & Engagement</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 border border-white/10">
                  <User size={16} className="text-slate-300" />
                  <span className="text-sm text-white/90">{user.name}</span>
                  <span className="text-xs text-slate-400 border-l border-white/10 pl-2 capitalize">{user.role}</span>
                </div>
                <button onClick={onSignOut} className="inline-flex items-center gap-2 rounded-lg border border-white/10 text-white px-3 py-2 hover:bg-white/10 text-sm">
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            ) : (
              <a className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-sm font-medium hover:bg-cyan-400 transition-colors" href="#auth">Sign in</a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
