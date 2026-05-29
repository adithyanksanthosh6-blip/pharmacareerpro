import { NextResponse } from "next/server";
import { db } from "@/db";
import { jobListings } from "@/db/schema";
import { sql } from "drizzle-orm";

const SAMPLE_JOBS = [
  {
    title: "Quality Control Analyst - Pharmaceutical",
    company: "Sun Pharmaceutical Industries",
    location: "Mumbai, Maharashtra",
    description:
      "Seeking a QC Analyst for our Mumbai facility. Responsible for testing raw materials, intermediates, and finished products using HPLC, GC, UV, and IR spectroscopy. Must follow GMP guidelines and maintain laboratory documentation.",
    requirements:
      "B.Pharm or M.Pharm with 0-2 years experience in pharmaceutical QC. Knowledge of analytical instruments (HPLC, GC, UV, IR). Understanding of pharmacopoeia (IP, BP, USP). Good documentation skills.",
    salary: "₹3,00,000 - ₹5,00,000 per annum",
    source: "naukri" as const,
    sourceUrl: "https://www.naukri.com/job-listings",
    skills: ["hplc", "gc", "uv spectroscopy", "quality control", "gmp", "documentation", "analytical chemistry"],
    qualifications: ["B.Pharm", "M.Pharm"],
  },
  {
    title: "Pharmacovigilance Associate",
    company: "Cipla Ltd",
    location: "Bengaluru, Karnataka",
    description:
      "Join our pharmacovigilance team to monitor drug safety. Process Individual Case Safety Reports (ICSRs), conduct signal detection, prepare PSURs and RMPs. Collaborate with global safety teams.",
    requirements:
      "B.Pharm/M.Pharm/Pharm.D with knowledge of pharmacovigilance. Familiarity with MedDRA coding, Argus Safety or similar databases. Understanding of ICH E2A, E2B guidelines. Good communication skills.",
    salary: "₹3,50,000 - ₹6,00,000 per annum",
    source: "linkedin" as const,
    sourceUrl: "https://www.linkedin.com/jobs",
    skills: ["pharmacovigilance", "drug safety", "adr", "clinical research", "documentation", "data analysis"],
    qualifications: ["B.Pharm", "M.Pharm", "Pharm.D"],
  },
  {
    title: "Medical Representative - Cardiology Division",
    company: "Dr. Reddy's Laboratories",
    location: "Hyderabad, Telangana",
    description:
      "Promote our cardiovascular product portfolio to healthcare professionals. Build and maintain relationships with doctors, manage territory, achieve sales targets, and conduct product presentations.",
    requirements:
      "B.Pharm/D.Pharm with excellent communication skills. Freshers welcome. Must have valid driving license and willingness to travel. Knowledge of cardiology drugs is a plus.",
    salary: "₹2,50,000 - ₹4,50,000 per annum + incentives",
    source: "indeed" as const,
    sourceUrl: "https://www.indeed.co.in/jobs",
    skills: ["pharmacology", "patient counseling", "drug information", "microsoft office"],
    qualifications: ["B.Pharm", "D.Pharm"],
  },
  {
    title: "Regulatory Affairs Executive",
    company: "Lupin Ltd",
    location: "Pune, Maharashtra",
    description:
      "Handle drug registration and regulatory submissions for Indian and international markets. Prepare CTD/eCTD dossiers, coordinate with CDSCO, and ensure compliance with regulatory requirements.",
    requirements:
      "B.Pharm/M.Pharm with specialization in Regulatory Affairs preferred. 1-3 years experience in regulatory submissions. Knowledge of Drug & Cosmetics Act, USFDA, WHO guidelines. Strong documentation skills.",
    salary: "₹4,00,000 - ₹7,00,000 per annum",
    source: "naukri" as const,
    sourceUrl: "https://www.naukri.com/job-listings",
    skills: ["regulatory affairs", "drug regulatory affairs", "documentation", "sop", "usfda", "who gmp", "drug and cosmetics act"],
    qualifications: ["B.Pharm", "M.Pharm"],
  },
  {
    title: "Production Chemist",
    company: "Zydus Cadila",
    location: "Ahmedabad, Gujarat",
    description:
      "Responsible for manufacturing pharmaceutical dosage forms including tablets, capsules, and liquid orals. Monitor batch processes, maintain BMR documentation, and ensure GMP compliance in production area.",
    requirements:
      "B.Pharm with 0-2 years experience in pharmaceutical production. Knowledge of tablet compression, granulation, coating processes. Understanding of GMP, SOPs, and BMR documentation.",
    salary: "₹2,80,000 - ₹4,50,000 per annum",
    source: "indeed" as const,
    sourceUrl: "https://www.indeed.co.in/jobs",
    skills: ["drug formulation", "tablet compression", "gmp", "sop", "batch manufacturing record", "quality control", "packaging"],
    qualifications: ["B.Pharm"],
  },
  {
    title: "Clinical Research Associate",
    company: "Biocon Ltd",
    location: "Bengaluru, Karnataka",
    description:
      "Monitor clinical trial sites, ensure protocol adherence, conduct site initiation and close-out visits. Review source documents, manage CRFs, and ensure compliance with ICH-GCP guidelines.",
    requirements:
      "B.Pharm/M.Pharm/Pharm.D with knowledge of clinical research. ICH-GCP certification preferred. 0-2 years experience in clinical operations. Willingness to travel extensively.",
    salary: "₹4,50,000 - ₹8,00,000 per annum",
    source: "linkedin" as const,
    sourceUrl: "https://www.linkedin.com/jobs",
    skills: ["clinical research", "pharmacovigilance", "documentation", "data analysis", "research"],
    qualifications: ["B.Pharm", "M.Pharm", "Pharm.D"],
  },
  {
    title: "Hospital Pharmacist",
    company: "Apollo Hospitals",
    location: "Chennai, Tamil Nadu",
    description:
      "Manage hospital pharmacy operations including drug dispensing, inventory management, patient counseling, and drug information services. Participate in clinical pharmacy activities and therapeutic drug monitoring.",
    requirements:
      "B.Pharm/Pharm.D registered with State Pharmacy Council. Experience in hospital pharmacy preferred. Knowledge of drug interactions, prescription analysis, and inventory management.",
    salary: "₹3,00,000 - ₹5,50,000 per annum",
    source: "naukri" as const,
    sourceUrl: "https://www.naukri.com/job-listings",
    skills: ["hospital pharmacy", "patient counseling", "drug information", "inventory management", "prescription analysis", "drug interaction", "therapeutic drug monitoring"],
    qualifications: ["B.Pharm", "Pharm.D"],
  },
  {
    title: "Formulation Scientist - R&D",
    company: "Glenmark Pharmaceuticals",
    location: "Navi Mumbai, Maharashtra",
    description:
      "Develop novel drug delivery systems and optimize pharmaceutical formulations. Conduct preformulation studies, design experiments, perform scale-up, and support regulatory submissions with CMC data.",
    requirements:
      "M.Pharm in Pharmaceutics or equivalent. 1-3 years R&D experience. Expertise in solid dosage forms. Knowledge of QbD, DoE, and stability studies. Publications in peer-reviewed journals is a plus.",
    salary: "₹5,00,000 - ₹9,00,000 per annum",
    source: "linkedin" as const,
    sourceUrl: "https://www.linkedin.com/jobs",
    skills: ["drug formulation", "pharmaceutics", "stability studies", "validation", "process validation", "research", "analytical chemistry"],
    qualifications: ["M.Pharm"],
  },
  {
    title: "Drug Safety Associate",
    company: "Accenture (Pharma Division)",
    location: "Mumbai, Maharashtra",
    description:
      "Process adverse event reports, perform case assessment and triage, enter data into safety databases (Argus/ArisGlobal), and generate aggregate safety reports. Work with global pharma clients.",
    requirements:
      "B.Pharm/M.Pharm with interest in drug safety. Freshers welcome. Training provided on safety databases. Good English communication and typing skills required.",
    salary: "₹3,20,000 - ₹5,50,000 per annum",
    source: "indeed" as const,
    sourceUrl: "https://www.indeed.co.in/jobs",
    skills: ["drug safety", "pharmacovigilance", "adr", "documentation", "data analysis", "microsoft office"],
    qualifications: ["B.Pharm", "M.Pharm"],
  },
  {
    title: "Quality Assurance Officer",
    company: "Mankind Pharma",
    location: "Paonta Sahib, Himachal Pradesh",
    description:
      "Ensure GMP compliance in manufacturing operations. Handle deviations, CAPA, change control, batch release, vendor qualification, and internal audits. Review batch manufacturing records and SOPs.",
    requirements:
      "B.Pharm with 1-3 years experience in pharmaceutical QA. Knowledge of WHO GMP, Schedule M. Experience with deviation handling, CAPA, and change control. Strong documentation skills.",
    salary: "₹3,50,000 - ₹6,00,000 per annum",
    source: "naukri" as const,
    sourceUrl: "https://www.naukri.com/job-listings",
    skills: ["quality assurance", "gmp", "sop", "capa", "deviation handling", "change control", "validation", "who gmp", "schedule m", "documentation"],
    qualifications: ["B.Pharm"],
  },
  {
    title: "Medical Coding Specialist",
    company: "Omega Healthcare",
    location: "Bengaluru, Karnataka",
    description:
      "Assign appropriate medical codes using ICD-10, CPT, and HCPCS systems. Review clinical documentation and ensure coding accuracy. Work in a fast-paced healthcare BPO environment.",
    requirements:
      "B.Pharm/Pharm.D/Life Sciences graduate. CPC/CCS certification is a plus. Knowledge of anatomy, physiology, and medical terminology. Good analytical and computer skills.",
    salary: "₹2,80,000 - ₹5,00,000 per annum",
    source: "indeed" as const,
    sourceUrl: "https://www.indeed.co.in/jobs",
    skills: ["medical coding", "data analysis", "microsoft office", "documentation"],
    qualifications: ["B.Pharm", "Pharm.D"],
  },
  {
    title: "Retail Pharmacist",
    company: "MedPlus Health Services",
    location: "Multiple Locations, India",
    description:
      "Manage retail pharmacy operations including prescription dispensing, OTC sales, patient counseling, and inventory management. Ensure compliance with Drug & Cosmetics Act regulations.",
    requirements:
      "D.Pharm/B.Pharm registered with State Pharmacy Council. Fresh graduates welcome. Good communication skills in local language. Willingness to work in shifts.",
    salary: "₹2,00,000 - ₹3,50,000 per annum",
    source: "naukri" as const,
    sourceUrl: "https://www.naukri.com/job-listings",
    skills: ["retail pharmacy", "community pharmacy", "patient counseling", "prescription analysis", "inventory management", "drug and cosmetics act"],
    qualifications: ["D.Pharm", "B.Pharm"],
  },
];

