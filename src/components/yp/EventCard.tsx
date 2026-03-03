import { Link } from 'react-router-dom';
import { Zap, MapPin, Calendar } from 'lucide-react';
import { YPEvent } from '@/data/eventsData';

interface Props {
  event: YPEvent;
  index?: number;
}

const EventCard = ({ event, index = 0 }: Props) => {
  const formattedDate = new Date(event.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link
      to={`/evenement/${event.id}`}
      className="event-card carbon-texture block overflow-hidden group"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Live badge */}
        {event.isLive && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-primary/90 backdrop-blur-sm px-3 py-1">
            <Zap size={10} className="fill-primary-foreground" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-primary-foreground">Live</span>
          </div>
        )}

        {/* Seats */}
        {event.availableSeats < 100 && !event.isSoldOut && (
          <div className="absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase text-foreground/70 bg-background/60 backdrop-blur-sm px-3 py-1">
            {event.availableSeats} places
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3 text-[10px] tracking-widest uppercase text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar size={10} strokeWidth={1.5} />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={10} strokeWidth={1.5} />
            {event.city}
          </span>
        </div>

        <h3 className="font-headline text-lg leading-tight">{event.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{event.subtitle}</p>

        <div className="flex items-end justify-between pt-2">
          <div>
            <span className="text-xs text-muted-foreground tracking-wider">À partir de</span>
            <p className="font-headline text-xl">{event.price} €</p>
          </div>
          <span className="btn-luxe bg-foreground text-background px-5 py-2 text-[10px] font-bold tracking-widest uppercase transition-all group-hover:bg-primary group-hover:text-primary-foreground">
            En savoir plus
          </span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
