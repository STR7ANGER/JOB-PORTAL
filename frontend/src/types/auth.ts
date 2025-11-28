export type Role = "student" | "recruiter";

export interface LoginFormInput {
  email: string;
  password: string;
  role: Role;
}

export interface SignupFormInput {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: Role;
  file: File | null;
}

