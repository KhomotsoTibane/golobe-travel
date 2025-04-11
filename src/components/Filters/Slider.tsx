import { Slider } from "@/components/ui/slider";
import FilterCard from "./FilterCard";
import { useFilterStore } from "@/store/useFilterStore";

const FilterSlider = () => {
  const { price = [300, 10000], setFilters } = useFilterStore();

  return (
    <FilterCard label="Price">
      <Slider
        value={price}
        min={300}
        max={10000}
        step={50}
        onValueChange={(value) => setFilters({ price: value as [number, number] })}
      />
      <div className="mt-2 flex justify-between">
        <span className="text-sm">{price[0]}</span>
        <span className="text-sm">{price[1]}</span>
      </div>
    </FilterCard>
  );
};

export default FilterSlider;
