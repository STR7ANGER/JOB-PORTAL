import LatestJobCard from "./LatestJobCard";

const randomJobs = [1, 2, 3, 4, 5, 6];

const LatestJobs = () => {
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
          {randomJobs.map((item) => (
            <LatestJobCard key={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
