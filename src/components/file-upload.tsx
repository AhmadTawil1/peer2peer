import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, X, FileText } from "lucide-react";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

export function FileUpload({ onFileChange }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onFileChange(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    onFileChange(null);
  };

  return (
    <div className="space-y-2">
      {!file ? (
        <div className="flex items-center">
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("file-upload")?.click()}
            className="w-full flex items-center justify-center"
          >
            <Paperclip className="mr-2 h-4 w-4" />
            Attach File
          </Button>
        </div>
      ) : (
        <div className="flex items-center p-2 bg-blue-50 rounded-md">
          <FileText className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-sm font-medium text-gray-700 flex-1 truncate">
            {file.name}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="h-8 w-8 p-0 rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
      <p className="text-xs text-gray-500">
        Supported formats: PDF, Word, Images (max 10MB)
      </p>
    </div>
  );
}