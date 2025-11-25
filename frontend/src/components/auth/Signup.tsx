import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { API_URL } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";

type Role = "student" | "recruiter";

type FormInput = {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: Role;
  file: File | null;
};

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<FormInput>({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: null,
  });

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files ?? [];
    setInput({ ...input, file: file ?? null });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if(input.file){
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(`${API_URL}/user/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error in signup:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-screen bg-white text-black flex flex-col ">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4 py-10 md:py-12 ">
        <div className="w-full max-w-3xl rounded-3xl border border-black/10 bg-white px-8 py-10 shadow-xl md:shadow-2xl">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-black/50">
              Sign up
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.2em] text-black/60">
                  Full Name
                </Label>
                <Input
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder="Full name"
                  className="rounded-xl border-black/15 bg-[#f8f8f8] text-black placeholder:text-black/30 focus:border-black focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.2em] text-black/60">
                  Email
                </Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="you@example.com"
                  className="rounded-xl border-black/15 bg-[#f8f8f8] text-black placeholder:text-black/30 focus:border-black focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.2em] text-black/60">
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="+91 00000 00000"
                  className="rounded-xl border-black/15 bg-[#f8f8f8] text-black placeholder:text-black/30 focus:border-black focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.2em] text-black/60">
                  Password
                </Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="rounded-xl border-black/15 bg-[#f8f8f8] text-black placeholder:text-black/30 focus:border-black focus:ring-0"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-xs uppercase tracking-[0.2em] text-black/60">
                Role
              </Label>
              <RadioGroup
                value={input.role}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, role: value as Role }))
                }
                className="flex flex-wrap gap-3"
              >
                {[
                  {
                    id: "role-student",
                    value: "student",
                    label: "Student",
                    hint: "Looking for roles or internships",
                  },
                  {
                    id: "role-recruiter",
                    value: "recruiter",
                    label: "Recruiter",
                    hint: "Hiring talent for open positions",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    htmlFor={option.id}
                    className="flex min-w-[13rem] flex-1 items-center justify-between rounded-2xl border border-black/10 bg-[#fdfdfd] px-4 py-3 text-sm text-black/80 transition hover:border-black"
                  >
                    <div className="space-y-0.5">
                      <p className="font-medium">{option.label}</p>
                      <p className="text-xs text-black/45">{option.hint}</p>
                    </div>
                    <RadioGroupItem
                      id={option.id}
                      value={option.value}
                      className="border-black/30 data-[state=checked]:border-black data-[state=checked]:bg-black data-[state=checked]:text-white"
                    />
                  </label>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-[0.2em] text-black/60">
                Profile picture
              </Label>
              <label
                htmlFor="profile-upload"
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-black/10 bg-[#fdfdfd] px-4 py-3 text-sm text-black/70 transition hover:border-black"
              >
                <span className="flex items-center gap-3">
                  <Upload className="h-4 w-4" />
                  Upload image
                </span>
                <span className="text-xs uppercase tracking-[0.3em] text-black/40">
                  JPG · PNG
                </span>
              </label>
              <Input
                id="profile-upload"
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                name="file"
                className="sr-only"
              />
              {input.file && (
                <p className="text-xs text-black/60">{input.file.name}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full rounded-2xl border border-black bg-black text-white transition hover:bg-white hover:text-black"
            >
              Sign up
            </Button>

            <p className="text-center text-sm text-black/60">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="underline underline-offset-4 cursor-pointer"
              >
                Log in
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
