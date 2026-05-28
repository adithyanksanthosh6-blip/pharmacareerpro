"use client";

import { useState, useRef } from "react";

interface ParsedCV {
  name: string | null;
  email: string | null;
  phone: string | null;
  education: { degree: string; institution: string; year: string }[];
  experience: { title: string; company: string; duration: string; description: string }[];
  skills: string[];
  certifications: string[];
  summary: string | null;
}

interface CVUploadSectionProps {
  onCVParsed: (data: { id: string; parsed: ParsedCV; sessionId: string }) => void;
}

export default function CVUploadSection({ onCVParsed }: CVUploadSectionProps) {
  const [mode, setMode] = useState<"upload" | "paste">("paste");
  const [pastedText, setPastedText] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ParsedCV | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // Read as text for preview
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        setPastedText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async () => {
    if (!pastedText.trim()) {
      setError("Please provide your CV content.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("textContent", pastedText);

      const res = await fetch("/api/cv/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await res.json();
      setResult(data.parsed);
      onCVParsed(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process CV");
    } finally {
      setLoading(false);
    }
  };

  const sampleCV = `Rahul Sharma
rahul.sharma@email.com
+91 9876543210

OBJECTIVE
Dedicated B.Pharm graduate seeking a challenging position in pharmaceutical quality control where I can utilize my analytical skills and knowledge of GMP guidelines.

EDUCATION
B.Pharm - Mumbai University, 2023 (CGPA: 8.2)
12th (PCB) - Maharashtra State Board, 2019 (82%)

EXPERIENCE
Quality Control Intern
Sun Pharmaceutical Industries, Mumbai
June 2022 - December 2022
- Performed HPLC and UV spectroscopy analysis of raw materials
- Assisted in dissolution testing and stability studies
- Documented results in BMR and maintained laboratory records
- Followed GMP and SOP guidelines

SKILLS
HPLC, UV Spectroscopy, Dissolution Testing, Quality Control, GMP, Documentation, SOP, Analytical Chemistry, Microsoft Office, Pharmacology, Drug Formulation, Stability Studies, Microbiology

CERTIFICATIONS
- Good Manufacturing Practices (GMP) Training Certificate
- ICH Guidelines Workshop
- HPLC Method Development Course`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          📄 Upload Your CV
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Paste or upload your resume for instant analysis and job matching
        </p>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">🔒</span>
        <div>
          <p className="text-xs text-blue-800 font-medium">
            Your Privacy Matters
          </p>
          <p className="text-xs text-blue-600 mt-0.5">
            Your CV data is processed securely and never shared with third
            parties. Compliant with DPDP Act 2023. You can request data deletion
            at any time.
          </p>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("paste")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            mode === "paste"
              ? "bg-primary-600 text-white shadow-md"
              : "bg-white text-slate-600 border border-slate-200 hover:border-primary-200"
          }`}
        >
          ✏️ Paste Text
        </button>
        <button
          onClick={() => setMode("upload")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            mode === "upload"
              ? "bg-primary-600 text-white shadow-md"
              : "bg-white text-slate-600 border border-slate-200 hover:border-primary-200"
          }`}
        >
          📎 Upload File
        </button>
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-4">
        {mode === "upload" && (
          <div className="p-6 text-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".txt,.doc,.docx,.rtf"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-slate-300 rounded-xl p-8 hover:border-primary-400 hover:bg-primary-50/50 transition-all group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                📎
              </div>
              <p className="text-sm font-medium text-slate-700">
                {fileName || "Click to select a file"}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports .txt files • Max 5MB
              </p>
            </button>
          </div>
        )}

        <div className={mode === "upload" && !pastedText ? "hidden" : ""}>
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50">
            <span className="text-xs text-slate-500 font-medium">
              {mode === "upload" ? "File Preview" : "Paste your CV content"}
            </span>
            <button
              onClick={() => setPastedText(sampleCV)}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium"
            >
              Load Sample CV
            </button>
          </div>
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste your complete CV/resume text here...&#10;&#10;Include your name, education (B.Pharm/M.Pharm), skills, experience, and certifications."
            rows={12}
            className="w-full px-4 py-3 text-sm resize-none focus:outline-none placeholder-slate-400"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-4 text-sm text-red-600 flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !pastedText.trim()}
        className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Analyzing your CV...
          </span>
        ) : (
          "🔬 Analyze My CV"
        )}
      </button>

      {/* Results */}
      {result && (
        <div className="mt-8 space-y-4 animate-slide-up">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center text-sm">
              ✅
            </span>
            CV Analysis Complete
          </h3>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-pharma-500 rounded-2xl flex items-center justify-center text-2xl text-white">
                {result.name ? result.name[0].toUpperCase() : "👤"}
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">
                  {result.name || "Name not detected"}
                </h4>
                <p className="text-xs text-slate-500">
                  {result.email || "Email not detected"}
                </p>
                {result.phone && (
                  <p className="text-xs text-slate-500">{result.phone}</p>
                )}
              </div>
            </div>

            {result.summary && (
              <div className="bg-slate-50 rounded-xl p-3 mb-4">
                <p className="text-xs text-slate-600 italic">{result.summary}</p>
              </div>
            )}
          </div>

          {/* Education */}
          {result.education.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                🎓 Education
              </h4>
              <div className="space-y-2">
                {result.education.map((edu, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {edu.degree}
                      </p>
                      <p className="text-xs text-slate-500">
                        {edu.institution} • {edu.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {result.skills.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                ⚡ Skills Detected ({result.skills.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full border border-primary-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {result.experience.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                💼 Experience
              </h4>
              <div className="space-y-3">
                {result.experience.map((exp, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-sm font-medium text-slate-700">
                      {exp.title}
                    </p>
                    {exp.company && (
                      <p className="text-xs text-slate-500">{exp.company}</p>
                    )}
                    {exp.duration && (
                      <p className="text-xs text-primary-600 mt-0.5">
                        {exp.duration}
                      </p>
                    )}
                    {exp.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {result.certifications.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                🏅 Certifications
              </h4>
              <ul className="space-y-1">
                {result.certifications.map((cert, i) => (
                  <li
                    key={i}
                    className="text-sm text-slate-600 flex items-start gap-2"
                  >
                    <span className="text-accent-500 mt-0.5">•</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
