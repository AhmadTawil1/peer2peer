import { useState } from "react";
import { Upload, X, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  onChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
}

export function FileUpload({ onChange, accept = "*", maxSize = 5 }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    
    if (!selectedFile) {
      setFile(null);
      onChange(null);
      return;
    }
    
    // Check file size
    if (maxSize && selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return;
    }
    
    setError(null);
    setFile(selectedFile);
    onChange(selectedFile);
  };
  
  const clearFile = () => {
    setFile(null);
    setError(null);
    onChange(null);
  };
  
  return (
    <div className="space-y-2">
      {!file ? (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
          <Label 
            htmlFor="file-upload" 
            className="flex flex-col items-center cursor-pointer"
          >
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">Click to upload or drag and drop</span>
            <span className="text-xs text-gray-500 mt-1">
              {accept === "*" ? "Any file" : accept.split(",").join(", ")} up to {maxSize}MB
            </span>
          </Label>
          <Input 
            id="file-upload"
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
          <div className="flex items-center">
            <File className="h-5 w-5 text-blue-500 mr-2" />
            <div>
              <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFile}
            className="text-gray-500 hover:text-red-500"
          >
            <X size={16} />
          </Button>
        </div>
      )}
      
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}