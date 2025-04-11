import SearchHotelResultsCard from "@/components/Cards/SearchHotelResultsCard";
import { client } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { createFileRoute, useRouteContext } from "@tanstack/react-router";

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

  console.log("daydddddda", data);
  if (error) console.error("Error loading favorites", error);
  if (isLoading) console.log("Loading favorites...");

  if (isLoading) {
    return <div>Loading your favorites...</div>;
  }
  return (
    <div
      className="max-w-screen-lg mx-auto"
      // style={{ overflowY: "scroll" }}
    >
      <Tabs defaultValue="hotels" className="w-full">
        <TabsList className="h-24 w-full gap-8">
          <TabsTrigger value="flights" className="flex items-center justify-center gap-1">
            Flights
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center justify-center gap-1">
            Hotels
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
              className=" flex h-full max-w-screen-md flex-col gap-8 items-center justify-center mx-auto"
            >
              {data.map((result: any) => (
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
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
