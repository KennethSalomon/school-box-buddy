import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { schools } from '@/data/mockData';
import { Search, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const allClasses = ['CP1', 'CP2', 'CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème', 'Seconde', 'Première', 'Terminale', 'Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2'];

const SchoolSearchScreen = () => {
  const [query, setQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setSchoolAndClass } = useStore();

  const filtered = schools.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) || s.city.toLowerCase().includes(query.toLowerCase())
  );

  const school = schools.find(s => s.id === selectedSchool);

  const handleConfirm = () => {
    if (school && selectedClass) {
      setSchoolAndClass(school.name, selectedClass);
      navigate('/app/catalog');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sb-gradient-hero px-4 pt-6 pb-6 rounded-b-[24px]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center text-secondary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-secondary-foreground">Rechercher une école</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Nom de l'école..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-10 bg-card border-0"
            autoFocus
          />
        </div>
      </div>

      <div className="px-4 py-5 space-y-3">
        {!selectedSchool ? (
          filtered.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSchool(s.id)}
              className="sb-card p-4 w-full text-left flex items-start gap-3 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-lg">🏫</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-sm">{s.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{s.city}</span>
                </div>
                {s.verified && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <CheckCircle className="w-3 h-3 text-success" />
                    <span className="text-xs text-success font-medium">Liste officielle validée</span>
                  </div>
                )}
              </div>
            </button>
          ))
        ) : (
          <div className="space-y-4">
            <div className="sb-card p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">🏫</span>
                <h3 className="font-bold text-foreground">{school?.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground">{school?.city}</p>
              <button onClick={() => { setSelectedSchool(null); setSelectedClass(null); }} className="text-xs text-primary font-semibold mt-2">
                Changer d'école
              </button>
            </div>

            <h3 className="font-bold text-foreground text-sm">Sélectionne une classe</h3>
            <div className="grid grid-cols-3 gap-2">
              {(school?.classes || []).map(cls => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`p-3 rounded-lg text-sm font-semibold text-center transition-all ${
                    selectedClass === cls
                      ? 'bg-primary text-primary-foreground'
                      : 'sb-card text-foreground hover:shadow-md'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>

            {selectedClass && (
              <Button size="lg" className="w-full mt-4" onClick={handleConfirm}>
                Voir les fournitures →
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolSearchScreen;
