import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cvUploads, jobListings, jobMatches, analyticsEvents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { calculateMatchScore } from "@/lib/cv-parser";

export async function POST(request: NextRequest) {
  try {
    const { cvId } = await request.json();

    if (!cvId) {
      return NextResponse.json({ error: "CV ID is required" }, { status: 400 });
    }

    // Get CV data
    const [cv] = await db
      .select()
      .from(cvUploads)
      .where(eq(cvUploads.id, cvId))
      .limit(1);

    if (!cv) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 });
    }

    // Get all active jobs
    const jobs = await db
      .select()
      .from(jobListings)
      .where(eq(jobListings.isActive, true));

    const cvSkills = (cv.skills as string[]) || [];
    const cvEducation = (cv.education as { degree: string; institution: string; year: string }[]) || [];

    // Calculate match scores
    const matches = [];
    for (const job of jobs) {
      const jobSkills = (job.skills as string[]) || [];
      const jobQualifications = (job.qualifications as string[]) || [];

      const { score, reasons } = calculateMatchScore(
        cvSkills,
        jobSkills,
        cvEducation,
        jobQualifications
      );

      // Save match to database
      const [match] = await db
        .insert(jobMatches)
        .values({
          cvUploadId: cvId,
          jobListingId: job.id,
          matchScore: score,
          matchReasons: reasons as unknown as Record<string, unknown>,
        })
        .returning();

      matches.push({
        ...match,
        job,
      });
    }

    // Sort by score descending
    matches.sort((a, b) => b.matchScore - a.matchScore);

    // Track analytics
    await db.insert(analyticsEvents).values({
      sessionId: cv.sessionId || undefined,
      eventType: "job_match",
      eventData: {
        cvId,
        matchCount: matches.length,
        topScore: matches[0]?.matchScore || 0,
      } as unknown as Record<string, unknown>,
    });

    return NextResponse.json({
      matches: matches.slice(0, 20), // Return top 20 matches
      totalJobs: jobs.length,
    });
  } catch (error) {
    console.error("Job matching error:", error);
    return NextResponse.json(
      { error: "Failed to match jobs" },
      { status: 500 }
    );
  }
}
