import { Link, useLocation } from 'react-router-dom';
import { Home, User, ShoppingBag, Layers } from 'lucide-react';
import { useCloverStore } from '@/store/useCloverStore';

const BottomNav = () => {
  const location = useLocation();
  const cartCount = useCloverStore((s) => s.cartCount());

  const items = [
    { to: '/', icon: Home, label: 'Accueil' },
    { to: '/homme', icon: Layers, label: 'Homme' },
    { to: '/femme', icon: Layers, label: 'Femme' },
    { to: '/panier', icon: ShoppingBag, label: 'Panier', badge: cartCount },
    { to: '/profil', icon: User, label: 'Profil' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-md border-t border-background/10 safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors ${
                isActive(item.to)
                  ? 'text-primary'
                  : 'text-background/50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
              {item.badge ? (
                <span className="absolute -top-1 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
