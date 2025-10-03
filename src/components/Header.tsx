import { Calendar } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">ICS File Viewer</h1>
            <p className="text-xs text-muted-foreground">Calendar Event Parser</p>
          </div>
        </div>
      </div>
    </header>
  );
};
