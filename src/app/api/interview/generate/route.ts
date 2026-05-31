import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cvUploads, jobListings, mockInterviews, analyticsEvents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateInterviewQuestions } from "@/lib/interview-generator";

// Helper to inject core industry competencies based on the user's selected goal
function getGoalInstructions(goal: string): string {
  switch (goal) {
    case "quality_control":
      return "Focus heavily on QC laboratory operations, stability testing, HPLC/UV instrumentation troubleshooting, wet chemistry analysis, and raw material qualification metrics.";
    case "quality_assurance":
      return "Focus heavily on QA compliance frameworks, IPQA line clearance, updating standard operating procedures (SOPs), managing deviations, root cause analysis (RCA), and handling change controls.";
    case "regulatory_affairs":
      return "Focus heavily on global drug dossiers, compiling CTD/eCTD modules, handling Drug Master Files (DMFs), international health authority guidelines (like USFDA/EMA), and post-approval variations.";
    default:
      return "Provide a comprehensive, balanced technical evaluation tailored to general pharmaceutical competencies.";
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Extract 'goal' alongside your standard parameters from the frontend action
    const { cvId, jobId, jobDescription, difficulty, goal } = await request.json();

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
    const education = (cv.education as any[]) || [];
    const experience = (cv.experience as any[]) || [];

    // 2. Synthesize the goal directive with existing job contexts
    const goalDirectives = goal ? getGoalInstructions(goal) : "";
    const baseDescription = jobDescription || job?.description || "Entry level pharmaceutical professional framework";
    
    // Combine them clean into a unified context prompt
    const contextPromptForAI = `[Target Focus Directives]: ${goalDirectives}\n[Base Context]: ${baseDescription}`;

    // 3. Generate hyper-specific questions passing the targeted prompt context
    const questions = generateInterviewQuestions({
      skills,
      education,
      experience,
      jobTitle: job?.title || (goal ? `${goal.replace('_', ' ').toUpperCase()} Candidate` : undefined),
      jobDescription: contextPromptForAI,
      difficulty: difficulty || "intermediate",
    });

    // Save interview to database
    const [interview] = await db
      .insert(mockInterviews)
      .values({
        cvUploadId: cvId,
        jobListingId: jobId || null,
        jobDescription: baseDescription, 
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
        goal: goal || "general",
      } as unknown as Record<string, unknown>,
    });

    return NextResponse.json({
      interviewId: interview.id,
      questions,
      jobTitle: job?.title || (goal ? `${goal.replace('_', ' ').toUpperCase()} Prep` : null),
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
