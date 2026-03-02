import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCloverStore } from '@/store/useCloverStore';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const cartCount = useCloverStore((s) => s.cartCount());

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/homme', label: 'Homme' },
    { to: '/femme', label: 'Femme' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-display font-bold tracking-tight text-background">
            🍀 CLOVER
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium tracking-wide transition-colors ${
                isActive(l.to)
                  ? 'text-primary'
                  : 'text-background/70 hover:text-background'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <Link to="/profil" className="text-background/70 hover:text-background transition-colors">
            <User size={20} />
          </Link>
          <Link to="/panier" className="relative text-background/70 hover:text-background transition-colors">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden text-background/70"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-foreground border-t border-background/10 pb-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium ${
                isActive(l.to) ? 'text-primary' : 'text-background/70'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
