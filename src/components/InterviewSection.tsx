"use client";

import { useState } from "react";

interface InterviewQuestion {
  id: number;
  category: string;
  question: string;
  suggestedAnswer: string;
  tips: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface InterviewSectionProps {
  cvId: string | null;
  selectedJobId: string | null;
  selectedJobTitle: string | null;
}

export default function InterviewSection({
  cvId,
  selectedJobId,
  selectedJobTitle,
}: InterviewSectionProps) {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [jobDescription, setJobDescription] = useState("");
  const [showJobInput, setShowJobInput] = useState(!selectedJobId);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const [interviewTitle, setInterviewTitle] = useState("");
  const [company, setCompany] = useState("");

  const generateInterview = async () => {
    if (!cvId) {
      setError("Please upload your CV first from the Upload CV tab.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/interview/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvId,
          jobId: selectedJobId,
          jobDescription: jobDescription || undefined,
          difficulty,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate interview");
      }

      const data = await res.json();
      setQuestions(data.questions);
      setInterviewTitle(data.jobTitle || "General Pharmacy Interview");
      setCompany(data.company || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate interview");
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (d: string) => {
    switch (d) {
      case "beginner":
        return "bg-emerald-100 text-emerald-700";
      case "intermediate":
        return "bg-amber-100 text-amber-700";
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "general":
        return "🗣️";
      case "pharmacology":
        return "💊";
      case "quality control/assurance":
        return "🔬";
      case "regulatory affairs":
        return "📋";
      case "clinical research":
        return "🏥";
      case "formulation & development":
        return "⚗️";
      case "behavioral":
        return "🧠";
      case "job-specific":
        return "🎯";
      default:
        return "📝";
    }
  };

  const categories = [...new Set(questions.map((q) => q.category))];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          🎤 Mock Interview Prep
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Personalized pharmacy interview questions with expert answers & tips
        </p>
      </div>

      {!cvId && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 flex items-start gap-3">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <div>
            <p className="text-xs text-amber-800 font-medium">
              CV Required
            </p>
            <p className="text-xs text-amber-600 mt-0.5">
              Please upload your CV first from the Upload CV tab. Interview
              questions will be personalized based on your skills and
              qualifications.
            </p>
          </div>
        </div>
      )}

      {/* Setup Panel */}
      {questions.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <h3 className="font-semibold text-slate-800 mb-4">
            Configure Your Mock Interview
          </h3>

          {/* Selected Job */}
          {selectedJobTitle && (
            <div className="bg-primary-50 rounded-xl p-3 mb-4 flex items-center gap-3">
              <span className="text-lg">🎯</span>
              <div>
                <p className="text-xs text-primary-800 font-medium">
                  Preparing for:
                </p>
                <p className="text-sm text-primary-700 font-semibold">
                  {selectedJobTitle}
                </p>
              </div>
            </div>
          )}

          {/* Difficulty Selection */}
          <div className="mb-4">
            <label className="text-xs font-medium text-slate-700 mb-2 block">
              Difficulty Level
            </label>
            <div className="flex gap-2">
              {(["beginner", "intermediate", "advanced"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-medium capitalize transition-all ${
                    difficulty === d
                      ? "bg-primary-600 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {d === "beginner" && "🟢 "}
                  {d === "intermediate" && "🟡 "}
                  {d === "advanced" && "🔴 "}
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Job Description */}
          <div className="mb-4">
            <button
              onClick={() => setShowJobInput(!showJobInput)}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium mb-2"
            >
              {showJobInput ? "▲ Hide" : "▼ Add"} Job Description
              (Optional)
            </button>
            {showJobInput && (
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description or screenshot text here for more targeted interview questions..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              />
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-4 text-sm text-red-600 flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generateInterview}
            disabled={loading || !cvId}
            className="w-full py-3.5 bg-gradient-to-r from-pharma-600 to-primary-600 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                Generating questions...
              </span>
            ) : (
              "🎤 Generate Mock Interview"
            )}
          </button>
        </div>
      )}

      {/* Questions Display */}
      {questions.length > 0 && (
        <div className="animate-slide-up">
          {/* Interview Header */}
          <div className="bg-gradient-to-r from-pharma-600 to-primary-600 rounded-2xl p-5 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">{interviewTitle}</h3>
                {company && (
                  <p className="text-sm text-white/70 mt-0.5">{company}</p>
                )}
                <p className="text-sm text-white/70 mt-1">
                  {questions.length} Questions •{" "}
                  <span className="capitalize">{difficulty}</span> Level
                </p>
              </div>
              <button
                onClick={() => setQuestions([])}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-xs font-medium hover:bg-white/20 transition-all"
              >
                New Interview
              </button>
            </div>

            {/* Category Nav */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-medium"
                >
                  {getCategoryIcon(cat)} {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-3">
            {questions.map((q, i) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <button
                  onClick={() =>
                    setExpandedQ(expandedQ === q.id ? null : q.id)
                  }
                  className="w-full text-left p-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center text-xs font-bold text-primary-600 flex-shrink-0">
                      Q{i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] text-slate-400">
                          {getCategoryIcon(q.category)} {q.category}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-medium capitalize ${getDifficultyColor(
                            q.difficulty
                          )}`}
                        >
                          {q.difficulty}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-800 leading-snug">
                        {q.question}
                      </p>
                    </div>
                    <svg
                      className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${
                        expandedQ === q.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {expandedQ === q.id && (
                  <div className="px-4 pb-4 animate-fade-in">
                    <div className="ml-11 space-y-4">
                      {/* Suggested Answer */}
                      <div className="bg-accent-50 rounded-xl p-4 border border-accent-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm">💡</span>
                          <p className="text-xs font-semibold text-accent-800">
                            Suggested Answer
                          </p>
                        </div>
                        <p className="text-xs text-accent-700 leading-relaxed whitespace-pre-line">
                          {q.suggestedAnswer}
                        </p>
                      </div>

                      {/* Tips */}
                      <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm">📌</span>
                          <p className="text-xs font-semibold text-amber-800">
                            Pro Tips
                          </p>
                        </div>
                        <ul className="space-y-1.5">
                          {q.tips.map((tip, j) => (
                            <li
                              key={j}
                              className="text-xs text-amber-700 flex items-start gap-2"
                            >
                              <span className="text-amber-400 mt-0.5 flex-shrink-0">
                                ▸
                              </span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interview Tips Footer */}
          <div className="mt-8 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-6 text-white">
            <h4 className="font-bold text-sm mb-3">
              🎯 General Interview Tips for Pharmacy Candidates
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Research the company's product portfolio and recent developments",
                "Prepare to discuss your academic projects and internships in detail",
                "Be familiar with current GMP guidelines and regulatory updates",
                "Practice the STAR method for behavioral questions",
                "Carry copies of certificates, including pharmacy council registration",
                "Dress professionally and arrive 15 minutes early",
                "Prepare questions to ask the interviewer about growth opportunities",
                "Review pharmacopoeia standards (IP, BP, USP) relevant to the role",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
