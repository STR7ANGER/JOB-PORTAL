import Navbar from "./shared/Navbar";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const Browse = () => {
  const { allJobs } = useSelector((state: RootState) => state.job);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <header className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Search results
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Showing roles that match your query.
            </p>
          </div>
          <span className="text-xs text-muted-foreground">
            {allJobs.length} jobs found
          </span>
        </header>

        <section>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {allJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Browse;
