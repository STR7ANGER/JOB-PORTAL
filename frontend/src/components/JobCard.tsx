import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store/store";

type JobFromState = RootState["job"]["allJobs"][number];

const JobCard = ({ job }: { job: JobFromState }) => {
  const navigate = useNavigate();
  const jobId = job._id;

  const getDaysAgo = (date: string | Date | undefined) => {
    if (!date) return "N/A";
    const jobDate = new Date(date);
    const today = new Date();
    const diffTime = today.getTime() - jobDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  return (
    <article className="group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-black/10 bg-[#fdfdfd] p-5 text-left shadow-sm transition hover:border-black hover:bg-white hover:shadow-md">
      {/* Top row: time + bookmark */}
      <div className="mb-3 flex items-start justify-between text-[11px] text-black/50">
        <span>{getDaysAgo(job.createdAt)}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-black hover:bg-black/5"
        >
          <span aria-hidden="true">☆</span>
          <span className="sr-only">Bookmark</span>
        </Button>
      </div>

      {/* Company */}
      <div className="mb-4 flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/45">
            {typeof job.company === "object" ? job.company.name : "Company"}
          </p>
          <h3 className="text-sm font-semibold text-black">
            {typeof job.company === "object" ? job.company.name : "Company"}
          </h3>
          <p className="text-xs text-black/50">
            {typeof job.company === "object" ? job.company.location : ""}
          </p>
        </div>
      </div>

      {/* Title + description */}
      <div className="mb-4 space-y-2">
        <h4 className="text-sm font-medium text-black">{job.title}</h4>
        <p className="text-xs leading-relaxed text-black/60">
          {job.description}
        </p>
      </div>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70">
          {job.position}
        </Badge>
        <Badge className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70">
          {job.jobType} 
        </Badge>
        <Badge className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70">
          ${job.salary}
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          size="sm"
          className="bg-black text-xs font-medium text-white hover:bg-black/90"
          onClick={() => navigate(`/description/${jobId}`)}
        >
          Details
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-black/20 text-xs text-black hover:bg-black/5"
        >
          Save for later
        </Button>
      </div>
    </article>
  );
};

export default JobCard;
