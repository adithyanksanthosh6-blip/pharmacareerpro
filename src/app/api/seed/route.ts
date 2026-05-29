import { NextResponse } from "next/server";
import { db } from "@/db";
import { jobListings } from "@/db/schema";

export const dynamic = "force-dynamic";

const SAMPLE_JOBS = [
  // ... keep all your SAMPLE_JOBS exactly as they are ...
];

export async function GET() {
  try {
    // Just insert the sample jobs - don't drop/recreate tables!
    // Drizzle migrations (npx drizzle-kit push) handle table creation.
    
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
       skills: parsedData.skills,
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
