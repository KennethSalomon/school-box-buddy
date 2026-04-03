import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Shield } from 'lucide-react';
import { toast } from 'sonner';

const AdminLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error('Identifiants incorrects');
    } else {
      // The AdminRoute will check for admin role
      toast.success('Bienvenue Admin !');
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen sb-gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 sb-gradient-primary rounded-2xl flex items-center justify-center mb-4 sb-glow-primary sb-animate-box-open">
            <Package className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-secondary-foreground tracking-tight">School Box</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <Shield className="w-3.5 h-3.5 text-accent" />
            <p className="text-sm text-secondary-foreground/60 font-medium">Espace Administrateur</p>
          </div>
        </div>

        <div className="sb-card-glass p-6 space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-secondary-foreground/80 mb-1 block">Email</label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-white/10 border-white/20 text-secondary-foreground placeholder:text-secondary-foreground/30 h-11" required />
            </div>
            <div>
              <label className="text-sm font-semibold text-secondary-foreground/80 mb-1 block">Mot de passe</label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-white/10 border-white/20 text-secondary-foreground placeholder:text-secondary-foreground/30 h-11" required />
            </div>
            <Button type="submit" size="lg" className="w-full h-12 sb-glow-primary font-semibold" disabled={loading}>
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : 'Se connecter'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginScreen;
