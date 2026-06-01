import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cvUploads } from "@/db/schema"; 

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("cv") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Enforce PDF validation
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Invalid file type. Only PDFs are allowed." }, { status: 400 });
    }

    // Optional: Prepare the file buffer for text parsers when implementing parsing layers later
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extractedText = "Parsed technical skills, B.Pharm credentials template text"; 

    // Insert record into Neon matching your schema columns exactly
    const [newCv] = await db.insert(cvUploads).values({
      fileName: file.name,
      uploadedAt: new Date(), // Fixed from createdAt based on your compiler logs
      
      // NOTE: If your schema tracks the raw text content under a column like 'text' or 'content', 
      // you can uncomment the line below and change the key name to match your schema column:
      // text: extractedText, 
    }).returning({ id: cvUploads.id });

    return NextResponse.json({
      success: true,
      message: "PDF CV successfully uploaded and saved to database.",
      cvId: newCv.id,
    });

  } catch (error: any) {
    console.error("Upload Route Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process upload" }, { status: 500 });
  }
}
