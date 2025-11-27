import { Input } from "./ui/input";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-12 text-center md:flex-row md:items-center md:justify-between md:gap-10 md:py-20">
        <div className="max-w-xl space-y-5 text-left">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-black/50">
            No. 1 Job Hunt Website
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-black md:text-4xl lg:text-5xl">
            Search, apply, and land your{" "}
            <span className="underline underline-offset-4">dream job</span>.
          </h1>
          <p className="text-sm text-black/60 md:text-base">
            Discover curated opportunities from top companies, tailored to your
            skills and ambitions. Simple, focused, and built to help you move
            forward in your career.
          </p>

          <div className="mt-4">
            <form
              className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-[#fdfdfd] p-3 shadow-sm md:flex-row md:items-center md:gap-2 md:p-3.5"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="text"
                placeholder="Search for roles, skills, or companies"
                className="h-11 flex-1 rounded-xl border-black/15 bg-[#f8f8f8] text-sm text-black placeholder:text-black/30 focus:border-black focus:ring-0"
              />
              <Button
                type="submit"
                className="h-11 w-full rounded-xl border border-black bg-black px-5 text-sm font-medium text-white transition hover:bg-white hover:text-black md:w-auto"
              >
                Search
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-10 w-full max-w-sm md:mt-0">
          <div className="h-full rounded-3xl border border-black/10 bg-[#fdfdfd] px-6 py-7 shadow-lg md:px-7 md:py-8">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-black/45">
                Snapshot
              </p>
              <h2 className="text-lg font-semibold text-black">
                Designed for focused job search
              </h2>
              <p className="text-sm text-black/60">
                Filter noise, track applications, and stay organized with a calm,
                minimal interface inspired by your login experience.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-left text-sm text-black/70">
              <div className="space-y-1 rounded-2xl border border-black/10 bg-white px-3 py-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-black/45">
                  Active jobs
                </p>
                <p className="text-lg font-semibold">1,200+</p>
              </div>
              <div className="space-y-1 rounded-2xl border border-black/10 bg-white px-3 py-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-black/45">
                  Companies
                </p>
                <p className="text-lg font-semibold">350+</p>
              </div>
              <div className="space-y-1 rounded-2xl border border-black/10 bg-white px-3 py-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-black/45">
                  Countries
                </p>
                <p className="text-lg font-semibold">25</p>
              </div>
              <div className="space-y-1 rounded-2xl border border-black/10 bg-white px-3 py-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-black/45">
                  Placements
                </p>
                <p className="text-lg font-semibold">10k+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
