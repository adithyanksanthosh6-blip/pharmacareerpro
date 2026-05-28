import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cvUploads, jobListings, mockInterviews, analyticsEvents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateInterviewQuestions } from "@/lib/interview-generator";

export async function POST(request: NextRequest) {
  try {
    const { cvId, jobId, jobDescription, difficulty } = await request.json();

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

    // Get job data if jobId provided
    let job = null;
    if (jobId) {
      const [foundJob] = await db
        .select()
        .from(jobListings)
        .where(eq(jobListings.id, jobId))
        .limit(1);
      job = foundJob || null;
    }

    const skills = (cv.skills as string[]) || [];
    const education =
      (cv.education as {
        degree: string;
        institution: string;
        year: string;
      }[]) || [];
    const experience =
      (cv.experience as {
        title: string;
        company: string;
        duration: string;
        description: string;
      }[]) || [];

    // Generate questions
    const questions = generateInterviewQuestions({
      skills,
      education,
      experience,
      jobTitle: job?.title || undefined,
      jobDescription: jobDescription || job?.description || undefined,
      difficulty: difficulty || "intermediate",
    });

    // Save interview to database
    const [interview] = await db
      .insert(mockInterviews)
      .values({
        cvUploadId: cvId,
        jobListingId: jobId || null,
        jobDescription: jobDescription || job?.description || null,
        difficulty: difficulty || "intermediate",
        questions: questions as unknown as Record<string, unknown>,
      })
      .returning();

    // Track analytics
    await db.insert(analyticsEvents).values({
      sessionId: cv.sessionId || undefined,
      eventType: "interview_start",
      eventData: {
        interviewId: interview.id,
        questionCount: questions.length,
        difficulty,
      } as unknown as Record<string, unknown>,
    });

    return NextResponse.json({
      interviewId: interview.id,
      questions,
      jobTitle: job?.title || null,
      company: job?.company || null,
    });
  } catch (error) {
    console.error("Interview generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate interview" },
      { status: 500 }
    );
  }
}
