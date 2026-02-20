import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  const { login } = useStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success('Connexion réussie !');
      navigate('/app/home');
    } else {
      toast.error('Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sb-gradient-hero px-6 pt-16 pb-12 rounded-b-[30px]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-secondary-foreground">School Box</span>
        </div>
        <h1 className="text-2xl font-bold text-secondary-foreground mt-6">Content de te revoir ! 👋</h1>
        <p className="text-secondary-foreground/60 text-sm mt-1">Connecte-toi pour accéder à tes fournitures</p>
      </div>

      <form onSubmit={handleLogin} className="flex-1 px-6 pt-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Email ou téléphone</label>
          <Input
            type="text"
            placeholder="email@exemple.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="sb-input-focus"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Mot de passe</label>
          <div className="relative">
            <Input
              type={showPw ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="sb-input-focus pr-10"
              required
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPw(!showPw)}>
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="text-right">
          <button type="button" className="text-sm text-primary font-medium">Mot de passe oublié ?</button>
        </div>
        <Button type="submit" size="lg" className="w-full">
          Se connecter
        </Button>
      </form>

      <div className="px-6 pb-8 text-center">
        <p className="text-sm text-muted-foreground">
          Pas encore de compte ?{' '}
          <Link to="/app/register" className="text-primary font-semibold">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
