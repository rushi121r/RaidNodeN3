import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/tournaments', label: 'Tournaments' },
  { to: '/games/new', label: 'Add Game' },
  { to: '/admin', label: 'Admin' }
];

export default function AppShell() {
  const { t, i18n } = useTranslation();
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-lane-bg text-slate-100">
      <header className="border-b border-lane-neon/30 bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-lane-neon">{t('title')}</h1>
          <div className="flex items-center gap-2">
            <button className="rounded bg-slate-800 px-2 py-1" onClick={() => i18n.changeLanguage('en')}>
              EN
            </button>
            <button className="rounded bg-slate-800 px-2 py-1" onClick={() => i18n.changeLanguage('hi')}>
              हिंदी
            </button>
            <button className="rounded bg-lane-neon px-3 py-1 font-semibold" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-xl border border-lane-neon/30 bg-lane-card/70 p-4">
          <p className="mb-4 text-sm text-slate-300">{user?.name}</p>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `block rounded px-3 py-2 text-sm ${isActive ? 'bg-lane-neon text-black' : 'bg-slate-900/60'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
