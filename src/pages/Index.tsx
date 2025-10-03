import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FileUpload } from "@/components/FileUpload";
import { CalendarView } from "@/components/CalendarView";
import { parseICSFile, ParsedEvent } from "@/utils/icsParser";
import { toast } from "sonner";

const Index = () => {
  const [events, setEvents] = useState<ParsedEvent[]>([]);
  const [filename, setFilename] = useState<string>("");

  const handleFileLoad = (content: string, name: string) => {
    try {
      const parsedEvents = parseICSFile(content);
      setEvents(parsedEvents);
      setFilename(name);
      toast.success(`Successfully loaded ${parsedEvents.length} event${parsedEvents.length !== 1 ? 's' : ''}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to parse ICS file");
    }
  };

  const handleBack = () => {
    setEvents([]);
    setFilename("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {events.length === 0 ? (
        <>
          <HeroSection />
          <FileUpload onFileLoad={handleFileLoad} />
        </>
      ) : (
        <CalendarView filename={filename} events={events} onBack={handleBack} />
      )}
    </div>
  );
};

export default Index;
