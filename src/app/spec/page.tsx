import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Specification - PharmCareer Pro",
  description: "System design and technical specification document",
};

export default function SpecPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <a
        href="/"
        className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 mb-6"
      >
        ← Back to App
      </a>

      <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 prose prose-slate prose-sm max-w-none">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
          PharmCareer Pro — Technical Specification
        </h1>
        <p className="text-slate-500 text-sm mb-8 border-b border-slate-200 pb-4">
          System Design Document for CV Analyzer & Job Matcher for Indian
          B.Pharm Graduates
        </p>

        {/* Table of Contents */}
        <nav className="bg-slate-50 rounded-xl p-4 mb-8">
          <h2 className="text-base font-bold text-slate-700 mb-2">
            📋 Table of Contents
          </h2>
          <ol className="text-xs text-primary-600 space-y-1 list-decimal list-inside">
            <li>System Overview & Architecture</li>
            <li>Database Schema Design</li>
            <li>API Integrations</li>
            <li>CV Analysis & NLP Pipeline</li>
            <li>Job Matching Algorithm</li>
            <li>Mock Interview Generation Engine</li>
            <li>Data Analytics & Engagement Tracking</li>
            <li>Indian Data Protection Compliance (DPDP Act 2023)</li>
            <li>Mobile & Cross-Platform Strategy</li>
            <li>Deployment Architecture</li>
          </ol>
        </nav>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
            1. System Overview & Architecture
          </h2>
          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            1.1 High-Level Architecture
          </h3>
          <div className="bg-slate-900 text-green-400 rounded-xl p-4 text-xs font-mono overflow-x-auto mb-4">
            <pre>{`┌──────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Mobile App  │  │   Web App   │  │  Progressive Web    │  │
│  │ (React      │  │ (Next.js    │  │  App (PWA)          │  │
│  │  Native)    │  │  App Router)│  │                     │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
│         │                │                     │             │
│         └────────────────┼─────────────────────┘             │
│                          │                                   │
├──────────────────────────┼───────────────────────────────────┤
│                    API LAYER                                 │
│  ┌───────────────────────┴────────────────────────────────┐  │
│  │              Next.js API Routes (App Router)           │  │
│  │  ┌──────────┐ ┌──────────┐ ┌────────┐ ┌───────────┐   │  │
│  │  │CV Upload │ │Job Match │ │Intervw │ │Analytics  │   │  │
│  │  │  API     │ │  API     │ │  API   │ │   API     │   │  │
│  │  └──────────┘ └──────────┘ └────────┘ └───────────┘   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                    PROCESSING LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐    │
│  │  CV Parser   │  │  Matching    │  │  Interview      │    │
│  │  (NLP +      │  │  Engine      │  │  Question       │    │
│  │   Regex)     │  │  (Scoring)   │  │  Generator      │    │
│  └──────────────┘  └──────────────┘  └─────────────────┘    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                    DATA LAYER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐    │
│  │  PostgreSQL  │  │  Drizzle ORM │  │  File Storage   │    │
│  │  (Primary)   │  │  (Query      │  │  (CV uploads)   │    │
│  │              │  │   Builder)   │  │                 │    │
│  └──────────────┘  └──────────────┘  └─────────────────┘    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                    EXTERNAL SERVICES                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐   │
│  │  Naukri   │  │  Indeed   │  │ LinkedIn │  │ PharmaJob │   │
│  │  API      │  │  API     │  │   API    │  │   Board   │   │
│  └──────────┘  └──────────┘  └──────────┘  └───────────┘   │
└──────────────────────────────────────────────────────────────┘`}</pre>
          </div>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            1.2 Technology Stack
          </h3>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-2 border border-slate-200">
                  Component
                </th>
                <th className="text-left p-2 border border-slate-200">
                  Technology
                </th>
                <th className="text-left p-2 border border-slate-200">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Frontend", "Next.js 16 (App Router)", "Server & Client Rendering"],
                ["Styling", "Tailwind CSS 4", "Responsive, mobile-first UI"],
                ["Database", "PostgreSQL", "Relational data storage"],
                ["ORM", "Drizzle ORM", "Type-safe database queries"],
                ["CV Parsing", "Custom NLP + Regex Engine", "Text extraction & analysis"],
                ["Job Matching", "Weighted Scoring Algorithm", "CV-to-job compatibility"],
                ["Interview Gen", "Category-based Question Bank", "Personalized Q&A"],
                ["Analytics", "Custom Event Tracking", "Engagement & performance"],
                ["Mobile", "React Native / PWA", "iOS & Android deployment"],
                ["Auth", "Session-based (Future: JWT)", "User authentication"],
              ].map(([comp, tech, purpose], i) => (
                <tr key={i}>
                  <td className="p-2 border border-slate-200 font-medium">
                    {comp}
                  </td>
                  <td className="p-2 border border-slate-200 text-primary-600">
                    {tech}
                  </td>
                  <td className="p-2 border border-slate-200 text-slate-500">
                    {purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
            2. Database Schema Design
          </h2>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            2.1 Entity Relationship Diagram
          </h3>
          <div className="bg-slate-900 text-green-400 rounded-xl p-4 text-xs font-mono overflow-x-auto mb-4">
            <pre>{`┌─────────────┐     ┌──────────────┐     ┌───────────────┐
│   users     │     │  cv_uploads  │     │ job_listings  │
├─────────────┤     ├──────────────┤     ├───────────────┤
│ id (PK,UUID)│◄──┐ │ id (PK,UUID) │  ┌─►│ id (PK,UUID)  │
│ email       │   │ │ user_id (FK) │  │  │ title         │
│ name        │   │ │ session_id   │  │  │ company       │
│ phone       │   └─│ file_name    │  │  │ location      │
│ password    │     │ raw_text     │  │  │ description   │
│ is_verified │     │ parsed_data  │  │  │ requirements  │
│ consent     │     │ skills (JSON)│  │  │ salary        │
│ created_at  │     │ education    │  │  │ source (ENUM) │
└─────────────┘     │ experience   │  │  │ source_url    │
                    └──────┬───────┘  │  │ skills (JSON) │
                           │          │  │ qualifications│
                    ┌──────┴───────┐  │  └───────┬───────┘
                    │ job_matches  │  │          │
                    ├──────────────┤  │          │
                    │ id (PK,UUID) │  │          │
                    │ cv_upload_id │──┘          │
                    │ job_listing  │─────────────┘
                    │ match_score  │
                    │ match_reasons│
                    └──────────────┘

┌─────────────────┐     ┌──────────────────┐
│ mock_interviews │     │ analytics_events │
├─────────────────┤     ├──────────────────┤
│ id (PK,UUID)    │     │ id (PK,UUID)     │
│ cv_upload_id FK │     │ user_id (FK)     │
│ job_listing_id  │     │ session_id       │
│ job_description │     │ event_type (ENUM)│
│ difficulty ENUM │     │ event_data (JSON)│
│ questions (JSON)│     │ created_at       │
│ created_at      │     └──────────────────┘
└─────────────────┘`}</pre>
          </div>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            2.2 Table Definitions (Drizzle ORM)
          </h3>
          <div className="bg-slate-50 rounded-xl p-4 text-xs mb-4">
            <p className="text-slate-600 mb-2">
              <strong>users</strong> — User accounts with DPDP consent tracking
            </p>
            <p className="text-slate-600 mb-2">
              <strong>cv_uploads</strong> — Uploaded CVs with parsed JSON data
              (skills, education, experience stored as JSONB for flexible
              querying)
            </p>
            <p className="text-slate-600 mb-2">
              <strong>job_listings</strong> — Aggregated jobs from multiple
              sources with enum-based source tracking
            </p>
            <p className="text-slate-600 mb-2">
              <strong>job_matches</strong> — Junction table storing match scores
              (0-100) and reasons between CVs and jobs
            </p>
            <p className="text-slate-600 mb-2">
              <strong>mock_interviews</strong> — Generated interview sessions
              with difficulty-adjusted questions
            </p>
            <p className="text-slate-600">
              <strong>analytics_events</strong> — Event sourcing table for user
              engagement tracking
            </p>
          </div>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            2.3 Enums
          </h3>
          <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
            <li>
              <code className="bg-slate-100 px-1 rounded">job_source</code>:
              naukri, indeed, linkedin, pharma_jobs, manual
            </li>
            <li>
              <code className="bg-slate-100 px-1 rounded">
                interview_difficulty
              </code>
              : beginner, intermediate, advanced
            </li>
            <li>
              <code className="bg-slate-100 px-1 rounded">
                analytics_event
              </code>
              : cv_upload, job_match, interview_start, interview_complete,
              page_view, job_click
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
            3. API Integrations
          </h2>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            3.1 Job Portal Integration Strategy
          </h3>
          <table className="w-full text-xs border-collapse mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-2 border border-slate-200">
                  Portal
                </th>
                <th className="text-left p-2 border border-slate-200">
                  Method
                </th>
                <th className="text-left p-2 border border-slate-200">
                  Data Points
                </th>
                <th className="text-left p-2 border border-slate-200">
                  Frequency
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Naukri.com", "REST API / RSS Feed", "Title, Company, Location, Skills, Salary", "Every 6 hours"],
                ["Indeed India", "Indeed Publisher API", "Title, Company, Location, Description", "Every 4 hours"],
                ["LinkedIn", "LinkedIn Jobs API / Scraper", "Title, Company, Seniority Level", "Every 12 hours"],
                ["PharmaJobs", "Custom RSS/Scraper", "Pharmacy-specific listings", "Every 8 hours"],
              ].map(([portal, method, data, freq], i) => (
                <tr key={i}>
                  <td className="p-2 border border-slate-200 font-medium">
                    {portal}
                  </td>
                  <td className="p-2 border border-slate-200 text-primary-600">
                    {method}
                  </td>
                  <td className="p-2 border border-slate-200 text-slate-500">
                    {data}
                  </td>
                  <td className="p-2 border border-slate-200 text-slate-500">
                    {freq}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            3.2 API Endpoints
          </h3>
          <div className="space-y-2 text-xs">
            {[
              { method: "POST", path: "/api/cv/upload", desc: "Upload and parse CV text/file" },
              { method: "GET", path: "/api/jobs", desc: "List all pharmacy job openings with filters" },
              { method: "POST", path: "/api/jobs/match", desc: "Match CV against all job listings" },
              { method: "POST", path: "/api/interview/generate", desc: "Generate personalized mock interview" },
              { method: "GET", path: "/api/analytics", desc: "Retrieve engagement analytics" },
              { method: "POST", path: "/api/analytics", desc: "Track user events" },
              { method: "POST", path: "/api/seed", desc: "Seed sample pharmacy job data" },
              { method: "GET", path: "/api/health", desc: "Health check endpoint" },
            ].map((endpoint, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg"
              >
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    endpoint.method === "GET"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {endpoint.method}
                </span>
                <code className="text-primary-600 font-mono">
                  {endpoint.path}
                </code>
                <span className="text-slate-400">— {endpoint.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
            4. CV Analysis & NLP Pipeline
          </h2>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            4.1 Processing Pipeline
          </h3>
          <div className="bg-slate-900 text-green-400 rounded-xl p-4 text-xs font-mono overflow-x-auto mb-4">
            <pre>{`CV Text Input
    │
    ▼
┌──────────────────┐
│ Text Extraction  │ ← PDF/TXT parsing
│ & Normalization  │ ← Unicode, encoding handling
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Section Detector │ ← Identify: Education, Experience,
│                  │   Skills, Certifications, Summary
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Entity Extractor │ ← Name, Email, Phone (Regex)
│                  │ ← Degree (B.Pharm, M.Pharm, D.Pharm)
│                  │ ← Years, Institutions
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Skill Matcher    │ ← Match against 80+ pharmacy-specific
│                  │   skill keywords database
│                  │ ← Includes: HPLC, GMP, QC/QA, etc.
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Structured JSON  │ ← Output: ParsedCV object
│ Output           │ ← Stored in PostgreSQL JSONB
└──────────────────┘`}</pre>
          </div>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            4.2 Pharmacy Skill Taxonomy (80+ Keywords)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs mb-4">
            {[
              { cat: "Analytical", skills: "HPLC, GC, UV Spec, IR Spec, Mass Spec" },
              { cat: "Quality", skills: "QC, QA, GMP, CAPA, SOP, Validation" },
              { cat: "Regulatory", skills: "DRA, USFDA, WHO GMP, Schedule M, CTD" },
              { cat: "Clinical", skills: "Pharmacovigilance, Clinical Research, GCP" },
              { cat: "Formulation", skills: "Tablet, Capsule, Parenteral, Stability" },
              { cat: "Pharmacy Practice", skills: "Hospital, Community, Counseling" },
            ].map((cat, i) => (
              <div key={i} className="p-2 bg-slate-50 rounded-lg">
                <p className="font-semibold text-slate-700">{cat.cat}</p>
                <p className="text-slate-500">{cat.skills}</p>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            4.3 Future ML Enhancements
          </h3>
          <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
            <li>
              <strong>Named Entity Recognition (NER)</strong> using spaCy/Hugging
              Face for institution and company name extraction
            </li>
            <li>
              <strong>TF-IDF Vectorization</strong> for semantic skill matching
              beyond exact keyword matching
            </li>
            <li>
              <strong>Word2Vec/BERT embeddings</strong> for contextual
              understanding of pharmacy-specific terminology
            </li>
            <li>
              <strong>Resume scoring model</strong> trained on successful pharmacy
              placements data
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
            5. Job Matching Algorithm
          </h2>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            5.1 Scoring Formula
          </h3>
          <div className="bg-blue-50 rounded-xl p-4 text-xs mb-4 border border-blue-100">
            <p className="font-mono text-blue-800 mb-2">
              <strong>Match Score = Skill Score + Education Score + Profile Score</strong>
            </p>
            <ul className="text-blue-700 space-y-1">
              <li>
                <strong>Skill Score (0-60 pts):</strong>{" "}
                (matched_skills / required_skills) × 60
              </li>
              <li>
                <strong>Education Score (0-25 pts):</strong> M.Pharm/Pharm.D =
                25, B.Pharm = 20, Other = 10
              </li>
              <li>
                <strong>Profile Score (0-15 pts):</strong> 10+ skills = 15,
                5-10 skills = 10, 1-5 skills = 5
              </li>
            </ul>
          </div>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            5.2 Matching Process
          </h3>
          <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside">
            <li>Parse CV and extract skills, education, experience</li>
            <li>Normalize skills to lowercase for comparison</li>
            <li>
              For each job, compare CV skills against job required skills using
              substring matching
            </li>
            <li>Calculate education score based on degree hierarchy</li>
            <li>Calculate profile strength score based on skill count</li>
            <li>Combine scores (max 100) and generate match reasons</li>
            <li>Sort by match score descending, return top 20</li>
          </ol>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            5.3 Future Improvements
          </h3>
          <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
            <li>
              Cosine similarity using TF-IDF vectors for semantic matching
            </li>
            <li>
              Collaborative filtering based on successful applications
            </li>
            <li>Location-based matching with geocoding</li>
            <li>Salary expectation matching</li>
            <li>Experience level weighting</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
            6. Mock Interview Generation Engine
          </h2>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            6.1 Question Generation Flow
          </h3>
          <div className="bg-slate-900 text-green-400 rounded-xl p-4 text-xs font-mono overflow-x-auto mb-4">
            <pre>{`Input: CV Skills + Job Description + Difficulty
          │
          ▼
┌─────────────────────┐
│  Skill Categorizer   │ → Maps skills to categories:
│                      │   Pharmacology, Quality, Regulatory,
│                      │   Clinical, Formulation
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Question Bank      │ → 50+ categorized questions
│  Selector           │ → Filter by difficulty level
│                     │ → Include general + behavioral
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Job-Specific       │ → Analyze job title/description
│  Question Generator │ → Generate role-specific questions
│                     │ → Medical Rep, Production, R&D, etc.
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Output: Questions  │ → question, suggestedAnswer, tips[]
│  with Answers       │ → category, difficulty, id
└─────────────────────┘`}</pre>
          </div>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            6.2 Question Categories
          </h3>
          <table className="w-full text-xs border-collapse mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-2 border border-slate-200">
                  Category
                </th>
                <th className="text-left p-2 border border-slate-200">
                  Topics Covered
                </th>
                <th className="text-left p-2 border border-slate-200">
                  Questions
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["General", "Career goals, motivation, self-introduction", "3"],
                ["Pharmacology", "Drug mechanisms, bioavailability, PK/PD", "3"],
                ["Quality Control/Assurance", "QC vs QA, CAPA, GMP compliance", "2"],
                ["Regulatory Affairs", "D&C Act, ANDA filing, CTD format", "2"],
                ["Clinical Research", "Trial phases, pharmacovigilance", "2"],
                ["Formulation & Development", "Tablet formulation, QbD approach", "1"],
                ["Behavioral", "STAR method, pressure handling, teamwork", "2"],
                ["Job-Specific", "Role-specific scenarios and questions", "1-2"],
              ].map(([cat, topics, count], i) => (
                <tr key={i}>
                  <td className="p-2 border border-slate-200 font-medium">
                    {cat}
                  </td>
                  <td className="p-2 border border-slate-200 text-slate-500">
                    {topics}
                  </td>
                  <td className="p-2 border border-slate-200 text-center text-primary-600 font-semibold">
                    {count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            6.3 Answer Format
          </h3>
          <p className="text-xs text-slate-600 mb-2">
            Each question includes:
          </p>
          <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
            <li>
              <strong>Suggested Answer:</strong> Comprehensive, customizable
              template answer
            </li>
            <li>
              <strong>Pro Tips (3-4 per question):</strong> Expert advice for
              effective delivery
            </li>
            <li>
              <strong>Difficulty Tag:</strong> Beginner / Intermediate / Advanced
            </li>
            <li>
              <strong>Category Tag:</strong> For organized study and revision
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
            7. Data Analytics & Engagement Tracking
          </h2>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            7.1 Tracked Events
          </h3>
          <table className="w-full text-xs border-collapse mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-2 border border-slate-200">Event</th>
                <th className="text-left p-2 border border-slate-200">
                  Data Captured
                </th>
                <th className="text-left p-2 border border-slate-200">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["cv_upload", "File name, skill count", "Track user onboarding"],
                ["job_match", "CV ID, match count, top score", "Measure matching quality"],
                ["interview_start", "Interview ID, question count, difficulty", "Track preparation activity"],
                ["interview_complete", "Completion status, time spent", "Measure engagement depth"],
                ["page_view", "Page/section viewed", "Track navigation patterns"],
                ["job_click", "Job ID, source, match score", "Track job interest"],
              ].map(([event, data, purpose], i) => (
                <tr key={i}>
                  <td className="p-2 border border-slate-200 font-mono text-primary-600">
                    {event}
                  </td>
                  <td className="p-2 border border-slate-200 text-slate-500">
                    {data}
                  </td>
                  <td className="p-2 border border-slate-200 text-slate-500">
                    {purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            7.2 Dashboard Metrics
          </h3>
          <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
            <li>Total CVs analyzed with trend over time</li>
            <li>Total job matches generated</li>
            <li>Average match score across all users</li>
            <li>Mock interviews started vs completed (conversion rate)</li>
            <li>Most popular job categories and sources</li>
            <li>Event breakdown with percentage distribution</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
            8. Indian Data Protection Compliance (DPDP Act 2023)
          </h2>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            8.1 Compliance Measures
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-4">
            {[
              {
                title: "Consent Management",
                desc: "Explicit consent collected before CV processing. Users can withdraw consent at any time. Consent timestamp stored in database.",
              },
              {
                title: "Data Minimization",
                desc: "Only data necessary for job matching and interview prep is collected. No unnecessary personal data retained.",
              },
              {
                title: "Purpose Limitation",
                desc: "Data used exclusively for CV analysis, job matching, and interview preparation. No third-party sharing without consent.",
              },
              {
                title: "Data Retention",
                desc: "CV data retained for 12 months unless user requests deletion. Automated cleanup of expired sessions.",
              },
              {
                title: "Right to Erasure",
                desc: "Users can request complete deletion of their data. Cascade deletion removes all associated records.",
              },
              {
                title: "Data Security",
                desc: "Encrypted connections (HTTPS), parameterized queries (SQL injection prevention), no sensitive data in logs.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-3 bg-accent-50 border border-accent-100 rounded-xl"
              >
                <p className="font-semibold text-accent-800 mb-1">
                  {item.title}
                </p>
                <p className="text-accent-700">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            8.2 Key DPDP Act Sections Addressed
          </h3>
          <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
            <li>
              <strong>Section 6:</strong> Notice and consent before processing
              personal data
            </li>
            <li>
              <strong>Section 8:</strong> Purpose limitation — data used only
              for stated purposes
            </li>
            <li>
              <strong>Section 11:</strong> Data Principal rights — access,
              correction, erasure
            </li>
            <li>
              <strong>Section 12:</strong> Right to grievance redressal
            </li>
            <li>
              <strong>Section 13:</strong> Children&apos;s data protection (age
              verification for students under 18)
            </li>
          </ul>
        </section>

        {/* Section 9 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
            9. Mobile & Cross-Platform Strategy
          </h2>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            9.1 Platform Coverage
          </h3>
          <table className="w-full text-xs border-collapse mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-2 border border-slate-200">
                  Platform
                </th>
                <th className="text-left p-2 border border-slate-200">
                  Technology
                </th>
                <th className="text-left p-2 border border-slate-200">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Web (Desktop)", "Next.js 16 App Router", "✅ Live"],
                ["Web (Mobile)", "Responsive Tailwind CSS", "✅ Live"],
                ["PWA", "Service Worker + Manifest", "🔄 Planned"],
                ["Android", "React Native / Capacitor", "🔄 Planned"],
                ["iOS", "React Native / Capacitor", "🔄 Planned"],
              ].map(([platform, tech, status], i) => (
                <tr key={i}>
                  <td className="p-2 border border-slate-200 font-medium">
                    {platform}
                  </td>
                  <td className="p-2 border border-slate-200 text-primary-600">
                    {tech}
                  </td>
                  <td className="p-2 border border-slate-200">{status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-sm font-bold text-slate-700 mt-4 mb-2">
            9.2 Mobile UI/UX Principles
          </h3>
          <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
            <li>Bottom navigation bar for thumb-friendly mobile navigation</li>
            <li>Large touch targets (min 44px) for accessibility</li>
            <li>Card-based layout for easy scanning</li>
            <li>Progressive disclosure (expand/collapse) for detailed content</li>
            <li>Offline capability via service worker caching (PWA)</li>
            <li>Swipe gestures for job card browsing (native apps)</li>
            <li>Dark mode support (planned)</li>
          </ul>
        </section>

        {/* Section 10 */}
        <section className="mb-4">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
            10. Deployment Architecture
          </h2>

          <div className="bg-slate-900 text-green-400 rounded-xl p-4 text-xs font-mono overflow-x-auto mb-4">
            <pre>{`Production Deployment
━━━━━━━━━━━━━━━━━━━━

┌────────────────────────────────────────────┐
│              CDN (CloudFront/Vercel)       │
│  Static assets, images, client bundles     │
└────────────────────┬───────────────────────┘
                     │
┌────────────────────┴───────────────────────┐
│          Application Server                │
│  Next.js (Node.js runtime)                 │
│  • Server-side rendering                   │
│  • API routes                              │
│  • CV parsing engine                       │
│  • Job matching logic                      │
│  Auto-scaling: 2-10 instances              │
└────────────────────┬───────────────────────┘
                     │
┌────────────────────┴───────────────────────┐
│          PostgreSQL Database               │
│  • Primary + Read Replica                  │
│  • Automated backups (daily)               │
│  • Connection pooling (PgBouncer)          │
│  • Data encrypted at rest                  │
└────────────────────────────────────────────┘

Monitoring: Prometheus + Grafana
Logging:    Structured JSON logs
CI/CD:      GitHub Actions → Docker → Deploy
Secrets:    Environment variables (never in code)`}</pre>
          </div>
        </section>
      </article>
    </div>
  );
}
