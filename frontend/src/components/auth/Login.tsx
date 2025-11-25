import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type Role = "student" | "recruiter";

type FormInput = {
  email: string;
  password: string;
  role: Role;
};

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState<FormInput>({
    email: "",
    password: "",
    role: "student",
  });

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
  };
  return (
    <div className="min-h-screen bg-white text-black flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4 py-10 md:py-12">
        <div className="w-full max-w-lg rounded-3xl border border-black/10 bg-white px-8 py-10 shadow-xl md:shadow-2xl">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-black/50">
              Log in
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
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
                    id: "login-role-student",
                    value: "student",
                    label: "Student",
                    hint: "Looking for opportunities",
                  },
                  {
                    id: "login-role-recruiter",
                    value: "recruiter",
                    label: "Recruiter",
                    hint: "Hiring candidates",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    htmlFor={option.id}
                    className="flex min-w-[11rem] flex-1 items-center justify-between rounded-2xl border border-black/10 bg-[#fdfdfd] px-4 py-3 text-sm text-black/80 transition hover:border-black"
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

            <Button type="submit" className="w-full rounded-2xl border border-black bg-black text-white transition hover:bg-white hover:text-black">
              Log in
            </Button>

            <p className="text-center text-sm text-black/60">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="underline underline-offset-4 cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
