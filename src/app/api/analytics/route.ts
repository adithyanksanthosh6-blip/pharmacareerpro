import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { analyticsEvents, cvUploads, jobMatches, mockInterviews } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    // Get event counts by type
    const eventCounts = await db
      .select({
        eventType: analyticsEvents.eventType,
        count: sql<number>`count(*)`,
      })
      .from(analyticsEvents)
      .groupBy(analyticsEvents.eventType);

    // Get total CVs uploaded
    const cvCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(cvUploads);

    // Get total job matches
    const matchCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(jobMatches);

    // Get total interviews
    const interviewCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(mockInterviews);

    // Get average match score
    const avgScore = await db
      .select({ avg: sql<number>`coalesce(avg(match_score), 0)` })
      .from(jobMatches);

    // Recent activity (last 10 events)
    const recentEvents = await db
      .select()
      .from(analyticsEvents)
      .orderBy(sql`created_at DESC`)
      .limit(10);

    return NextResponse.json({
      eventCounts: eventCounts.reduce(
        (acc, e) => ({
          ...acc,
          [e.eventType]: Number(e.count),
        }),
        {} as Record<string, number>
      ),
      totalCVs: Number(cvCount[0]?.count ?? 0),
      totalMatches: Number(matchCount[0]?.count ?? 0),
      totalInterviews: Number(interviewCount[0]?.count ?? 0),
      averageMatchScore: Math.round(Number(avgScore[0]?.avg ?? 0)),
      recentEvents,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId, eventType, eventData } = await request.json();

    await db.insert(analyticsEvents).values({
      sessionId,
      eventType,
      eventData: eventData as Record<string, unknown>,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}
