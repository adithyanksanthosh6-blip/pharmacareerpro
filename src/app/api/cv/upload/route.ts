import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cvUploads } from "@/db/schema";

// Clean implementation matching your compiler configurations
const pdfParse = require("pdf-parse") as (buf: Buffer) => Promise<{ text: string }>; // eslint-disable-line

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
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text || "";
    } catch (pdfErr) {
      console.error("PDF Parsing Error:", pdfErr);
    }

    // Aligned precisely with your Drizzle schema definition
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
