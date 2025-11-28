import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { Calendar, Users, DollarSign, Briefcase, Clock } from "lucide-react";

const JobDescription = () => {
  const isApplied = true;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-black">
                Title
              </h1>
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70">
                  Position
                </Badge>
                <Badge className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70">
                  Job Type
                </Badge>
                <Badge className="rounded-full border border-black/5 bg-black px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white">
                  Salary Range
                </Badge>
              </div>
            </div>
            {isApplied ? (
              <Button
                disabled
                className="rounded-xl border border-black/20 bg-white px-6 text-xs font-medium text-black/50"
              >
                Applied
              </Button>
            ) : (
              <Button className="rounded-xl border border-black bg-black px-6 text-xs font-medium text-white transition hover:bg-white hover:text-black">
                Apply
              </Button>
            )}
          </div>
        </div>

        {/* Job Details Card */}
        <div className="mb-6 rounded-2xl border border-black/10 bg-[#fdfdfd] p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-xl font-semibold tracking-tight text-black">
            Job Description
          </h2>

          <div className="space-y-6">
            {/* Role */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-black/50" />
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
                  Role
                </p>
              </div>
              <p className="text-sm text-black/80">Software Engineer</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
                Description
              </p>
              <p className="text-sm leading-relaxed text-black/70">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid gap-4 border-t border-black/5 pt-6 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-black/50" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
                    Experience
                  </p>
                  <p className="mt-1 text-sm font-medium text-black">2 years</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-black/50" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
                    Salary
                  </p>
                  <p className="mt-1 text-sm font-medium text-black">
                    100000 - 150000
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-black/50" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
                    Total Applicants
                  </p>
                  <p className="mt-1 text-sm font-medium text-black">100</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-black/50" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
                    Posted Date
                  </p>
                  <p className="mt-1 text-sm font-medium text-black">
                    2025-01-01
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDescription;
