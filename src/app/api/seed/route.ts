import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { jobListings } from "@/db/schema";

export const dynamic = "force-dynamic";

const AGGREGATED_EXTERNAL_JOBS: any[] = [
  {
    title: "Trainee Quality Control Analyst (Fresher)",
    company: "Sun Pharmaceutical Industries",
    location: "Mumbai",
    description: "Apprentice role in the Quality Control department. Training includes hands-on exposure to wet chemistry analysis, UV-Visible spectroscopy, and routine analysis of raw materials and finished products under strict GMP guidelines.",
    requirements: "Basic understanding of analytical chemistry, volumetric calculations, and standard operating procedures (SOPs). Must be detail-oriented.",
    salary: "₹2,40,000 - ₹3,00,000 P.A.",
    source: "Naukri",
    sourceUrl: "https://www.naukri.com",
    skills: ["gmp", "quality control", "uv spectroscopy", "analytical chemistry", "documentation"],
    qualifications: "B.Pharm Graduate",
  },
  {
    title: "Junior Officer - Quality Assurance (IPQA)",
    company: "Cipla",
    location: "Mumbai",
    description: "In-Process Quality Assurance (IPQA) role responsible for line clearance, monitoring manufacturing operations in oral solid dosage facilities, reviewing batch manufacturing records (BMR), and tracking deviations.",
    requirements: "Sound theoretical knowledge of cGMP, strong communication skills for cross-departmental coordination.",
    salary: "Competitive",
    source: "Indeed",
    sourceUrl: "https://in.indeed.com",
    skills: ["qa", "ipqa", "bmr", "cgmp", "line clearance", "documentation"],
    qualifications: "B.Pharm / M.Pharm",
  },
  {
    title: "Production Trainee - OSD (Walk-in Drive)",
    company: "Dr. Reddy's Laboratories",
    location: "Hyderabad",
    description: "Urgent opening for Trainees in Formulation Production (OSD). Practical training on operating compression, coating, and granulation machinery.",
    requirements: "Strong willingness to work in core manufacturing, excellent technical grasp of unit operations in pharmacy.",
    salary: "₹18,000 - ₹22,000 / month",
    source: "LinkedIn",
    sourceUrl: "https://www.linkedin.com",
    skills: ["production", "osd", "granulation", "machinery"],
    qualifications: "B.Pharm Graduate",
  }
];

async function runSeeder() {
  // Clear any old structural items to ensure a fresh, clean sync
  try {
    await db.delete(jobListings);
  } catch (e) {
    console.log("No table data to clear.");
  }

  for (const job of AGGREGATED_EXTERNAL_JOBS) {
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
      postedAt: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000),
    });
  }
}

// Fixes browser direct hits (GET)
export async function GET() {
  try {
    await runSeeder();
    return NextResponse.json({
      success: true,
      message: `Seeded ${AGGREGATED_EXTERNAL_JOBS.length} jobs via GET`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// FIXES YOUR 405 ERROR: Handles automated frontend triggers (POST)
export async function POST(request: NextRequest) {
  try {
    await runSeeder();
    return NextResponse.json({
      success: true,
      message: `Successfully processed POST hook and loaded ${AGGREGATED_EXTERNAL_JOBS.length} external jobs!`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
}
