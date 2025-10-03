import { MapPin, Clock, Info } from "lucide-react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  event: {
    summary: string;
    dtstart: Date;
    dtend: Date;
    location?: string;
    description?: string;
    timezone?: string;
  };
}

export const EventCard = ({ event }: EventCardProps) => {
  const formatTime = (date: Date) => {
    return format(date, "EEE MMM dd yyyy HH:mm:ss");
  };

  const getTimeOnly = (date: Date) => {
    return format(date, "HH:mm");
  };

  const duration = Math.floor((event.dtend.getTime() - event.dtstart.getTime()) / (1000 * 60));

  return (
    <Card className="p-6 bg-[hsl(var(--info-bg))] border-none shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold text-foreground">{event.summary}</h3>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="font-medium text-muted-foreground">Starts on</span>
              <span className="text-foreground">{formatTime(event.dtstart)}</span>
            </div>
            
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="font-medium text-muted-foreground">Ends on</span>
              <span className="text-foreground">{formatTime(event.dtend)}</span>
            </div>
            
            {event.location && (
              <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                <span className="font-medium text-muted-foreground">Location</span>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{event.location}</span>
                </div>
              </div>
            )}

            {event.description && (
              <div className="grid grid-cols-[100px_1fr] gap-2 mt-4 pt-4 border-t border-border/50">
                <span className="font-medium text-muted-foreground">Description</span>
                <p className="text-foreground whitespace-pre-wrap">{event.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="bg-[hsl(var(--event-time-bg))] px-4 py-3 rounded-lg text-center min-w-[120px]">
            <div className="text-2xl font-bold text-foreground tabular-nums">
              {getTimeOnly(event.dtstart)}
            </div>
            <Badge variant="secondary" className="mt-1 text-xs">
              {duration} min
            </Badge>
          </div>
          {event.timezone && (
            <button className="text-xs text-primary hover:underline flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Show original time
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};
