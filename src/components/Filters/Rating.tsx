import FilterCard from "./FilterCard";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/useFilterStore";
const Rating = () => {
  const { rating, setFilters } = useFilterStore();

  const handleClick = (value: string) => {
    setFilters({ rating: rating === parseInt(value) ? undefined : parseInt(value) });
  };

  return (
    <FilterCard label="Rating">
      <div className="flex md:flex-row flex-wrap gap-2 w-full flex-col">
        {["0", "1", "2", "3", "4"].map((item) => (
          <Button
            key={item}
            variant="outline"
            size="icon"
            className={cn(
              "border-primary-400",
              rating === parseInt(item) && "bg-primary-500 text-white"
            )}
            onClick={() => handleClick(item)}
          >
            {item}+
          </Button>
        ))}
      </div>
    </FilterCard>
  );
};

export default Rating;
