import type { Job } from "./job";
import type { User } from "./user";

export type ApplicationStatus = "pending" | "accepted" | "rejected";

export interface Application {
  _id: string;
  job: Job;
  applicant: string | User; // Can be populated User object or just ObjectId string
  status: ApplicationStatus;
  resumeUrl: string;
  coverLetter?: string;
  createdAt?: string;
  updatedAt?: string;
}

