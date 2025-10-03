import { useState } from "react";
import { ChevronLeft, Search, Filter } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EventCard } from "./EventCard";

interface CalendarEvent {
  summary: string;
  dtstart: Date;
  dtend: Date;
  location?: string;
  description?: string;
  timezone?: string;
}

interface CalendarViewProps {
  filename: string;
  events: CalendarEvent[];
  onBack: () => void;
}

export const CalendarView = ({ filename, events, onBack }: CalendarViewProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) =>
    event.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const eventsByMonth = filteredEvents.reduce((acc, event) => {
    const monthYear = format(event.dtstart, "MMMM yyyy");
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-semibold text-foreground">{filename}</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search Events"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {Object.entries(eventsByMonth).map(([monthYear, monthEvents]) => (
          <div key={monthYear}>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <h3 className="text-xl font-semibold">{monthYear}</h3>
              </div>
            </div>

            <div className="space-y-6">
              {monthEvents.map((event, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="bg-primary text-primary-foreground rounded-t-lg px-3 py-1 font-semibold text-xs uppercase">
                      {format(event.dtstart, "MMM")}
                    </div>
                    <div className="bg-card border border-t-0 rounded-b-lg px-3 py-2">
                      <div className="text-3xl font-bold text-foreground">
                        {format(event.dtstart, "d")}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <EventCard event={event} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No events found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};
