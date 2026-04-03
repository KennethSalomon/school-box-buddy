import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Spinner de chargement simple
 */
export const Spinner = ({
  size = 'md',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <Loader2
      className={cn(
        'animate-spin text-primary',
        sizeMap[size],
        className
      )}
    />
  );
};

/**
 * Skeleton de chargement pour les cartes
 */
export const CardSkeleton = () => {
  return (
    <div className="sb-card p-4 space-y-3 animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded w-full"></div>
      <div className="h-4 bg-muted rounded w-2/3"></div>
    </div>
  );
};

/**
 * Skeleton de chargement pour les boutons
 */
export const ButtonSkeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div className={cn('h-10 bg-muted rounded-md animate-pulse', className)}></div>
  );
};

/**
 * Skeleton de chargement pour les listes
 */
export const ListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="sb-card p-4 space-y-2 animate-pulse"
        >
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-3 bg-muted rounded w-4/5"></div>
        </div>
      ))}
    </div>
  );
};

/**
 * Overlay de chargement avec spinner
 */
export const LoadingOverlay = ({ visible = true }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-muted-foreground">Traitement en cours...</p>
      </div>
    </div>
  );
};

/**
 * Skeleton de chargement pour input
 */
export const InputSkeleton = () => {
  return <div className="h-10 bg-muted rounded-md animate-pulse"></div>;
};

/**
 * Skeleton de chargement pour les prix
 */
export const PriceSkeleton = () => {
  return <div className="h-6 bg-muted rounded w-20 animate-pulse"></div>;
};
