// CV Parser - extracts structured data from resume text

interface ParsedCV {
  name: string | null;
  email: string | null;
  phone: string | null;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: string[];
  certifications: string[];
  summary: string | null;
}

interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
}

interface ExperienceEntry {
  title: string;
  company: string;
  duration: string;
  description: string;
}

const PHARMACY_SKILLS = [
  "pharmacology",
  "pharmaceutical chemistry",
  "pharmaceutics",
  "pharmacognosy",
  "drug formulation",
  "quality control",
  "quality assurance",
  "good manufacturing practices",
  "gmp",
  "regulatory affairs",
  "drug regulatory affairs",
  "clinical research",
  "pharmacovigilance",
  "medical coding",
  "drug safety",
  "bioequivalence",
  "bioavailability",
  "hplc",
  "gc",
  "uv spectroscopy",
  "ir spectroscopy",
  "mass spectrometry",
  "dissolution testing",
  "stability studies",
  "analytical chemistry",
  "microbiology",
  "biotechnology",
  "biochemistry",
  "organic chemistry",
  "medicinal chemistry",
  "toxicology",
  "pathophysiology",
  "hospital pharmacy",
  "community pharmacy",
  "retail pharmacy",
  "clinical pharmacy",
  "drug information",
  "patient counseling",
  "prescription analysis",
  "inventory management",
  "sap",
  "microsoft office",
  "ms excel",
  "data analysis",
  "research",
  "documentation",
  "sop",
  "capa",
  "deviation handling",
  "change control",
  "validation",
  "process validation",
  "cleaning validation",
  "method validation",
  "tablet compression",
  "capsule filling",
  "liquid orals",
  "parenteral",
  "sterile manufacturing",
  "aseptic processing",
  "packaging",
  "labeling",
  "batch manufacturing record",
  "bmr",
  "who gmp",
  "usfda",
  "schedule m",
  "drug and cosmetics act",
  "pharmacy practice",
  "therapeutic drug monitoring",
  "adverse drug reaction",
  "adr",
  "drug interaction",
  "python",
  "r programming",
  "spss",
  "statistics",
  "machine learning",
];

export function parseCV(text: string): ParsedCV {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  return {
    name: extractName(lines),
    email: extractEmail(text),
    phone: extractPhone(text),
    education: extractEducation(text),
    experience: extractExperience(text),
    skills: extractSkills(text),
    certifications: extractCertifications(text),
    summary: extractSummary(text),
  };
}

function extractName(lines: string[]): string | null {
  // Usually the first non-empty meaningful line
  for (const line of lines.slice(0, 5)) {
    if (
      line.length > 2 &&
      line.length < 60 &&
      !line.includes("@") &&
      !line.match(/^\d/) &&
      !line.toLowerCase().includes("resume") &&
      !line.toLowerCase().includes("curriculum")
    ) {
      return line;
    }
  }
  return null;
}

function extractEmail(text: string): string | null {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : null;
}

function extractPhone(text: string): string | null {
  const match = text.match(/(?:\+91|91|0)?[-\s]?[6-9]\d{9}/);
  return match ? match[0].trim() : null;
}

function extractEducation(text: string): EducationEntry[] {
  const entries: EducationEntry[] = [];
  const lowerText = text.toLowerCase();

  const degrees = [
    { pattern: /b\.?\s*pharm/i, label: "B.Pharm" },
    { pattern: /m\.?\s*pharm/i, label: "M.Pharm" },
    { pattern: /pharm\.?\s*d/i, label: "Pharm.D" },
    { pattern: /d\.?\s*pharm/i, label: "D.Pharm" },
    { pattern: /m\.?\s*sc/i, label: "M.Sc" },
    { pattern: /b\.?\s*sc/i, label: "B.Sc" },
    { pattern: /mba/i, label: "MBA" },
    { pattern: /12th|hsc|intermediate/i, label: "12th / HSC" },
    { pattern: /10th|ssc|matriculation/i, label: "10th / SSC" },
  ];

  for (const deg of degrees) {
    if (deg.pattern.test(text)) {
      const yearMatch = text.match(
        new RegExp(
          deg.pattern.source + "[^\\n]*?(20\\d{2}|19\\d{2})",
          "i"
        )
      );
      entries.push({
        degree: deg.label,
        institution: "Extracted from CV",
        year: yearMatch ? yearMatch[1] : "N/A",
      });
    }
  }

  if (entries.length === 0 && lowerText.includes("pharm")) {
    entries.push({
      degree: "Pharmacy (Detected)",
      institution: "Extracted from CV",
      year: "N/A",
    });
  }

  return entries;
}

