"use client";

import { useState, useEffect } from "react";

interface AnalyticsData {
  eventCounts: Record<string, number>;
  totalCVs: number;
  totalMatches: number;
  totalInterviews: number;
  averageMatchScore: number;
  recentEvents: {
    id: string;
    eventType: string;
    eventData: Record<string, unknown> | null;
    createdAt: string;
  }[];
}

export default function AnalyticsSection() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await fetch("/api/analytics");
      const d = await res.json();
      setData(d);
    } catch (err) {
      console.error("Failed to load analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "cv_upload":
        return "📄";
      case "job_match":
        return "🔍";
      case "interview_start":
        return "🎤";
      case "interview_complete":
        return "✅";
      case "page_view":
        return "👁️";
      case "job_click":
        return "💼";
      default:
        return "📊";
    }
  };

  const getEventLabel = (type: string) => {
    switch (type) {
      case "cv_upload":
        return "CV Upload";
      case "job_match":
        return "Job Match";
      case "interview_start":
        return "Interview Started";
      case "interview_complete":
        return "Interview Done";
      case "page_view":
        return "Page View";
      case "job_click":
        return "Job Click";
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          📊 Performance Analytics
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Track your job search and interview preparation progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          {
            value: data?.totalCVs ?? 0,
            label: "CVs Analyzed",
            icon: "📄",
            color: "from-blue-500 to-blue-600",
          },
          {
            value: data?.totalMatches ?? 0,
            label: "Job Matches",
            icon: "🔍",
            color: "from-emerald-500 to-emerald-600",
          },
          {
            value: data?.totalInterviews ?? 0,
            label: "Mock Interviews",
            icon: "🎤",
            color: "from-purple-500 to-purple-600",
          },
          {
            value: `${data?.averageMatchScore ?? 0}%`,
            label: "Avg Match Score",
            icon: "🎯",
            color: "from-amber-500 to-amber-600",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 text-center"
          >
            <div
              className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-lg text-white mx-auto mb-2`}
            >
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-slate-800">
              {stat.value}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Event Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          📈 Event Breakdown
        </h3>
        {data?.eventCounts && Object.keys(data.eventCounts).length > 0 ? (
          <div className="space-y-3">
            {Object.entries(data.eventCounts).map(([type, count]) => {
              const total = Object.values(data.eventCounts).reduce(
                (a, b) => a + b,
                0
              );
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={type}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-600 flex items-center gap-1.5">
                      {getEventIcon(type)} {getEventLabel(type)}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-pharma-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-400 text-center py-4">
            No events recorded yet. Start using the app to see analytics!
          </p>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          🕐 Recent Activity
        </h3>
        {data?.recentEvents && data.recentEvents.length > 0 ? (
          <div className="space-y-2">
            {data.recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
              >
                <span className="text-lg flex-shrink-0">
                  {getEventIcon(event.eventType)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-700">
                    {getEventLabel(event.eventType)}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {new Date(event.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                {event.eventData && (
                  <span className="text-[10px] text-slate-400 bg-white px-2 py-1 rounded-lg">
                    {JSON.stringify(event.eventData).slice(0, 40)}...
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 text-center py-4">
            No recent activity. Start by uploading your CV!
          </p>
        )}
      </div>

      {/* System Design Spec */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          ⚙️ System Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Platform", value: "Next.js 16 (App Router)" },
            { label: "Database", value: "PostgreSQL + Drizzle ORM" },
            { label: "CV Parsing", value: "NLP-based Text Extraction" },
            { label: "Job Matching", value: "Skill-based Scoring Algorithm" },
            { label: "Interview Engine", value: "Category-based Question Bank" },
            { label: "Data Compliance", value: "DPDP Act 2023" },
            { label: "Mobile Support", value: "PWA / Responsive Web" },
            { label: "Job Sources", value: "Naukri, Indeed, LinkedIn" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
            >
              <span className="text-xs text-slate-500">{item.label}</span>
              <span className="text-xs font-medium text-slate-700">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
