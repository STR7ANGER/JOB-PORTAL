import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Upload, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { API_URL } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/store/authSlice";
import type {
  UpdateProfileDialogProps,
  User,
  UpdateProfileFormInput,
} from "@/types/user";

const UpdateProfile = ({ open, setOpen }: UpdateProfileDialogProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const userData = user as User | null;
  const [input, setInput] = useState<UpdateProfileFormInput>({
    fullname: userData?.fullname || "",
    email: userData?.email || "",
    phoneNumber: userData?.phoneNumber || "",
    bio: userData?.profile?.bio || "",
    skills: userData?.profile?.skills?.map((skill: string) => skill) || [],
    profilePhoto: null,
    resume: null,
    skillInput: "",
  });

  const changeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills.join(","));
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }
    if (input.resume) {
      formData.append("resume", input.resume);
    }
    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/user/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error in updating profile:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const profilePhotoChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const [file] = e.target.files ?? [];
    setInput({ ...input, profilePhoto: file ?? null });
  };

  const resumeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files ?? [];
    setInput({ ...input, resume: file ?? null });
  };

  const addSkillHandler = () => {
    if (
      input.skillInput.trim() &&
      !input.skills.includes(input.skillInput.trim())
    ) {
      setInput({
        ...input,
        skills: [...input.skills, input.skillInput.trim()],
        skillInput: "",
      });
    }
  };

  const removeSkillHandler = (skillToRemove: string) => {
    setInput({
      ...input,
      skills: input.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto rounded-2xl border border-black/10 bg-white p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold tracking-tight text-black">
            Update Profile
          </DialogTitle>
          <DialogDescription className="text-xs text-black/60">
            Update your profile information here.
          </DialogDescription>
        </DialogHeader>

        <form
          id="update-profile-form"
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          {/* Full Name, Email and Phone Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-[0.2em] text-black/60">
                Full Name
              </Label>
              <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="Full Name"
                className="rounded-xl border-black/15 bg-[#f8f8f8] text-black placeholder:text-black/30 focus:border-black focus:ring-0"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-[0.2em] text-black/60">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="you@example.com"
                className="rounded-xl border-black/15 bg-[#f8f8f8] text-black placeholder:text-black/30 focus:border-black focus:ring-0"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-[0.2em] text-black/60">
                Phone Number
              </Label>
              <Input
                type="tel"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="+91 00000 00000"
                className="rounded-xl border-black/15 bg-[#f8f8f8] text-black placeholder:text-black/30 focus:border-black focus:ring-0"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-[0.2em] text-black/60">
              Bio
            </Label>
            <textarea
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              placeholder="Tell us about yourself..."
              rows={3}
              className="w-full rounded-xl border border-black/15 bg-[#f8f8f8] px-3 py-2 text-sm text-black placeholder:text-black/30 focus:border-black focus:outline-none focus:ring-0"
            />
          </div>

          {/* Skills */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-[0.2em] text-black/60">
              Skills
            </Label>
            <div className="flex flex-wrap gap-2 mb-1.5">
              {input.skills.length > 0 ? (
                input.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70 flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkillHandler(skill)}
                      className="ml-1 hover:text-black"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-black/50">No skills added yet</p>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                name="skillInput"
                placeholder="Add a skill"
                value={input.skillInput}
                onChange={changeEventHandler}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkillHandler();
                  }
                }}
                className="rounded-xl border-black/15 bg-[#f8f8f8] text-black placeholder:text-black/30 focus:border-black focus:ring-0"
              />
              <Button
                type="button"
                onClick={addSkillHandler}
                className="rounded-xl border border-black/20 bg-white px-4 text-xs font-medium text-black hover:bg-black hover:text-white"
              >
                Add
              </Button>
            </div>
          </div>

          {/* Profile Photo and Resume Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-[0.2em] text-black/60">
                Profile Photo
              </Label>
              <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-[#fdfdfd] px-4 py-2.5">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("profile-upload")?.click()
                  }
                  className="flex items-center gap-3 text-sm text-black/70"
                >
                  <Upload className="h-4 w-4" />
                  Upload image
                </button>
                <span className="text-xs uppercase tracking-[0.3em] text-black/40">
                  JPG · PNG
                </span>
              </div>
              <Input
                id="profile-upload"
                accept="image/*"
                type="file"
                className="hidden"
                onChange={profilePhotoChangeHandler}
              />
              {input.profilePhoto && (
                <p className="text-xs text-black/60">
                  Selected: {input.profilePhoto.name}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-[0.2em] text-black/60">
                Resume
              </Label>
              <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-[#fdfdfd] px-4 py-2.5">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("resume-upload")?.click()
                  }
                  className="flex items-center gap-3 text-sm text-black/70"
                >
                  <Upload className="h-4 w-4" />
                  Upload resume
                </button>
                <span className="text-xs uppercase tracking-[0.3em] text-black/40">
                  PDF · DOC
                </span>
              </div>
              <Input
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                type="file"
                className="hidden"
                onChange={resumeChangeHandler}
              />
              {input.resume && (
                <p className="text-xs text-black/60">
                  Selected: {input.resume.name}
                </p>
              )}
            </div>
          </div>
        </form>

        <DialogFooter>
          {loading ? (
            <Button className="flex w-full items-center justify-center gap-2 rounded-xl border border-black bg-black text-xs font-medium text-white transition hover:bg-white hover:text-black">
              <Loader2 className="h-4 w-4 animate-spin" />
              Please Wait...
            </Button>
          ) : (
            <Button
              type="submit"
              form="update-profile-form"
              className="w-full rounded-xl border border-black bg-black text-xs font-medium text-white transition hover:bg-white hover:text-black"
            >
              Update Profile
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
