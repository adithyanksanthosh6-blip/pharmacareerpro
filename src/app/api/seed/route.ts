import { NextResponse } from "next/server";
import { db } from "@/db";
import { jobListings } from "@/db/schema";

export const dynamic = "force-dynamic";

// Adding ': any[]' explicitly stops TypeScript from throwing the build error
const SAMPLE_JOBS: any[] = [
  {
    title: "Quality Control Intern",
    company: "Sun Pharmaceutical Industries",
    location: "Mumbai",
    description: "Assisting the QA/QC team with raw material verification, standard operating procedures, and laboratory documentation compliance.",
    requirements: "Knowledge of GMP guidelines, basic analytical chemistry techniques, and strong attention to detail.",
    salary: "Competitive",
    source: "In-House",
    sourceUrl: "https://example.com/jobs",
    skills: ["gmp", "quality control", "documentation", "hplc"],
    qualifications: "B.Pharm Graduate",
  }
];

export async function GET() {
  try {
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

    return NextResponse.json({
      success: true,
      message: `Seeded ${SAMPLE_JOBS.length} jobs successfully!`,
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: error.message },
      { status: 500 }
    );
  }
}
