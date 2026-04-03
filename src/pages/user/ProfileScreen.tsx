import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { User, ChevronRight, LogOut, Bell, Plus, X, Trophy, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import UserLayout from '@/layouts/UserLayout';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { profile, signOut, refreshProfile, user } = useAuth();
  const [showAddChild, setShowAddChild] = useState(false);
  const [childForm, setChildForm] = useState({ name: '', school: '', class: '' });
  const [children, setChildren] = useState<any[]>([]);
  const [loadingChildren, setLoadingChildren] = useState(true);

  // Load children from DB
  useState(() => {
    if (user) {
      supabase.from('children').select('*').eq('user_id', user.id).then(({ data }) => {
        setChildren(data || []);
        setLoadingChildren(false);
      });
    }
  });

  const handleLogout = async () => {
    await signOut();
    navigate('/app/login');
    toast.success('Déconnexion réussie');
  };

  const handleAddChild = async () => {
    if (!childForm.name || !user) return;
    const { data, error } = await supabase.from('children').insert({
      user_id: user.id,
      name: childForm.name,
    }).select().single();
    if (!error && data) {
      setChildren(prev => [...prev, data]);
      setChildForm({ name: '', school: '', class: '' });
      setShowAddChild(false);
      toast.success('Enfant ajouté !');
    }
  };

  const handleRemoveChild = async (childId: string) => {
    await supabase.from('children').delete().eq('id', childId);
    setChildren(prev => prev.filter(c => c.id !== childId));
    toast.success('Enfant supprimé');
  };

  return (
    <UserLayout>
      <div className="px-4 pt-6">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 sb-gradient-hero rounded-full flex items-center justify-center mb-4 sb-luxury-shadow relative">
            <span className="text-2xl font-extrabold text-secondary-foreground">
              {profile?.first_name?.[0]}{profile?.last_name?.[0]}
            </span>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent rounded-full flex items-center justify-center border-4 border-background">
              <Settings className="w-3.5 h-3.5 text-accent-foreground" />
            </div>
          </div>
          <h2 className="text-xl font-extrabold text-foreground">{profile?.first_name} {profile?.last_name}</h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          {profile?.referral_code && (
            <div className="mt-2 inline-flex items-center gap-1.5 bg-accent/10 px-3 py-1 rounded-full">
              <Shield className="w-3 h-3 text-accent" />
              <span className="text-xs font-bold text-accent font-mono">{profile.referral_code}</span>
            </div>
          )}
        </div>

        {/* Menu items */}
        <div className="space-y-2 mb-6">
          <button onClick={() => navigate('/app/loyalty')} className="sb-card-hover p-4 w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-warning/10 rounded-xl flex items-center justify-center">
                <Trophy className="w-4.5 h-4.5 text-warning" />
              </div>
              <div className="text-left">
                <span className="font-semibold text-foreground text-sm block">Programme fidélité</span>
                <span className="text-xs text-muted-foreground">{profile?.loyalty_points || 0} points</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="sb-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center">
                <Bell className="w-4.5 h-4.5 text-accent" />
              </div>
              <span className="font-semibold text-foreground text-sm">Notifications</span>
            </div>
            <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer transition-colors">
              <div className="w-5 h-5 bg-primary-foreground rounded-full absolute right-0.5 top-0.5 transition-all shadow-sm" />
            </div>
          </div>
        </div>

        {/* Children */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-foreground">Enfants</h3>
            <button onClick={() => setShowAddChild(true)} className="text-sm text-primary font-bold flex items-center gap-1 hover:underline">
              <Plus className="w-4 h-4" /> Ajouter
            </button>
          </div>

          {children.map(child => (
            <div key={child.id} className="sb-card p-3.5 flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold text-foreground text-sm">{child.name}</p>
              </div>
              <button onClick={() => handleRemoveChild(child.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {showAddChild && (
            <div className="sb-card p-4 space-y-3 mt-2 sb-border-gradient">
              <Input placeholder="Nom de l'enfant" value={childForm.name} onChange={e => setChildForm({ ...childForm, name: e.target.value })} className="sb-input-focus h-11" />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddChild} className="sb-glow-primary">Ajouter</Button>
                <Button size="sm" variant="ghost" onClick={() => setShowAddChild(false)}>Annuler</Button>
              </div>
            </div>
          )}
        </div>

        <Button variant="outline" className="w-full gap-2 text-destructive border-destructive/20 hover:bg-destructive/5 h-12 font-semibold" onClick={handleLogout}>
          <LogOut className="w-4 h-4" /> Déconnexion
        </Button>
      </div>
    </UserLayout>
  );
};

export default ProfileScreen;
