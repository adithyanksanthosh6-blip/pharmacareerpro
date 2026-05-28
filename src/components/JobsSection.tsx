"use client";

import { useState, useEffect } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string | null;
  description: string | null;
  requirements: string | null;
  salary: string | null;
  source: string;
  sourceUrl: string | null;
  skills: string[] | null;
  qualifications: string[] | null;
  postedAt: string | null;
}

interface Match {
  id: string;
  matchScore: number;
  matchReasons: string[];
  job: Job;
}

interface JobsSectionProps {
  cvId: string | null;
  onSelectJob: (jobId: string, jobTitle: string) => void;
}

export default function JobsSection({ cvId, onSelectJob }: JobsSectionProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [matching, setMatching] = useState(false);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [view, setView] = useState<"browse" | "matched">(cvId ? "matched" : "browse");

  useEffect(() => {
    loadJobs();
    if (cvId) {
      matchJobs();
    }
  }, [cvId]);

  const loadJobs = async () => {
    try {
      // Seed jobs first
      await fetch("/api/seed", { method: "POST" });

      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err) {
      console.error("Failed to load jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const matchJobs = async () => {
    if (!cvId) return;
    setMatching(true);
    try {
      const res = await fetch("/api/jobs/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvId }),
      });
      const data = await res.json();
      setMatches(data.matches || []);
      setView("matched");
    } catch (err) {
      console.error("Failed to match jobs:", err);
    } finally {
      setMatching(false);
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case "naukri":
        return "bg-blue-100 text-blue-700";
      case "indeed":
        return "bg-purple-100 text-purple-700";
      case "linkedin":
        return "bg-sky-100 text-sky-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 50) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-500 bg-red-50 border-red-200";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent Match";
    if (score >= 65) return "Strong Match";
    if (score >= 50) return "Good Match";
    if (score >= 35) return "Fair Match";
    return "Low Match";
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      !search ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      (job.location && job.location.toLowerCase().includes(search.toLowerCase()));
    const matchesSource =
      sourceFilter === "all" || job.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading pharmacy jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">💼 Pharmacy Jobs</h2>
        <p className="text-sm text-slate-500 mt-1">
          {cvId
            ? "Jobs matched to your profile from top portals"
            : "Browse pharmacy job openings from Naukri, Indeed & LinkedIn"}
        </p>
      </div>

      {/* View Toggles */}
      {cvId && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setView("matched")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              view === "matched"
                ? "bg-primary-600 text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            🎯 Matched Jobs ({matches.length})
          </button>
          <button
            onClick={() => setView("browse")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              view === "browse"
                ? "bg-primary-600 text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            📋 All Jobs ({jobs.length})
          </button>
        </div>
      )}

      {!cvId && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 flex items-start gap-3">
          <span className="text-xl flex-shrink-0">💡</span>
          <div>
            <p className="text-xs text-amber-800 font-medium">
              Upload your CV first for personalized job matching!
            </p>
            <p className="text-xs text-amber-600 mt-0.5">
              Go to the Upload CV tab to get match scores for each job based on
              your skills and qualifications.
            </p>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, company, location..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 appearance-none cursor-pointer"
        >
          <option value="all">All Sources</option>
          <option value="naukri">Naukri</option>
          <option value="indeed">Indeed</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      </div>

      {/* Matched Jobs View */}
      {view === "matched" && (
        <div className="space-y-3">
          {matching ? (
            <div className="text-center py-12">
              <div className="animate-spin w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-3" />
              <p className="text-sm text-slate-500">
                Matching your profile with jobs...
              </p>
            </div>
          ) : matches.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-sm text-slate-500">
                No matches found. Try uploading a more detailed CV.
              </p>
            </div>
          ) : (
            matches.map((match, i) => (
              <div
                key={match.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow animate-slide-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getSourceColor(
                            match.job.source
                          )}`}
                        >
                          {match.job.source}
                        </span>
                        {match.job.salary && (
                          <span className="text-[10px] text-slate-500">
                            {match.job.salary}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm text-slate-800 truncate">
                        {match.job.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {match.job.company}
                        {match.job.location && ` • ${match.job.location}`}
                      </p>
                    </div>
                    <div
                      className={`flex-shrink-0 px-3 py-2 rounded-xl border text-center ${getScoreColor(
                        match.matchScore
                      )}`}
                    >
                      <div className="text-lg font-bold">
                        {match.matchScore}%
                      </div>
                      <div className="text-[9px] font-medium">
                        {getScoreLabel(match.matchScore)}
                      </div>
                    </div>
                  </div>

                  {/* Match Reasons */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {(match.matchReasons as unknown as string[])?.map((reason: string, j: number) => (
                      <span
                        key={j}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-50 text-accent-700 text-[10px] rounded-full"
                      >
                        ✓ {reason}
                      </span>
                    ))}
                  </div>

                  {/* Expand Toggle */}
                  <button
                    onClick={() =>
                      setExpandedJob(
                        expandedJob === match.job.id ? null : match.job.id
                      )
                    }
                    className="mt-2 text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {expandedJob === match.job.id
                      ? "Hide Details ▲"
                      : "View Details ▼"}
                  </button>

                  {expandedJob === match.job.id && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-3 animate-fade-in">
                      {match.job.description && (
                        <div>
                          <p className="text-xs font-semibold text-slate-700 mb-1">
                            Description
                          </p>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {match.job.description}
                          </p>
                        </div>
                      )}
                      {match.job.requirements && (
                        <div>
                          <p className="text-xs font-semibold text-slate-700 mb-1">
                            Requirements
                          </p>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {match.job.requirements}
                          </p>
                        </div>
                      )}
                      {match.job.skills && (
                        <div>
                          <p className="text-xs font-semibold text-slate-700 mb-1">
                            Required Skills
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {(match.job.skills as string[]).map(
                              (skill: string, k: number) => (
                                <span
                                  key={k}
                                  className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full"
                                >
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() =>
                          onSelectJob(match.job.id, match.job.title)
                        }
                        className="w-full py-2.5 bg-primary-600 text-white rounded-xl text-xs font-semibold hover:bg-primary-700 transition-colors"
                      >
                        🎤 Prepare Interview for This Job
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Browse All Jobs View */}
      {view === "browse" && (
        <div className="space-y-3">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-sm text-slate-500">
                No jobs found matching your search.
              </p>
            </div>
          ) : (
            filteredJobs.map((job, i) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getSourceColor(
                        job.source
                      )}`}
                    >
                      {job.source}
                    </span>
                    {job.salary && (
                      <span className="text-[10px] text-slate-500">
                        {job.salary}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm text-slate-800">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {job.company}
                    {job.location && ` • ${job.location}`}
                  </p>

                  {job.description && (
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      {job.description}
                    </p>
                  )}

                  {job.skills && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(job.skills as string[]).slice(0, 5).map(
                        (skill: string, k: number) => (
                          <span
                            key={k}
                            className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[10px] rounded-full"
                          >
                            {skill}
                          </span>
                        )
                      )}
                      {(job.skills as string[]).length > 5 && (
                        <span className="px-2 py-0.5 text-slate-400 text-[10px]">
                          +{(job.skills as string[]).length - 5} more
                        </span>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() =>
                      setExpandedJob(expandedJob === job.id ? null : job.id)
                    }
                    className="mt-2 text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {expandedJob === job.id
                      ? "Hide Details ▲"
                      : "View Details ▼"}
                  </button>

                  {expandedJob === job.id && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-3 animate-fade-in">
                      {job.requirements && (
                        <div>
                          <p className="text-xs font-semibold text-slate-700 mb-1">
                            Requirements
                          </p>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {job.requirements}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
