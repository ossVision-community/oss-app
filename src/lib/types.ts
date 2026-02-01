export interface JoinApplicationData {
  // Personal Info
  fullNameAr: string;
  fullNameEn: string;
  nationalId: string;
  dateOfBirth: string;
  universityId: string;
  personalEmail: string;
  phoneNumber: string;
  university: string;
  college: string;
  specialization: string;
  academicLevel: string;
  graduationYear: number;

  linkedinProfile?: string;

  // Interest & Motivation
  interestedDepartment: string;
  joiningGoal: string;
  skillsAndExperience: string;

  // Resume
  resumeUrl?: string;

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

export interface PartnerInquiryData {
  organizationName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  website?: string;
  partnershipType: string;
  message: string;

  submittedAt: Date;
  status: "new" | "reviewed" | "contacted" | "closed";
}
