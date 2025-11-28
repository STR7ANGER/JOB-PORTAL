import type { Company } from "./company";

// Job type
export interface Job {
  _id: string;
  title: string;
  description: string;
  requirements?: string[];
  salary: number;
  experience: number;
  location: string;
  jobType: string;
  position: number;
  company: Company | string; // Can be populated Company object or just ObjectId string
  created_by: string;
  applications?: string[];
  createdAt?: string;
  updatedAt?: string;
}

