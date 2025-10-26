import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

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

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-slate-300 hover:text-white">Features</a>
            <a href="#roles" className="text-slate-300 hover:text-white">Roles</a>
            <a href="#events" className="text-slate-300 hover:text-white">Events</a>
            <a href="#donate" className="text-slate-300 hover:text-white">Donations</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a className="px-4 py-2 rounded-lg border border-white/10 text-sm text-white hover:bg-white/10 transition-colors" href="#roles">Sign in</a>
            <a className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-sm font-medium hover:bg-cyan-400 transition-colors" href="#features">Get Started</a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-white">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div className="mt-2 rounded-xl border border-white/10 bg-slate-900/90 backdrop-blur-xl p-4 md:hidden">
            <nav className="flex flex-col gap-3 text-sm">
              <a onClick={() => setOpen(false)} href="#features" className="text-slate-300 hover:text-white">Features</a>
              <a onClick={() => setOpen(false)} href="#roles" className="text-slate-300 hover:text-white">Roles</a>
              <a onClick={() => setOpen(false)} href="#events" className="text-slate-300 hover:text-white">Events</a>
              <a onClick={() => setOpen(false)} href="#donate" className="text-slate-300 hover:text-white">Donations</a>
              <div className="pt-2 grid grid-cols-2 gap-2">
                <a className="px-4 py-2 rounded-lg border border-white/10 text-center text-sm text-white hover:bg-white/10 transition-colors" href="#roles">Sign in</a>
                <a className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-center text-sm font-medium hover:bg-cyan-400 transition-colors" href="#features">Get Started</a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
