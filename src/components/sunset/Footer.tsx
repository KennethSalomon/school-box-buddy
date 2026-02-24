import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({ title: 'Merci !', description: 'Vous êtes inscrit à notre newsletter.' });
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">Restez informé(e)</h3>
          <p className="text-white/60 mb-8 max-w-md mx-auto">Recevez nos prochains événements et offres exclusives directement dans votre boîte mail.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Votre email"
              className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-primary text-sm"
            />
            <button type="submit" className="bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-bold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity">
              S'inscrire
            </button>
          </form>
        </div>
      </div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="font-serif text-2xl font-bold tracking-wider">SUNSET <span className="text-primary">Beach</span></Link>
            <p className="text-white/50 text-sm mt-4 leading-relaxed">Votre escapade tropicale pour la gastronomie, la musique et les couchers de soleil inoubliables.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-[0.15em] mb-4">Contact</h4>
            <div className="space-y-3 text-white/60 text-sm">
              <p className="flex items-center gap-2"><MapPin size={14} className="flex-shrink-0" /> Plage de Fidjrossè, Cotonou, Bénin</p>
              <p className="flex items-center gap-2"><Phone size={14} className="flex-shrink-0" /> +229 97 00 00 00</p>
              <p className="flex items-center gap-2"><Mail size={14} className="flex-shrink-0" /> hello@sunsetbeach.bj</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-[0.15em] mb-4">Suivez-nous</h4>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><Instagram size={18} /></a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><Facebook size={18} /></a>
              <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-bold">TK</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/30 text-xs">
          © {new Date().getFullYear()} SUNSET Beach. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
