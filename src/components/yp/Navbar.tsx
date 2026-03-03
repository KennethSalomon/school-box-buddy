import { Link, useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useYPStore } from '@/store/useYPStore';

const Navbar = () => {
  const location = useLocation();
  const passCount = useYPStore((s) => s.passCount());

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/collection', label: 'La Collection' },
    { to: '/mes-pass', label: 'Mes Pass' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="font-identity text-sm tracking-[0.3em] text-foreground">
            YOUR
          </span>
          <Zap size={16} className="text-primary fill-primary animate-red-pulse" />
          <span className="font-identity text-sm tracking-[0.3em] text-foreground">
            PASS
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-xs font-medium tracking-widest uppercase transition-colors ${
                isActive(l.to)
                  ? 'text-primary'
                  : 'text-foreground/50 hover:text-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Pass count */}
        <Link
          to="/mes-pass"
          className="relative flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors"
        >
          <span className="text-xs font-medium tracking-widest uppercase hidden sm:block">Mon Vault</span>
          {passCount > 0 && (
            <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              {passCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
