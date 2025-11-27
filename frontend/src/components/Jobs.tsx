import Navbar from "./shared/Navbar";
import FilterSidebar from "./FilterSidebar";
import JobCard from "./JobCard";

const jobs = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page content */}
      <main className="mx-auto flex max-w-7xl gap-8 px-4 py-8 md:px-6 lg:px-8">
        {/* Filter sidebar */}
        <aside className="hidden w-64 shrink-0 md:block">
          <FilterSidebar />
        </aside>

        {/* Jobs list */}
        <section className="flex-1">
          <header className="mb-6 flex items-baseline justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Browse jobs
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Find your next role from curated opportunities.
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {jobs.length} jobs found
            </span>
          </header>

          <div className="grid gap-5 md:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Jobs;
