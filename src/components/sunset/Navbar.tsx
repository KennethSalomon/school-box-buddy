import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Histoire', href: '#histoire' },
  { label: 'Menu', href: '#menu' },
  { label: 'Événements', href: '#evenements' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith('#') && isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      window.location.href = '/' + href;
    }
  };

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled || !isHome ? 'bg-secondary/95 backdrop-blur-md shadow-lg py-3' : 'bg-gradient-to-b from-black/60 to-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl font-bold tracking-wider text-white">
          SUNSET <span className="text-primary">Beach</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-white/70 hover:text-primary transition-colors text-xs uppercase tracking-[0.2em] font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        <Link
          to="/commander"
          className="hidden md:inline-flex bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
        >
          Commander
        </Link>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-secondary/95 backdrop-blur-md border-t border-white/10 px-6 py-6 space-y-4">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="block text-white/80 hover:text-primary text-sm uppercase tracking-[0.15em]"
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/commander"
            onClick={() => setOpen(false)}
            className="block bg-primary text-primary-foreground text-center px-6 py-3 rounded-md text-sm font-bold uppercase tracking-[0.15em]"
          >
            Commander
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
