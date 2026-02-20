import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, ShoppingBag, Users, User } from 'lucide-react';

const tabs = [
  { path: '/app/home', label: 'Accueil', icon: Home },
  { path: '/app/box', label: 'Ma Box', icon: Package },
  { path: '/app/orders', label: 'Commandes', icon: ShoppingBag },
  { path: '/app/referral', label: 'Parrainage', icon: Users },
  { path: '/app/profile', label: 'Profil', icon: User },
];

const UserLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-20 max-w-lg mx-auto w-full">
        {children}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex items-center justify-around max-w-lg mx-auto h-16">
          {tabs.map(t => {
            const active = pathname === t.path || pathname.startsWith(t.path + '/');
            return (
              <button
                key={t.path}
                onClick={() => navigate(t.path)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <t.icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold">{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default UserLayout;