export async function POST() {
  try {
    // 1. Automatically build the 'cv_uploads' table layout using your exact server specs
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "cv_uploads" (
        "id" SERIAL PRIMARY KEY,
        "user_id" UUID DEFAULT NULL,
        "session_id" TEXT,
        "file_name" TEXT,
        "raw_text" TEXT,
        "parsed_data" JSONB,
        "skills" JSONB,
        "education" JSONB,
        "experience" JSONB,
        "uploaded_at" TIMESTAMP DEFAULT NOW()
      );
    `);

    // 2. Automatically build the 'job_listings' table variations so the Drizzle query never breaks
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "job_listings" (
        "id" SERIAL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "company" TEXT NOT NULL,
        "location" TEXT NOT NULL,
        "description" TEXT,
        "requirements" TEXT,
        "salary" TEXT,
        "source" TEXT,
        "source_url" TEXT,
        "is_active" BOOLEAN DEFAULT TRUE,
        "skills" JSONB,
        "qualifications" JSONB,
        "posted_at" TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "jobs" (
        "id" SERIAL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "company" TEXT NOT NULL,
        "location" TEXT NOT NULL,
        "description" TEXT,
        "requirements" TEXT,
        "salary" TEXT,
        "source" TEXT,
        "source_url" TEXT,
        "is_active" BOOLEAN DEFAULT TRUE,
        "skills" JSONB,
        "qualifications" JSONB,
        "posted_at" TIMESTAMP DEFAULT NOW()
      );
    `);

    // Check if jobs already exist
    const existing = await db.select({ count: sql<number>`count(*)` }).from(jobListings);
    const count = Number(existing[0]?.count ?? 0);

    if (count > 0) {
      return NextResponse.json({ message: "Jobs already seeded and tables verified", count });
    }

    for (const job of SAMPLE_JOBS) {
      await db.insert(jobListings).values({
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        requirements: job.requirements,
        salary: job.salary,
        source: job.source,
        sourceUrl: job.sourceUrl,
        isActive: true,
        skills: job.skills,
        qualifications: job.qualifications,
        postedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      });
    }

    return NextResponse.json({ message: "Database structures generated and seeded successfully!", count: SAMPLE_JOBS.length });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: error.message },
      { status: 500 }
    );
  }
}
