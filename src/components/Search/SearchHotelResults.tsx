import SearchHotelResultsCard from "../Cards/SearchHotelResultsCard";
import { Button } from "../ui/button";
import type { SearchResultsProps } from "@/types";

type SearchHotelResultsProps = {
  searchResults: SearchResultsProps[];
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
};

const SearchHotelResults = ({
  searchResults,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: SearchHotelResultsProps) => {
  if (!searchResults) return <div>No results found</div>;
  return (
    <div
      id="searchResultContainer"
      className="pb-24 md:pb-0 flex-1 h-full gap-8 overflow-y-auto items-center justify-center"
    >
      {searchResults.map((result) => (
        <SearchHotelResultsCard
          key={result.hotelId}
          hotelId={result.hotelId}
          hotelImageUrls={result.hotelImageUrls[0]}
          hotelLowestPrice={result.hotelLowestPrice}
          rateFrequency={"per night"}
          hotelReviewsTotal={result.hotelReviewsTotal}
          hotelReviewsScore={result.hotelReviewsScore}
          hotelStreetAddress={result.hotelStreetAddress}
          hotelName={result.hotelName}
          hotelStars={result.hotelStars}
          hotelAmenities={result.hotelAmenities}
          hotelReviewsDesc={result.hotelReviewsDesc}
          totalAmenities={result.totalAmenities}
          hotelCity={result.hotelCity}
          hotelNation={result.hotelNation}
        />
      ))}
      {hasNextPage ? (
        <Button
          variant={"default"}
          size={"lg"}
          className="w-full bg-black"
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "Loading more..." : "Show more results"}
        </Button>
      ) : (
        <p>End of results</p>
      )}
    </div>
  );
};

export default SearchHotelResults;