function extractExperience(text: string): ExperienceEntry[] {
  const entries: ExperienceEntry[] = [];
  const lines = text.split("\n");

  const expHeaders = [
    /experience/i,
    /work\s*history/i,
    /employment/i,
    /professional/i,
  ];

  let inExperienceSection = false;
  let currentEntry: Partial<ExperienceEntry> = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (expHeaders.some((h) => h.test(trimmed))) {
      inExperienceSection = true;
      continue;
    }

    if (
      inExperienceSection &&
      /^(education|skills|certif|project|hobby|reference|objective|summary)/i.test(
        trimmed
      )
    ) {
      if (currentEntry.title) {
        entries.push({
          title: currentEntry.title || "",
          company: currentEntry.company || "",
          duration: currentEntry.duration || "",
          description: currentEntry.description || "",
        });
      }
      break;
    }

    if (inExperienceSection) {
      const durationMatch = trimmed.match(
        /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|20\d{2}|19\d{2}).*?[-–to].*?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|20\d{2}|19\d{2}|present|current)/i
      );
      if (durationMatch) {
        if (currentEntry.title) {
          entries.push({
            title: currentEntry.title || "",
            company: currentEntry.company || "",
            duration: currentEntry.duration || "",
            description: currentEntry.description || "",
          });
        }
        currentEntry = { duration: durationMatch[0] };
      } else if (!currentEntry.title && trimmed.length < 80) {
        currentEntry.title = trimmed;
      } else if (currentEntry.title && !currentEntry.company && trimmed.length < 80) {
        currentEntry.company = trimmed;
      } else if (currentEntry.title) {
        currentEntry.description =
          (currentEntry.description || "") + " " + trimmed;
      }
    }
  }

  if (currentEntry.title) {
    entries.push({
      title: currentEntry.title || "",
      company: currentEntry.company || "",
      duration: currentEntry.duration || "",
      description: currentEntry.description || "",
    });
  }

  return entries;
}

function extractSkills(text: string): string[] {
  const lowerText = text.toLowerCase();
  const found: string[] = [];

  for (const skill of PHARMACY_SKILLS) {
    if (lowerText.includes(skill.toLowerCase())) {
      found.push(skill);
    }
  }

  // Also extract from skills section
  const skillsSectionMatch = text.match(
    /skills[:\s]*([\s\S]*?)(?=\n\s*\n|education|experience|certif|project|$)/i
  );
  if (skillsSectionMatch) {
    const skillsText = skillsSectionMatch[1];
    const items = skillsText
      .split(/[,;•|\/\n]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 1 && s.length < 50);
    for (const item of items) {
      if (!found.includes(item.toLowerCase())) {
        found.push(item);
      }
    }
  }

  return [...new Set(found)];
}

function extractCertifications(text: string): string[] {
  const certs: string[] = [];
  const certSection = text.match(
    /certif[a-z]*[:\s]*([\s\S]*?)(?=\n\s*\n|education|experience|skills|project|$)/i
  );
  if (certSection) {
    const items = certSection[1]
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 3 && s.length < 200);
    certs.push(...items);
  }
  return certs;
}

function extractSummary(text: string): string | null {
  const summaryMatch = text.match(
    /(?:summary|objective|profile|about)[:\s]*([\s\S]*?)(?=\n\s*\n|education|experience|skills|$)/i
  );
  if (summaryMatch) {
    return summaryMatch[1].trim().slice(0, 500);
  }
  return null;
}

export function calculateMatchScore(
  cvSkills: string[],
  jobSkills: string[],
  cvEducation: EducationEntry[],
  jobQualifications: string[]
): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  // Skill matching (max 60 points)
  const normalizedCvSkills = cvSkills.map((s) => s.toLowerCase());
  const normalizedJobSkills = jobSkills.map((s) => s.toLowerCase());

  let skillMatches = 0;
  for (const jSkill of normalizedJobSkills) {
    if (normalizedCvSkills.some((cs) => cs.includes(jSkill) || jSkill.includes(cs))) {
      skillMatches++;
    }
  }

  if (normalizedJobSkills.length > 0) {
    const skillScore = Math.round(
      (skillMatches / normalizedJobSkills.length) * 60
    );
    score += skillScore;
    reasons.push(
      `Matched ${skillMatches}/${normalizedJobSkills.length} required skills`
    );
  } else {
    score += 30; // Neutral if no job skills defined
  }

  // Education matching (max 25 points)
  const hasBPharm = cvEducation.some((e) =>
    /b\.?\s*pharm/i.test(e.degree)
  );
  const hasMPharm = cvEducation.some((e) =>
    /m\.?\s*pharm/i.test(e.degree)
  );
  const hasPharmD = cvEducation.some((e) =>
    /pharm\.?\s*d/i.test(e.degree)
  );

  if (hasMPharm || hasPharmD) {
    score += 25;
    reasons.push("Advanced pharmacy degree detected");
  } else if (hasBPharm) {
    score += 20;
    reasons.push("B.Pharm degree detected");
  } else if (cvEducation.length > 0) {
    score += 10;
    reasons.push("Related education detected");
  }

  // Experience bonus (max 15 points)
  if (normalizedCvSkills.length > 10) {
    score += 15;
    reasons.push("Strong skill profile with 10+ skills");
  } else if (normalizedCvSkills.length > 5) {
    score += 10;
    reasons.push("Good skill profile with 5+ skills");
  } else if (normalizedCvSkills.length > 0) {
    score += 5;
    reasons.push("Basic skill profile detected");
  }

  return { score: Math.min(score, 100), reasons };
}
