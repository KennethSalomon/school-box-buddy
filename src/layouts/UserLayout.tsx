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
      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/50 z-50">
        <div className="flex items-center justify-around max-w-lg mx-auto h-[68px] px-2">
          {tabs.map(t => {
            const active = pathname === t.path || pathname.startsWith(t.path + '/');
            return (
              <button
                key={t.path}
                onClick={() => navigate(t.path)}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-300 ${
                  active 
                    ? 'text-primary scale-105' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className={`relative ${active ? '' : ''}`}>
                  <t.icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.8} />
                  {active && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </div>
                <span className={`text-[10px] ${active ? 'font-bold' : 'font-medium'}`}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default UserLayout;
