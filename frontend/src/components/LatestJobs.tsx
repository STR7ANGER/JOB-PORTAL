import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import type { Job } from "@/types/job";
import type { Company } from "@/types/company";

const LatestJobs = () => {
  const { allJobs } = useSelector((state: RootState) => state.job) as {
    allJobs: (Omit<Job, "company"> & { company: Company })[];
  };
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <header className="mb-6 flex flex-col gap-2 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-black/50">
              Latest openings
            </p>
            <h2 className="text-2xl font-semibold text-black md:text-3xl">
              Fresh roles from top companies
            </h2>
            <p className="max-w-xl text-sm text-black/60">
              Explore a focused list of new opportunities added recently. Clean,
              distraction-free cards keep you focused on what matters.
            </p>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allJobs.length > 0 ? (
            allJobs?.slice(0, 6).map((item) => <LatestJobCard key={item._id} job={item} />)
          ) : (
            <span>No jobs are available right now</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
