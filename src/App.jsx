import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesGrid from './components/FeaturesGrid';
import RoleTabs from './components/RoleTabs';

function App() {
  const [openRole, setOpenRole] = useState('Admin');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white selection:bg-cyan-500/30 selection:text-white">
      <Navbar />

      <main>
        <HeroSection />

        <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
          <div className="rounded-2xl bg-slate-900/70 ring-1 ring-white/10 backdrop-blur-md p-6 sm:p-8">
            <FeaturesGrid />
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-16">
          <RoleTabs openRole={openRole} setOpenRole={setOpenRole} />
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">Ready to centralize your alumni network?</h3>
          <p className="mt-2 text-slate-300">Deploy on your preferred cloud and integrate with existing systems via secure APIs.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#features" className="inline-flex items-center justify-center rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium px-5 py-3 transition-colors">Get a Demo</a>
            <a href="#roles" className="inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium px-5 py-3 transition-colors">View Docs</a>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">© {new Date().getFullYear()} AlmaConnect Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
