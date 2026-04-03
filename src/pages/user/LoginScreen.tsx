import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Eye, EyeOff, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error.message === 'Invalid login credentials'
        ? 'Email ou mot de passe incorrect'
        : error.message);
    } else {
      toast.success('Connexion réussie !');
      navigate('/app/home');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sb-gradient-hero px-6 pt-16 pb-14 rounded-b-[32px] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-accent/10 blur-2xl" />
        <div className="absolute bottom-4 left-10 w-16 h-16 rounded-full bg-primary/15 blur-xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 sb-gradient-primary rounded-xl flex items-center justify-center sb-glow-primary">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-secondary-foreground tracking-tight">School Box</span>
          </div>
          <h1 className="text-2xl font-bold text-secondary-foreground mt-7">Content de te revoir ! 👋</h1>
          <p className="text-secondary-foreground/60 text-sm mt-1.5">Connecte-toi pour accéder à tes fournitures</p>
        </div>
      </div>

      <form onSubmit={handleLogin} className="flex-1 px-6 pt-8 space-y-5">
        <div>
          <label className="text-sm font-semibold text-foreground mb-1.5 block">Email</label>
          <Input
            type="email"
            placeholder="email@exemple.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="sb-input-focus h-12"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground mb-1.5 block">Mot de passe</label>
          <div className="relative">
            <Input
              type={showPw ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="sb-input-focus pr-10 h-12"
              required
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShowPw(!showPw)}>
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="text-right">
          <button type="button" className="text-sm text-primary font-semibold hover:underline">Mot de passe oublié ?</button>
        </div>
        <Button type="submit" size="lg" className="w-full h-12 sb-glow-primary text-base font-semibold gap-2" disabled={loading}>
          {loading ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Se connecter
            </>
          )}
        </Button>
      </form>

      <div className="px-6 pb-8 text-center">
        <p className="text-sm text-muted-foreground">
          Pas encore de compte ?{' '}
          <Link to="/app/register" className="text-primary font-bold hover:underline">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
