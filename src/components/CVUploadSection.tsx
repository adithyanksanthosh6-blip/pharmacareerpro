TypeScript
"use client";

import { useState } from "react";

// 1. Tell TypeScript exactly what props your main page is passing down
interface CVUploadSectionProps {
  onCVParsed: (data: { id: string; parsed: any; sessionId: string; }) => void;
}

export default function CVUploadSection({ onCVParsed }: CVUploadSectionProps) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage("Please select a valid PDF file.");
      return;
    }

    setUploading(true);
    setMessage("Uploading and processing your CV...");

    const formData = new FormData();
    formData.append("cv", file);

    try {
      // Points exactly to your deep API folder structure
      const response = await fetch("/api/cv/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Success! CV uploaded successfully.");
        
        // 2. Trigger the callback so the main page knows the data is ready
        onCVParsed({
          id: String(data.cvId),
          parsed: data.parsed || {},
          sessionId: data.sessionId || `session_${Date.now()}`,
        });
      } else {
        setMessage(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      setMessage("An unexpected error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Your CV</h3>
      <p className="text-sm text-gray-500 mb-4">Only PDF formats are supported for career matching</p>
      
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer disabled:opacity-50"
      />
      
      {message && (
        <p className={`mt-3 text-sm font-medium ${message.startsWith("Success") ? "text-green-600" : "text-amber-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
