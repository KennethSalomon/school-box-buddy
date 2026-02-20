import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const DeliveryScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const note = (location.state as any)?.note || '';
  const [address, setAddress] = useState({ quartier: '', rue: '', ville: '' });

  const autoFill = () => {
    setAddress({ quartier: 'Cadjehoun', rue: 'Rue 123, à côté de la pharmacie', ville: 'Cotonou' });
    toast.success('Localisation détectée ! 📍');
  };

  const full = `${address.quartier}, ${address.rue}, ${address.ville}`;

  return (
    <div className="min-h-screen bg-background px-4 pt-6 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <h1 className="text-xl font-bold text-foreground">Où livrer votre box ?</h1>
      </div>

      <Button variant="outline" className="w-full mb-5 justify-start gap-2" onClick={autoFill}>
        <MapPin className="w-4 h-4 text-accent" /> Utiliser ma localisation actuelle 📍
      </Button>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Quartier</label>
          <Input value={address.quartier} onChange={e => setAddress({ ...address, quartier: e.target.value })} className="sb-input-focus" placeholder="Ex: Cadjehoun" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Rue / Repère</label>
          <Input value={address.rue} onChange={e => setAddress({ ...address, rue: e.target.value })} className="sb-input-focus" placeholder="Ex: À côté de la pharmacie" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Ville</label>
          <Input value={address.ville} onChange={e => setAddress({ ...address, ville: e.target.value })} className="sb-input-focus" placeholder="Ex: Cotonou" />
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mt-5 sb-card h-40 flex items-center justify-center bg-muted">
        <span className="text-muted-foreground text-sm">🗺️ Carte de localisation</span>
      </div>

      <Button
        size="lg"
        className="w-full mt-6"
        disabled={!address.quartier || !address.ville}
        onClick={() => navigate('/app/payment', { state: { note, address: full } })}
      >
        Confirmer l'adresse →
      </Button>
    </div>
  );
};

export default DeliveryScreen;
