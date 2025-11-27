import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    filterOptions: ["Delhi", "Mumbai", "Chennai", "Bangalore", "Hyderabad"],
  },
  {
    filterType: "Industry",
    filterOptions: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
    ],
  },
  {
    filterType: "Salary",
    filterOptions: [
      "1LPA - 2LPA",
      "2LPA - 3LPA",
      "3LPA - 4LPA",
      "4LPA - 5LPA",
    ],
  },
];

const FilterSidebar = () => {
  return (
    <div className="space-y-4 rounded-xl border border-black/10 bg-card p-3 shadow-sm md:p-4">
      <div>
        <h2 className="text-base font-semibold tracking-tight">Filter jobs</h2>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Refine results by location, role and salary.
        </p>
      </div>

      <div className="space-y-4">
        {filterData.map((group) => (
          <div key={group.filterType} className="space-y-2">
            <p className="text-[11px] font-medium uppercase text-muted-foreground">
              {group.filterType}
            </p>
            <RadioGroup className="grid gap-1.5">
              {group.filterOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-black/20 bg-[#fdfdfd] px-3 py-1.5 text-xs hover:bg-accent hover:text-accent-foreground"
                >
                  <RadioGroupItem value={option} className="h-3 w-3" />
                  <span>{option}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
