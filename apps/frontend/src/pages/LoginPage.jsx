import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', city: 'Ahmedabad' });

  const submit = async (event) => {
    event.preventDefault();
    if (mode === 'login') {
      await login({ email: form.email, password: form.password });
    } else {
      await register(form);
    }
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-lane-bg p-4">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        className="w-full max-w-md space-y-3 rounded-xl border border-lane-neon/40 bg-lane-card/90 p-6"
      >
        <h2 className="text-2xl font-bold text-lane-accent">{mode === 'login' ? 'Login' : 'Create account'}</h2>
        {mode === 'register' && (
          <input
            className="w-full rounded bg-slate-800 p-2"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}
        <input
          className="w-full rounded bg-slate-800 p-2"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full rounded bg-slate-800 p-2"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {mode === 'register' && (
          <input
            className="w-full rounded bg-slate-800 p-2"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        )}
        <button className="w-full rounded bg-lane-neon px-4 py-2 font-semibold text-black">Continue</button>
        <button
          type="button"
          className="w-full text-sm text-slate-300"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? 'Need account? Sign up' : 'Already registered? Login'}
        </button>
      </motion.form>
    </div>
  );
}
