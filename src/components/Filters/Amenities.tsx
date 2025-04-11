import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFilterStore } from "@/store/useFilterStore";
import FilterCard from "./FilterCard";

interface AmenityFilterProps {
  allAmenities: string[];
  maxVisible?: number; // defaults to 4
}

const AmenityFilter = ({ allAmenities, maxVisible = 4 }: AmenityFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  const { amenities, setFilters } = useFilterStore();

  // Deduplicate amenities
  const uniqueAmenities = useMemo(() => Array.from(new Set(allAmenities)), [allAmenities]);

  const visibleAmenities = showAll ? uniqueAmenities : uniqueAmenities.slice(0, maxVisible);

  const remainingCount = uniqueAmenities.length - maxVisible;

  const toggleAmenity = (amenity: string) => {
    const next = amenities.includes(amenity)
      ? amenities.filter((a) => a !== amenity)
      : [...amenities, amenity];

    setFilters({ amenities: next });
  };

  return (
    <FilterCard label="Amenities">
      <div className="space-y-2">
        {visibleAmenities.map((amenity) => (
          <div key={amenity} className="flex items-center space-x-2">
            <Checkbox
              id={amenity}
              checked={amenities.includes(amenity)}
              onCheckedChange={() => toggleAmenity(amenity)}
            />
            <Label htmlFor={amenity}>{amenity}</Label>
          </div>
        ))}

        {!showAll && remainingCount > 0 && (
          <Button
            variant="link"
            className="text-pink-500 px-0 text-sm"
            onClick={() => setShowAll(true)}
          >
            +{remainingCount} more
          </Button>
        )}
      </div>
    </FilterCard>
  );
};

export default AmenityFilter;
