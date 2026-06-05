import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cvUploads } from "@/db/schema";

// 1. Force Vercel to skip static page checking for this file during build time
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("cv") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Invalid file type. Only PDFs are allowed." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    let extractedText = "";
    try {
      // 2. Tucked safely inside the action block so it won't trigger compilation warnings
      const pdfParse = require("pdf-parse");
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text || "";
    } catch (pdfErr) {
      console.error("PDF Parsing Error:", pdfErr);
    }

    // Matches your exact Drizzle database setup
    const [newCv] = await db.insert(cvUploads).values({
      fileName: file.name,
      uploadedAt: new Date(),
    }).returning({ id: cvUploads.id });

    return NextResponse.json({
      success: true,
      message: "PDF CV successfully uploaded.",
      cvId: newCv.id,
      parsed: { text: extractedText }
    });

  } catch (error: any) {
    console.error("Upload Route Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process upload" }, { status: 500 });
  }
}
