import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Shield, Zap } from 'lucide-react';
import { useYPStore } from '@/store/useYPStore';

const BottomNav = () => {
  const location = useLocation();
  const passCount = useYPStore((s) => s.passCount());

  const items = [
    { to: '/', icon: Home, label: 'Accueil' },
    { to: '/collection', icon: Layers, label: 'Collection' },
    { to: '/mes-pass', icon: Shield, label: 'Mes Pass', badge: passCount },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-foreground/5">
      <div className="flex items-center justify-around py-3 px-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex flex-col items-center gap-1 px-4 py-1 text-[10px] tracking-widest uppercase transition-colors ${
                isActive(item.to)
                  ? 'text-primary'
                  : 'text-foreground/40'
              }`}
            >
              <Icon size={18} strokeWidth={1.5} />
              <span className="font-medium">{item.label}</span>
              {item.badge ? (
                <span className="absolute -top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
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
