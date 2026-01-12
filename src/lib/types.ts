export interface JoinApplicationData {
  // Personal Info
  fullName: string;
  email: string;
  phoneNumber: string;
  university: string;
  major: string;
  graduationYear: number;

  // Technical Info
  programmingLanguages: string[];
  githubProfile?: string;
  linkedinProfile?: string;
  portfolioUrl?: string;

  // Interest & Motivation
  interestedDepartments: string[];
  motivation: string;
  previousExperience?: string;

  // Resume
  resumeUrl: string;

  // Meta
  submittedAt: Date;
  status: "pending" | "reviewed" | "accepted" | "rejected";
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface FormState {
  success: boolean;
  message: string;
  applicationId?: string;
}
