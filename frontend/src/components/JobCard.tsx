import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const JobCard = () => {
  return (
    <article className="group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-black/10 bg-[#fdfdfd] p-5 text-left shadow-sm transition hover:border-black hover:bg-white hover:shadow-md">
      {/* Top row: time + bookmark */}
      <div className="mb-3 flex items-start justify-between text-[11px] text-black/50">
        <span>2 days ago</span>
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
            Company
          </p>
          <h3 className="text-sm font-semibold text-black">Company Name</h3>
          <p className="text-xs text-black/50">India</p>
        </div>
      </div>

      {/* Title + description */}
      <div className="mb-4 space-y-2">
        <h4 className="text-sm font-medium text-black">Job Title</h4>
        <p className="text-xs leading-relaxed text-black/60">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </div>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70">
          Position
        </Badge>
        <Badge className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70">
          Job type
        </Badge>
        <Badge className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70">
          24 LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          size="sm"
          className="bg-black text-xs font-medium text-white hover:bg-black/90"
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
