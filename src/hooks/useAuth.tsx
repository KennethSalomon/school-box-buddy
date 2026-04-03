import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  avatar_url: string;
  referral_code: string;
  loyalty_points: number;
  city: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, meta: { first_name: string; last_name: string; phone: string }) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (fetchError) {
        throw new Error(`Erreur de profil: ${fetchError.message}`);
      }
      if (data) setProfile(data as Profile);
    } catch (error: Error | unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Impossible de charger le profil';
      console.error('Error fetching profile:', errorMsg);
      setError(errorMsg);
    }
  };

  const checkAdmin = async (userId: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin');
      
      if (fetchError) {
        console.warn(`Erreur vérification admin: ${fetchError.message}`);
        setIsAdmin(false);
        return;
      }
      setIsAdmin(!!data && data.length > 0);
    } catch (error: Error | unknown) {
      console.error('Error checking admin status:', error instanceof Error ? error.message : 'Unknown error');
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to avoid Supabase client deadlock
          setTimeout(() => {
            fetchProfile(session.user.id);
            checkAdmin(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        checkAdmin(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, meta: { first_name: string; last_name: string; phone: string }) => {
    try {
      setError(null);
      
      if (!email || !password) {
        throw new Error('Email et mot de passe sont obligatoires');
      }
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: meta,
          emailRedirectTo: window.location.origin,
        },
      });
      
      if (error) {
        setError(error.message);
        console.error('Sign up error:', error.message);
      }
      
      return { error };
    } catch (e: Error | unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Erreur lors de l\'inscription';
      setError(errorMsg);
      console.error('Sign up exception:', errorMsg);
      return { error: e instanceof Error ? e : new Error(String(e)) };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      
      if (!email || !password) {
        throw new Error('Email et mot de passe sont obligatoires');
      }
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        setError(error.message);
        console.error('Sign in error:', error.message);
      }
      
      return { error };
    } catch (e: Error | unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Erreur lors de la connexion';
      setError(errorMsg);
      console.error('Sign in exception:', errorMsg);
      return { error: e instanceof Error ? e : new Error(String(e)) };
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await supabase.auth.signOut();
      setProfile(null);
      setIsAdmin(false);
    } catch (e: Error | unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Erreur lors de la déconnexion';
      setError(errorMsg);
      console.error('Sign out error:', errorMsg);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, session, profile, isAdmin, loading, error, signUp, signIn, signOut, refreshProfile, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
