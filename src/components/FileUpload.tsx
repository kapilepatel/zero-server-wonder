import { Upload } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileLoad: (content: string, filename: string) => void;
}

export const FileUpload = ({ onFileLoad }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileLoad(content, file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith('.ics')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onFileLoad(content, file.name);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div
        className="border-2 border-dashed border-border rounded-xl p-12 text-center bg-card hover:border-primary transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Upload ICS File</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your .ics file here, or click to browse
            </p>
          </div>
          <Button>Choose File</Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".ics"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
