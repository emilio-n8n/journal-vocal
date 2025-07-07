"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onFilesChange: (files: File[]) => void;
}

export default function ImageUploader({ onFilesChange }: ImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...newFiles];
        onFilesChange(updatedFiles);
        return updatedFiles;
      });

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold">Images</h2>
      <div className="mt-4">
        <Input type="file" multiple onChange={handleFileChange} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {previews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`preview ${index}`}
            className="w-full h-auto"
          />
        ))}
      </div>
    </div>
  );
}
