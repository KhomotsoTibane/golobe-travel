import { Button } from "@/components/ui/button";
import FilterSlider from "./Slider";
import Rating from "./Rating";
import AmenityFilter from "./Amenities";
import { useNavigate } from "@tanstack/react-router";
import { useFilterStore } from "@/store/useFilterStore";
import { useRouterState } from "@tanstack/react-router";

const FiltersFull = () => {
  const { rating, price, amenities, resetFilters } = useFilterStore();
  const routerState = useRouterState();
  const currentSearch = routerState.location.search;

  console.log("filters", { rating, price, amenities });

  const isFiltersFullOpen = true;
  const navigate = useNavigate({ from: "/hotels/search-results/$city" });

  const handleSubmit = () => {
    navigate({
      search: {
        ...currentSearch,
        rating: rating ? rating.toString() : "",
        price: price?.join("-"),
        amenities: amenities ? amenities : undefined,
      },
    });
  };

  const handleReset = () => {
    resetFilters();
    navigate({
      search: {
        ...currentSearch,
        rating: undefined,
        price: undefined,
        amenities: undefined,
      },
    });
  };

  if (!isFiltersFullOpen) return null;

  const ties = [
    "Air conditioning",
    "Hairdryer",
    "Shower",
    "WiFi",
    "Parking",
    "Air conditioning",
    "Airport Shuttle",
    "Pool",
    "Spa",
    "Restaurant",
    "Non-smoking",
    "Laundry",
    "Pets allowed",
    "Accessible",
    "Wheelchair accessible",
    "Bar",
    "Complimentary bottled water",
    "Teahouse",
    "First-aid room",
    "Garden",
    "Lounge",
    "Smoking areas",
    "Wedding facilities",
    "Airport Shuttle",
    "Parking",
    "Bar",
    "Complimentary bottled water",
    "Restaurant",
    "Teahouse",
    "Beauty salon",
    "Bicycle rental",
    "Games room",
    "Massage",
    "Poolside bar",
    "Spa",
    "Steam Room",
    "Tanning beds",
    "Concierge",
    "Luggage storage",
    "Multilingual staff",
    "Room service",
    "Safe deposit box",
    "Accessible",
    "Wheelchair accessible",
    "Fax",
    "Photocopier",
    "First-aid room",
    "Garden",
    "Laundry",
    "Lounge",
    "Non-smoking",
    "Smoking areas",
    "Wedding facilities",
    "Horseback riding",
    "Outdoor pool",
    "Pool",
    "Internet access",
    "WiFi in common areas",
    "WiFi",
    "Pets allowed",
  ];

  return (
    <div className="rounded-lg px-4 h-full pb-10 no-scrollbar">
      <div className="flex flex-col space-y-6 ">
        <div>
          <h4 className="montserrat__semibold">Filters</h4>
        </div>

        <div className="flex flex-col gap-4">
          <FilterSlider />
        </div>

        <div className="flex flex-col gap-4 py-8">
          <Rating />
        </div>

        <div>
          <AmenityFilter allAmenities={ties} maxVisible={8} />
        </div>

        <div className="flex gap-4 mt-6">
          <Button onClick={handleSubmit} className="flex-1 bg-primary-700 text-white rounded-xl">
            Apply Filters
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex-1 rounded-xl">
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FiltersFull;
