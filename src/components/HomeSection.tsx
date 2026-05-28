"use client";

interface HomeSectionProps {
  onNavigate: (tab: string) => void;
}

export default function HomeSection({ onNavigate }: HomeSectionProps) {
  const features = [
    {
      icon: "📄",
      title: "Smart CV Analysis",
      desc: "Upload your CV and get instant skill extraction, qualification mapping, and career insights tailored for pharmacy professionals.",
      action: "upload",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: "🔍",
      title: "Job Matching Engine",
      desc: "Match your profile with pharmacy jobs from Naukri, Indeed, LinkedIn and more. Get scored compatibility for each role.",
      action: "jobs",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: "🎤",
      title: "Mock Interview Prep",
      desc: "Practice with personalized pharmacy interview questions. Get suggested answers and expert tips for each question.",
      action: "interview",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: "📊",
      title: "Performance Analytics",
      desc: "Track your job search progress, interview preparation stats, and engagement metrics in real-time.",
      action: "analytics",
      color: "from-amber-500 to-amber-600",
    },
  ];

  const stats = [
    { value: "12+", label: "Pharmacy Job Categories" },
    { value: "50+", label: "Interview Questions" },
    { value: "100%", label: "Data Privacy" },
    { value: "Free", label: "For Students" },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-pharma-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white/30 rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/10 rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-medium mb-6">
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            Designed for Indian B.Pharm Graduates
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Your Pharmacy Career
            <br />
            <span className="text-accent-300">Starts Here</span>
          </h2>
          <p className="text-base md:text-lg text-primary-200 max-w-2xl mx-auto mb-8">
            AI-powered CV analysis, job matching with top portals, and
            personalized mock interview preparation — all in one platform built
            specifically for pharmacy professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate("upload")}
              className="px-8 py-3.5 bg-white text-primary-700 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 animate-pulse-glow"
            >
              Upload Your CV →
            </button>
            <button
              onClick={() => onNavigate("jobs")}
              className="px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold text-sm hover:bg-white/20 transition-all"
            >
              Browse Pharmacy Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-700">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
            Everything You Need for Your Pharmacy Career
          </h3>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm">
            From CV analysis to interview prep — comprehensive career tools
            designed for the Indian pharmaceutical industry.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <button
              key={i}
              onClick={() => onNavigate(feature.action)}
              className="group text-left bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-primary-200 transition-all hover:-translate-y-0.5"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-xl text-white mb-4 group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.desc}
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-primary-600 group-hover:text-primary-700">
                Get Started
                <svg
                  className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Job Sources Section */}
      <section className="bg-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold text-slate-700 mb-6">
            Job Listings Aggregated From
          </h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center">
            {[
              { name: "Naukri.com", color: "text-blue-600" },
              { name: "Indeed", color: "text-purple-600" },
              { name: "LinkedIn", color: "text-sky-600" },
              { name: "PharmaJobs", color: "text-emerald-600" },
            ].map((source, i) => (
              <div
                key={i}
                className={`${source.color} font-bold text-lg md:text-xl opacity-70 hover:opacity-100 transition-opacity`}
              >
                {source.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Notice */}
      <section className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-accent-50 rounded-full px-4 py-2 text-xs text-accent-700 font-medium mb-3">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            DPDP Act 2023 Compliant
          </div>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Your data is processed in compliance with the Digital Personal Data
            Protection Act, 2023. We never share your personal information with
            third parties without your consent.
          </p>
        </div>
      </section>
    </div>
  );
}
