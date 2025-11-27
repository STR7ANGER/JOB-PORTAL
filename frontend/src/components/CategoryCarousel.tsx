import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "Data Scientist",
  "AI Engineer",
  "Cyber Security Engineer",
  "Database Administrator",
  "System Administrator",
];

const CategoryCarousel = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <header className="mb-5 flex flex-col gap-2 md:mb-7 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1.5">
            <p className="text-xs uppercase tracking-[0.3em] text-black/50">
              Browse by role
            </p>
            <h2 className="text-xl font-semibold text-black md:text-2xl">
              Explore categories in a single swipe
            </h2>
            <p className="max-w-xl text-sm text-black/60">
              Quickly scan popular profiles and jump directly into openings that
              match your expertise.
            </p>
          </div>
        </header>

        <div className="rounded-3xl border border-black/10 bg-[#fdfdfd] px-3 py-5 shadow-sm md:px-5 md:py-6">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {category.map((item) => (
                <CarouselItem key={item} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                  <Button
                    variant="outline"
                    className="h-10 w-full rounded-full border-black/15 bg-white text-xs font-medium text-black/75 hover:border-black hover:bg-black hover:text-white"
                  >
                    {item}
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-black/20 bg-white text-black hover:border-black hover:bg-black hover:text-white" />
            <CarouselNext className="border-black/20 bg-white text-black hover:border-black hover:bg-black hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
