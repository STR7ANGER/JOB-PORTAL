import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { Calendar, Users, DollarSign, Briefcase, Clock, MapPin, Globe } from "lucide-react";
import { useParams } from "react-router-dom";
import useGetSingleJob from "@/hooks/useGetSingleJob";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import type { Job } from "@/types/job";
import type { Company } from "@/types/company";
import { Avatar, AvatarImage } from "./ui/avatar";

const JobDescription = () => {
  const isApplied = true;
  const params = useParams();
  const jobId = params.id;
  useGetSingleJob(jobId as string);
  const { singleJob } = useSelector((state: RootState) => state.job) as {
    singleJob: Job | null;
  };
  
  // Get company ID - it could be a string or Company object
  const companyId = typeof singleJob?.company === "string" 
    ? singleJob.company 
    : singleJob?.company?._id;
  
  useGetCompanyById(companyId);
  const { company } = useSelector((state: RootState) => state.company) as {
    company: Company | null;
  };
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-black">
                {singleJob?.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70">
                  {singleJob?.position} 
                </Badge>
                <Badge className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="rounded-full border border-black/5 bg-black px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white">
                  ${singleJob?.salary}
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
            

            {/* Description */}
            <div className="space-y-2">
              <p className="text-sm leading-relaxed text-black/70">
                {singleJob?.description}
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
                  <p className="mt-1 text-sm font-medium text-black">{singleJob?.experience}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-black/50" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
                    Salary
                  </p>
                  <p className="mt-1 text-sm font-medium text-black">
                    ${singleJob?.salary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-black/50" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
                    Total Applicants
                  </p>
                  <p className="mt-1 text-sm font-medium text-black">{singleJob?.applications?.length || 0}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-black/50" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
                    Posted Date
                  </p>
                  <p className="mt-1 text-sm font-medium text-black">
                    {singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Details Card */}
        {company && (
          <div className="mb-6 rounded-2xl border border-black/10 bg-[#fdfdfd] p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-xl font-semibold tracking-tight text-black">
              About the Company
            </h2>

            <div className="space-y-6">
              {/* Company Header */}
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border border-black/10">
                  <AvatarImage 
                    src={company.logo || "https://github.com/shadcn.png"} 
                    alt={company.name}
                  />
                </Avatar>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold text-black">{company.name}</h3>
                  {company.description && (
                    <p className="text-sm leading-relaxed text-black/70">
                      {company.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Company Details Grid */}
              <div className="grid gap-4 border-t border-black/5 pt-6 md:grid-cols-2">
                {company.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-black/50" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
                        Location
                      </p>
                      <p className="mt-1 text-sm font-medium text-black">
                        {company.location}
                      </p>
                    </div>
                  </div>
                )}

                {company.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-black/50" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
                        Website
                      </p>
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-sm font-medium text-black hover:underline"
                      >
                        {company.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobDescription;
