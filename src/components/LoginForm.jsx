import { useMemo, useState } from 'react';
import axios from 'axios';
import { Mail, Lock } from 'lucide-react';

export default function LoginForm({ role, onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const baseURL = useApiBase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!baseURL) {
        // Mock mode (no backend URL configured)
        await new Promise((r) => setTimeout(r, 500));
        return onAuth({
          user: { id: 1, name: 'Demo User', email, role },
          token: 'demo-token',
        });
      }
      const { data } = await axios.post(`${baseURL}/auth/login`, { email, password });
      onAuth(data);
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <label className="text-sm text-slate-300">Email</label>
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <Mail size={16} className="text-slate-300" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent outline-none text-white placeholder:text-slate-400 text-sm"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm text-slate-300">Password</label>
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <Lock size={16} className="text-slate-300" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-transparent outline-none text-white placeholder:text-slate-400 text-sm"
            placeholder="••••••••"
          />
        </div>
      </div>

      {error && <div className="text-sm text-rose-400">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center rounded-lg bg-white text-slate-900 font-medium px-5 py-2.5 hover:bg-white/90 disabled:opacity-60"
      >
        {loading ? 'Signing in…' : `Sign in as ${role}`}
      </button>
    </form>
  );
}

function useApiBase() {
  return useMemo(() => {
    const env = import.meta.env?.VITE_API_URL?.trim?.();
    if (env) return env.replace(/\/$/, '');
    // Try same host with port 8000 (local dev). In hosted sandboxes, set VITE_API_URL.
    try {
      const url = new URL(window.location.href);
      return `${url.protocol}//${url.hostname}:8000`;
    } catch {
      return '';
    }
  }, []);
}
