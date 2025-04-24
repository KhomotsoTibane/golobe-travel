import SearchHotelResultsCard from "@/components/Cards/SearchHotelResultsCard";
import { client } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import type { SearchResultsProps } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/favorites")({
  component: RouteComponent,
});

function RouteComponent() {
  const { queryClient, user } = useRouteContext({ from: "/_authenticated" });

  const userId = user?.cognitoInfo.userId;

  const { data, isLoading, error } = useQuery({
    queryKey: ["user-favorites", user],
    queryFn: async () => client.getUserFavorites({ id: userId! }),
    enabled: !!user?.cognitoInfo.userId,
  });

  if (error) console.error("Error loading favorites", error);
  if (isLoading) {
    return (
      <div
        className="max-w-screen-lg mx-auto"
        // style={{ overflowY: "scroll" }}
      >
        <Skeleton defaultValue="hotels" className="w-full">
          <Skeleton className="h-24 w-full gap-8">
            <Skeleton className="flex items-center justify-center gap-1" />
          </Skeleton>

          <Skeleton className="w-full">
            <Skeleton className="max-w-screen-2xl mx-auto">
              <Skeleton
                id="searchResultContainer"
                className=" flex h-full overflow-auto max-w-screen-md flex-col gap-8 items-center justify-center mx-auto"
              >
                <Skeleton className="h-72" />
              </Skeleton>
            </Skeleton>
          </Skeleton>
        </Skeleton>
      </div>
    );
  }
  const numberFavHotels = data.length;
  return (
    <div
      className="max-w-screen-lg mx-auto"
      // style={{ overflowY: "scroll" }}
    >
      <Tabs defaultValue="hotels" className="w-full">
        <TabsList className="h-24 w-full gap-8  card-shadow">
          <TabsTrigger disabled value="flights" className="flex items-center justify-center gap-1">
            <div className="flex flex-col">
              <span>Flights</span>
              <small className="text-muted-foreground">0 marked</small>
            </div>
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center justify-center gap-1">
            <div className="flex flex-col">
              <span>Hotels</span>
              <small className="text-muted-foreground">{`${numberFavHotels ?? 0}`} marked</small>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="flights" className="h-screen">
          <div>
            <p>No Results.</p>
          </div>
        </TabsContent>
        <TabsContent value="hotels" className="">
          <div className="max-w-screen-2xl mx-auto">
            <div
              id="searchResultContainer"
              className=" flex h-full overflow-auto max-w-screen-md flex-col gap-8 items-center justify-center mx-auto"
            >
              {data.map((result: SearchResultsProps) => (
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
                  isFavorite={result.isFavorite}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
