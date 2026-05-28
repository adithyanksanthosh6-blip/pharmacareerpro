import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cvUploads, analyticsEvents } from "@/db/schema";
import { parseCV } from "@/lib/cv-parser";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("cv") as File | null;
    const textContent = formData.get("textContent") as string | null;
    const sessionId = (formData.get("sessionId") as string) || uuidv4();

    let rawText = "";
    let fileName = "pasted-text.txt";

    if (textContent) {
      rawText = textContent;
      fileName = "pasted-cv.txt";
    } else if (file) {
      fileName = file.name;
      // Read as text (supports .txt, .doc text, .csv, etc.)
      rawText = await file.text();
    } else {
      return NextResponse.json(
        { error: "No CV content provided" },
        { status: 400 }
      );
    }

    if (!rawText.trim()) {
      return NextResponse.json(
        { error: "CV content is empty. Please provide valid content." },
        { status: 400 }
      );
    }

    // Parse the CV
    const parsed = parseCV(rawText);

    // Save to database
    const [cvRecord] = await db
      .insert(cvUploads)
      .values({
        sessionId,
        fileName,
        rawText,
        parsedData: parsed as unknown as Record<string, unknown>,
        skills: parsed.skills,
        education: parsed.education as unknown as Record<string, unknown>,
        experience: parsed.experience as unknown as Record<string, unknown>,
      })
      .returning();

    // Track analytics
    await db.insert(analyticsEvents).values({
      sessionId,
      eventType: "cv_upload",
      eventData: {
        fileName,
        skillCount: parsed.skills.length,
      } as unknown as Record<string, unknown>,
    });

    return NextResponse.json({
      id: cvRecord.id,
      parsed,
      sessionId,
    });
  } catch (error) {
    console.error("CV upload error:", error);
    return NextResponse.json(
      { error: "Failed to process CV" },
      { status: 500 }
    );
  }
}
