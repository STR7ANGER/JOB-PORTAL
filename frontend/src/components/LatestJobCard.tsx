import { Badge } from "./ui/badge";

const LatestJobCard = () => {
  return (
    <article className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-black/10 bg-[#fdfdfd] p-4 text-left shadow-sm transition hover:border-black hover:bg-white hover:shadow-md">
      <header className="mb-3 flex items-start justify-between gap-2">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/45">
            Company
          </p>
          <h3 className="text-sm font-semibold text-black">Company Name</h3>
          <p className="text-xs text-black/50">India</p>
        </div>
        <Badge className="rounded-full border border-black/5 bg-black text-[11px] font-medium uppercase tracking-[0.16em] text-white group-hover:bg-white group-hover:text-black">
          24 LPA
        </Badge>
      </header>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-black">Job Title</h4>
        <p className="text-xs leading-relaxed text-black/60">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
          saepe nemo perferendis at dolorum autem praesentium quod.
        </p>
      </div>

      <footer className="mt-4 flex flex-wrap gap-2">
        <Badge className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70">
          Positions
        </Badge>
        <Badge className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70">
          Job type
        </Badge>
      </footer>
    </article>
  );
};

export default LatestJobCard;
