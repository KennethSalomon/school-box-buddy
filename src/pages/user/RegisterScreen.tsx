import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package } from 'lucide-react';
import { toast } from 'sonner';

const RegisterScreen = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', password: '' });
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { register } = useStore();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const verifyOtp = () => {
    if (otp.length === 4) {
      register(form);
      toast.success('Compte créé avec succès ! 🎉');
      navigate('/app/home');
    } else {
      toast.error('Code invalide');
    }
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
          <Package className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Vérification OTP</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Un code a été envoyé au {form.phone}
        </p>
        <Input
          type="text"
          maxLength={4}
          placeholder="0000"
          value={otp}
          onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
          className="text-center text-2xl tracking-[0.5em] font-bold sb-input-focus max-w-[200px] mx-auto"
        />
        <Button size="lg" className="w-full max-w-[200px] mt-6" onClick={verifyOtp}>
          Vérifier
        </Button>
        <button className="text-sm text-primary font-medium mt-4">Renvoyer le code</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sb-gradient-hero px-6 pt-16 pb-10 rounded-b-[30px]">
        <h1 className="text-2xl font-bold text-secondary-foreground">Créer un compte ✨</h1>
        <p className="text-secondary-foreground/60 text-sm mt-1">Rejoins School Box en quelques secondes</p>
      </div>

      <form onSubmit={handleRegister} className="flex-1 px-6 pt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Prénom</label>
            <Input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} className="sb-input-focus" required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Nom</label>
            <Input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} className="sb-input-focus" required />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Téléphone</label>
          <Input type="tel" placeholder="+229 00 00 00 00" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="sb-input-focus" required />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
          <Input type="email" placeholder="email@exemple.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="sb-input-focus" required />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Mot de passe</label>
          <Input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="sb-input-focus" required />
        </div>
        <Button type="submit" size="lg" className="w-full">
          S'inscrire
        </Button>
      </form>

      <div className="px-6 pb-8 text-center">
        <p className="text-sm text-muted-foreground">
          Déjà un compte ?{' '}
          <Link to="/app/login" className="text-primary font-semibold">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
