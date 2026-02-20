import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package } from 'lucide-react';
import { toast } from 'sonner';

const AdminLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { adminLogin } = useStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(email, password)) {
      toast.success('Bienvenue Admin !');
      navigate('/admin');
    } else {
      toast.error('Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center mb-4">
            <Package className="w-7 h-7 text-secondary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">School Box Admin</h1>
          <p className="text-sm text-muted-foreground">Connectez-vous à votre espace</p>
        </div>

        <form onSubmit={handleLogin} className="sb-card p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="sb-input-focus" required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Mot de passe</label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="sb-input-focus" required />
          </div>
          <Button type="submit" size="lg" className="w-full">Se connecter</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginScreen;
