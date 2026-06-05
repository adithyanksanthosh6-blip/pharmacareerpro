"use client";
import { useState } from "react";

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

    try {
      const formData = new FormData();
      formData.append("cv", file);

      const response = await fetch("/api/cv/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setMessage("CV uploaded and parsed successfully!");
      onCVParsed({
        id: data.cvId,
        parsed: data.parsed || {},
        sessionId: data.sessionId || "session_" + Date.now(),
      });
    } catch (err: any) {
      setMessage(err.message || "An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
        id="cv-file-input"
      />
      <label
        htmlFor="cv-file-input"
        className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block transition disabled:opacity-50"
      >
        {uploading ? "Processing..." : "Select PDF CV"}
      </label>
      {message && <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{message}</p>}
    </div>
  );
}
