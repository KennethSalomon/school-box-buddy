import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { supabase } from '@/integrations/supabase/client';
import { Search, MapPin, CheckCircle, ArrowLeft, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const SchoolSearchScreen = () => {
  const [query, setQuery] = useState('');
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [selectedClassName, setSelectedClassName] = useState<string | null>(null);
  const [schools, setSchools] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setSchoolAndClass } = useStore();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const { data, error } = await supabase.from('schools').select('*');
        if (error) throw error;
        setSchools(data || []);
      } catch (error) {
        console.error('Error fetching schools:', error);
        toast.error('Erreur lors du chargement des écoles');
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  useEffect(() => {
    if (selectedSchoolId) {
      const fetchClasses = async () => {
        try {
          const { data, error } = await supabase.from('classes').select('*').eq('school_id', selectedSchoolId);
          if (error) throw error;
          setClasses(data || []);
        } catch (error) {
          console.error('Error fetching classes:', error);
          toast.error('Erreur lors du chargement des classes');
        }
      };
      fetchClasses();
    }
  }, [selectedSchoolId]);

  const filtered = schools.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) || s.city.toLowerCase().includes(query.toLowerCase())
  );

  const school = schools.find(s => s.id === selectedSchoolId);

  const handleConfirm = () => {
    if (school && selectedClassName) {
      setSchoolAndClass(school.name, selectedClassName);
      navigate('/app/catalog');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sb-gradient-hero px-4 pt-6 pb-7 rounded-b-[28px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-accent/5 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate(-1)} className="w-9 h-9 sb-card-glass rounded-full flex items-center justify-center border border-white/15">
              <ArrowLeft className="w-4 h-4 text-secondary-foreground" />
            </button>
            <h1 className="text-lg font-bold text-secondary-foreground">Rechercher une école</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Nom de l'école..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-10 h-12 bg-card border-0 shadow-lg rounded-xl"
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-5 space-y-3">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        ) : !selectedSchoolId ? (
          filtered.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSchoolId(s.id)}
              className="sb-card-hover p-4 w-full text-left flex items-start gap-3"
            >
              <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <GraduationCap className="w-5 h-5 text-accent" />
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
                    <span className="text-xs text-success font-semibold">Liste officielle validée</span>
                  </div>
                )}
              </div>
            </button>
          ))
        ) : (
          <div className="space-y-4">
            <div className="sb-card p-4 sb-border-gradient">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-foreground">{school?.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground">{school?.city}</p>
              <button onClick={() => { setSelectedSchoolId(null); setSelectedClassName(null); }} className="text-xs text-primary font-bold mt-2 hover:underline">
                Changer d'école
              </button>
            </div>

            <h3 className="font-extrabold text-foreground text-sm">Sélectionne une classe</h3>
            <div className="grid grid-cols-3 gap-2">
              {classes.map(cls => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClassName(cls.name)}
                  className={`p-3 rounded-xl text-sm font-bold text-center transition-all duration-300 ${
                    selectedClassName === cls.name
                      ? 'bg-primary text-primary-foreground sb-glow-primary'
                      : 'sb-card text-foreground hover:shadow-md hover:border-accent/20'
                  }`}
                >
                  {cls.name}
                </button>
              ))}
            </div>

            {selectedClassName && (
              <Button size="lg" className="w-full mt-4 h-12 sb-glow-primary font-bold" onClick={handleConfirm}>
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
