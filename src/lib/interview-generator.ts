// Mock Interview Question Generator for Pharmacy

interface InterviewQuestion {
  id: number;
  category: string;
  question: string;
  suggestedAnswer: string;
  tips: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface GeneratorInput {
  skills: string[];
  education: { degree: string; institution: string; year: string }[];
  experience: { title: string; company: string; duration: string; description: string }[];
  jobTitle?: string;
  jobDescription?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

// Pharmacy-specific question bank
const QUESTION_BANK: Record<string, InterviewQuestion[]> = {
  general: [
    {
      id: 1,
      category: "General",
      question: "Tell me about yourself and your journey in pharmacy.",
      suggestedAnswer:
        "I am a B.Pharm graduate from [University] with a strong foundation in pharmaceutical sciences. During my academic years, I developed a keen interest in [specific area]. I have completed internships/projects in [relevant experience]. I am passionate about contributing to the pharmaceutical industry through [specific goal].",
      tips: [
        "Keep it concise - 2-3 minutes maximum",
        "Focus on pharmacy-related experiences",
        "Connect your background to the role you're applying for",
        "Mention specific achievements or projects",
      ],
      difficulty: "beginner",
    },
    {
      id: 2,
      category: "General",
      question: "Why did you choose pharmacy as a career?",
      suggestedAnswer:
        "I was drawn to pharmacy because of its unique blend of healthcare and science. The ability to directly impact patient health through proper medication management and drug development motivated me. I was particularly inspired by [personal story/reason]. The growing pharmaceutical industry in India with opportunities in R&D, regulatory affairs, and clinical research further solidified my decision.",
      tips: [
        "Be genuine and share a personal connection",
        "Show awareness of the pharmacy industry in India",
        "Highlight growth opportunities you see in the field",
      ],
      difficulty: "beginner",
    },
    {
      id: 3,
      category: "General",
      question: "Where do you see yourself in 5 years?",
      suggestedAnswer:
        "In 5 years, I see myself as a [specific role] with deep expertise in [area]. I plan to pursue relevant certifications and possibly an M.Pharm specialization. I want to contribute meaningfully to [drug development/patient care/quality assurance] while growing into a leadership position.",
      tips: [
        "Show ambition but be realistic",
        "Align your goals with the company's growth",
        "Mention continuous learning and development",
      ],
      difficulty: "beginner",
    },
  ],
  pharmacology: [
    {
      id: 10,
      category: "Pharmacology",
      question: "Explain the mechanism of action of ACE inhibitors.",
      suggestedAnswer:
        "ACE inhibitors (e.g., Enalapril, Ramipril) work by inhibiting the Angiotensin-Converting Enzyme (ACE). This enzyme converts Angiotensin I to Angiotensin II, a potent vasoconstrictor. By blocking this conversion, ACE inhibitors reduce vasoconstriction, decrease aldosterone secretion, reduce sodium and water retention, and ultimately lower blood pressure. They also reduce cardiac preload and afterload, making them useful in heart failure management.",
      tips: [
        "Draw the RAAS pathway if possible during the interview",
        "Mention clinical applications: hypertension, heart failure, diabetic nephropathy",
        "Discuss common side effects: dry cough, hyperkalemia, angioedema",
        "Compare with ARBs as alternatives",
      ],
      difficulty: "intermediate",
    },
    {
      id: 11,
      category: "Pharmacology",
      question: "What is bioavailability and what factors affect it?",
      suggestedAnswer:
        "Bioavailability is the fraction of an administered drug that reaches systemic circulation in its unchanged form. For IV administration, bioavailability is 100%. Factors affecting oral bioavailability include: first-pass metabolism in the liver, drug solubility and dissolution rate, GI tract pH, intestinal permeability, P-glycoprotein efflux transporters, food interactions, formulation factors, and drug stability in GI fluids.",
      tips: [
        "Distinguish between absolute and relative bioavailability",
        "Mention the BCS classification system",
        "Give examples of drugs with low bioavailability (e.g., Morphine ~25%)",
        "Discuss strategies to improve bioavailability",
      ],
      difficulty: "intermediate",
    },
    {
      id: 12,
      category: "Pharmacology",
      question:
        "Differentiate between pharmacokinetics and pharmacodynamics with examples.",
      suggestedAnswer:
        "Pharmacokinetics (PK) is 'what the body does to the drug' - covering ADME (Absorption, Distribution, Metabolism, Excretion). For example, Paracetamol is absorbed orally, distributed widely, metabolized in the liver by glucuronidation and sulfation, and excreted renally. Pharmacodynamics (PD) is 'what the drug does to the body' - covering drug-receptor interactions, dose-response relationships, and therapeutic effects. For example, Paracetamol inhibits COX enzymes centrally to reduce fever and pain.",
      tips: [
        "Use the ADME framework for PK discussion",
        "Mention PK/PD modeling in drug development",
        "Relate to clinical dose adjustments",
      ],
      difficulty: "beginner",
    },
  ],
  quality: [
    {
      id: 20,
      category: "Quality Control/Assurance",
      question: "What are the key differences between QC and QA?",
      suggestedAnswer:
        "Quality Control (QC) is a reactive process focused on testing finished products to identify defects. It involves analytical testing, sampling, and inspection. Quality Assurance (QA) is a proactive process that focuses on preventing defects through systematic activities like SOPs, audits, CAPA, change control, and documentation. QC is product-oriented while QA is process-oriented. Both work together under the GMP framework to ensure drug safety and efficacy.",
      tips: [
        "Give specific examples of QC tests (assay, dissolution, content uniformity)",
        "Mention relevant guidelines: WHO GMP, ICH Q7, Schedule M",
        "Discuss the role of documentation in both",
        "Reference your practical experience if any",
      ],
      difficulty: "beginner",
    },
    {
      id: 21,
      category: "Quality Control/Assurance",
      question: "Explain CAPA and its importance in pharmaceutical manufacturing.",
      suggestedAnswer:
        "CAPA stands for Corrective Action and Preventive Action. Corrective Action addresses existing nonconformances by identifying root causes and implementing solutions. Preventive Action identifies potential problems before they occur. The CAPA process includes: identification of the issue, root cause analysis (using tools like fishbone diagram, 5 Whys), action plan development, implementation, effectiveness verification, and documentation. CAPA is critical for continuous improvement and regulatory compliance.",
      tips: [
        "Know root cause analysis tools",
        "Mention FDA 21 CFR Part 820 and ICH guidelines",
        "Give a practical example of a CAPA scenario",
        "Emphasize the documentation trail",
      ],
      difficulty: "intermediate",
    },
  ],
  regulatory: [
    {
      id: 30,
      category: "Regulatory Affairs",
      question:
        "What is the Drug and Cosmetics Act 1940 and its relevance today?",
      suggestedAnswer:
        "The Drugs and Cosmetics Act 1940 is the primary legislation governing the import, manufacture, distribution, and sale of drugs and cosmetics in India. It is administered by CDSCO (Central Drugs Standard Control Organization). Key provisions include: licensing requirements for manufacturing and sale, drug scheduling (Schedule H, H1, X), quality standards, penalties for adulteration, and regulation of clinical trials. Recent amendments address biosimilars, medical devices, and e-pharmacy regulations.",
      tips: [
        "Know the key schedules (Schedule M for GMP, Schedule Y for clinical trials)",
        "Mention the role of CDSCO and State Drug Controllers",
        "Discuss recent amendments and New Drugs and Clinical Trials Rules 2019",
        "Relate to your understanding of compliance",
      ],
      difficulty: "intermediate",
    },
    {
      id: 31,
      category: "Regulatory Affairs",
      question: "What documents are required for ANDA filing?",
      suggestedAnswer:
        "An ANDA (Abbreviated New Drug Application) is filed with the USFDA for generic drug approval. Key documents include: Module 1 (Administrative information, cover letter, Form 356h), Module 2 (CTD summaries - Quality Overall Summary, Nonclinical/Clinical Overview), Module 3 (Quality - CMC data, specifications, stability, method validation, dissolution, bioequivalence data), Module 4 (Nonclinical - usually biowaiver for generics), Module 5 (Clinical - bioequivalence studies). Additionally, Patent certifications (Paragraph I-IV), labeling, and DMF references are required.",
      tips: [
        "Understand the CTD format (Common Technical Document)",
        "Know the difference between NDA and ANDA",
        "Mention 505(b)(2) pathway",
        "Discuss Paragraph IV certifications and patent challenges",
      ],
      difficulty: "advanced",
    },
  ],
  clinical: [
    {
      id: 40,
      category: "Clinical Research",
      question: "Explain the phases of clinical trials.",
      suggestedAnswer:
        "Clinical trials have four main phases: Phase I (20-100 healthy volunteers) - focuses on safety, tolerability, PK/PD, and dose ranging. Phase II (100-300 patients) - evaluates efficacy, side effects, and optimal dosing. Phase III (1000-5000 patients) - large-scale efficacy confirmation, monitoring of adverse effects, comparison with standard treatment. Phase IV (post-marketing surveillance) - long-term safety monitoring in general population. Before Phase I, there's preclinical testing in animal models and in-vitro studies.",
      tips: [
        "Mention IND application before Phase I",
        "Discuss Ethics Committee/IRB approval requirements",
        "Reference ICH-GCP guidelines",
        "Know about adaptive trial designs",
      ],
      difficulty: "intermediate",
    },
    {
      id: 41,
      category: "Clinical Research",
      question: "What is pharmacovigilance and why is it important?",
      suggestedAnswer:
        "Pharmacovigilance is the science and activities relating to the detection, assessment, understanding, and prevention of adverse effects or any other drug-related problem. It involves: ADR (Adverse Drug Reaction) reporting, signal detection and analysis, risk-benefit assessment, regulatory reporting (ICSRs, PSURs), and risk management planning. In India, PvPI (Pharmacovigilance Programme of India) coordinates these activities under CDSCO. Pharmacovigilance is crucial for post-marketing drug safety.",
      tips: [
        "Know the PvPI structure and ADR reporting process",
        "Mention MedDRA coding and WHO-ART",
        "Discuss the difference between ADR and AE",
        "Reference ICH E2A, E2B, E2C guidelines",
      ],
      difficulty: "intermediate",
    },
  ],
  formulation: [
    {
      id: 50,
      category: "Formulation & Development",
      question:
        "What factors do you consider while developing a tablet formulation?",
      suggestedAnswer:
        "Key factors include: API properties (solubility, polymorphism, stability, dose), target release profile (IR, SR, CR), excipient selection (binders, disintegrants, lubricants, glidants, fillers), manufacturing process (wet granulation, dry granulation, direct compression), critical quality attributes (hardness, friability, dissolution, content uniformity, weight variation), stability considerations (temperature, humidity, light sensitivity), and regulatory requirements for the target market.",
      tips: [
        "Mention QbD (Quality by Design) approach",
        "Discuss preformulation studies",
        "Reference ICH Q8 pharmaceutical development",
        "Give specific excipient examples",
      ],
      difficulty: "intermediate",
    },
  ],
  behavioral: [
    {
      id: 60,
      category: "Behavioral",
      question:
        "Tell me about a challenging situation you faced and how you handled it.",
      suggestedAnswer:
        "During my [internship/project], I encountered [specific challenge]. I approached it by first analyzing the root cause, then consulted with [mentors/literature], and developed a solution involving [specific steps]. The outcome was [positive result]. This experience taught me [key learning] and reinforced the importance of [relevant quality].",
      tips: [
        "Use the STAR method: Situation, Task, Action, Result",
        "Choose pharmacy-related examples when possible",
        "Quantify results where possible",
        "Show what you learned from the experience",
      ],
      difficulty: "beginner",
    },
    {
      id: 61,
      category: "Behavioral",
      question: "How do you handle working under pressure and tight deadlines?",
      suggestedAnswer:
        "I prioritize tasks based on urgency and importance, create a structured timeline, and focus on critical deliverables first. During my [project/exam preparation], I managed multiple deadlines by breaking down large tasks into manageable chunks and tracking progress. I also communicate proactively with team members about timelines. I find that staying organized and maintaining a positive attitude helps me perform well under pressure.",
      tips: [
        "Give a concrete example from your pharmacy studies or work",
        "Mention time management tools or techniques you use",
        "Show that pressure doesn't compromise quality",
        "Emphasize the importance of accuracy in pharmacy work",
      ],
      difficulty: "beginner",
    },
  ],
};

export function generateInterviewQuestions(
  input: GeneratorInput
): InterviewQuestion[] {
  const questions: InterviewQuestion[] = [];
  const difficulty = input.difficulty || "intermediate";

  // Always include general questions
  questions.push(...QUESTION_BANK.general);

  // Add skill-based questions
  const skillCategories = categorizeSkills(input.skills);

  if (skillCategories.includes("pharmacology")) {
    questions.push(...QUESTION_BANK.pharmacology);
  }
  if (skillCategories.includes("quality")) {
    questions.push(...QUESTION_BANK.quality);
  }
  if (skillCategories.includes("regulatory")) {
    questions.push(...QUESTION_BANK.regulatory);
  }
  if (skillCategories.includes("clinical")) {
    questions.push(...QUESTION_BANK.clinical);
  }
  if (skillCategories.includes("formulation")) {
    questions.push(...QUESTION_BANK.formulation);
  }

  // Always add behavioral questions
  questions.push(...QUESTION_BANK.behavioral);

  // Add job-specific questions if job description provided
  if (input.jobDescription || input.jobTitle) {
    const jobQuestions = generateJobSpecificQuestions(
      input.jobTitle || "",
      input.jobDescription || ""
    );
    questions.push(...jobQuestions);
  }

  // Filter by difficulty
  const filtered = questions.filter((q) => {
    if (difficulty === "beginner") return true;
    if (difficulty === "intermediate")
      return q.difficulty !== "advanced" || Math.random() > 0.5;
    return true;
  });

  // Add unique IDs
  return filtered.map((q, i) => ({ ...q, id: i + 1 }));
}

function categorizeSkills(skills: string[]): string[] {
  const categories: Set<string> = new Set();
  const lower = skills.map((s) => s.toLowerCase());

  const mapping: Record<string, string[]> = {
    pharmacology: [
      "pharmacology",
      "drug interaction",
      "adr",
      "adverse drug reaction",
      "therapeutic drug monitoring",
      "toxicology",
      "pathophysiology",
    ],
    quality: [
      "quality control",
      "quality assurance",
      "gmp",
      "sop",
      "capa",
      "validation",
      "hplc",
      "gc",
      "uv spectroscopy",
      "dissolution",
      "stability",
      "analytical chemistry",
      "method validation",
    ],
    regulatory: [
      "regulatory affairs",
      "drug regulatory",
      "drug and cosmetics act",
      "usfda",
      "who gmp",
      "schedule m",
    ],
    clinical: [
      "clinical research",
      "pharmacovigilance",
      "drug safety",
      "bioequivalence",
      "bioavailability",
      "clinical pharmacy",
    ],
    formulation: [
      "drug formulation",
      "pharmaceutics",
      "tablet compression",
      "capsule filling",
      "liquid orals",
      "parenteral",
      "sterile manufacturing",
      "packaging",
    ],
  };

  for (const [category, keywords] of Object.entries(mapping)) {
    if (keywords.some((kw) => lower.some((s) => s.includes(kw)))) {
      categories.add(category);
    }
  }

  // Default to pharmacology + quality if no categories matched
  if (categories.size === 0) {
    categories.add("pharmacology");
    categories.add("quality");
  }

  return Array.from(categories);
}

function generateJobSpecificQuestions(
  jobTitle: string,
  jobDescription: string
): InterviewQuestion[] {
  const questions: InterviewQuestion[] = [];
  const combined = (jobTitle + " " + jobDescription).toLowerCase();

  if (
    combined.includes("medical representative") ||
    combined.includes("mr") ||
    combined.includes("sales")
  ) {
    questions.push({
      id: 100,
      category: "Job-Specific",
      question:
        "How would you approach a doctor who is not interested in your product?",
      suggestedAnswer:
        "I would first try to understand the doctor's concerns and current prescribing habits. I'd focus on building rapport through consistent visits, sharing relevant clinical data and studies supporting our product. I'd use detailing aids effectively, offer samples for trial, and follow up on patient outcomes. The key is persistence with professionalism and adding value to the doctor's practice.",
      tips: [
        "Show knowledge of ethical marketing practices",
        "Mention UCPMP (Uniform Code of Pharmaceutical Marketing Practices)",
        "Demonstrate communication and persuasion skills",
        "Discuss territory management strategies",
      ],
      difficulty: "intermediate",
    });
  }

  if (
    combined.includes("production") ||
    combined.includes("manufacturing") ||
    combined.includes("plant")
  ) {
    questions.push({
      id: 101,
      category: "Job-Specific",
      question: "How would you handle a batch failure in production?",
      suggestedAnswer:
        "First, I would immediately stop the process and quarantine the affected batch. Then document everything in the batch manufacturing record. Conduct a thorough investigation using root cause analysis tools (Ishikawa, 5 Whys). Assess the impact on product quality and patient safety. Raise a deviation report and initiate CAPA. Inform QA and management. Determine if the batch can be reprocessed or must be rejected based on SOP and regulatory guidelines.",
      tips: [
        "Emphasize patient safety as the top priority",
        "Show knowledge of deviation handling procedures",
        "Mention the importance of documentation",
        "Discuss preventive measures",
      ],
      difficulty: "intermediate",
    });
  }

  if (
    combined.includes("research") ||
    combined.includes("r&d") ||
    combined.includes("development")
  ) {
    questions.push({
      id: 102,
      category: "Job-Specific",
      question:
        "Describe your approach to developing a new pharmaceutical formulation.",
      suggestedAnswer:
        "I would follow a systematic QbD approach: Start with preformulation studies (API characterization, compatibility studies), define the Target Product Profile (TPP), identify Critical Quality Attributes (CQAs), conduct risk assessment, design experiments using DoE, optimize the formulation, perform scale-up studies, validate the process, and conduct stability studies per ICH guidelines. Documentation at every stage is essential for regulatory submission.",
      tips: [
        "Reference ICH Q8, Q9, Q10 guidelines",
        "Mention specific analytical techniques you're familiar with",
        "Discuss Design of Experiments (DoE) approach",
        "Show awareness of scale-up challenges",
      ],
      difficulty: "advanced",
    });
  }

  if (
    combined.includes("hospital") ||
    combined.includes("clinical") ||
    combined.includes("patient")
  ) {
    questions.push({
      id: 103,
      category: "Job-Specific",
      question:
        "How would you handle a medication error in a hospital setting?",
      suggestedAnswer:
        "First, ensure patient safety - assess the patient and provide immediate medical attention if needed. Report the error through the hospital's incident reporting system. Document everything factually. Participate in the investigation to identify root cause. Help implement corrective measures (double-check systems, barcoding, training). Support a culture of transparency and learning, not blame. Follow up on the patient's condition.",
      tips: [
        "Always prioritize patient safety",
        "Show knowledge of medication error reporting systems",
        "Discuss preventive strategies",
        "Mention the role of clinical pharmacist in error prevention",
      ],
      difficulty: "intermediate",
    });
  }

  // Default job question
  if (questions.length === 0) {
    questions.push({
      id: 100,
      category: "Job-Specific",
      question: `Why are you interested in this ${jobTitle || "pharmacy"} position?`,
      suggestedAnswer:
        "I am interested in this position because it aligns with my skills in [relevant skills] and my career goals in [specific area]. The company's reputation in [specific aspect] and the opportunity to work on [specific projects/products] excites me. I believe my [education/experience] makes me a strong fit for this role.",
      tips: [
        "Research the company before the interview",
        "Connect your skills to the job requirements",
        "Show genuine enthusiasm for the role",
        "Mention specific aspects of the company that attract you",
      ],
      difficulty: "beginner",
    });
  }

  return questions;
}
