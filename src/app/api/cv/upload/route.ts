import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
// Replace 'cvUploads' with whatever your actual table name is inside your schema file
import { cvUploads } from "@/db/schema"; 

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("cv") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Double-check the file type on the backend for security
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Invalid file type. Only PDFs are allowed." }, { status: 400 });
    }

    // Convert file data to an array buffer if you want to pass it to a text parser library
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. (Optional) Insert text parsing logic here using a library like 'pdf-parse'
    const extractedText = "Parsed technical skills, B.Pharm credentials template text"; 

    // 2. Insert record into your Neon database via Drizzle
    const [newCv] = await db.insert(cvUploads).values({
      fileName: file.name,
      fileSize: file.size,
      rawText: extractedText, // Useful for your job-matching calculations later!
      createdAt: new Date(),
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
