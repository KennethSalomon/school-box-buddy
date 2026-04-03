import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const RegisterScreen = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    setLoading(true);
    const { error } = await signUp(form.email, form.password, {
      first_name: form.firstName,
      last_name: form.lastName,
      phone: form.phone,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Compte créé avec succès ! 🎉');
      navigate('/app/home');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sb-gradient-hero px-6 pt-16 pb-12 rounded-b-[32px] relative overflow-hidden">
        <div className="absolute top-6 right-6 w-24 h-24 rounded-full bg-accent/10 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 sb-gradient-primary rounded-xl flex items-center justify-center sb-glow-primary">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-secondary-foreground">School Box</span>
          </div>
          <h1 className="text-2xl font-bold text-secondary-foreground mt-6">Créer un compte ✨</h1>
          <p className="text-secondary-foreground/60 text-sm mt-1">Rejoins School Box en quelques secondes</p>
        </div>
      </div>

      <form onSubmit={handleRegister} className="flex-1 px-6 pt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold text-foreground mb-1 block">Prénom</label>
            <Input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} className="sb-input-focus h-11" required />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-1 block">Nom</label>
            <Input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} className="sb-input-focus h-11" required />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground mb-1 block">Téléphone</label>
          <Input type="tel" placeholder="+229 00 00 00 00" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="sb-input-focus h-11" required />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground mb-1 block">Email</label>
          <Input type="email" placeholder="email@exemple.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="sb-input-focus h-11" required />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground mb-1 block">Mot de passe</label>
          <Input type="password" placeholder="Min. 6 caractères" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="sb-input-focus h-11" required minLength={6} />
        </div>
        <Button type="submit" size="lg" className="w-full h-12 sb-glow-primary text-base font-semibold gap-2" disabled={loading}>
          {loading ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> S'inscrire
            </>
          )}
        </Button>
      </form>

      <div className="px-6 pb-8 text-center">
        <p className="text-sm text-muted-foreground">
          Déjà un compte ?{' '}
          <Link to="/app/login" className="text-primary font-bold hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
