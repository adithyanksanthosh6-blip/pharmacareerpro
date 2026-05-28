"use client";

import { useState } from "react";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "upload", label: "Upload CV", icon: "📄" },
    { id: "jobs", label: "Jobs", icon: "💼" },
    { id: "interview", label: "Interview", icon: "🎤" },
    { id: "analytics", label: "Analytics", icon: "📊" },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="bg-gradient-to-r from-primary-800 via-primary-700 to-pharma-700 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl backdrop-blur-sm">
              💊
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                PharmCareer Pro
              </h1>
              <p className="text-[10px] text-primary-200 leading-tight">
                For B.Pharm Graduates & Students
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white/20 text-white shadow-inner"
                    : "text-primary-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-white/10 px-4 py-2 space-y-1 bg-primary-800/95 backdrop-blur-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                  activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "text-primary-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 text-[10px] font-medium transition-all ${
                activeTab === tab.id
                  ? "text-primary-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <span className="text-lg mb-0.5">{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <span className="w-1 h-1 bg-primary-600 rounded-full mt-0.5" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
