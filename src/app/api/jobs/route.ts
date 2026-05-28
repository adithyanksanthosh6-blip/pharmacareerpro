import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { jobListings } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get("source");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    let query = db.select().from(jobListings).where(eq(jobListings.isActive, true));

    const jobs = await db
      .select()
      .from(jobListings)
      .where(eq(jobListings.isActive, true))
      .limit(limit)
      .offset(offset)
      .orderBy(jobListings.createdAt);

    // Filter in application if needed
    let filtered = jobs;
    if (source) {
      filtered = filtered.filter((j) => j.source === source);
    }
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (j) =>
          j.title.toLowerCase().includes(term) ||
          j.company.toLowerCase().includes(term) ||
          (j.location && j.location.toLowerCase().includes(term)) ||
          (j.description && j.description.toLowerCase().includes(term))
      );
    }

    const total = await db
      .select({ count: sql<number>`count(*)` })
      .from(jobListings)
      .where(eq(jobListings.isActive, true));

    return NextResponse.json({
      jobs: filtered,
      total: Number(total[0]?.count ?? 0),
      page,
      limit,
    });
  } catch (error) {
    console.error("Jobs fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
