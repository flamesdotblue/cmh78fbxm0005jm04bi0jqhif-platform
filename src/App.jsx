import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import AuthTabs from './components/AuthTabs';
import FeaturesGrid from './components/FeaturesGrid';
import HeroSection from './components/HeroSection';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('auth:user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('auth:token');
    localStorage.removeItem('auth:user');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar user={user} onSignOut={handleSignOut} />

      <main>
        <HeroSection />

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          <div className="rounded-2xl bg-slate-900/70 ring-1 ring-white/10 backdrop-blur-md p-6 sm:p-8">
            <AuthTabs user={user} setUser={setUser} />
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-16">
          <FeaturesGrid />
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">Secure, role-based access for every user</h3>
          <p className="mt-2 text-slate-300">Admins, Alumni, Students, and Recruiters each get a dedicated experience.</p>
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">© {new Date().getFullYear()} AlmaConnect Platform</p>
      </footer>
    </div>
  );
}

export default App;
