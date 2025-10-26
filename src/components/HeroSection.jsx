import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center" aria-label="Hero">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-slate-300 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Real-time alumni engagement platform
          </div>
          <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Centralize alumni data and spark meaningful connections
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            A secure, modern platform for institutions to manage alumni records, foster mentorship, run events, and drive fundraising — all in one place.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="#features" className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium px-5 py-3 transition-colors">
              Explore Features
              <ArrowRight size={18} />
            </a>
            <a href="#roles" className="inline-flex items-center gap-2 rounded-lg border border-white/10 hover:bg-white/10 text-white font-medium px-5 py-3 transition-colors">
              View Role Portals
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
