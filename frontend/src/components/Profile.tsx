import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { PencilIcon, Mail, Phone, FileText } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";

const skills = [1, 2, 3, 4, 5];
const Profile = () => {
  const isResume = true;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        {/* Profile Header Section */}
        <section className="mb-8 rounded-2xl border border-black/10 bg-[#fdfdfd] p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            <Avatar className="h-24 w-24 border-2 border-black/10 md:h-28 md:w-28">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>

            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-black">
                    Full Name
                  </h1>
                  <p className="mt-2 text-sm leading-relaxed text-black/60">
                    Bio Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Delectus dolore asperiores minus commodi saepe laudantium
                    excepturi quidem eos, nulla, sequi necessitatibus quam ad
                    expedita porro modi. Est dicta quibusdam esse!
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-xl border-black/20 bg-white px-4 text-xs font-medium text-black hover:bg-black hover:text-white"
                >
                  <PencilIcon className="mr-2 h-3.5 w-3.5" />
                  Edit
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-black/70">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-black/50" />
                  <span>xifloxy@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-black/50" />
                  <span>1234567890</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
                  Skills
                </Label>
                <div className="flex flex-wrap gap-2">
                  {skills.length > 0 ? (
                    skills.map((item, index) => (
                      <Badge
                        key={index}
                        className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70"
                      >
                        Skill {item}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-black/50">NA</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
                  Resume
                </Label>
                {isResume ? (
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-black/5"
                  >
                    <FileText className="h-4 w-4" />
                    View Resume
                  </a>
                ) : (
                  <p className="text-sm text-black/50">NA</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Applied Jobs Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight text-black">
              Applied Jobs
            </h2>
          </div>
          <AppliedJobTable />
        </section>
      </main>
    </div>
  );
};

export default Profile;
