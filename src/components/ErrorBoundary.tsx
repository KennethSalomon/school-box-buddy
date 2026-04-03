import React, { ReactNode, ErrorInfo } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary pour capturer les erreurs React et les afficher proprement
 * Remplace les crashes blancs par une interface de récupération
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error Boundary caught:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Si un fallback est fourni, l'utiliser
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.retry);
      }

      // Sinon, afficher l'UI par défaut
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
          <div className="max-w-md w-full">
            <div className="sb-card p-6 text-center space-y-4 border border-destructive/20">
              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-destructive/10">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">
                  Oups! Une erreur s'est produite
                </h2>
                <p className="text-sm text-muted-foreground">
                  Nous nous excusons. Veuillez réessayer ou contacter le support si le problème persiste.
                </p>
              </div>

              {/* Afficher le message d'erreur en développement */}
              {import.meta.env.DEV && (
                <div className="p-3 bg-muted rounded-lg text-left max-h-32 overflow-auto">
                  <p className="text-xs font-mono text-destructive">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={this.retry}
                  variant="default"
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Réessayer
                </Button>
                <Button
                  onClick={() => window.location.href = '/app/home'}
                  variant="outline"
                  className="flex-1"
                >
                  Accueil
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
