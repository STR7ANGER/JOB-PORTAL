import Navbar from "./shared/Navbar";
import JobCard from "./JobCard";

const browseJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const Browse = () => {
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
            {browseJobs.length} jobs found
          </span>
        </header>

        <section>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {browseJobs.map((job) => (
              <JobCard key={job} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Browse;
