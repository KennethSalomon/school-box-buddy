import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { User, ChevronRight, LogOut, Bell, Plus, X, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import UserLayout from '@/layouts/UserLayout';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { currentUser, logout, addChild, removeChild } = useStore();
  const [showAddChild, setShowAddChild] = useState(false);
  const [childForm, setChildForm] = useState({ name: '', school: '', class: '' });

  const handleLogout = () => {
    logout();
    navigate('/app/login');
    toast.success('Déconnexion réussie');
  };

  const handleAddChild = () => {
    if (childForm.name && childForm.school && childForm.class) {
      addChild(childForm);
      setChildForm({ name: '', school: '', class: '' });
      setShowAddChild(false);
      toast.success('Enfant ajouté !');
    }
  };

  return (
    <UserLayout>
      <div className="px-4 pt-6">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl font-bold text-secondary-foreground">
              {currentUser?.firstName[0]}{currentUser?.lastName[0]}
            </span>
          </div>
          <h2 className="text-lg font-bold text-foreground">{currentUser?.firstName} {currentUser?.lastName}</h2>
          <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
        </div>

        {/* Menu items */}
        <div className="space-y-2 mb-6">
          <button onClick={() => navigate('/app/loyalty')} className="sb-card p-4 w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-warning" />
              <span className="font-medium text-foreground text-sm">Programme fidélité</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="sb-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-accent" />
              <span className="font-medium text-foreground text-sm">Notifications</span>
            </div>
            <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-primary-foreground rounded-full absolute right-0.5 top-0.5" />
            </div>
          </div>
        </div>

        {/* Children */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Enfants</h3>
            <button onClick={() => setShowAddChild(true)} className="text-sm text-primary font-semibold flex items-center gap-1">
              <Plus className="w-4 h-4" /> Ajouter
            </button>
          </div>

          {currentUser?.children.map(child => (
            <div key={child.id} className="sb-card p-3 flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold text-foreground text-sm">{child.name}</p>
                <p className="text-xs text-muted-foreground">{child.school} — {child.class}</p>
              </div>
              <button onClick={() => removeChild(child.id)} className="text-muted-foreground hover:text-destructive">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {showAddChild && (
            <div className="sb-card p-4 space-y-3 mt-2">
              <Input placeholder="Nom de l'enfant" value={childForm.name} onChange={e => setChildForm({ ...childForm, name: e.target.value })} className="sb-input-focus" />
              <Input placeholder="École" value={childForm.school} onChange={e => setChildForm({ ...childForm, school: e.target.value })} className="sb-input-focus" />
              <Input placeholder="Classe" value={childForm.class} onChange={e => setChildForm({ ...childForm, class: e.target.value })} className="sb-input-focus" />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddChild}>Ajouter</Button>
                <Button size="sm" variant="ghost" onClick={() => setShowAddChild(false)}>Annuler</Button>
              </div>
            </div>
          )}
        </div>

        <Button variant="outline" className="w-full gap-2 text-destructive border-destructive/20" onClick={handleLogout}>
          <LogOut className="w-4 h-4" /> Déconnexion
        </Button>
      </div>
    </UserLayout>
  );
};

export default ProfileScreen;
