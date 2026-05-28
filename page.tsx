"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";
import CVUploadSection from "@/components/CVUploadSection";
import JobsSection from "@/components/JobsSection";
import InterviewSection from "@/components/InterviewSection";
import AnalyticsSection from "@/components/AnalyticsSection";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [cvId, setCvId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string | null>(null);

  const handleCVParsed = (data: {
    id: string;
    parsed: unknown;
    sessionId: string;
  }) => {
    setCvId(data.id);
  };

  const handleSelectJob = (jobId: string, jobTitle: string) => {
    setSelectedJobId(jobId);
    setSelectedJobTitle(jobTitle);
    setActiveTab("interview");
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header activeTab={activeTab} onTabChange={handleNavigate} />

      <main>
        {activeTab === "home" && <HomeSection onNavigate={handleNavigate} />}

        {activeTab === "upload" && (
          <CVUploadSection onCVParsed={handleCVParsed} />
        )}

        {activeTab === "jobs" && (
          <JobsSection cvId={cvId} onSelectJob={handleSelectJob} />
        )}

        {activeTab === "interview" && (
          <InterviewSection
            cvId={cvId}
            selectedJobId={selectedJobId}
            selectedJobTitle={selectedJobTitle}
          />
        )}

        {activeTab === "analytics" && <AnalyticsSection />}
      </main>

      {/* Footer - Hidden on mobile (bottom nav present) */}
      <footer className="hidden md:block bg-slate-800 text-slate-400 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs">
            © 2025 PharmCareer Pro — Built for Indian B.Pharm Graduates &
            Pharmacy Students
          </p>
          <p className="text-[10px] mt-1 text-slate-500">
            Compliant with Digital Personal Data Protection Act, 2023 •
            All data processed securely in India
          </p>
        </div>
      </footer>
    </div>
  );
}
