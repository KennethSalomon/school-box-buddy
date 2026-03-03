import { Zap } from 'lucide-react';

const HeroTicket = () => {
  return (
    <div className="animate-float perspective-[1000px]">
      <div className="relative w-72 md:w-96 glass rounded-sm overflow-hidden qr-glow">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-foreground/10">
          <div className="flex items-center gap-1">
            <span className="font-identity text-[8px] tracking-[0.3em] text-foreground/60">YOUR</span>
            <Zap size={8} className="text-primary fill-primary" />
            <span className="font-identity text-[8px] tracking-[0.3em] text-foreground/60">PASS</span>
          </div>
          <span className="text-[8px] tracking-widest uppercase text-primary font-bold">VIP Access</span>
        </div>

        {/* QR Code area */}
        <div className="p-6 flex flex-col items-center gap-4">
          <div className="scanline-effect w-32 h-32 md:w-40 md:h-40 bg-foreground/5 border border-foreground/10 flex items-center justify-center">
            {/* Simulated QR grid */}
            <div className="grid grid-cols-8 gap-[2px] w-24 h-24 md:w-28 md:h-28">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className={`${
                    Math.random() > 0.4 ? 'bg-foreground/80' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="font-headline text-sm tracking-wider">ÉVÉNEMENT EXCLUSIF</p>
            <p className="text-[10px] text-muted-foreground tracking-widest mt-1">
              YP-VIP-GALA-2026
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-5 py-3 border-t border-foreground/10 flex items-center justify-between">
          <span className="text-[9px] text-muted-foreground tracking-wider">18 AVR 2026 • 20:00</span>
          <span className="text-[9px] text-primary font-bold tracking-wider">AUTHENTIFIÉ</span>
        </div>

        {/* Film grain */}
        <div className="absolute inset-0 film-grain pointer-events-none" />
      </div>
    </div>
  );
};

export default HeroTicket;
