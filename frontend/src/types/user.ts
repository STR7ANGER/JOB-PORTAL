import type { Role } from "./auth";

export interface UserProfile {
  bio?: string;
  skills?: string[];
  resume?: string;
  resumeOriginalName?: string;
  company?: string | null;
  profilePhoto?: string;
}

export interface User {
  _id?: string;
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  role?: Role;
  profile?: UserProfile;
}

export interface UpdateProfileFormInput {
  fullname: string;
  email: string;
  phoneNumber: string;
  bio: string;
  skills: string[];
  profilePhoto: File | null;
  resume: File | null;
  skillInput: string;
}

export interface UpdateProfileDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

